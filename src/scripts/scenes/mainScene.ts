import FpsText from '../objects/fpsText';
import PhaserVersion from '../objects/phaserVersion';
import { centerOnScreen } from '../utils/centerOnScreen';
import Tile from '../objects/Tile';

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;
  tiles: Tile[];
  areMinesGenerated = false;
  // TODO: Replace with difficulty config
  MINES = 10;
  width = 9;
  height = 9;
  tileSize = 32;

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
   * Generate mines excluding the id
   * @param id Tile id to exclude
   */
  public generateMines(id: number) {
    let remainingMines = this.MINES;
    // shuffle the array, this doesn't change the Tile positions
    Phaser.Math.RND.shuffle(this.tiles);

    // add mines on the first 10 indexes (depend on config), excluding id
    this.tiles.forEach((tile) => {
      if (remainingMines > 0 && tile.id !== id) {
        tile.isMined = true;
        remainingMines--;
      }
    });

    this.areMinesGenerated = true;
  }

  /**
   * Generate Tile instances based on difficulty config and
   * align them in a grid centered on the screen.
   */
  private generateGameBoard() {
    // Generates 1 Tile instance per grid tile
    this.tiles = new Array(this.width * this.height).fill(0).map(
      (_, i) =>
        new Tile({
          scene: this,
          x: 0,
          y: 0,
          id: i + 1,
        })
    );

    // Align tiles and center grid on screen
    const { x, y } = centerOnScreen(
      this.cameras.main,
      this.width * this.tileSize,
      this.height * this.tileSize
    );

    Phaser.Actions.GridAlign(this.tiles, {
      width: this.width,
      height: this.height,
      cellWidth: this.tileSize,
      cellHeight: this.tileSize,
      x,
      y,
    });
  }

  private displayDebugInfo() {
    new PhaserVersion(this);
    this.fpsText = new FpsText(this);
  }
}
