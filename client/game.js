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
    this.scene.add("gameover", gameover);
    this.scene.add("sceneCred", sceneCred);

     if (location.hostname.match(/localhost|127\.0\.0\.1/)) {
       this.socket = io("http://localhost:3000");
     } else if (location.hostname.match(/github\.dev/)) {
       this.socket = io(location.hostname.replace("8080", "3000"));
     } else {
       this.socket = io();
     }

     this.room = "0";
     this.socket.on("connect", () => {
       console.log("Socket ID:", this.socket.id);

       this.socket.emit("join-room", this.room);
     });
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
