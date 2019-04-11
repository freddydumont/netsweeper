import 'phaser';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

const config: GameConfig = {
  backgroundColor: '#000',
  canvasStyle: `
    position: absolute;
    top: 0;
    left: 0;
  `,
  disableContextMenu: true,
  callbacks: {
    /** Sync the menu overlay with the canvas margin */
    postBoot() {
      const ml = document.querySelector('canvas')!.style.marginLeft;
      document.getElementById('menu')!.style.marginLeft = ml;
    },
  },
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  scene: [PreloadScene, MainScene],
};

let game: Phaser.Game;

const createGame = () => {
  game = new Phaser.Game(config);
};

const getGame = () => game;

export { createGame, getGame };
