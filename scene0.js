class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.threshold = 0.1;
    this.speed = 130;
    this.direction = undefined;
    this.money = 0;
  }


preload() {
  this.load.spritesheet("alien", "assets/alien.png", {
    frameWidth: 64,
    frameHeight: 64
  });

  this.load.plugin(
    "rexvirtualjoystickplugin",
    "./rexvirtualjoystickplugin.min.js",
    true,
  );

  this.load.spritesheet("button", "assets/button.png", {
    frameWidth: 32,
    frameHeight: 32,
  });

  this.load.audio("menusong", "assets/menusong.mp3"); 

  this.load.audio("lazer", "assets/lazer.mp3");

}

  create() {

    this.menusong = this.sound.add
      ("menusong", { loop: true }).play();
    
    this.lazer = this.sound.add("lazer");
    

    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("alien", { start: 27, end: 35 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("alien", { start: 10, end: 17 }),
      frameRate: 10,
      repeat: -1,
    })
    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("alien", { start: 0, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("alien", { start: 18, end: 26 }),
      frameRate: 10,
      repeat: -1,
    });


    this.alien = this.physics.add
      .sprite(400, 225, "alien", 18)
    
    this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
      x: 100,
      y: 350,
      radius: 50,
      base: this.add.circle(0, 0, 50, 0x888888),
      thumb: this.add.circle(0, 0, 25, 0xcccccc),
    });
      
    this.joystick.on("update", () => {
      const angle = Phaser.Math.DegToRad(this.joystick.angle);
      const force = this.joystick.force;

      if (force > this.threshold) {
        this.direction = new Phaser.Math.Vector2(
          Math.cos(angle),
          Math.sin(angle)
        ).normalize();
      }
      

      if (this.joystick.force > 0) {
        this.alien.setVelocity(
          this.direction.x * this.speed,
          this.direction.y * this.speed,
        );

        switch (true) {
          case this.joystick.angle >= -135 && this.joystick.angle < -45:
            this.alien.anims.play("walk-up", true);
            break;
          case this.joystick.angle >= -45 && this.joystick.angle < 45:
            this.alien.anims.play("walk-right", true);
            break;
          case this.joystick.angle >= 45 && this.joystick.angle < 135:
            this.alien.anims.play("walk-down", true);
            break;
          case this.joystick.angle >= 135 || this.joystick.angle < -135:
            this.alien.anims.play("walk-left", true);
            break;
        }
      } else {
        this.alien.setVelocity(0, 0);
        this.alien.anims.stop();
        this.alien.setFrame(18);
      }
      
    });
    
    this.button = this.add
      .sprite(670, 320, "button", 0)
      .setScale(2)
      .setInteractive()
      .on("pointerdown", () => { 
        this.button.setFrame(1);
      })
    .on("pointerup", () => {
      this.button.setFrame(0);
      this.money += 10;
      this.textMoney.setText(`Money: ${this.money}`);
      this.lazer.play();
    });

    this.textMoney = this.add.text(16, 16, `Money: ${this.money}`, {
      fontSize: "32px",
      fill: "#ffffff",

    });

    setInterval(() => {
      this.money += 1;
      this.textMoney.setText(`Money: ${this.money}`);
    }, 1000);

  }

}

export default scene0;