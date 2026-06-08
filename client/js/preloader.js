class preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  init() {
    this.add.image(400, 225, "mapf1").setOrigin(0.5, 0.5).postFX.addBlur(5);
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

    this.load.image("fundo", "fundo.png");

    this.load.spritesheet("andromedano", "enemigo1.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    
    this.load.spritesheet("explode", "Explosion.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.font("news-gothic-bold", "news-gothic-bold.otf");


    //menu
     this.load.image("atirador", "botao_atirador.png");
     this.load.image("piloto", "botao_piloto.png");
    this.load.image("cutscene", "botao_cutscene.png");
    this.load.image("avatar_atirador", "atirador_menu.png");
    this.load.image("avatar_piloto", "piloto_menu.png");


    this.load.image("et1", "enemigo1.png");

    this.load.spritesheet("capa", "capa_movimento.png", {
      frameWidth: 800,
      frameHeight: 450,
    });


    


    //jumpscare
   
    this.load.spritesheet("jumpscare1", "jumpscare1.png", {
      frameWidth: 800,
      frameHeight: 450,
    });
    this.load.spritesheet("jumpscare2", "jumpscare2.png", {
      frameWidth: 800,
      frameHeight: 450,
    });
    this.load.spritesheet("jumpscare3", "jumpscare3.png", {
      frameWidth: 800,
      frameHeight: 450,
    });
    this.load.spritesheet("jumpscare4", "jumpscare4.png", {
      frameWidth: 800,
      frameHeight: 450,
    });

    //final
    this.load.spritesheet("final1", "final1.png", {
      frameWidth: 1600,
      frameHeight: 900,
    });
    this.load.spritesheet("final2", "final2.png", {
      frameWidth: 1600,
      frameHeight: 900,
    });
     this.load.spritesheet("final3", "final3.png", {
       frameWidth: 1600,
       frameHeight: 900,
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

    this.load.spritesheet("estrelasindo", "estrelas_indo.png", {
      frameWidth: 800,
      frameHeight: 450,
    });

    this.load.spritesheet("estrelasvindo", "estrelas_vindo.png", {
      frameWidth: 800,
      frameHeight: 450,
    });

    this.load.spritesheet("estrelasvindo1", "estrelas_vindo_G1.png", {
      frameWidth: 9600,
      frameHeight: 900,
    });
    
    this.load.spritesheet("estrelasvindo2", "estrelas_vindo_G2.png", {
      frameWidth: 9600,
      frameHeight: 900,
    });
    
    this.load.spritesheet("buttonnitro", "buttonnitro.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("asteroideumex", "asteroideumex.png", {
      frameWidth: 96,
      frameHeight: 96,
    });

    this.load.spritesheet("pinkheart", "pinkheart.png", {
      frameWidth: 64,
      frameHeight: 64,
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

    this.load.spritesheet("dano_atirador", "vidro_dano.png", {
      frameWidth: 90,
      frameHeight: 90,
    });

    this.load.spritesheet("Alvo1", "enemigo1.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("Alvo2", "enemigo2.png", {
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
    this.load.spritesheet("purpleheart", "purpleheart.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("mapf2_menor", "fase2.png", {
      frameWidth: 800,
      frameHeight: 450,
    });

    this.load.spritesheet("mapf2", "fase2_maior.png", {
      frameWidth: 1600,
      frameHeight: 900,
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

    this.load.image("f2bounds", "bounds2.png"); //adiconar depois
  }

  create() {

    this.scene.stop("preloader");
    if (this.game.room) {
      this.scene.start("player");
    } else {
      this.scene.start("room"); 
    }

    
  }
  
}


export default preloader;
