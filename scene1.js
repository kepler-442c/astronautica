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

    this.load.spritesheet("button", "button.png", {
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
        start: 0,
        end: 14,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.player = this.mira = this.physics.add.image(400, 225, "mira", 0); //SURGE NO MEIO DO MAPA
    this.mira.setScale(0.5);
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

    this.estrelas = this.add
      .sprite(0, 0, "estrelas", 0)
      .setOrigin(0)
      .setAlpha(0.5);
    this.estrelas.play("estrelas_anim");

    this.arma = this.add
      .sprite(400, 450, "arma", 13)
      .setOrigin(0.5, 1)
      .setScale(1);
    this.arma.play("arma_intro");
    this.arma.on("animationcomplete-arma_intro", () => {
      this.arma.play("arma_loop");
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
  spawnAlvo(){
    const maxAlvo = 5; // Limite de asteroides (maior quando for lancar o jogo)

    if (this.alvoGroup.getLength() < maxAlvo) {
      const x = Phaser.Math.Between(0, 800);
      const y = Phaser.Math.Between(0, 450);

      const alvo = this.alvoGroup.create(x, y, "Alvo1");
      alvo.setBounce(1);
      alvo.setSize(48, 48);
      alvo.setCollideWorldBounds(true);
      alvo.setVelocity(
        Phaser.Math.Between(-200, 200),
        Phaser.Math.Between(-200, 200),
      );
    }
  }

}
