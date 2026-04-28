class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.threshold = 0.1;
    this.speed = 130;
    this.direction = undefined;
    this.fuel = 20;
    this.life = 3;
    this.nitro = false;
    this.invincible = false;
    this.tempo = 60; //tempo para passar de fase
  }
  // ***arrumar problema de fim de scene0 fram source null,*** frames fuellevel, musica 2f, spawn em cima do player, PARAR COM AS EXPLOSOES NO SEGUNDO 25
  preload() {
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "../rexvirtualjoystickplugin.min.js",
      true,
    );

    this.load.setPath("assets/");

    this.load.font("stepalange", "stepalange.otf");

    this.load.image("mapf1", "mapf1.png");

    this.load.image("star", "star.png");

    this.load.image("telanave", "telanave.png");

    this.load.spritesheet("bounds", "bounds.png", {
      frameWidth: 1250,
      frameHeight: 850,
    });

    /*this.load.spritesheet("campoast", "campoast.png", {
      frameWidth: 1250,
      frameHeight: 850,
    });*/

    this.load.spritesheet("fuellevel", "fuellevel.png", {
      frameWidth: 800,
      frameHeight: 450,
    });

    /*this.load.spritesheet("asteroideum", "asteroideum.png", {
      frameWidth: 48,
      frameHeight: 48,
    });*/
    this.load.image("asteroideum", "asteroideum.png");

    //this.load.image("startf1", "startf1.png");

    this.load.audio("songf1", "songf1.mp3");

    this.load.audio("explosion", "explosion.mp3");

    this.load.audio("collect", "collect.mp3");

    this.load.spritesheet("combustivel", "combustivel.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    /*this.load.spritesheet("uispritesheet", "uispritesheet.png", {
      frameWidth: 800,
      frameHeight: 450,
    });*/

    this.load.spritesheet("buttonnitro", "buttonnitro.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("asteroideumex", "asteroideumex.png", {
      frameWidth: 96,
      frameHeight: 96,
    });
  }

  create() {
    //this.physics.pause(); // Pausa a física para congelar a cena

    //this.input.once("pointerdown", () => {
    // this.physics.resume();
    // this.startf1.destroy(); // Remove a imagem de início
    // });
    this.add.image(0, 0, "mapf1").setOrigin(0);
    this.add.image(800, 0, "mapf1").setOrigin(0).setFlipX(true);
    this.add.image(0, 450, "mapf1").setOrigin(0).setFlipY(true);
    this.add
      .image(800, 450, "mapf1")
      .setOrigin(0)
      .setFlipX(true)
      .setFlipY(true);

    this.player = this.star = this.physics.add
      .image(800, 450, "star", 0)
      .setSize(32, 22); //SURGE NO MEIO DO MAPA
    //this.star.setScale(2);
    this.player.setCollideWorldBounds(true);

    //this.music = this.sound.add("songf1");
    this.music = this.sound.add("songf1", { loop: true }).play();

    this.cameras.main.startFollow(this.player);

    this.cameras.main.setBounds(0, 0, 800 * 2, 450 * 2);
    this.physics.world.setBounds(400, 225, 800, 450);

    //this.startf1 = this.add.image(800, 450, "startf1");
    //this.uispritesheet = this.physics.add.sprite(800, 450, "uispritesheet", 1);

    this.anims.create({
      key: "bounds_anim",
      frames: this.anims.generateFrameNumbers("bounds", {
        start: 0,
        end: 0,
      }),
      frameRate: 5,
      repeat: -1,
    });

    /*this.anims.create({
      key: "campoast_anim",
      frames: this.anims.generateFrameNumbers("campoast", {
        start: 0,
        end: 0,
      }),
      frameRate: 5,
      repeat: -1,
    });*/


    const bounds_anim = this.add.sprite(800, 450, "bounds").play("bounds_anim");
    this.add.tween({
      targets: bounds_anim,
      scale: 1.05,
      duration: 2000,
      ease: "Linear",
      yoyo: true,
      repeat: -1, 
    });

    
    //this.add.sprite(1250, 850, "campoast").play("campoast_anim");

    // this.add.image(400, 225, "telanave").setScrollFactor(0);

    this.anims.create({
      key: "combustivel_anim",
      frames: this.anims.generateFrameNumbers("combustivel", {
        start: 0,
        end: 3,
      }),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: "asteroideumex_anim",
      frames: this.anims.generateFrameNumbers("asteroideumex", {
        //explosao do asteroideum
        start: 0,
        end: 6,
      }),
      frameRate: 5,
      repeat: 0,
    });

    /*this.anims.create({
      key: "asteroideum_anim",
      frames: this.anims.generateFrameNumbers("asteroideum", {
        start: 0,
        end: 0,
      }),
      frameRate: 5,
      repeat: -1,
    });*/

    /*this.anims.create({
      key: "fuellevel_anim",
      frames: this.anims.generateFrameNumbers("fuellevel", {
        start: 1,
        end: 1,
      }),
      frameRate: 5,
      repeat: -1,
    });*/

    //this.fuellevel = this.add.sprite(400, 225, "fuellevel").setScrollFactor(0);

    /*if (this.fuel <= 10) {
      this.fuellevel.setFrame(0);
    } else if (this.fuel <= 25) {
      this.fuellevel.setFrame(1);
    } else {
      this.fuellevel.setFrame(2);
    }*/

    //0-15 vermelho, 16-25 amarelo, 26+ verde

    this.textLife = this.add
      .text(700, 100, `Life: ${this.life}`, {//600, 50
        fontFamily: "stepalange",
        fontSize: "32px",
        fill: "#ffffff",
      })
      .setScrollFactor(0);

    this.textFuel = this.add
      .text(16, 100, `Fuel: ${this.fuel}`, {//16, 50
        fontFamily: "stepalange",
        fontSize: "32px",
        fill: "#ffffff",
      })
      .setScrollFactor(0);

    this.intervalFuel = setInterval(() => {
      this.fuel -= 1;
      //if(this.nitro) {
      //  this.nitro === false;
      // }
      //else (this.nitro === true);{
      //this.fuel -= 3;
      //}
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
      x: 100,
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

    this.time.addEvent({
      delay: 1000,
      callback: this.spawnCombustivel,
      callbackScope: this,
      loop: true,
    });

    this.asteroidGroup = this.physics.add.group();
    this.physics.add.collider(
      this.player,
      this.asteroidGroup,
      this.hitAsteroid,
      this.processAsteroidCollision,
      this,
    );

    this.combustivelGroup = this.physics.add.group();
    this.physics.add.collider(
      this.player,
      this.combustivelGroup,
      this.hitCombustivel,
      null,
      this,
    );

    this.uiLayer = this.add.layer();
    const telaNave = this.add.image(400, 225, "telanave").setScrollFactor(0);
    this.uiLayer.add(telaNave);
    this.uiLayer.setDepth(1000);

    //this.fuellevel.setDepth(2000);

    this.uiTopLayer = this.add.layer();
    this.uiTopLayer.add(this.textFuel);
    this.uiTopLayer.add(this.textLife);
    this.uiTopLayer.add(this.button);
    this.uiTopLayer.add(this.joystick.base);
    this.uiTopLayer.add(this.joystick.thumb);
    this.uiTopLayer.setDepth(2000);
  } //CHAVE DO CREATE

  hitAsteroid(player, asteroidGroup) {
    this.life -= 1;
    this.textLife.setText(`Life: ${this.life}`);

    //animacao de hit
    this.add.tween({
      targets: this.player,
      alpha: 0,
      duration: 100,
      yoyo: true,
      repeat: 5,
    });

    this.invincible = true;
    this.time.delayedCall(1000, () => {
      this.invincible = false;
    });

    

    //animação de explosão
    this.exp = this.add.sprite(asteroidGroup.x, asteroidGroup.y, "asteroideumex");
    this.sound.play("explosion");
    this.exp.play("asteroideumex_anim");
    asteroidGroup.destroy();

    this.exp.on("animationcomplete", () => {
      this.exp.destroy();
    });

    if (this.life === 0) {
      this.scene.stop();
      clearInterval(this.intervalFuel);
      clearInterval(this.intervalNitro);
      clearInterval(this.intervalTime);
      this.life = 3;
      this.fuel = 20;
      this.tempo = 60;
      this.invincible = false;
      this.scene.start("gameover");
    }
  }

  hitCombustivel(player, combustivelGroup) {
    this.sound.play("collect");
    (combustivelGroup.destroy(true, true),
      (this.fuel += 5),
      this.textFuel.setText(`Fuel: ${this.fuel}`));
  }

  processAsteroidCollision(player, asteroid) {
    return !this.invincible;
  }

  update() {
    //this.mapf1.tilePositionY -= 0.5;
  }

  spawnAsteroid() {
    const maxAsteroids = 10; // Limite de asteroides (maior quando for lancar o jogo)? ou dez ja ta dificil?

    if (this.asteroidGroup.getLength() < maxAsteroids) {
      var x = Phaser.Math.Between(400, 1200);
      var y = Phaser.Math.Between(225, 675);

      while (
        Math.abs(x - this.player.x) < 100 ||
        Math.abs(y - this.player.y) < 100
      ) {
        // Garante que o asteroide não será criado muito próximo do player
        x = Phaser.Math.Between(400, 1200);
        y = Phaser.Math.Between(225, 675);
      }

      const asteroid = this.asteroidGroup.create(x, y, "asteroideum");
      asteroid.setBounce(1);
      asteroid.setSize(30, 30);
      asteroid.setCollideWorldBounds(true);
      asteroid.setVelocity(
        Phaser.Math.Between(-200, 200),
        Phaser.Math.Between(-200, 200),
      );
      this.tweens.add({
        targets: asteroid,
        scale: 1.7,
        duration: 3000,
        ease: "Linear",
      });
    }
  }

  spawnCombustivel() {
    //REFINAR!!!!! NAO SPAWNAR UM EM CIMA DO OUTRO E NEM ONDE ESTA O PLAYER
    const maxCombustivel = 3;

    if (this.combustivelGroup.getLength() < maxCombustivel) {
      var x = Phaser.Math.Between(400, 1200);
      var y = Phaser.Math.Between(225, 675);

      while (
        Math.abs(x - this.player.x) < 100 ||
        Math.abs(y - this.player.y) < 100
      ) {
        // Garante que o combustível não será criado muito próximo do player
        x = Phaser.Math.Between(400, 1200);
        y = Phaser.Math.Between(225, 675);
      }

      const combustivel = this.combustivelGroup.create(x, y, "combustivel");
      combustivel.setCollideWorldBounds(true);
      this.anims.play("combustivel_anim", combustivel);
      combustivel.setSize(50, 50);
      combustivel.setScale(0.3);

      this.tweens.add({
        targets: combustivel,
        scale: 0.7,
        duration: 2000,
        ease: "Linear",
      });
    }
  }
} //CHAVE DA CENA
export default scene0;
