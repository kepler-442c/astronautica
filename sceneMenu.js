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
    this.load.image("borda", "borda_menu.png");
    this.load.image("fundo", "fundo.png");
    this.load.audio("som", "lazer.mp3");


    //scene0
    this.load.image("mapf1", "mapf1.png");
    this.load.image("star", "star.png");
    this.load.image("asteroideum", "asteroideum.png");
    this.load.image("startf1", "startf1.png");
    this.load.audio("songf1", "songf1.mp3");
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
    this.anims.create({
      frames: this.anims.generateFrameNumbers("estrelas", { start: 0, end: 14 }),
      frameRate: 24,
      repeat: -1
    });

    this.add.image(0, 0, "fundo").setOrigin(0, 0);
    let btnPlay = this.add.image(320, 230, "piloto").setOrigin(0, 0);
    btnPlay.setInteractive();

    //Adicionar o clique do botao
    btnPlay.on("pointerdown", () => this.scene.start("scene0"));
  }
}
