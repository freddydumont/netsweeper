import { Tiles } from '../utils';

interface TileConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  tile?: number;
}

export default class Tile extends Phaser.GameObjects.Image {
  constructor(params: TileConfig) {
    super(params.scene, params.x, params.y, 'tiles', params.tile || Tiles.TILE);

    this.scene.add.existing(this);
    this.setInteractive({ cursor: 'pointer' });
    this.on('pointerdown', (...args) => console.log(args));
  }
}
