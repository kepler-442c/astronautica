class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.threshold = 0.1;
    this.speed = 150;
    this.direction = undefined;
    this.fuel = 20;
    this.life = 3;
    this.nitro = false;
    this.invincible = false;
    this.tempo = 60; //tempo para passar de fase
    this.morreu = false;
  }
  //localhost:8080/?room=1234
  //id 59 feira
  create() {
    this.add
      .image(0, 0, "mapf1")
      .setOrigin(0)
      .setOrigin(0, 0)
      .setFlipX(true)
      .setFlipY(true)
      .setScrollFactor(0.8); //parallax
    this.add
      .image(800, 0, "mapf1")
      .setOrigin(0)
      .setFlipX(true)
      .setOrigin(0, 0)
      .setFlipX(true)
      .setFlipY(true)
      .setScrollFactor(0.8);
    this.add
      .image(0, 450, "mapf1")
      .setOrigin(0)
      .setFlipY(true)
      .setOrigin(0, 0)
      .setFlipX(true)
      .setFlipY(true)
      .setScrollFactor(0.8);
    this.add
      .image(800, 450, "mapf1")
      .setOrigin(0, 0)
      .setFlipX(true)
      .setFlipY(true)
      .setScrollFactor(0.8);
    
     this.telaCheia = this.add
       .sprite(750, 350, "tela-cheia", 0)
       .setInteractive()
       .on("pointerdown", () => {
         if (this.scale.isFullscreen) {
           this.scale.stopFullscreen();
           this.telaCheia.setFrame(0);
         } else {
           this.scale.startFullscreen();
           this.telaCheia.setFrame(1);
         }
       })
       .setScrollFactor(0);

    

    this.player = this.star = this.physics.add
      .image(800, 450, "star", 0)
      .setSize(48, 22); //SURGE NO MEIO DO MAPA
    this.star.setScale(0.8);
    this.player.setCollideWorldBounds(true);

    this.music = this.sound.add("songf1", { loop: true });
    this.music.play();


    this.events.once("shutdown", () => {
      if (this.music && this.music.isPlaying) {
        this.music.stop();
      }
    });

    this.cameras.main.startFollow(this.player);

    this.cameras.main.setBounds(0, 0, 800 * 2, 450 * 2);
    this.physics.world.setBounds(400, 225, 800, 450);

    this.anims.create({
      key: "bounds_anim",
      frames: this.anims.generateFrameNumbers("bounds", {
        start: 0,
        end: 0,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "pinkheart_anim",
      frames: this.anims.generateFrameNumbers("pinkheart", {
        start: 0,
        end: 0,
      }),
      frameRate: 5,
      repeat: -1,
    });

    const bounds_anim = this.add.sprite(800, 450, "bounds").play("bounds_anim");
    this.add.tween({
      targets: bounds_anim,
      scale: 1.05,
      duration: 2000,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
    });

    this.anims.create({
      key: "combustivel_anim",
      frames: this.anims.generateFrameNumbers("combustivel", {
        start: 0,
        end: 3,
      }),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: "asteroideumex_anim",
      frames: this.anims.generateFrameNumbers("asteroideumex", {
        //explosao do asteroideum
        start: 0,
        end: 6,
      }),
      frameRate: 5,
      repeat: 0,
    });

    this.textLife = this.add
      .text(680, 100, `Life: ${this.life}`, {
        //600, 50
        fontFamily: "stepalange",
        fontSize: "36px",
        fill: "#ffffff",
      })
      .setScrollFactor(0);

    this.textFuel = this.add
      .text(16, 100, `Fuel: ${this.fuel}`, {
        //16, 50
        fontFamily: "stepalange",
        fontSize: "36px",
        fill: "#ffffff",
      })
      .setScrollFactor(0);

    this.intervalFuel = setInterval(() => {
      this.fuel -= 1;

      this.textFuel.setText(`Fuel: ${this.fuel}`);

      if (this.fuel <= 0) {
        //this.scene.stop();
        clearInterval(this.intervalFuel);
        clearInterval(this.intervalNitro);
        clearInterval(this.intervalTime);
        this.fuel = 20;
        this.life = 3;
        this.tempo = 60;
        this.invincible = false;
        this.morreu = true;
        this.game.socket.emit("scene0", this.game.room, {
          player: {
            id: this.game.socket.id,
            life: this.life,
            morreu: this.morreu,
          },
        });
        this.scene.stop();
        this.scene.start("gameover");
      }
    }, 1000);

    this.intervalNitro = setInterval(() => {
      if (this.nitro === true) {
        this.fuel -= 3;
      }
      this.textFuel.setText(`Fuel: ${this.fuel}`);
      if (this.fuel <= 0) {
        //this.scene.stop();
        this.nitro = false;
        clearInterval(this.intervalFuel);
        clearInterval(this.intervalNitro);
        clearInterval(this.intervalTime);
        this.fuel = 20;
        this.life = 3;
        this.tempo = 60;
        this.invincible = false;
        this.morreu = true;
        this.game.socket.emit("scene0", this.game.room, {
          player: {
            id: this.game.socket.id,
            life: this.life,
            morreu: this.morreu,
          },
        });
        this.scene.stop();
        this.scene.start("gameover");
      }
    }, 500);

    this.intervalTime = setInterval(() => {
      this.tempo -= 1;
      if (this.tempo <= 0) {
        //this.scene.stop();
        clearInterval(this.intervalFuel);
        clearInterval(this.intervalNitro);
        clearInterval(this.intervalTime);
        this.scene.stop();
        this.scene.start("scenejumpone");
      }
    }, 1000);

    this.button = this.add
      .sprite(600, 250, "buttonnitro", 0)
      .setScrollFactor(0)
      .setInteractive()
      .on("pointerdown", () => {
        this.button.setFrame(1);
        this.player.setVelocity(
          this.direction.x * this.speed * 2,
          this.direction.y * this.speed * 2,
        );
        this.nitro = true;
        this.textFuel.setText(`Fuel: ${this.fuel}`);
      })
      .on("pointerup", () => {
        this.button.setFrame(0);
        this.player.setVelocity(
          (this.direction.x * this.speed) / 2,
          (this.direction.y * this.speed) / 2,
        );
        this.nitro = false;
        this.textFuel.setText(`Fuel: ${this.fuel}`);
      });

    this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
      x: 150,
      y: 290,
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
          Math.sin(angle),
        ).normalize();
      }

      if (this.joystick.force > 0) {
        this.star.setVelocity(
          this.direction.x * this.speed,
          this.direction.y * this.speed,
        );
      } else {
        this.star.setVelocity(0, 0);
      }
    });

    this.time.addEvent({
      delay: 2000,
      callback: this.spawnAsteroid,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.spawnCombustivel,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 29000,
      callback: this.spawnPinkHeart,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 6000,
      callback: this.despawnCombustivel,
      callbackScope: this,
      loop: true,
    }); //DESPAWN BLOCO

    this.time.addEvent({
      delay: 6000,
      callback: this.despawnAsteroid,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 35000,
      callback: this.despawnPinkHeart,
      callbackScope: this,
      loop: true,
    });

    this.asteroidGroup = this.physics.add.group();
    this.physics.add.collider(
      this.player,
      this.asteroidGroup,
      this.hitAsteroid,
      this.processAsteroidCollision,
      this,
    );

    this.combustivelGroup = this.physics.add.group();
    this.physics.add.collider(
      this.player,
      this.combustivelGroup,
      this.hitCombustivel,
      null,
      this,
    );

    this.pinkHeartGroup = this.physics.add.group();
    this.physics.add.collider(
      this.player,
      this.pinkHeartGroup,
      this.hitPinkHeart,
      null,
      this,
    );

    this.uiLayer = this.add.layer();
    const telaNave = this.add.image(400, 225, "telanave").setScrollFactor(0);
    this.uiLayer.add(telaNave);
    this.uiLayer.setDepth(3000);

    this.damageLayer = this.add.layer().setDepth(1499);

    //this.fuellevel.setDepth(2000);

    this.uiTopLayer = this.add.layer();
    this.uiTopLayer.add(this.textFuel);
    this.uiTopLayer.add(this.textLife);
    this.uiTopLayer.add(this.button);
    this.uiTopLayer.add(this.joystick.base);
    this.uiTopLayer.add(this.joystick.thumb);
    this.uiTopLayer.add(this.telaCheia);
    this.uiTopLayer.setDepth(4000);

    this.textShooterLife = this.add
      .text(570, 50, `Shooter Life: ${this.life2}`, {
        fontFamily: "stepalange",
        fontSize: "36px",
        fill: "#ffffff",
      })
      .setScrollFactor(0)
      .setDepth(3000);

    this.game.socket.on("scene1", (state) => {
      this.life2 = state.player.life2;
      this.textShooterLife.setText(`Shooter Life: ${this.life2}`);

      this.morreu2 = state.player.morreu2;
      if (this.morreu2) {
        //this.scene.stop();
        clearInterval(this.intervalFuel);
        clearInterval(this.intervalNitro);
        clearInterval(this.intervalTime);
        this.game.socket.emit("scene0", this.game.room, {
          player: {
            id: this.game.socket.id,
            life: this.life,
            morreu: this.morreu,
          },
        });
        this.scene.stop();
        this.scene.start("gameover");
      }
    });
  } //CHAVE DO CREATE

  despawnCombustivel() {
    const combustivel = this.combustivelGroup.getFirstAlive();
    if (combustivel) {
      this.tweens.add({
        targets: combustivel,
        scale: 0.3,
        duration: 2000,
        ease: "Linear",
        onComplete: () => {
          combustivel.destroy();
        },
      });
    }
  }

  despawnAsteroid() {
    const asteroid = this.asteroidGroup.getFirstAlive();
    if (asteroid) {
      this.tweens.add({
        targets: asteroid,
        scale: 0.4,
        duration: 5000,
        ease: "Linear",
        onComplete: () => {
          asteroid.destroy();
        },
      });
    }
  }

  despawnPinkHeart() {
    const pinkHeart = this.pinkHeartGroup.getFirstAlive();
    if (pinkHeart) {
      this.tweens.add({
        targets: pinkHeart,
        scale: 0.3,
        duration: 3000,
        ease: "Linear",
        onComplete: () => {
          pinkHeart.destroy();
        },
      });
    }
  }

  hitAsteroid(player, asteroidGroup) {
    this.life -= 1;
    this.textLife.setText(`Life: ${this.life}`);

    //animacao de hit
    this.add.tween({
      targets: this.player,
      alpha: 0,
      duration: 100,
      yoyo: true,
      repeat: 5,
    });

    this.invincible = true;
    this.time.delayedCall(1000, () => {
      this.invincible = false;
    });

    //animação de explosão
    this.exp = this.add
      .sprite(asteroidGroup.x, asteroidGroup.y, "asteroideumex")
      .setScale(asteroidGroup.scaleX, asteroidGroup.scaleY);
    this.sound.play("explosion");
    this.exp.play("asteroideumex_anim");
    asteroidGroup.destroy();

    this.exp.on("animationcomplete", () => {
      this.exp.destroy();
    });

    this.addDamageFrames();

    if (this.life === 0) {
      //this.scene.stop();
      clearInterval(this.intervalFuel);
      clearInterval(this.intervalNitro);
      clearInterval(this.intervalTime);
      this.life = 3;
      this.fuel = 20;
      this.tempo = 60;
      this.invincible = false;
      this.morreu = true;
      this.game.socket.emit("scene0", this.game.room, {
        player: {
          id: this.game.socket.id,
          life: this.life,
          morreu: this.morreu,
        },
      });
      this.scene.stop();
      this.scene.start("gameover");
    }
  }

  hitCombustivel(player, combustivelGroup) {
    this.sound.play("collect");
    (combustivelGroup.destroy(true, true),
      (this.fuel += 5),
      this.textFuel.setText(`Fuel: ${this.fuel}`));
  }

  hitPinkHeart(player, pinkHeartGroup) {
    this.sound.play("collect");
    (pinkHeartGroup.destroy(true, true),
      (this.life += 1),
      this.textLife.setText(`Life: ${this.life}`));
  }

  processAsteroidCollision(player, asteroid) {
    return !this.invincible;
  }

  update() {
    this.game.socket.emit("scene0", this.game.room, {
      player: {
        id: this.game.socket.id,
        life: this.life,
        morreu: this.morreu,
      },
    });
  }

  addDamageFrames() {
    const frameNames = this.textures
      .get("dano_atirador")
      .getFrameNames()
      .filter((name) => name !== "__BASE");

    if (frameNames.length === 0) {
      return;
    }

    const positions = [];
    const minDistance = 100;
    const maxAttempts = 50;

    while (positions.length < 3) {
      let attempt = 0;
      let candidate;

      do {
        candidate = {
          x: Phaser.Math.Between(0, 800),
          y: Phaser.Math.Between(0, 450),
        };
        attempt += 1;
      } while (
        attempt < maxAttempts &&
        positions.some(
          (pos) =>
            Phaser.Math.Distance.Between(
              pos.x,
              pos.y,
              candidate.x,
              candidate.y,
            ) < minDistance,
        )
      );

      if (
        positions.every(
          (pos) =>
            Phaser.Math.Distance.Between(
              pos.x,
              pos.y,
              candidate.x,
              candidate.y,
            ) >= minDistance,
        )
      ) {
        positions.push(candidate);
      } else {
        positions.push(candidate);
      }
    }

    positions.forEach((pos) => {
      const frameName = Phaser.Math.RND.pick(frameNames);
      const damageSprite = this.add
        .sprite(pos.x, pos.y, "dano_atirador", frameName)
        .setScrollFactor(0)
        .setDepth(1499)
        .setScale(1)
        .setAlpha(1);

      this.damageLayer.add(damageSprite);

      this.tweens.add({
        targets: damageSprite,
        alpha: 0,
        duration: 3000,
        ease: "Linear",
        onComplete: () => damageSprite.destroy(),
      });
    });
  }

  /*update() {
    this.game.socket.emit("scene0", this.game.room, {
      player: {
        id: this.game.socket.id,
        life: this.life,
        morreu: this.morreu,
      },
    });
  }*/
  spawnAsteroid() {
    const maxAsteroids = 10; // Limite de asteroides (maior quando for lancar o jogo)? ou dez ja ta dificil?

    if (this.asteroidGroup.getLength() < maxAsteroids) {
      var x = Phaser.Math.Between(400, 1200);
      var y = Phaser.Math.Between(225, 675);

      while (
        Math.abs(x - this.player.x) < 100 ||
        Math.abs(y - this.player.y) < 100
      ) {
        // Garante que o asteroide não será criado muito próximo do player
        x = Phaser.Math.Between(400, 1200);
        y = Phaser.Math.Between(225, 675);
      }

      const asteroid = this.asteroidGroup.create(x, y, "asteroideum");
      asteroid.setBounce(1);
      //asteroid.setSize(30, 30);
      asteroid.setCollideWorldBounds(true);
      asteroid.body.setCircle(20, 35, 35); // Define o corpo de colisão como um círculo com raio de 20 pixels e deslocamento de -5 pixels em x e y
      asteroid.body.setCircle(15);
      asteroid.setDepth(2000);
      asteroid.setVelocity(
        Phaser.Math.Between(-200, 200),
        Phaser.Math.Between(-200, 200),
      );
      this.tweens.add({
        targets: asteroid,
        scale: 1.7,
        duration: 3000,
        ease: "Linear",
      });
    }
  }

  spawnCombustivel() {
    //REFINAR!!!!! NAO SPAWNAR UM EM CIMA DO OUTRO E NEM ONDE ESTA O PLAYER
    const maxCombustivel = 3;

    if (this.combustivelGroup.getLength() < maxCombustivel) {
      var x = Phaser.Math.Between(400, 1200);
      var y = Phaser.Math.Between(225, 675);

      while (
        Math.abs(x - this.player.x) < 100 ||
        Math.abs(y - this.player.y) < 100 ||
        Math.abs(x - this.combustivelGroup.x) < 100 ||
        Math.abs(y - this.combustivelGroup.y) < 100
      ) {
        // Garante que o combustível não será criado muito próximo do player
        x = Phaser.Math.Between(400, 1200);
        y = Phaser.Math.Between(225, 675);
      }

      const combustivel = this.combustivelGroup.create(x, y, "combustivel");
      combustivel.setCollideWorldBounds(true);
      this.anims.play("combustivel_anim", combustivel);
      combustivel.setSize(50, 50);
      combustivel.setScale(0.3);
      combustivel.setDepth(1000);

      this.tweens.add({
        targets: combustivel,
        scale: 0.8,
        duration: 6000,
        ease: "Linear",
      });
    }
  }

  spawnPinkHeart() {
    const maxPinkHearts = 1;

    if (this.pinkHeartGroup.getLength() < maxPinkHearts) {
      var x = Phaser.Math.Between(400, 1200);
      var y = Phaser.Math.Between(225, 675);

      while (
        Math.abs(x - this.player.x) < 100 ||
        Math.abs(y - this.player.y) < 100 ||
        Math.abs(x - this.pinkHeartGroup.x) < 100 ||
        Math.abs(y - this.pinkHeartGroup.y) < 100
      ) {
        // Garante que o coração rosa não será criado muito próximo do player
        x = Phaser.Math.Between(400, 1200);
        y = Phaser.Math.Between(225, 675);
      }

      const pinkHeart = this.pinkHeartGroup.create(x, y, "pinkHeart");
      pinkHeart.setCollideWorldBounds(true);
      this.anims.play("pinkheart_anim", pinkHeart);
      pinkHeart.setSize(50, 50);
      pinkHeart.setScale(0.3);
      pinkHeart.setDepth(1000);
      pinkHeart.body.setCircle(20); // Define o corpo de colisão como um círculo com raio de 25 pixels

      this.tweens.add({
        targets: pinkHeart,
        scale: 0.8,
        duration: 6000,
        ease: "Linear",
      });
    }
  }
} //CHAVE DA CENA
export default scene0;
