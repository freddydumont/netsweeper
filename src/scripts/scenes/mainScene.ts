import FpsText from '../objects/fpsText';
import PhaserVersion from '../objects/phaserVersion';
import { Tiles, centerOnScreen } from '../utils';
import Tile from '../objects/Tile';

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.input.mouse.disableContextMenu();
    new PhaserVersion(this);
    this.fpsText = new FpsText(this);

    const width = 9;
    const height = 9;
    const tileSize = 32;

    const tiles = new Array(width * height).fill(0).map(
      (_, i) =>
        new Tile({
          scene: this,
          x: 0,
          y: 0,
        })
    );

    const { x, y } = centerOnScreen(
      this.cameras.main,
      width * tileSize,
      height * tileSize
    );

    Phaser.Actions.GridAlign(tiles, {
      width,
      height,
      cellWidth: tileSize,
      cellHeight: tileSize,
      x,
      y,
    });
  }

  update() {
    this.fpsText.update(this);
  }
}
//
