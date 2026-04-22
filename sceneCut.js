class sceneCut extends Phaser.Scene {
  constructor() {
    super("sceneCut");

    
  }

  preload() {
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
  }

  create() {
    this.anims.create({
      key: "andromedano-idle",
      frames: this.anims.generateFrameNumbers("andromedano", {
        start: 7,
        end: 11,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "explode-anim",
      frames: this.anims.generateFrameNumbers("explode", {
        start: 0,
        end: 6,
      }),
      frameRate: 5,
      repeat: 0,
    });

    this.add.image(0, 0, "fundo").setOrigin(0, 0);

    /* const andromedano = this.add.sprite(400, 225, "andromedano").play("andromedano-idle");
 
     this.time.delayedCall(3000, () => {
       andromedano.play("explosao");
     });*/

    //TEXTOS
    const content = [
      "Numa galáxia não tão distante...",
    ];

    this.text1 = this.add.text(180, 150, content, {
      font: "20px Arial",
      fill: "#ffffff",
    });
    
    this.time.delayedCall(3000, () => {
      this.text1.destroy();
    });
    // Criar explosão

    this.time.delayedCall(3000, () => {

      const content = [
        "Em meio ao conflito entre a Via Láctea e a galáxia",
        "de Andrômeda, uma nave tripulada por apenas um",
        "auxiliar de artilharia e um piloto é enviada numa missão de",
        "reconhecimento.",
      ];

      this.text2 = this.add.text(180, 150, content, {
        font: "20px Arial",
        fill: "#ffffff",
      });
    });

    this.time.delayedCall(10000, () => {
      this.text2.destroy();
    });

    this.time.delayedCall(11000, () => {

      const content = [
        "Com o objetivo de analisar os movimentos do inimigo,",
        "os dois soldados se aproximam de um regimento de",
        "andromedanos, sem perceber que estão caindo em uma ",
        "emboscada.",
      ];

      this.text3 = this.add.text(180, 150, content, {
        font: "20px Arial",
        fill: "#ffffff",
      });
    });
    
    this.time.delayedCall(17000, () => {
      this.text3.destroy();
      delay: 2000;
      //this.explosion = this.add.sprite(400, 225, "explosion").play("explosion-anim")
      this.andromedanos = [];
      this.andromedano = this.add.sprite(400, 225, "andromedano").play("andromedano-idle");
      this.andromedanos.push(this.andromedano);
      this.andromedano = this.add.sprite(140, 90, "andromedano").play("andromedano-idle");
      this.andromedanos.push(this.andromedano);
      this.andromedano = this.add.sprite(600, 300, "andromedano").play("andromedano-idle");
      this.andromedanos.push(this.andromedano);
      this.andromedano = this.add.sprite(660, 150, "andromedano").play("andromedano-idle");
      this.andromedanos.push(this.andromedano);
      this.andromedano = this.add.sprite(200, 320, "andromedano").play("andromedano-idle");
      this.andromedanos.push(this.andromedano);
    });
    this.time.delayedCall(19000, () => {
      this.tweens.add({
        targets: this.andromedanos,
        scale: 7,
        duration: 4000,
        //yoyo: true,
        repeat: 0,
      });
    });
    //spawnar diversas explosoes  TROCAR ANIMACAO DE EXPLOSAO
    this.time.delayedCall(23000, () => {
      this.explosion = this.add.sprite(400, 225, "explode").play("explode-anim"); this.explosion.setScale(7);
      this.explosion.on("animationcomplete", () => {
        this.explosion.destroy();
      });
      this.explosion = this.add.sprite(140, 90, "explode").play("explode-anim"); this.explosion.setScale(7);
      this.explosion.on("animationcomplete", () => {
        this.explosion.destroy();
      });
      this.explosion = this.add.sprite(600, 300, "explode").play("explode-anim"); this.explosion.setScale(7);
      this.explosion.on("animationcomplete", () => {
        this.explosion.destroy();
      });
      this.explosion = this.add.sprite(660, 150, "explode").play("explode-anim"); this.explosion.setScale(7);
      this.explosion.on("animationcomplete", () => {
        this.explosion.destroy();
      });
      this.explosion = this.add.sprite(200, 320, "explode").play("explode-anim"); this.explosion.setScale(7);
      this.explosion.on("animationcomplete", () => {
        this.explosion.destroy();
      });

      /*this.explosions = [];
      this.explosion = this.add.sprite(200, 50, "explosion").play("explode-anim"); this.explosion.setScale(5);
      this.explosions.push(this.explosion);
      delay: 200;
      this.explosion = this.add.sprite(400, 390, "explosion").play("explode-anim"); this.explosion.setScale(5);
      this.explosions.push(this.explosion);
      delay: 200;
      this.explosion = this.add.sprite(600, 225, "explosion").play("explode-anim"); this.explosion.setScale(5);
      this.explosions.push(this.explosion);
      delay: 200;
      this.explosion = this.add.sprite(800, 100, "explosion").play("explode-anim"); this.explosion.setScale(5);
      this.explosions.push(this.explosion);
      delay: 200;
      this.explosion = this.add.sprite(100, 180, "explosion").play("explode-anim"); this.explosion.setScale(5);
      this.explosions.push(this.explosion);
      delay: 200;
      this.explosion = this.add.sprite(300, 270, "explosion").play("explode-anim"); this.explosion.setScale(5);
      this.explosions.push(this.explosion);*/

      
     
      /*this.explosionGroup = this.add.group();
      
        this.time.addEvent({
          delay: 50, // Tempo entre cada explosão (em milissegundos)
          callback: this.spawnExplosion,
          callbackScope: this,
          duration: 3000,
        });*/
      
  });

      //depois de alguns segundos destroy tudo e colocar tela preta e resto do texto

      this.time.delayedCall(25000, () => {
        
      
      
      
        this.add.rectangle(400, 225, 800, 450, 0x000000);
      
        /*this.underLayer = this.add.layer();
        this.underLayer.add(this.explosionGroup);
        this.underLayer.setDepth(1000);
    
    
         this.topLayer = this.add.layer();
         this.topLayer.add(this.rectangle);
         this.topLayer.add(this.text4);
         this.topLayer.setDepth(2000);*/
      
      });
      this.time.delayedCall(26000, () => {
      
        const content = [
          "Agora o único meio de fuga é através de um",
          "campo de asteroides, enquanto os aliens perseguidores",
          "estão na sua cola. Economize combustível, ou pise fundo",
          "para desviar dos asteroides. Escolha bem o momento de",
          "disparar, e não deixe que os aliens se aproximem.",
          "Vocês conseguem escapar por tempo suficiente para",
          "alcançar ajuda?",
        ];

        this.text4 = this.add.text(180, 150, content, {
          font: "20px Arial",
          fill: "#ffffff",
        });
      });

      this.time.delayedCall(36000, () => {
        this.scene.start("sceneMenu")
      });
    
    

    
   
    


  } //CHAVE CREATE
  
  update() { }

  
 spawnExplosion() {
   
   const maxExplosion = 30; 

   if (this.explosionGroup.getLength() < maxExplosion) {
     const x = Phaser.Math.Between(0, 800); 
     const y = Phaser.Math.Between(0, 450);

     const explosion = this.explosionGroup.create(x, y, "explosion");
     explosion.setScale(5);
    // explosion.setCollideWorldBounds(true);
     this.anims.play("explode-anim", explosion);
     explosion.on("animationcomplete", () => {
       explosion.destroy();
     });
     //delay: 2000;
     //explosion.destroy();
   }
 }
  

}

export default sceneCut;
