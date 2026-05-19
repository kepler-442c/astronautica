class start extends Phaser.Scene {
  constructor() {
    super("start");
  }

   init() {
    let room = new URLSearchParams(location.search).get("room");
    if (room) {
      this.game.room = room
      this.game.socket.emit("join-room", this.game.room);
    };
  }
  preload() { 
    this.load.setPath("assets/");
    this.load.font("stepalange", "stepalange.otf"); 
    this.load.spritesheet("capa", "capa_movimento.png", {
      frameWidth: 800,
      frameHeight: 450,
    }); //trocar fundo depois

  }

  create() {
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

    this.add.text(400, 225, "Clique para iniciar", {
      fontFamily: "stepalange",
      fontSize: "48px",
      fill: "#a123cf",
    }).setOrigin(0.5);

    

    this.input.once("pointerdown", () => {
      this.scene.stop("start");
      this.scene.start("preloader");
    });
  }
}

export default start;