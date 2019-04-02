import FpsText from '../objects/fpsText';
import PhaserVersion from '../objects/phaserVersion';
import { Tiles } from '../utils';

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    new PhaserVersion(this);
    this.fpsText = new FpsText(this);

    // Create a blank map
    const map = this.make.tilemap({
      tileWidth: 32,
      tileHeight: 32,
      width: 10,
      height: 10,
    });

    // Load up a tileset
    const tileset = map.addTilesetImage('tiles');

    // Create an empty layer and give it the name "Layer 1"
    const { centerX, centerY } = this.cameras.main;
    const layer = map.createBlankDynamicLayer(
      'Layer 1',
      tileset,
      centerX - map.widthInPixels / 2,
      centerY - map.heightInPixels / 2
    );

    layer.fill(Tiles.TILE);
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
