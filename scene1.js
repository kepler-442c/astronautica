export default class scene1 extends Phaser.Scene {
  constructor() {
    super("scene1");

    this.threshold = 0.1;
    this.speed = 300;
    this.direction = undefined;
    this.fuel = 20;
    this.life = 3;
    this.nitro = false;
    this.tempo = 60; //tempo para passar de fase
  }
  //telanave, musica 2f, som de coleta de combustivel, camada texto, nitro
  preload() {
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "../rexvirtualjoystickplugin.min.js",
      true,
    );

    this.load.setPath("assets/");

    this.load.image("mapf1", "mapf1.png");

    this.load.image("mira", "mira.png");

    this.load.image("telanave", "telanave.png");

    this.load.spritesheet("butão", "button.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("Alvo1", "enemigo1.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("arma", "torreta.png", {
      frameWidth: 428,
      frameHeight: 200, //grande para ver animação,
    });

    this.load.audio("laser", "lazer.mp3");

    this.load.spritesheet("acerto", "projeto_acerto.png", {
      frameWidth: 142,
      frameHeight: 112, //grande para ver animação,
    });

    this.load.spritesheet("erro", "projetil_erro.png", {
      frameWidth: 47,
      frameHeight: 47, //grande para ver animação,
    });

    this.load.spritesheet("estrelas", "estrelas_sprite_shit.png", {
      frameWidth: 800,
      frameHeight: 450,
    });
  }
  create() {
    this.physics.pause(); // Pausa a física para congelar a cena

    this.input.once("pointerdown", () => {
      this.physics.resume();
    });
    this.add.image(0, 0, "mapf1").setOrigin(0);

    this.anims.create({
      key: "estrelas_anim",
      frames: this.anims.generateFrameNumbers("estrelas", {
        start: 0,
        end: 14,
      }),
      frameRate: 40,
      repeat: -1,
    });

    this.anims.create({
      key: "alvo",
      frames: this.anims.generateFrameNumbers("Alvo1", {
        frames: [2, 3, 7, 8, 9, 10, 11],
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "alvo_destroy",
      frames: this.anims.generateFrameNumbers("Alvo1", {
        frames: [4, 5, 6],
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.player = this.mira = this.physics.add.image(400, 225, "mira", 0); //SURGE NO MEIO DO MAPA
    this.mira.setScale(0.5);
    this.mira.setSize(36, 36); // Reduz hitbox para metade (32x32 -> 16x16)
    this.player.setCollideWorldBounds(true);

    this.time.addEvent({
      delay: 500,
      callback: this.spawnAlvo,
      callbackScope: this,
      loop: true,
    });

    this.alvoGroup = this.physics.add.group();
    // this.physics.add.collider(
    //   this.player,
    //   this.alvoGroup,
    //   this.hitAlvo,
    //   null,
    //   this,
    // );

    this.anims.create({
      key: "arma_intro",
      frames: [
        { key: "arma", frame: 13 },
        { key: "arma", frame: 0 },
        { key: "arma", frame: 1 },
        { key: "arma", frame: 2 },
        { key: "arma", frame: 3 },
        { key: "arma", frame: 4 },
        { key: "arma", frame: 5 },
        { key: "arma", frame: 6 },
      ],
      frameRate: 1,
      repeat: 0,
    });

    this.anims.create({
      key: "arma_loop",
      frames: this.anims.generateFrameNumbers("arma", {
        start: 6,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "disparo",
      frames: this.anims.generateFrameNumbers("arma", {
        start: 9,
        end: 15,
      }),
      frameRate: 5,
      repeat: 0,
    });

    this.anims.create({
      key: "acerto_anim",
      frames: this.anims.generateFrameNumbers("acerto", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "erro_anim",
      frames: this.anims.generateFrameNumbers("erro", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.estrelas = this.add
      .sprite(0, 0, "estrelas", 0)
      .setOrigin(0)
      .setAlpha(0.5);
    this.estrelas.play("estrelas_anim");

    this.hitFeedback = this.add
      .sprite(400, 225, "acerto", 0)
      .setOrigin(0.5)
      .setScale(2)
      .setDepth(1000)
      .setVisible(false);

    this.errorFeedback = this.add
      .sprite(400, 225, "erro", 0)
      .setOrigin(0.5)
      .setScale(0.5)
      .setDepth(1000)
      .setVisible(false);

    this.hitFeedback.on("animationcomplete-acerto_anim", () => {
      this.hitFeedback.setVisible(false);
    });
    this.errorFeedback.on("animationcomplete-erro_anim", () => {
      this.errorFeedback.setVisible(false);
    });

    this.arma = this.add
      .sprite(400, 450, "arma", 13)
      .setOrigin(0.5, 1)
      .setScale(1);
    this.arma.play("arma_intro");
    this.arma.on("animationcomplete-arma_intro", () => {
      this.arma.play("arma_loop");
    });
    this.arma.on("animationcomplete-disparo", () => {
      this.arma.play("arma_loop");
    });

    this.laserSound = this.sound.add("laser");

    this.fireButton = this.add
      .sprite(780, 430, "butão", 0)
      .setOrigin(1, 1)
      .setScale(1.2)
      .setInteractive()
      .setScrollFactor(0);

    this.fireButton.on("pointerdown", () => {
      this.fireButton.setFrame(1);
      this.laserSound.play();

      const miraBounds = new Phaser.Geom.Rectangle(
        this.mira.x - 8,
        this.mira.y - 8,
        16,
        16,
      );

      const hitAlvo = this.alvoGroup.getChildren().find((alvo) => {
        const scale = alvo.scale;
        const halfWidth = (48 * scale) / 2;
        const alvoBounds = new Phaser.Geom.Rectangle(
          alvo.x - halfWidth,
          alvo.y - halfWidth,
          48 * scale,
          48 * scale,
        );
        return Phaser.Geom.Intersects.RectangleToRectangle(
          alvoBounds,
          miraBounds,
        );
      });

      if (hitAlvo) {
        this.hitFeedback
          .setPosition(this.mira.x, this.mira.y)
          .setVisible(true)
          .play("acerto_anim");
        hitAlvo.play("alvo_destroy");
        hitAlvo.on("animationcomplete-alvo_destroy", () => {
          hitAlvo.destroy();
        });
      } else {
        this.errorFeedback
          .setPosition(this.mira.x, this.mira.y)
          .setVisible(true)
          .play("erro_anim");
      }

      this.arma.play("disparo");
    });

    this.fireButton.on("pointerup", () => {
      this.fireButton.setFrame(0);
    });

    this.fireButton.on("pointerout", () => {
      this.fireButton.setFrame(0);
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
        this.mira.setVelocity(
          this.direction.x * this.speed,
          this.direction.y * this.speed,
        );
      } else {
        this.mira.setVelocity(0, 0);
      }
    });
  }
  spawnAlvo() {
    const maxAlvo = 5; // Limite de asteroides (maior quando for lancar o jogo)

    if (this.alvoGroup.getLength() < maxAlvo) {
      const x = Phaser.Math.Between(0, 800);
      const y = Phaser.Math.Between(0, 450);

      const alvo = this.alvoGroup.create(x, y, "Alvo1");
      alvo.setBounce(1);
      alvo.setSize(48, 48);
      alvo.setCollideWorldBounds(true);
      alvo.play("alvo");
      alvo.setVelocity(
        Phaser.Math.Between(-200, 200),
        Phaser.Math.Between(-200, 200),
      );
      this.tweens.add({
        targets: alvo,
        scale: 2,
        duration: 2000,
        ease: 'Linear'
      });
    }
  }
}
