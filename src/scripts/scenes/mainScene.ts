import FpsText from '../objects/fpsText';
import PhaserVersion from '../objects/phaserVersion';
import { centerOnScreen } from '../utils/centerOnScreen';
import Tile from '../objects/Tile';
import { getTileNeighbours } from '../utils/getTileNeighbours';
import { Scenes, GameEvents } from '../events';
import { Difficulty } from '../difficulties';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../game';

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
    const { width, height, tileSize, color } = this.difficulty;

    // Generates 1 Tile instance per grid tile
    this.tiles = new Array(width * height).fill(0).map(
      (_, i) =>
        new Tile({
          scene: this,
          x: 0,
          y: 0,
          id: i + 1,
          scale: tileSize / 32,
        })
    );

    // Align tiles and center grid on screen
    const { x, y } = centerOnScreen(
      this.cameras.main,
      width * tileSize,
      height * tileSize
    );

    const gridAlignConfig = {
      width,
      height,
      cellWidth: tileSize,
      cellHeight: tileSize,
      x: x + tileSize / 2,
      y: y + tileSize / 2,
    };

    Phaser.Actions.GridAlign(this.tiles, gridAlignConfig);

    // * The following setup is to align the CSS box shadow to the board:
    // 1) get the width and height of the canvas
    const { width: canvasWidth, height: canvasHeight } = document.querySelector(
      'canvas'
    )!.style;

    // 2) Get the current scale. This works because we know our defaults.
    const scaleX = parseFloat(canvasWidth!) / DEFAULT_WIDTH;
    const scaleY = parseFloat(canvasHeight!) / DEFAULT_HEIGHT;

    // 3) Emit the board_generated event along with the config and scale.
    //    To be used by the react component.
    this.game.events.emit(GameEvents.BOARD_GENERATED, gridAlignConfig, {
      scaleX,
      scaleY,
      color,
    });
  }

  private displayDebugInfo() {
    new PhaserVersion(this);
    this.fpsText = new FpsText(this);
  }
}
