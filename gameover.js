class gameover extends Phaser.Scene {
  constructor() {
    super("gameover");
  } //o problema que aparece vem da cena0, que tenta ainda spwanar combustivel e asteroides. nao sei como resolver

  preload() {
    this.load.setPath("assets/");

    this.load.image("gameoverimg", "gameoverr.png");
  }

  create() {
    /*this.add.image(400, 300, "gameoverimg");
    this.on.pointerdown = () => { 
      this.scene.start("sceneMenu");
    };*/

    this.add.rectangle(400, 225, 800, 450, 0x000000);
    this.button = this.add
      .image(400, 225, "gameoverimg", 0)
      .setScrollFactor(0)

      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("sceneMenu");
      });
  } //CHAVE DO CREATE

  upload() {}
}

export default gameover;
