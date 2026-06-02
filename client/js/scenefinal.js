class scenefinal extends Phaser.Scene {
  constructor() {
    super("scenefinal");

  }

  create() {
    this.anims.create({
      key: "final1_anim",
      frames: this.anims.generateFrameNumbers("final1", {
        start: 0,
        end: 5,
      }),
      frameRate: 7,
      repeat: 0,
    });

    this.anims.create({
      key: "final2_anim",
      frames: this.anims.generateFrameNumbers("final2", {
        start: 0,
        end: 5,
      }),
      frameRate: 7,
      repeat: 0,
    });

    this.anims.create({
      key: "final3_anim",
      frames: this.anims.generateFrameNumbers("final3", {
        start: 0,
        end: 6,
      }),
      frameRate: 7,
      repeat: 0,
    });

    this.fuga1 = this.add.sprite(400, 225, "final1").play("final1_anim");
    this.fuga1.on("animationcomplete", () => {
      this.fuga2 = this.add.sprite(400, 225, "final2").play("final2_anim");
      this.fuga2.on("animationcomplete", () => {
        this.fuga3 = this.add.sprite(400, 225, "final3").play("final3_anim");
        this.fuga3.on("animationcomplete", () => {
          this.add.image(0, 0, "fundo").setOrigin(0, 0);
          const text = [
            "Tão rapidamente como a entrada,",
            "a fuga da dupla de dentro da minhoca espacial",
            "chega ao fim. Depois de serem perseguidos espaço",
            "adentro e enfrentarem andromedanos raivosos,",
            "a luz no final do túnel os cumprimenta,",
            "enquanto eles se despedem de seus perseguidores ",
            "e de sua missão.",
            "",
          ];

          this.text = this.add.text(160, 150, text, {
            fontFamily: "news-gothic-bold",
            fontSize: "20px",
            fill: "#ffe81f",
          });
        });
      });
    });

    this.time.delayedCall(6500, () => {
      this.terminou = true;
      this.textCred = this.add
        .text(600, 370, "Créditos", {
          fontFamily: "stepalange",
          fontSize: "36px",
          fill: "#ffffff",
        })
        .setInteractive()
        .on("pointerdown", () => {
          this.scene.stop();
          this.scene.start("sceneCred");
        });
      this.tweens.add({
        targets: this.textCred,
        y: 350,
        duration: 1000,
        yoyo: true,
        ease: "Sine.easeIn", //ver outros ease depois
        loop: -1,
      });
      /*this.textRecomecar = this.add
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
      });*/
    });
  }//chave create


}

export default scenefinal;
