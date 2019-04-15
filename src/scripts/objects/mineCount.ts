import { Digits } from '../utils/Digits';

interface MineCountConfig {
  scene: Phaser.Scene;
  count: number;
}

/**
 * Displays the current hidden mine count in digit images.
 */
export default class MineCount extends Phaser.GameObjects.Group {
  constructor(params: MineCountConfig) {
    super(params.scene, [
      new Phaser.GameObjects.Image(params.scene, 0, 0, 'digits', Digits.ZERO),
      new Phaser.GameObjects.Image(params.scene, 1, 0, 'digits', Digits.ZERO),
      new Phaser.GameObjects.Image(params.scene, 2, 0, 'digits', Digits.ZERO),
    ]);

    Phaser.Actions.GridAlign(this.getChildren(), {
      cellHeight: 46,
      cellWidth: 26,
      width: 3,
      x: 100,
      y: 100,
    });

    this.getChildren().forEach((child) => {
      this.scene.add.existing(child);
    });
  }
}
