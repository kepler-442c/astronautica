class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.threshold = 0.1;
    this.speed = 100;
    this.direction = undefined;
    this.fuel = 20;
    this.life = 3;
    this.nitro = false;
    this.tempo = 60; //tempo para passar de fase
  }
  //telanave, musica 2f, som de coleta de combustivel, camada texto, nitro
  preload() {
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "../rexvirtualjoystickplugin.min.js",
      true,
    );

    this.load.setPath("assets/");

    this.load.image("mapf1", "mapf1.png");

    this.load.image("nave", "ui.png");

    this.load.spritesheet("Alvo1", "perseguidor1.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    this.load.spritesheet("arma", "torreta.png", {
      frameWidth: 428,
      frameHeight: 200,  //grande para ver animação,
    });

    this.load.spritesheet("estrelas", "uispritesheet.png", {
      frameWidth: 800,
      frameHeight: 450,
    });