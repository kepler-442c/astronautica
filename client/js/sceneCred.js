class sceneCred extends Phaser.Scene {
  constructor() {
    super("sceneCred");
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



      this.time.delayedCall(23000, () => {
        this.textRecomecar = this.add
          .text(155, 370, "Jogar outra vez", {
            fontFamily: "stepalange",
            fontSize: "36px",
            fill: "#ffffff",
          })
          .setInteractive()
          .on("pointerdown", () => {
            window.location.reload();
          });
        this.tweens.add({
          targets: this.textRecomecar,
          y: 350,
          duration: 1000,
          yoyo: true,
          ease: "Sine.easeIn", //ver outros ease depois
          loop: -1,
        });
      });
    
   }
  
  upload() { }

}

  
  export default sceneCred