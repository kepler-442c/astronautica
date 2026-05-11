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


    //scene0
    this.load.image("mapf1", "mapf1.png");
    this.load.image("star", "star.png");
    this.load.image("asteroideum", "asteroideum.png");
    this.load.image("et1", "enemigo1.png");

    this.load.spritesheet("capa", "capa_movimento.png", {
      frameWidth: 800,
      frameHeight: 450,
    });

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
      key: "capa_anim",
      frames: this.anims.generateFrameNumbers("capa", {
        start: 0,
        end: 7,
      }),
      frameRate: 4,
      repeat: -1,
    });

    // Fundo deslizante
    this.fundo1 = this.add.image(0, 0, "mapf1").setOrigin(0, 0);
    this.fundo2 = this.add.image(800, 0, "mapf1").setOrigin(0, 0);
    this.fundoSpeed = 1; // Velocidade do deslizamento

    this.capa = this.add
      .sprite(0, 0, "capa", 0)
      .setOrigin(0)
    this.capa.play("capa_anim");



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

    let btnCutscene = this.add.image(600, 280, "cutscene").setOrigin(0, 0);
    btnCutscene.setScale(3);
    btnCutscene.setInteractive();

    //Adicionar o clique do botao
    btnCutscene.on("pointerdown", () => this.scene.start("sceneCut"));
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
