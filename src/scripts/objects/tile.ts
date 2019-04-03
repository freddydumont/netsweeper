import { Tiles } from '../utils';

interface TileConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  tile?: number;
}

export default class Tile extends Phaser.GameObjects.Image {
  isRevealed: boolean = false;
  isFlagged: boolean = false;

  constructor(params: TileConfig) {
    super(
      params.scene,
      params.x,
      params.y,
      'tiles',
      params.tile || Tiles.DEFAULT
    );

    this.scene.add.existing(this);
    this.setInteractive({ cursor: 'pointer' });
    this.on('pointerdown', this.handleClick);
  }

  private handleClick({ buttons }: Phaser.Input.Pointer) {
    if (buttons === 1) {
      this.reveal();
    } else {
      this.flag();
    }
  }

  private reveal() {
    if (!this.isRevealed) {
      this.setFrame(Tiles.ZERO);
      this.off('pointerdown');
    }
  }

  private flag() {
    this.setFrame(this.isFlagged ? Tiles.DEFAULT : Tiles.FLAG);
    this.isFlagged = !this.isFlagged;
  }
}
