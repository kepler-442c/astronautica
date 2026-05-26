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
  //SEPARAR ANIMACAO ACID E ACIDEXP? MELHORAR ESCALAS, encontrar songf2
  //npm install - npm run dev

  /* preload() {
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

    this.load.spritesheet("combustivel_azul", "combustivel_azul.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("acid", "acid.png", {
      frameWidth: 128,
      frameHeight: 128,
    });

    this.load.spritesheet("acidex", "acidoexplosao.png", {
      frameWidth: 128,
      frameHeight: 128,
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
  }*/

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
      key: "combustivel_azul_anim",
      frames: this.anims.generateFrameNumbers("combustivel_azul", {
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
        end: 9,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.acidex = this.anims.create({
      key: "acidex_anim",
      frames: this.anims.generateFrameNumbers("acidex", {
        start: 0,
        end: 6,
      }),
      frameRate: 7,
      repeat: 0,
    });

    this.anims.create({
      key: "purpleheart_anim",
      frames: this.anims.generateFrameNumbers("purpleheart", {
        start: 0,
        end: 0,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.music = this.sound.add("songf1", { loop: true });
    this.music.play();

    this.events.once("shutdown", () => {
      if (this.music && this.music.isPlaying) {
        this.music.stop();
      }
    });

    this.add
      .sprite(0, 0, "mapf2")
      .setOrigin(0)
      .play("mapf2_anim") //mapf2 NECESSITA ser 1600x900 p esse código funcionar
      .setScrollFactor(0.8);

    this.player = this.star = this.physics.add
      .image(830, 450, "star", 0)
      .setSize(48, 22);
    this.star.setScale(0.8);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(2000);

    this.cameras.main.startFollow(this.player);

    this.cameras.main.setBounds(0, 0, 800 * 2, 450 * 2);
    this.physics.world.setBounds(400, 225, 800, 450);

    this.bounds2 = this.add.image(800, 450, "f2bounds").setScale(1.05);
    this.physics.add.existing(this.bounds2, true);

    this.telaNave = this.add
      .image(400, 225, "telanave")
      .setScrollFactor(0)
      .setDepth(3000);

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
      base: this.add.circle(0, 0, 50, 0x888888).setDepth(3000),
      thumb: this.add.circle(0, 0, 25, 0xcccccc).setDepth(3000),
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
      .setScrollFactor(0)
      .setDepth(3000);

    this.textFuel = this.add
      .text(16, 100, `Fuel: ${this.fuel}`, {
        //16, 50
        fontFamily: "stepalange",
        fontSize: "36px",
        fill: "#ffffff",
      })
      .setScrollFactor(0)
      .setDepth(3000);

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
        this.scene.start("scenefinal");//cena final
      }
    }, 1000);

    this.time.addEvent({
      delay: 1000,
      callback: this.spawnCombustivel_azul,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 6000,
      callback: this.despawnCombustivel_azul,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.spawnAcid,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 6000,
      callback: this.despawnAcid,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 29000,
      callback: this.spawnPurpleHeart,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 35000,
      callback: this.despawnPurpleHeart,
      callbackScope: this,
      loop: true,
    });

    this.combustivel_azulGroup = this.physics.add.group();
    this.physics.add.collider(
      this.player,
      this.combustivel_azulGroup,
      this.hitCombustivel_azul,
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

    this.purpleHeartGroup = this.physics.add.group();
    this.physics.add.collider(
      this.player,
      this.purpleHeartGroup,
      this.hitPurpleHeart,
      null,
      this,
    );
  } //CHAVE DO CREATE

  despawnCombustivel_azul() {
    const combustivel_azul = this.combustivel_azulGroup.getFirstAlive();
    if (combustivel_azul) {
      this.tweens.add({
        targets: combustivel_azul,
        scale: 0.3,
        duration: 2000,
        ease: "Linear",
        onComplete: () => {
          combustivel_azul.destroy();
        },
      });
    }
  }

  despawnAcid() {
    const acid = this.acidGroup.getFirstAlive();
    if (acid) {
      this.tweens.add({
        targets: acid,
        scale: 0.4,
        duration: 5000,
        ease: "Linear",
        onComplete: () => {
          acid.destroy();
        },
      });
    }
  }

  despawnPurpleHeart() {
    const purpleHeart = this.purpleHeartGroup.getFirstAlive();
    if (purpleHeart) {
      this.tweens.add({
        targets: purpleHeart,
        scale: 0.3,
        duration: 3000,
        ease: "Linear",
        onComplete: () => {
          purpleHeart.destroy();
        },
      });
    } // Destrói o primeiro coração roxo ativo, se existir
  }

  hitCombustivel_azul(player, combustivel_azulGroup) {
    this.sound.play("collect");
    (combustivel_azulGroup.destroy(true, true),
      (this.fuel += 5),
      this.textFuel.setText(`Fuel: ${this.fuel}`));
  }

  hitPurpleHeart(player, purpleHeartGroup) {
    this.sound.play("collect");
    (purpleHeartGroup.destroy(true, true),
      (this.life += 1),
      this.textLife.setText(`Life: ${this.life}`));
  }

  hitAcid(player, acidGroup) {
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
    this.exp = this.add
      .sprite(acidGroup.x, acidGroup.y, "acidex")
      .setScale(acidGroup.scaleX, acidGroup.scaleY);
    this.sound.play("explosion");
    this.exp.play("acidex_anim");
    acidGroup.destroy();

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
      this.morreu = true;
      this.scene.start("gameover");
    }
  }

  processAcidCollision(player, acid) {
    return !this.invincible;
  }

  update() {}

  spawnCombustivel_azul() {
    //REFINAR!!!!! NAO SPAWNAR UM EM CIMA DO OUTRO E NEM ONDE ESTA O PLAYER
    const maxCombustivel_azul = 3;

    if (this.combustivel_azulGroup.getLength() < maxCombustivel_azul) {
      var x = Phaser.Math.Between(0, 800);
      var y = Phaser.Math.Between(0, 450);

      while (
        Math.abs(x - this.player.x) < 100 ||
        Math.abs(y - this.player.y) < 100 ||
        Math.abs(x - this.combustivel_azulGroup.x) < 100 ||
        Math.abs(y - this.combustivel_azulGroup.y) < 100
      ) {
        // Garante que o combustível não será criado muito próximo do player
        x = Phaser.Math.Between(0, 800);
        y = Phaser.Math.Between(0, 450);
      }

      const combustivel_azul = this.combustivel_azulGroup.create(
        x,
        y,
        "combustivel_azul",
      );
      combustivel_azul.setCollideWorldBounds(true);
      this.anims.play("combustivel_azul_anim", combustivel_azul);
      combustivel_azul.setSize(50, 50);
      combustivel_azul.setScale(0.3);
      combustivel_azul.setDepth(2000);

      this.tweens.add({
        targets: combustivel_azul,
        scale: 0.8,
        duration: 6000,
        ease: "Linear",
      });
    }
  }

  spawnAcid() {
    const maxAcids = 10;

    if (this.acidGroup.getLength() < maxAcids) {
      var x = Phaser.Math.Between(400, 1200);
      var y = Phaser.Math.Between(225, 675);

      while (
        Math.abs(x - this.player.x) < 100 ||
        Math.abs(y - this.player.y) < 100
      ) {
        // Garante que o acide não será criado muito próximo do player
        x = Phaser.Math.Between(400, 1200);
        y = Phaser.Math.Between(225, 675);
      }

      const acid = this.acidGroup.create(x, y, "acid");
      acid.setBounce(1);
      acid.setSize(30, 30);
      acid.setScale(0.5);
      this.anims.play("acid_anim", acid);
      acid.setCollideWorldBounds(true);
      acid.setDepth(2000);
      acid.setVelocity(
        Phaser.Math.Between(-200, 200),
        Phaser.Math.Between(-200, 200),
      );
      this.tweens.add({
        targets: acid,
        scale: 1,
        duration: 3000,
        ease: "Linear",
      });
    }
  }

  spawnPurpleHeart() {
    //REFINAR!!!!! NAO SPAWNAR UM EM CIMA DO OUTRO E NEM ONDE ESTA O PLAYER
    const maxPurpleHearts = 1;

    if (this.purpleHeartGroup.getLength() < maxPurpleHearts) {
      var x = Phaser.Math.Between(400, 1200);
      var y = Phaser.Math.Between(225, 675);

      while (
        Math.abs(x - this.player.x) < 100 ||
        Math.abs(y - this.player.y) < 100 ||
        Math.abs(x - this.purpleHeartGroup.x) < 100 ||
        Math.abs(y - this.purpleHeartGroup.y) < 100
      ) {
        // Garante que o coração roxo não será criado muito próximo do player
        x = Phaser.Math.Between(400, 1200);
        y = Phaser.Math.Between(225, 675);
      }

      const purpleHeart = this.purpleHeartGroup.create(x, y, "purpleHeart");
      purpleHeart.setCollideWorldBounds(true);
      this.anims.play("purpleheart_anim", purpleHeart);
      purpleHeart.setSize(50, 50);
      purpleHeart.setScale(0.3);
      purpleHeart.setDepth(1000);

      this.tweens.add({
        targets: purpleHeart,
        scale: 0.8,
        duration: 6000,
        ease: "Linear",
      });
    }
  }
}

export default scene2;