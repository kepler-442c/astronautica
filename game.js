import config from "./config.js";
import sceneMenu from "./sceneMenu.js";
import scene1 from "./scene1.js";
import scene0 from "./scene0.js";
import sceneCut from "./sceneCut.js";
import gameover from "./gameover.js";
import sceneCred from "./sceneCred.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add("sceneMenu", sceneMenu);
    this.scene.add("scene0", scene0);
    this.scene.add("scene1", scene1);
    this.scene.start("sceneMenu");
    this.scene.add("sceneCut", sceneCut);
    this.scene.add("game-over", gameover);
    this.scene.add("sceneCred", sceneCred);
  }
}

window.onload = () => {
  window.game = new Game();
};

// import config from "./config.js";
// import scene0 from "./scene0.js";

// class Game extends Phaser.Game {
//   constructor() {
//     super(config);

//     this.scene.add("scene0", scene0);
//     this.scene.start("scene0");
//   }
// }

// window.onload = () => {
//   window.game = new Game();
// };
