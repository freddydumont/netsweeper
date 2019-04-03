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
          tile: i % 16,
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

  private debug(layer: Phaser.Tilemaps.DynamicTilemapLayer) {
    const debugGraphics = this.add.graphics();
    layer.renderDebug(debugGraphics, {
      // @ts-ignore
      tileColor: new Phaser.Display.Color(243, 134, 48, 100),
    });
  }
}
//
