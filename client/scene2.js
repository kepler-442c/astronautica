class scene2 extends Phaser.Scene {
  constructor() {
    super("scene2");

    this.threshold = 0.1;
    this.speed = 150;
    this.direction = undefined;
    this.fuel = 20;
    this.life = 3;
    this.nitro = false;
    this.invincible = false;
    this.tempo = 60; //tempo para passar de fase
    this.morreu = false;
  } //ARRUMAR CAMADAS E LOCALIZAÇÃO DO SPAWN DO COMBUSTIVEL, CAMERA SEGUIR,
  //SEPARAR ANIMACAO ACID E ACIDEXP? MELHORAR ESCALAS

  preload() {
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "../rexvirtualjoystickplugin.min.js",
      true,
    );

    this.load.setPath("assets/");

    this.load.font("stepalange", "stepalange.otf");

    this.load.spritesheet("mapf2", "fase_2.png", {
      frameWidth: 800,
      frameHeight: 450,
    });

    this.load.image("player", "star.png");

    this.load.spritesheet("combustivel", "combustivel.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.image("telanave", "telanave.png");

    this.load.spritesheet("acid", "acid.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("buttonnitro", "buttonnitro.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.audio("explosion", "explosion.mp3");

    this.load.audio("collect", "collect.mp3");
  }

  create() {
    this.anims.create({
      key: "mapf2_anim",
      frames: this.anims.generateFrameNumbers("mapf2", {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "combustivel_anim",
      frames: this.anims.generateFrameNumbers("combustivel", {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.acid = this.anims.create({
      key: "acid_anim",
      frames: this.anims.generateFrameNumbers("acid", {
        start: 0,
        end: 15,
      }),
      frameRate: 5,
      repeat: -1,
    });

    

    this.add
      .sprite(400, 225, "mapf2")
      .play("mapf2_anim")

      .setScrollFactor(0.8);

    this.player = this.physics.add.sprite(400, 225, "player").setTint(0x898989);
    this.physics.world.setBounds(0, 0, 800, 450);
    this.cameras.main.setBounds(0, 0, 800, 450); //fazer a camera seguir depois
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.player.setCollideWorldBounds(true);

    this.telaNave = this.add.image(400, 225, "telanave").setScrollFactor(0);

    this.button = this.add
      .sprite(600, 250, "buttonnitro", 0)
      .setScrollFactor(0)
      .setInteractive()
      .on("pointerdown", () => {
        this.button.setFrame(1);
        this.player.setVelocity(
          this.direction.x * this.speed * 2,
          this.direction.y * this.speed * 2,
        );
        this.nitro = true;
        this.textFuel.setText(`Fuel: ${this.fuel}`);
      })
      .on("pointerup", () => {
        this.button.setFrame(0);
        this.player.setVelocity(
          (this.direction.x * this.speed) / 2,
          (this.direction.y * this.speed) / 2,
        );
        this.nitro = false;
        this.textFuel.setText(`Fuel: ${this.fuel}`);
      });

    this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
      x: 150,
      y: 290,
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
        this.player.setVelocity(
          this.direction.x * this.speed,
          this.direction.y * this.speed,
        );
      } else {
        this.player.setVelocity(0, 0);
      }
    });

    this.textLife = this.add
      .text(680, 100, `Life: ${this.life}`, {
        //600, 50
        fontFamily: "stepalange",
        fontSize: "36px",
        fill: "#ffffff",
      })
      .setScrollFactor(0);

    this.textFuel = this.add
      .text(16, 100, `Fuel: ${this.fuel}`, {
        //16, 50
        fontFamily: "stepalange",
        fontSize: "36px",
        fill: "#ffffff",
      })
      .setScrollFactor(0);

    //mecanicas de fuel
    this.intervalFuel = setInterval(() => {
      this.fuel -= 1;
      this.textFuel.setText(`Fuel: ${this.fuel}`);

      if (this.fuel <= 0) {
        this.scene.stop();
        clearInterval(this.intervalFuel);
        clearInterval(this.intervalNitro);
        clearInterval(this.intervalTime);
        this.fuel = 20;
        this.life = 3;
        this.tempo = 60;
        this.invincible = false;
        this.morreu = true;
        this.scene.start("gameover");
      }
    }, 1000);

    this.intervalNitro = setInterval(() => {
      if (this.nitro === true) {
        this.fuel -= 3;
      }
      this.textFuel.setText(`Fuel: ${this.fuel}`);
      if (this.fuel <= 0) {
        this.scene.stop();
        this.nitro = false;
        clearInterval(this.intervalFuel);
        clearInterval(this.intervalNitro);
        clearInterval(this.intervalTime);
        this.fuel = 20;
        this.life = 3;
        this.tempo = 60;
        this.invincible = false;
        this.morreu = true;
        this.scene.start("gameover");
      }
    }, 500);

    this.intervalTime = setInterval(() => {
      this.tempo -= 1;
      if (this.tempo <= 0) {
        this.scene.stop();
        clearInterval(this.intervalFuel);
        clearInterval(this.intervalNitro);
        clearInterval(this.intervalTime);
        this.scene.start("scene2");
      }
    }, 1000);

    this.time.addEvent({
      delay: 1000,
      callback: this.spawnCombustivel,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.spawnAcid,
      callbackScope: this,
      loop: true,
    });

    this.combustivelGroup = this.physics.add.group();
    this.physics.add.collider(
      this.player,
      this.combustivelGroup,
      this.hitCombustivel,
      null,
      this,
    );

    this.acidGroup = this.physics.add.group();
    this.physics.add.collider(
      this.player,
      this.acidGroup,
      this.hitAcid,
      null,
      this,
    );
  } //CHAVE DO CREATE

  hitCombustivel(player, combustivelGroup) {
    this.sound.play("collect");
    (combustivelGroup.destroy(true, true),
      (this.fuel += 5),
      this.textFuel.setText(`Fuel: ${this.fuel}`));
  }

  hitAcid(player, acidGroup) {
    this.sound.play("explosion");
    (acidGroup.destroy(true, true),
      (this.life -= 1),
      this.textLife.setText(`Life: ${this.life}`),
      (this.invincible = true));

    this.add.tween({
      targets: this.player,
      alpha: 0,
      duration: 100,
      yoyo: true,
      repeat: 5,
    });

    this.time.delayedCall(1000, () => {
      this.invincible = false;
      this.player.clearTint();
    });

    if (this.life <= 0) {
      this.scene.stop();
      clearInterval(this.intervalFuel);
      clearInterval(this.intervalNitro);
      clearInterval(this.intervalTime);
      this.fuel = 20;
      this.life = 3;
      this.tempo = 60;
      this.invincible = false;
      this.morreu = true;
      this.scene.start("gameover");
    }
  }

  processAsteroidCollision(player, asteroid) {
    return !this.invincible;
  }

  update() {}

  spawnCombustivel() {
    //REFINAR!!!!! NAO SPAWNAR UM EM CIMA DO OUTRO E NEM ONDE ESTA O PLAYER
    const maxCombustivel = 3;

    if (this.combustivelGroup.getLength() < maxCombustivel) {
      var x = Phaser.Math.Between(0, 800);
      var y = Phaser.Math.Between(0, 450);

      while (
        Math.abs(x - this.player.x) < 100 ||
        Math.abs(y - this.player.y) < 100 ||
        Math.abs(x - this.combustivelGroup.x) < 100 ||
        Math.abs(y - this.combustivelGroup.y) < 100
      ) {
        // Garante que o combustível não será criado muito próximo do player
        x = Phaser.Math.Between(0, 800);
        y = Phaser.Math.Between(0, 450);
      }

      const combustivel = this.combustivelGroup.create(x, y, "combustivel");
      combustivel.setCollideWorldBounds(true);
      this.anims.play("combustivel_anim", combustivel);
      combustivel.setSize(50, 50);
      combustivel.setScale(0.3);
      combustivel.setDepth(1000);

      this.tweens.add({
        targets: combustivel,
        scale: 0.8,
        duration: 6000,
        ease: "Linear",
      });
    }
    
  }

  spawnAcid() {
    //REFINAR!!!!! NAO SPAWNAR UM EM CIMA DO OUTRO E NEM ONDE ESTA O PLAYER
    const maxAcid = 3;

    if (this.acidGroup.getLength() < maxAcid) {
      var x = Phaser.Math.Between(0, 800);
      var y = Phaser.Math.Between(0, 450);

      while (
        Math.abs(x - this.player.x) < 100 ||
        Math.abs(y - this.player.y) < 100 ||
        Math.abs(x - this.acidGroup.x) < 100 ||
        Math.abs(y - this.acidGroup.y) < 100
      ) {
        // Garante que o combustível não será criado muito próximo do player
        x = Phaser.Math.Between(0, 800);
        y = Phaser.Math.Between(0, 450);
      }

      const acid = this.acidGroup.create(x, y, "acid");
      acid.setCollideWorldBounds(true);
      this.anims.play("acid_anim", acid);
      acid.setSize(16, 16);
      acid.setScale(3);
      acid.setDepth(1000);

      this.tweens.add({
        targets: acid,
        scale: 6,
        duration: 6000,
        ease: "Linear",
      });

      
    }
  }
}

export default scene2;