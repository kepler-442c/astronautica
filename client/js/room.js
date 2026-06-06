class room extends Phaser.Scene {
  constructor() {
    super("room");
    this.qrcodeContainer = document.getElementById("qr-code");
  }

  create() {
    this.add.rectangle(400, 225, 800, 450, 0xffffff, 0.8);
    this.game.room = (Math.random() * 10000).toString().split(".")[0];
    this.add.text(100, 150, this.game.room, {
      fontFamily: "stepalange",
      fontSize: "32px",
      fill: "#a123c7",
    });

    new QRCode(this.qrcodeContainer, {
      text: location.href + "?room=" + this.game.room,
      width: 450,
      height: 450,
      colorDark: "#a123c7",
      colorLight: "#ffffff",
    });

    console.log("Joining room:", this.game.room);
    this.game.socket.emit("join-room", this.game.room);

    this.game.socket.on("player-selected", (player) => {
      console.log(
        "Player selected in room:",
        this.game.room,
        "player:",
        player,
      );

      if (player === "piloto") {
        this.game.localPlayer = "atirador";
        this.scene.stop("room");
        this.scene.start("scene1");
      } else {
        this.game.localPlayer = "piloto";
        this.scene.stop("room");
        this.scene.start("scene0");
      }

      this.qrcodeContainer.remove();

      this.scene.stop("room");
      
     
      });

    
    
  }

    
}


export default room;