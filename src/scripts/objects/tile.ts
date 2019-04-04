import { interpret } from 'xstate';
import { Interpreter } from 'xstate/lib/interpreter';
import { Tiles } from '../utils';
import { TileSchema, TileEvent, createTileMachine } from './TileMachine';

interface TileConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  tile?: number;
}

export default class Tile extends Phaser.GameObjects.Image {
  stateMachine: Interpreter<Tile, TileSchema, TileEvent>;
  areMinesGenerated = false;
  isMined = false;
  surroundingMines: number;

  constructor(params: TileConfig) {
    super(
      params.scene,
      params.x,
      params.y,
      'tiles',
      params.tile || Tiles.DEFAULT
    );

    this.initMachine();

    this.scene.add.existing(this);
    this.setInteractive({ cursor: 'pointer' });
    this.on('pointerdown', this.handleClick);
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

  // private reveal() {
  //   if (!this.isRevealed) {
  //     this.setFrame(Tiles.ZERO);
  //     this.off('pointerdown');
  //   }
  // }

  // private flag() {
  //   this.setFrame(this.isFlagged ? Tiles.DEFAULT : Tiles.FLAG);
  //   this.isFlagged = !this.isFlagged;
  // }
}
