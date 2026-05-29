class sceneMenu extends Phaser.Scene {
  constructor() {
    super("sceneMenu");
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

  

    this.add.sprite(400, 225, "capa_anim").play("capa_anim");

    this.add
      .text(400, 200, "Iniciar", {
        fontFamily: "stepalange",
        fontSize: "48px",
        fill: "#a123cf",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.stop("start");
        this.scene.start("preloader");
      });

    this.add
      .text(410, 270, "Historia", {
        fontFamily: "stepalange",
        fontSize: "48px",
        fill: "#a123cf",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.stop("start");
        this.scene.start("sceneCut");
      });

    this.add
      .text(415, 340, "Creditos", {
        fontFamily: "stepalange",
        fontSize: "48px",
        fill: "#a123cf",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.stop("start");
        this.scene.start("sceneCred");
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

export default sceneMenu;
