class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.threshold = 0.1;
    this.speed = 100;
    this.direction = undefined;
    this.fuel = 20;
  }
  //telanave, musica 2f, hitbox, som de coleta de combustivel, timer passar de fase, colisao asteroide, spawn de combsutivel
  preload() {
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "../rexvirtualjoystickplugin.min.js",
      true,
    );

    this.load.setPath("assets/");

    this.load.image("mapf1", "mapf1.png");

    this.load.image("star", "star.png");

    this.load.image("asteroideum", "asteroideum.png");

    this.load.image("startf1", "startf1.png");

    this.load.audio("songf1", "songf1.mp3");

    this.load.spritesheet("combustivel", "combustivel.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("uispritesheet", "uispritesheet.png", {
      frameWidth: 800,
      frameHeight: 450,
    });

    this.load.spritesheet("button", "button.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.physics.pause(); // Pausa a física para congelar a cena

    this.input.once("pointerdown", () => {
      this.physics.resume();
      this.startf1.destroy(); // Remove a imagem de início
    });

    this.player = this.star = this.physics.add.image(800, 450, "star", 0); //SURGE NO MEIO DO MAPA
    this.star.setScale(3);
    this.player.setCollideWorldBounds(true);

    this.music = this.sound.add("songf1");
    this.music.play();

    this.cameras.main.startFollow(this.player);

    this.cameras.main.setBounds(0, 0, 800 * 2, 450 * 2);
    this.physics.world.setBounds(400, 225, 800, 450);

    this.add.image(0, 0, "mapf1").setOrigin(0);
    this.add.image(800, 0, "mapf1").setOrigin(0).setFlipX(true);
    this.add.image(0, 450, "mapf1").setOrigin(0).setFlipY(true);
    this.add
      .image(800, 450, "mapf1")
      .setOrigin(0)
      .setFlipX(true)
      .setFlipY(true);

    this.startf1 = this.add.image(800, 450, "startf1");
    this.uispritesheet = this.physics.add.sprite(800, 450, "uispritesheet", 1);

    // Example of calling the spawn function on a timer
    // ... group setup

    // Asteroides
    /*this.asteroids = this.physics.add.group();
    const astPos = [
      { x: 600, y: 600 },
      { x: 1100, y: 300 },
      { x: 1000, y: 600 },
    ];

    astPos.forEach((pos) => {
      const a = this.asteroids.create(pos.x, pos.y, "asteroideum");
      a.setScale(1);
      a.setCollideWorldBounds(true);
      a.setBounce(1, 1);
      a.setVelocity(
        Phaser.Math.Between(-120, 120),
        Phaser.Math.Between(-120, 120),
      );
    });
    */
    // Colisão

    this.combustivel = this.physics.add.group();
    const comPos = [
      { x: 500, y: 600 },
      { x: 1100, y: 600 },
      { x: 800, y: 200 },
    ];

    this.anims.create({
      key: "combustivel_anim",
      frames: this.anims.generateFrameNumbers("combustivel", {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });

    comPos.forEach((pos) => {
      const c = this.combustivel.create(pos.x, pos.y, "combustivel");
      c.setScale(1);
      c.setCollideWorldBounds(true);
    });

    // Colisão
    this.physics.add.collider(
      this.player,
      this.combustivel,
      this.hitCombustivel,
      null,
      this,
    );

    this.textFuel = this.add
      .text(16, 50, `Fuel: ${this.fuel}`, {
        fontSize: "32px",
        fill: "#ffffff",
      })
      .setScrollFactor(0);

    setInterval(() => {
      this.fuel -= 1;

      this.textFuel.setText(`Fuel: ${this.fuel}`);

      if (this.fuel <= 0) {
        this.scene.stop();
        this.scene.start("game-over");
      }
    }, 1000);

    this.button = this.add
      .sprite(600, 300, "button", 0)
      .setScrollFactor(0)
      .setScale(2)
      .setInteractive()
      .on("pointerdown", () => {
        this.button.setFrame(1);
        this.player.setVelocity(
          this.direction.x * this.speed * 2,
          this.direction.y * this.speed * 2,
        );
      })
      .on("pointerup", () => {
        this.button.setFrame(0);
        this.player.setVelocity(
          (this.direction.x * this.speed) / 2,
          (this.direction.y * this.speed) / 2,
        );
      });

    this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
      x: 100,
      y: 350,
      radius: 50,
      base: this.add.circle(0, 0, 50, 0x888888),
      thumb: this.add.circle(0, 0, 25, 0xcccccc),
    });

    this.joystick.on("update", () => {
      const angle = Phaser.Math.DegToRad(this.joystick.angle);
      const force = this.joystick.force;

      if (force > this.threshold) {
        this.direction = new Phaser.Math.Vector2(
          Math.cos(angle),
          Math.sin(angle),
        ).normalize();
      }

      if (this.joystick.force > 0) {
        this.star.setVelocity(
          this.direction.x * this.speed,
          this.direction.y * this.speed,
        );
      } else {
        this.star.setVelocity(0, 0);
      }
    });

    this.time.addEvent({
      delay: 3000,
      callback: this.spawnAsteroid,
      callbackScope: this,
      loop: true,
    });

    this.asteroidGroup = this.physics.add.group();
    this.physics.add.collider(
      this.player,
      this.asteroidGroup,
      this.hitAsteroid,
      null,
      this,
    );
  } //chave do create

  hitAsteroid(player, asteroidGroup) {
    //player.disableBody(true, true);
    //this.scene.start("game-over");
    this.scene.pause();
  }

  hitCombustivel(player, combustivel) {
    (combustivel.disableBody(true, true),
      (this.fuel += 5),
      this.textFuel.setText(`Fuel: ${this.fuel}`));
  }

  update() {
    //this.mapf1.tilePositionY -= 0.5;
  }

  spawnAsteroid() {
    //if (this.asteroidGroup.getLength() < this.asteroidGroup.maxSize) {
    // let enemy = this.inimigos.create(x, y, 'inimigo');
    // }
    const x = Phaser.Math.Between(0, this.game.config.width);
    const y = Phaser.Math.Between(0, this.game.config.height);

    const asteroid = this.asteroidGroup.create(x, y, "asteroideum");
    //asteroid.setCollisionCategory(null);
    asteroid.setBounce(1);
    asteroid.setCollideWorldBounds(true);
    asteroid.setVelocity(
      Phaser.Math.Between(-200, 200),
      Phaser.Math.Between(-200, 200),
    );
  }
}

export default scene0;
