import 'phaser';
import MainScene from './scenes/mainScene';
import MenuScene from './scenes/menuScene';
import PreloadScene from './scenes/preloadScene';

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

const config: GameConfig = {
  backgroundColor: '#000',
  disableContextMenu: true,
  // canvas is a child of a relatively positioned div, with #menu as a sibling
  canvasStyle: `
    position: absolute;
    top: 0;
    left: 0;
  `,
  /** Sync the menu overlay with the canvas margin */
  callbacks: {
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
  scene: [PreloadScene, MenuScene, MainScene],
};

const createGame = () => {
  const game = new Phaser.Game(config);
  return game;
};

export { createGame };
