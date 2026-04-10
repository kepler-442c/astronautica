var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  input: {
    activePointers: 3, // Permite até 3 toques simultâneos
  },
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: true,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

export default config;
