class preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  init() {
    this.add.sprite(400, 225, "capa_anim").play("capa_anim").postFX.addBlur(5);

    this.add.rectangle(400, 300, 468, 32).setStrokeStyle(1, 0xffffff);
    const bar = this.add.rectangle(400 - 230, 300, 4, 28, 0xffffff);

    this.load.on("progress", (progress) => {
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "../js/rexvirtualjoystickplugin.min.js",
      true,
    );

    this.load.setPath("assets/");


    //menu
     this.load.image("atirador", "botao_atirador.png");
     this.load.image("piloto", "botao_piloto.png");
     this.load.image("cutscene", "botao_cutscene.png");


    this.load.image("et1", "enemigo1.png");

    this.load.spritesheet("capa", "capa_movimento.png", {
      frameWidth: 800,
      frameHeight: 450,
    });
     
    //fase1 nave
    this.load.image("mapf1", "mapf1.png");

    this.load.image("star", "star.png");

    this.load.image("telanave", "telanave.png");

    this.load.spritesheet("bounds", "bounds.png", {
      frameWidth: 1250,
      frameHeight: 850,
    });

    this.load.image("asteroideum", "asteroideum.png");

    this.load.audio("songf1", "songf1.mp3");

    this.load.audio("explosion", "explosion.mp3");

    this.load.audio("collect", "collect.mp3");

    this.load.spritesheet("combustivel", "combustivel.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("combustivel_azul", "combustivel_azul.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("estrelasvindo", "estrelas_vindo.png", {
      frameWidth: 800,
      frameHeight: 450,
    });

    this.load.spritesheet("buttonnitro", "buttonnitro.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("asteroideumex", "asteroideumex.png", {
      frameWidth: 96,
      frameHeight: 96,
    });

    //fase1 tiro
    this.load.image("mira", "mira.png");

    this.load.image("telanave2", "telanave_atirador.png");

    this.load.font("stepalange", "stepalange.otf");
    this.load.font("news-gothic-bold", "news-gothic-bold.otf");

    this.load.spritesheet("butão", "button.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("Alvo1", "enemigo1.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("arma", "torreta.png", {
      frameWidth: 428,
      frameHeight: 200, //grande para ver animação,
    });

    this.load.audio("musica", "atirador_f1.mp3");

    this.load.audio("laser", "lazer.mp3");

    this.load.spritesheet("acerto", "projeto_acerto.png", {
      frameWidth: 142,
      frameHeight: 112, //grande para ver animação,
    });

    this.load.spritesheet("erro", "projetil_erro.png", {
      frameWidth: 47,
      frameHeight: 47, //grande para ver animação,
    });

    this.load.spritesheet("estrelas", "estrelas_sprite_shit.png", {
      frameWidth: 800,
      frameHeight: 450,
    });

    //fase2 nave
    this.load.spritesheet("mapf2", "fase_2.png", {
      frameWidth: 800,//1000
      frameHeight: 450,//900
    });

    this.load.spritesheet("combustivel_azul", "combustivel_azul.png", {
     frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("acid", "acid.png", {
     frameWidth: 128,
     frameHeight: 128,
    });

    this.load.spritesheet("acidex", "acidoexplosao.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
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



    this.scene.stop("preloader");
    if (this.game.room) {
      this.scene.start("player");
    } else {
      this.scene.start("room");
    }
  }
  
}


export default preloader;
