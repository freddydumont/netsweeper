import FpsText from '../objects/fpsText';
import PhaserVersion from '../objects/phaserVersion';
import { centerOnScreen } from '../utils/centerOnScreen';
import Tile from '../objects/Tile';
import { getTileNeighbours } from '../utils/getTileNeighbours';
import { Scenes, GameEvents } from '../events';
import { Difficulty } from '../difficulties';
import Counter from '../objects/counter';

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;
  tiles: Tile[];
  mineCountSprites: Counter;
  clock: number;
  timer = 0;
  timerSprites: Counter;
  remainingTiles: number;
  areMinesGenerated = false;
  difficulty: Difficulty;
  gridAlignConfig: GridAlignConfig;
  private _hiddenMines: number;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    // dispatch scene change event for react remove menu
    this.game.events.emit(Scenes.GAME);
    // this.displayDebugInfo();
    this.generateGameBoard();

    this._hiddenMines = this.difficulty.mines;
    this.remainingTiles = this.difficulty.tiles - this.difficulty.mines;

    this.mineCountSprites = new Counter({
      scene: this,
      initialCount: this._hiddenMines,
      positon: {
        x: this.cameras.main.centerX - 200,
        y: 75,
      },
    });

    this.timerSprites = new Counter({
      scene: this,
      initialCount: this.timer,
      positon: {
        x: this.cameras.main.centerX + 200 - 2 * 26,
        y: 75,
      },
    });

    this.alignBoxShadow();
    // align with board on resize, syncStyles is initiated in `menuScene`
    this.scale.on(Phaser.Scale.Events.RESIZE, () => {
      this.alignBoxShadow();
    });

    /** Reset the state on RESTART event */
    this.game.events.once(GameEvents.RESTART, () => {
      this.resetState();
      this.scene.restart();
    });

    // reset and return to menu on ESC or Q
    this.input.keyboard.on('keydown', (event) => {
      if (
        event.keyCode === Phaser.Input.Keyboard.KeyCodes.ESC ||
        event.keyCode === Phaser.Input.Keyboard.KeyCodes.Q
      ) {
        this.resetState();
        this.scene.start('MenuScene');
      }
    });
  }

  private resetState() {
    clearInterval(this.clock);
    this.timer = 0;
    this.areMinesGenerated = false;
  }

  update() {
    // this.fpsText.update(this);
  }

  /** decrease hidden mines count */
  public flagMine() {
    this._hiddenMines = this._hiddenMines - 1;
    this.mineCountSprites.updateSprites(this._hiddenMines);
  }

  /** increase hidden mines count */
  public unflagMine() {
    this._hiddenMines = this._hiddenMines + 1;
    this.mineCountSprites.updateSprites(this._hiddenMines);
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
    // start timer
    this.clock = setInterval(() => {
      this.timer++;
      this.timerSprites.updateSprites(this.timer);
    }, 1000);

    let remainingMines = this.difficulty.mines;
    let excludedTiles = [id];

    while (remainingMines > 0) {
      const pick: Tile = Phaser.Math.RND.pick(this.tiles);
      if (!excludedTiles.find((tileId) => tileId === pick.id)) {
        pick.isMined = true;
        // * add the pick to the blacklist to avoid picking it again
        excludedTiles.push(pick.id);
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
    const { width, height, tileSize } = this.difficulty;

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

    this.gridAlignConfig = {
      width,
      height,
      cellWidth: tileSize,
      cellHeight: tileSize,
      x: x + tileSize / 2,
      y: y + tileSize / 2 + 50,
    };

    Phaser.Actions.GridAlign(this.tiles, this.gridAlignConfig);
  }

  /**
   * Aligns the CSS box shadow to the board.
   * Called on create and resize event.
   */
  private alignBoxShadow() {
    // get the width and height of the canvas
    const { width, height } = this.game.canvas.style;

    // Get the current scale. This works because we can access the base dimensions.
    const scaleX = parseFloat(width!) / this.game.canvas.width;
    const scaleY = parseFloat(height!) / this.game.canvas.height;

    // 3) Emit the board_generated event along with the config and scale.
    //    To be used by the react component.
    this.game.events.emit(GameEvents.BOARD_GENERATED, {
      ...this.gridAlignConfig,
      scaleX,
      scaleY,
      color: this.difficulty.color,
    });

    this.game.events.emit(GameEvents.MINECOUNT_GENERATED, {
      ...this.mineCountSprites.gridAlignConfig,
      scaleX,
      scaleY,
      color: 'red',
    });

    this.game.events.emit(GameEvents.TIMER_GENERATED, {
      ...this.timerSprites.gridAlignConfig,
      scaleX,
      scaleY,
      color: 'red',
    });

    const { x, cellWidth, width: boardWidth } = this
      .gridAlignConfig as Required<GridAlignConfig>;

    this.game.events.emit(GameEvents.EMOJI_UPDATED, {
      x: (x - cellWidth / 2 + (boardWidth * cellWidth) / 2) * scaleX,
      height: this.timerSprites.gridAlignConfig.cellHeight,
      scale: scaleY,
    });
  }

  private displayDebugInfo() {
    new PhaserVersion(this);
    this.fpsText = new FpsText(this);
  }
}
