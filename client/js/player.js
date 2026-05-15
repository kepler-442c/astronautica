class player extends Phaser.Scene {
  constructor() {
    super("player");
  }

  create() {
    this.add.image(400, 225, "mapf1").postFX.addBlur(5);//trocar fundo depois

    this.add
      .text(400, 50, "Escolha seu personagem:", {
        fontFamily: "stepalange",
        fontSize: "64px",
        fill: "#ffffff",
      })
      .setOrigin(0.5);

    

    
    this.piloto = this.add
      .image(300, 225, "piloto")
      .setScale(3)
      .setInteractive()
      .on("pointerdown", () => {
        console.log("Piloto player selected");
        this.game.localPlayer = "piloto";
        this.game.socket.emit(
          "select-player",
          this.game.room,
          this.game.localPlayer,
        );
        this.scene.stop("player");
        this.scene.start("scene0");
      });
    //this.piloto.play("piloto");

    this.atirador = this.add
      .image(550, 225, "atirador")
      .setScale(3)
      .setInteractive()
      .on("pointerdown", () => {
        console.log("Atirador player selected");
        this.game.localPlayer = "atirador";
        this.game.socket.emit(
          "select-player",
          this.game.room,
          this.game.localPlayer,
        );
        this.scene.stop("player");
        this.scene.start("scene1");
      });

    
    //this.atirador.play("atirador");
  }
}

export default player;
