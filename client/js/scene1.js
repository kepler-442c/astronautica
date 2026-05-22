export default class scene1 extends Phaser.Scene {
  constructor() {
    super("scene1");

    this.threshold = 0.1;
    this.speed = 300;
    this.direction = undefined;
    this.fuel = 20;
    this.life2 = 5;
    this.nitro = false;
    this.tempo = 60; //tempo para passar de fase
    this.morreu2 = false;
  }

  create() {
    this.music = this.sound.add("musica", { loop: true });
    this.music.play();

    this.add.image(0, 0, "mapf1").setOrigin(0);

    this.anims.create({
      key: "alvo",
      frames: this.anims.generateFrameNumbers("Alvo1", {
        frames: [4, 5, 9, 10, 11, 12, 13],
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "alvo_destroy",
      frames: this.anims.generateFrameNumbers("Alvo1", {
        frames: [6, 7, 8],
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "alvo_dano",
      frames: this.anims.generateFrameNumbers("Alvo1", {
        frames: [0, 1, 2],
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.player = this.mira = this.physics.add.image(400, 225, "mira", 0); //SURGE NO MEIO DO MAPA
    this.mira.setScale(0.5);
    this.mira.setSize(36, 36);
    this.mira.setDepth(2000); // Reduz hitbox para metade (32x32 -> 16x16)
    this.player.setCollideWorldBounds(true);

    this.time.addEvent({
      delay: 500,
      callback: this.spawnAlvo,
      callbackScope: this,
      loop: true,
    });

    this.alvoGroup = this.physics.add.group();

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

    this.textLife = this.add
      .text(670, 100, `Life: ${this.life2}`, {
        //600, 50
        fontFamily: "stepalange",
        fontSize: "36px",
        fill: "#ffffff",
      })
      .setScrollFactor(0)
      .setDepth(2000);

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
      .setDepth(2000)
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
      .sprite(640, 340, "butão", 0)
      .setOrigin(1, 1)
      .setScale(3)
      .setInteractive()
      .setScrollFactor(0)
      .setDepth(2000);

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
          if (hitAlvo.damageTimer) {
            hitAlvo.damageTimer.remove();
          }
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
      x: 200,
      y: 330,
      radius: 50,
      base: this.add.circle(0, 0, 50, 0x888888).setDepth(2000),
      thumb: this.add.circle(0, 0, 25, 0xcccccc).setDepth(2000),
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

    this.uiLayer = this.add.layer();
    const telanave2 = this.add.image(400, 225, "telanave2").setScrollFactor(0);
    this.uiLayer.add(telanave2);
    this.uiLayer.setDepth(1500);

    this.damageLayer = this.add.layer().setDepth(1499);

    this.textPilotLife = this.add
      .text(600, 50, `Pilot Life: ${this.life}`, {
        //600, 50
        fontFamily: "stepalange",
        fontSize: "36px",
        fill: "#ffffff",
      })
      .setScrollFactor(0)
      .setDepth(2000);

    this.game.socket.on("scene0", (state) => {
      this.life = state.player.life;
      this.textPilotLife.setText(`Pilot Life: ${this.life}`);

      this.morreu = state.player.morreu;
      if (this.morreu) {
        this.scene.stop();
        this.scene.start("gameover");
      }
    });
  } // CHAVE DO CREATE

  update() {
    this.game.socket.emit("scene1", this.game.room, {
      player: {
        id: this.game.socket.id,
        life2: this.life2,
        morreu2: this.morreu2,
      },
    });
  }

  addDamageFrames() {
    const frameNames = this.textures
      .get("dano_atirador")
      .getFrameNames()
      .filter((name) => name !== "__BASE");

    if (frameNames.length === 0) {
      return;
    }

    const positions = [];
    const minDistance = 100;
    const maxAttempts = 50;

    while (positions.length < 3) {
      let attempt = 0;
      let candidate;

      do {
        candidate = {
          x: Phaser.Math.Between(0, 800),
          y: Phaser.Math.Between(0, 450),
        };
        attempt += 1;
      } while (
        attempt < maxAttempts &&
        positions.some(
          (pos) =>
            Phaser.Math.Distance.Between(
              pos.x,
              pos.y,
              candidate.x,
              candidate.y,
            ) < minDistance,
        )
      );

      if (
        positions.every(
          (pos) =>
            Phaser.Math.Distance.Between(
              pos.x,
              pos.y,
              candidate.x,
              candidate.y,
            ) >= minDistance,
        )
      ) {
        positions.push(candidate);
      } else {
        // fallback: allow the position if we couldn't find one far enough
        positions.push(candidate);
      }
    }

    positions.forEach((pos) => {
      const frameName = Phaser.Math.RND.pick(frameNames);
      const damageSprite = this.add
        .sprite(pos.x, pos.y, "dano_atirador", frameName)
        .setScrollFactor(0)
        .setDepth(1499)
        .setScale(1)
        .setAlpha(1);

      this.damageLayer.add(damageSprite);

      this.tweens.add({
        targets: damageSprite,
        alpha: 0,
        duration: 3000,
        ease: "Linear",
        onComplete: () => damageSprite.destroy(),
      });
    });
  }

  spawnAlvo() {
    const maxAlvo = 1; // Limite de asteroides (maior quando for lancar o jogo)

    if (this.alvoGroup.getLength() < maxAlvo) {
      const x = Phaser.Math.Between(0, 800);
      const y = Phaser.Math.Between(0, 450);

      const alvo = this.alvoGroup.create(x, y, "Alvo1");
      alvo.setBounce(1.01);
      alvo.setSize(48, 48);
      alvo.setCollideWorldBounds(true);
      alvo.setDrag(0);
      alvo.play("alvo");
      alvo.setDepth(1000);
      alvo.setVelocity(
        Phaser.Math.Between(-200, 200),
        Phaser.Math.Between(-200, 200),
      );
      this.tweens.add({
        targets: alvo,
        scale: 2,
        duration: 2000,
        ease: "Linear",
        onComplete: () => {
          alvo.play("alvo_dano");
          alvo.damageTimer = this.time.addEvent({
            delay: 2100, //diminuir antes de lançar
            callback: () => {
              if (alvo.active && alvo.anims.currentAnim?.key === "alvo_dano") {
                this.life2 -= 1;
                this.textLife.setText(`Life: ${this.life2}`);
                this.addDamageFrames();
                if (this.life2 === 0) {
                  this.scene.stop();
                  this.life2 = 5;
                  this.morreu2 = true;
                  this.scene.stop();
                  this.scene.start("gameover");
                }
              }
            },
            callbackScope: this,
            loop: true,
          });
        },
      });
    }
  }
}
