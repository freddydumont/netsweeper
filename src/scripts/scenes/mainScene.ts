import FpsText from '../objects/fpsText';
import PhaserVersion from '../objects/phaserVersion';
import { Tiles, centerOnScreen } from '../utils';
import Tile from '../objects/Tile';

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;
  tiles: Tile[];

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    // disable context menu on right click
    this.input.mouse.disableContextMenu();
    this.displayDebugInfo();

    this.generateGameBoard();
  }

  update() {
    this.fpsText.update(this);
  }

  /**
   * Generate Tile instances based on difficulty config and
   * align them in a grid centered on the screen.
   */
  private generateGameBoard() {
    // TODO: Replace with difficulty config
    const width = 9;
    const height = 9;
    const tileSize = 32;

    // Generates 1 Tile instance per grid tile
    this.tiles = new Array(width * height).fill(0).map(
      (_, i) =>
        new Tile({
          scene: this,
          x: 0,
          y: 0,
        })
    );

    // Align tiles and center grid on screen
    const { x, y } = centerOnScreen(
      this.cameras.main,
      width * tileSize,
      height * tileSize
    );

    Phaser.Actions.GridAlign(this.tiles, {
      width,
      height,
      cellWidth: tileSize,
      cellHeight: tileSize,
      x,
      y,
    });
  }

  private displayDebugInfo() {
    new PhaserVersion(this);
    this.fpsText = new FpsText(this);
  }
}
//
