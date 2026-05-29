class scenejumpone extends Phaser.Scene {
  constructor() {
    super("scenejumpone");
    this.prox = false;
  }


  create() {
    console.log("jump one")
    this.add.image(0, 0, "fundo").setOrigin(0, 0);

    this.anims.create({
      key: "jumpscare1_anim",
      frames: this.anims.generateFrameNumbers("jumpscare1", {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: "jumpscare2_anim",
      frames: this.anims.generateFrameNumbers("jumpscare2", {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: "jumpscare3_anim",
      frames: this.anims.generateFrameNumbers("jumpscare3", {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: "jumpscare4_anim",
      frames: this.anims.generateFrameNumbers("jumpscare4", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: 0,
    });

    const content = [
      "Após um árduo período de fuga e batalha,",
      "Marilda e Ernesto finalmente se veem livres do",
      "campo de asteroides e seus perseguidores.",
      "Pela primeira vez desde o início de sua missão,",
      "os dois podem respirar com tranquilidade.",
      "",
      "No entanto, algo que eles não esperavam acontece...",
    ];

    this.text = this.add.text(160, 150, content, {
      fontFamily: "news-gothic-bold",
      fontSize: "20px",
      fill: "#ffe81f",
    });

    this.time.delayedCall(8000, () => {
      if (this.text) this.text.destroy();

      console.log("animação");
      this.minhoca1 = this.add
        .sprite(400, 225, "jumpscare1")
        .play("jumpscare1_anim");
      this.minhoca1.on("animationcomplete", () => {
        this.minhoca2 = this.add
          .sprite(400, 225, "jumpscare2")
          .play("jumpscare2_anim");
        this.minhoca2.on("animationcomplete", () => {
          this.minhoca3 = this.add
            .sprite(400, 225, "jumpscare3")
            .play("jumpscare3_anim");
          this.minhoca3.on("animationcomplete", () => {
            this.minhoca4 = this.add
              .sprite(400, 225, "jumpscare4")
              .play("jumpscare4_anim");
            this.minhoca4.on("animationcomplete", () => {
              this.minhoca4.on("animationcomplete", () => {
                this.scene.stop();
              });
            });
          });
        });
      });
    }); //3,6 s de nimacao
    this.time.delayedCall(11700, () => {
      if (this.game.localPlayer === "piloto") {
        this.scene.start("scene2");
      } else {
        this.scene.start("scene3");
      }
    });
  }
}
export default scenejumpone;
