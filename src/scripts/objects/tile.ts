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
  scale: number;
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
    this.setInteractive({
      useHandCursor: true,
    });

    this.on(Phaser.Input.Events.POINTER_DOWN, this.handleClick);
    this.on(Phaser.Input.Events.POINTER_OUT, () => {
      this.stateMachine.send('POINTER_OUT');
    });

    this.on(Phaser.Input.Events.POINTER_UP, () => {
      this.stateMachine.send('POINTER_UP');
    });

    this.on(Phaser.Input.Events.POINTER_OVER, () => {
      this.stateMachine.send('POINTER_OVER');
    });

    this.setScale(params.scale);
    this.setOrigin(0);
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
      this.stateMachine.send('POINTER_DOWN');
    } else {
      this.stateMachine.send('RIGHT_CLICK');
    }
  }
}
