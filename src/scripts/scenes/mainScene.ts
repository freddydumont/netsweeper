import FpsText from '../objects/fpsText';
import PhaserVersion from '../objects/phaserVersion';
import { centerOnScreen } from '../utils/centerOnScreen';
import Tile from '../objects/Tile';
import { getTileNeighbours } from '../utils/getTileNeighbours';
import { Scenes } from '../events';
import { Difficulty } from '../difficulties';

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;
  tiles: Tile[];
  areMinesGenerated = false;
  difficulty: Difficulty;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    // dispatch scene change event for react remove menu
    this.game.events.emit(Scenes.GAME);
    this.displayDebugInfo();
    this.generateGameBoard();
  }

  update() {
    this.fpsText.update(this);
  }

  /**
   * Difficulty is set when a main menu button is clicked
   * @param difficulty config object
   */
  public setDifficulty(difficulty: Difficulty) {
    this.difficulty = difficulty;
  }

  /**
   * Generate mines excluding the id, then populate the `surroundingMines` and
   * `neighbours` property on each tile instance.
   * @param id Tile id to exclude
   */
  public generateMines(id: number) {
    let remainingMines = this.difficulty.mines;

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
      const neighbourIds = getTileNeighbours(
        tile.id,
        this.difficulty.width,
        this.difficulty.height
      );

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
    this.tiles = new Array(this.difficulty.width * this.difficulty.height)
      .fill(0)
      .map(
        (_, i) =>
          new Tile({
            scene: this,
            x: 0,
            y: 0,
            id: i + 1,
            scale: this.difficulty.tileSize / 32,
          })
      );

    // Align tiles and center grid on screen
    const { x, y } = centerOnScreen(
      this.cameras.main,
      this.difficulty.width * this.difficulty.tileSize,
      this.difficulty.height * this.difficulty.tileSize
    );

    Phaser.Actions.GridAlign(this.tiles, {
      width: this.difficulty.width,
      height: this.difficulty.height,
      cellWidth: this.difficulty.tileSize,
      cellHeight: this.difficulty.tileSize,
      x: x + this.difficulty.tileSize / 2,
      y: y + this.difficulty.tileSize / 2,
    });
  }

  private displayDebugInfo() {
    new PhaserVersion(this);
    this.fpsText = new FpsText(this);
  }
}
