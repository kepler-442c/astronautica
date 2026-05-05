class sceneCred extends Phaser.Scene {
  constructor() {
    super("sceneCred");
  }

  preload() {
    this.load.setPath("assets");

    this.load.font("news-gothic-bold", "news-gothic-bold.otf");
    this.load.font("stepalange", "stepalange.otf");
   }
  
  create() {

     const content = [
       //escolher se mantém tudo em ingles ou portugues
       "Desenvolvedores de jogos:",
       "Elise",
       "Pablo",
       "",

       "Designer de jogos:",
       "Elise",
       "Pablo",
       "",

       "Artista digital:",
       "Elise",
       "itch.io",
       "Pablo",
       "",

       "Game tester:",
       "Elise",
       "Evandro",
       "Humberto",
       "Julieta",
       "Luiza",
       "Ricardo",
       "Pablo",
       "",

       "Roteirista:",
       "Elise",
       "Pablo",
       "",

       "Animation/Motion designer:",
       "Pablo",
       "",

       "Designer de som:",
       "Elise",
       "Pablo",
       "Pixabay",
       "Toca dos Monstros",
       "",

       "Designer de interface:",
       "Elise",
       "Pablo",
       "",

       "Concept artist:",
       "Elise",
       "",

       "Programador chefe:",
       "Elise",
       "",

       "Programadores:",
       "Copilot",
       "Elise",
       "Ederson (Boi)",
       "Pablo",
       "",

       "Produtor de jogo:",
       "Elise",
       "Pablo",
     ];

      this.textC = this.add.text(300, 450, content, {
        fontFamily: "news-gothic-bold",
        fontSize: "20px",
        fill: "#ffe81f",
      });
    
    this.tweens.add({
          targets: this.textC,
          y: -2000,
          duration: 32000,
          //yoyo: true,
 
        
    });
    
    this.time.delayedCall(33000, () => {
      this.scene.start("sceneMenu");
    });
    
   }
  
  upload() { }

}

  
  export default sceneCred