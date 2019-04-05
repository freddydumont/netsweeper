import { interpret } from 'xstate';
import { Interpreter } from 'xstate/lib/interpreter';
import { Tiles } from '../utils/Tiles';
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
  neighbours: Tile[];
  surroundingMines = 0;
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

  public onNeighbourRevealed() {
    if (this.stateMachine.state.value !== 'end') {
      this.stateMachine.send('NEIGHBOUR_REVEALED');
    }
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
}
