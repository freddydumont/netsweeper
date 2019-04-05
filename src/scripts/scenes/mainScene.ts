import FpsText from '../objects/fpsText';
import PhaserVersion from '../objects/phaserVersion';
import { centerOnScreen } from '../utils/centerOnScreen';
import Tile from '../objects/Tile';
import { getTileNeighbours } from '../utils/getTileNeighbours';

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
   * Generate mines excluding the id, then populate the `surroundingMines` and
   * `neighbours` property on each tile instance.
   * @param id Tile id to exclude
   */
  public generateMines(id: number) {
    let remainingMines = this.MINES;

    while (remainingMines > 0) {
      const pick: Tile = Phaser.Math.RND.pick(this.tiles);
      if (pick.id !== id) {
        pick.isMined = true;
        remainingMines--;
      }
    }

    this.areMinesGenerated = true;

    // generate neighbours for each tile
    this.tiles.forEach((tile) => {
      // get neighbour ids
      const neighbourIds = getTileNeighbours(tile.id, this.width, this.height);

      // associate ids with Tile instances
      tile.neighbours = neighbourIds.map((id) => {
        const neighbour = this.tiles.find((tile) => tile.id === id)!;

        // update mine count
        if (neighbour.isMined) {
          tile.surroundingMines++;
        }

        return neighbour;
      });
    });
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
