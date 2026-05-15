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
    this.load.image("mapf1", "mapf1.png"); //trocar fundo depois

  }

  create() {

    this.add.image(400, 225, "mapf1");

    this.add.text(400, 225, "Clique para iniciar", {
      fontFamily: "stepalange",
      fontSize: "32px",
      fill: "#fff",
    }).setOrigin(0.5);

    

    this.input.once("pointerdown", () => {
      this.scene.stop("start");
      this.scene.start("preloader");
    });
  }
}

export default start;