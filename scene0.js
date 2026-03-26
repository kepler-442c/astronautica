class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.threshold = 0.1;
    this.speed = 100;
    this.direction = undefined;
    this.fuel = 100;
  }

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
    
    this.music = this.sound.add("songf1", { loop: true });
    this.music.play();
    
    //this.player = this.physics.add.image(400, 225, "star", 0);
    //this.star = this.physics.add.image(400, 225, "star", 0);
    //this.cameras.main.setBounds(0, 0, 400, 225);
    
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
    
    this.textFuel = this.add.text(50, 50, `Fuel: ${this.fuel}`, {
      fontSize: "32px",
      fill: "#ffffff",
    });
    
    this.textFuel.setScrollFactor(0);
    
    
    // Asteroides
    this.asteroids = this.physics.add.group();
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
        
        // Colisão
        this.physics.add.collider(
          this.player,
          this.asteroids,
          this.hitAsteroid,
          null,
          this,
        );
        
        
        this.combustivel = this.physics.add.group();
        const comPos = [
          { x: 500, y: 600 },
          { x: 1100, y: 600 },
          { x: 800, y: 200 },
        ];
        
        this.anims.create({
          key: "combustivel_anim",
          frames: this.anims.generateFrameNumbers("combustivel", { start: 0, end: 3 }),
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
          this.textFuel.setText(`Fuel: ${this.fuel}`),
        );
    
    
        
        this.button = this.add
          .sprite(600, 300, "button", 0)
        .setScrollFactor(0)
        .setScale(2)
        .setInteractive()
        .on("pointerdown", () => {
          this.button.setFrame(1)
          this.player.setVelocity(
            this.direction.x * this.speed * 2,
            this.direction.y * this.speed * 2,);
          })
          .on("pointerup", () => {
            this.button.setFrame(0);
            this.player.setVelocity(
              this.direction.x * this.speed / 2,
              this.direction.y * this.speed / 2,
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
          //JOYSTICK ESTÁ POR BAIXO DOS ASTEROIDES PARA CARREGAR A TEMPO
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
    
  } //chave do create

  hitAsteroid(player, asteroid) {
    player.disableBody(true, true);}

  hitCombustivel(player, combustivel) {
    combustivel.disableBody(true, true); }

  update() {}




}
export default scene0;


/*
preload() {
  this.load.spritesheet("alien", "assets/alien.png", {
    frameWidth: 64,
    frameHeight: 64
  });

  this.load.plugin(
    "rexvirtualjoystickplugin",
    "./rexvirtualjoystickplugin.min.js",
    true,
  );

  this.load.spritesheet("button", "assets/button.png", {
    frameWidth: 32,
    frameHeight: 32,
  });

  this.load.audio("menusong", "assets/menusong.mp3"); 

  this.load.audio("lazer", "assets/lazer.mp3");

}

  create() {

    this.menusong = this.sound.add
      ("menusong", { loop: true }).play();
    
    this.lazer = this.sound.add("lazer");
    

    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("alien", { start: 27, end: 35 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("alien", { start: 10, end: 17 }),
      frameRate: 10,
      repeat: -1,
    })
    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("alien", { start: 0, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("alien", { start: 18, end: 26 }),
      frameRate: 10,
      repeat: -1,
    });


    this.alien = this.physics.add
      .sprite(400, 225, "alien", 18)
    
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
          Math.sin(angle)
        ).normalize();
      }
      

      if (this.joystick.force > 0) {
        this.alien.setVelocity(
          this.direction.x * this.speed,
          this.direction.y * this.speed,
        );

        switch (true) {
          case this.joystick.angle >= -135 && this.joystick.angle < -45:
            this.alien.anims.play("walk-up", true);
            break;
          case this.joystick.angle >= -45 && this.joystick.angle < 45:
            this.alien.anims.play("walk-right", true);
            break;
          case this.joystick.angle >= 45 && this.joystick.angle < 135:
            this.alien.anims.play("walk-down", true);
            break;
          case this.joystick.angle >= 135 || this.joystick.angle < -135:
            this.alien.anims.play("walk-left", true);
            break;
        }
      } else {
        this.alien.setVelocity(0, 0);
        this.alien.anims.stop();
        this.alien.setFrame(18);
      }
      
    });
    
    this.button = this.add
      .sprite(670, 320, "button", 0)
      .setScale(2)
      .setInteractive()
      .on("pointerdown", () => { 
        this.button.setFrame(1);
      })
    .on("pointerup", () => {
      this.button.setFrame(0);
      this.money += 10;
      this.textMoney.setText(`Money: ${this.money}`);
      this.lazer.play();
    });

    this.textMoney = this.add.text(16, 16, `Money: ${this.money}`, {
      fontSize: "32px",
      fill: "#ffffff",

    });

    setInterval(() => {
      this.money += 1;
      this.textMoney.setText(`Money: ${this.money}`);
    }, 1000);

  }

} */
