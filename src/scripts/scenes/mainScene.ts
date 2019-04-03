import FpsText from '../objects/fpsText';
import PhaserVersion from '../objects/phaserVersion';
import { Tiles, centerOnScreen } from '../utils';

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    new PhaserVersion(this);
    this.fpsText = new FpsText(this);

    var group = this.add.group({
      // @ts-ignore
      key: 'tiles',
      frame: new Array(16).fill(0).map((x, i) => i),
      frameQuantity: 1,
    });

    // width * cellWidth = gridSize
    const { x, y } = centerOnScreen(this.cameras.main, 8 * 32, 2 * 32);
    Phaser.Actions.GridAlign(group.getChildren(), {
      width: 8,
      height: 2,
      cellWidth: 32,
      cellHeight: 32,
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
