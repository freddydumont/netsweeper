import { interpret } from 'xstate';
import { Interpreter } from 'xstate/lib/interpreter';
import { Tiles } from '../utils';
import { TileSchema, TileEvent, createTileMachine } from './TileMachine';
import MainScene from '../scenes/mainScene';

interface TileConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  id: number;
  tile?: number;
}

export default class Tile extends Phaser.GameObjects.Image {
  private stateMachine: Interpreter<Tile, TileSchema, TileEvent>;
  id: number;
  isMined = false;
  surroundingMines: number;
  scene: MainScene;

  constructor(params: TileConfig) {
    super(
      params.scene,
      params.x,
      params.y,
      'tiles',
      params.tile || Tiles.DEFAULT
    );

    this.id = params.id;
    this.initMachine();

    this.scene.add.existing(this);
    this.setInteractive({ cursor: 'pointer' });
    this.on(Phaser.Input.Events.POINTER_DOWN, this.handleClick);
  }

  private initMachine() {
    this.stateMachine = interpret(createTileMachine(this))
      .onTransition((nextState) =>
        console.log(
          'TCL: Tile -> privateinitMachine -> nextState',
          nextState.value
        )
      )
      .start();
  }

  private handleClick({ buttons }: Phaser.Input.Pointer) {
    if (buttons === 1) {
      this.stateMachine.send('LEFT_CLICK');
    } else {
      this.stateMachine.send('RIGHT_CLICK');
    }
  }

  /** Returns the tile instance's neighbours */
  public getNeighbours(): number[] {
    let result: number[] = [];
    const id = this.id;
    const width = this.scene.width;

    const hasLeftNeighbours = id % width !== 1;
    const hasRightNeighbours = id % width !== 0;

    // top left
    result.push(hasLeftNeighbours ? id - width - 1 : -1);
    // top
    result.push(id - width);
    // top right
    result.push(hasRightNeighbours ? id - width + 1 : -1);
    // right
    result.push(hasRightNeighbours ? id + 1 : -1);
    // bottom right
    result.push(hasRightNeighbours ? id + width + 1 : -1);
    // bottom
    result.push(id + width);
    // bottom left
    result.push(hasLeftNeighbours ? id + width - 1 : -1);
    // left
    result.push(hasLeftNeighbours ? id - 1 : -1);

    // filter out ids that don't exist
    return result.filter(
      (id) => id > 0 && id <= this.scene.width * this.scene.height
    );
  }
}
