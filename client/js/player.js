class player extends Phaser.Scene {
  constructor() {
    super("player");
  }

  create() {
    this.fundo1 = this.add.image(0, 0, "mapf1").setOrigin(0, 0);
    this.fundo2 = this.add.image(800, 0, "mapf1").setOrigin(0, 0);
    this.fundoSpeed = 1;

    this.add.sprite(400, 225, "capa_anim").play("capa_anim").postFX.addBlur(5);

    this.add
      .text(400, 120, "Escolha seu personagem:", {
        fontFamily: "stepalange",
        fontSize: "64px",
        fill: "#ffffff",
      })
      .setOrigin(0.5);
    
    this.piloto = this.add.image(335, 191, "piloto").setScale(3);
    this.atirador = this.add.image(464, 191, "atirador").setScale(3);
    this.livro = this.add
      .image(700, 50, "cutscene").setScale(1.6)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.stop("player")
        this.scene.start("sceneCut")
      });//colocar na cena start?

    this.avatar_piloto = this.add
      .image(303, 319, "avatar_piloto")
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

    this.avatar_atirador = this.add
      .image(496, 319, "avatar_atirador")
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

    //this.avatar_atirador.play("avatar_atirador");
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

export default player;
