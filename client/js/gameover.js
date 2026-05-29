class gameover extends Phaser.Scene {
  constructor() {
    super("gameover");
  } 

  

  create() {
   

    this.rect = this.add.rectangle(400, 225, 800, 450, 0x000000);
   

    this.textGame = this.add
      .text(270, 200, "Game", {
        fontFamily: "stepalange",
        fontSize: "55px",
        fill: "#ae3cca",
      });
    
    
    
    this.time.delayedCall(1000, () => {
      this.textOver = this.add.text(430, 200, "Over", {
      fontFamily: "stepalange",
      fontSize: "55px",
      fill: "#e90b0b",
    }); });

      
    this.time.delayedCall(2000, () => {
      this.textRestart = this.add
      .text(300, 330, "Tente Outra Vez", {
        fontFamily: "news-gothic-bold",
        fontSize: "24px",
        fill: "#e0b806",
      })
      this.add.tween({
        targets: this.textRestart,
        alpha: 0,
        duration: 500,
        yoyo: true,
        repeat: -1,
      });
    });

    this.time.delayedCall(2500, () => {
      this.rect.setInteractive()
        .on("pointerdown", () => {

          window.location.reload(); 
        });

    });
  
  } //CHAVE DO CREATE

  upload() { }
}

export default gameover;
