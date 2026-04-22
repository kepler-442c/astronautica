export default class SceneMenu extends Phaser.Scene {
  constructor() {
    super("sceneMenu");
  }

  preload() {
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "../rexvirtualjoystickplugin.min.js",
      true,
    );
    this.load.setPath("assets/");
    //Menu
    this.load.image("atirador", "botao_atirador.png");
    this.load.image("piloto", "botao_piloto.png");
    this.load.image("cutscene", "botao_cutscene.png");
    this.load.image("borda", "borda_menu.png");

    this.load.image("fundo", "fundo.png");

    //scene0
    this.load.image("mapf1", "mapf1.png");
    this.load.image("star", "star.png");
    this.load.image("asteroideum", "asteroideum.png");
    this.load.image("startf1", "startf1.png");
    this.load.image("et1", "enemigo1.png");

    this.load.spritesheet("estrelas", "estrelas_sprite_shit.png", {
      frameWidth: 800,
      frameHeight: 450,
    });

    this.load.spritesheet("combustivel", "combustivel.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("uispritesheet", "uispritesheet.png", {
      frameWidth: 800,
      frameHeight: 450,
    });

    this.load.spritesheet("button", "button.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  // //Ende Game
  // this.load.image("botao_Voltar", "assets/voltar.png");

  create() {
    this.add.image(0, 0, "fundo").setOrigin(0, 0);

    // this.estrelas = this.physics.add.sprite(400,225,'estrelas',4);

    //Animações
    // this.anims.create({
    //     key: "rotate-estrelas",
    //     frames: this.anims.generateFrameNumbers("estrelas", {start:0,end:14}),
    //     frameRate: 10,
    //     repeat: -1
    // });

    // this.estrelas.play("rotate-estrelas");

    this.add.image(0, 0, "borda").setOrigin(0, 0);

    this.textTitulo = this.add.text(100, 50, `Astronautica: Beta`, {
      fontSize: "32px",
      fill: "#ffffff",
    });

    this.textTitulo.setScrollFactor(0);

    let btnPlay = this.add.image(100, 280, "piloto").setOrigin(0, 0);
    btnPlay.setScale(3); // diminui para 50% do tamanho original
    btnPlay.setInteractive();

    //Adicionar o clique do botao
    btnPlay.on("pointerdown", () => this.scene.start("scene0"));

    let btnAtirador = this.add.image(300, 280, "atirador").setOrigin(0, 0);
    btnAtirador.setScale(3); // diminui para 50% do tamanho original
    btnAtirador.setInteractive();

    //Adicionar o clique do botao
    btnAtirador.on("pointerdown", () => this.scene.start("scene1"));

    let btnCutscene = this.add.image(570, 10, "cutscene").setOrigin(0, 0);
    btnCutscene.setScale(3);
    btnCutscene.setInteractive();

    //Adicionar o clique do botao
    btnCutscene.on("pointerdown", () => this.scene.start("sceneCut"));
  }
}
