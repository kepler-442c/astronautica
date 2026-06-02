class start extends Phaser.Scene {
  constructor() {
    super("start");
  }

  init() {
    let room = new URLSearchParams(location.search).get("room");
    if (room) {
      this.game.room = room;
      this.game.socket.emit("join-room", this.game.room);
    }
  }
  preload() {
    this.load.setPath("assets/");
    this.load.image("mapf1", "mapf1.png");
    this.load.font("stepalange", "stepalange.otf");
    this.load.spritesheet("capa", "capa_movimento.png", {
      frameWidth: 800,
      frameHeight: 450,
    }); //trocar fundo depois
  }

  create() {
    this.fundo1 = this.add.image(0, 0, "mapf1").setOrigin(0, 0);
    this.fundo2 = this.add.image(800, 0, "mapf1").setOrigin(0, 0);
    this.fundoSpeed = 1;

    this.anims.create({
      key: "capa_anim",
      frames: this.anims.generateFrameNumbers("capa", {
        start: 0,
        end: 7,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.add.sprite(400, 225, "capa_anim").play("capa_anim");

    this.add
      .text(400, 200, "Clique para iniciar", {
        fontFamily: "stepalange",
        fontSize: "48px",
        fill: "#a123cf",
        stroke: "#fffcfc", // Cor do contorno
        strokeThickness: 4,
      })
      .setOrigin(0.5);

      this.input.on("pointerdown", () => {
      this.scene.stop("start");
      this.scene.start("sceneMenu");
    });
  }

  update(delta) {
    // Mover fundos para a esquerda
    this.fundo1.x -= this.fundoSpeed;
    this.fundo2.x -= this.fundoSpeed;

    // Quando fundo1 sai da tela pela esquerda, reposiciona à direita
    if (this.fundo1.x <= -800) {
      this.fundo1.x = this.fundo2.x + 800;
    }

    // Quando fundo2 sai da tela pela esquerda, reposiciona à direita
    if (this.fundo2.x <= -800) {
      this.fundo2.x = this.fundo1.x + 800;
    }
  }
}

export default start;