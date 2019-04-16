import { Digits } from '../utils/Digits';
import { numberToFrames } from '../utils/numberToFrames';

interface MineCountConfig {
  scene: Phaser.Scene;
  initialCount: number;
}

/**
 * Displays the current hidden mine count in digit images.
 */
export default class MineCount extends Phaser.GameObjects.Group {
  gridAlignConfig: GridAlignConfig;

  constructor(params: MineCountConfig) {
    super(params.scene, [
      new Phaser.GameObjects.Image(params.scene, 0, 0, 'digits', Digits.ZERO),
      new Phaser.GameObjects.Image(params.scene, 1, 0, 'digits', Digits.ZERO),
      new Phaser.GameObjects.Image(params.scene, 2, 0, 'digits', Digits.ZERO),
    ]);

    this.gridAlignConfig = {
      cellHeight: 46,
      cellWidth: 26,
      width: 3,
      height: 1,
      x: 100,
      y: 50,
    };

    Phaser.Actions.GridAlign(this.getChildren(), this.gridAlignConfig);

    // @ts-ignore // ! phaser types not generic, can't tell it what child is
    this.getChildren().forEach((child: Phaser.GameObjects.Image, i) => {
      // give images the right sprite
      const sprites = numberToFrames(params.initialCount);
      child.setFrame(sprites[i]);
      // add to scene
      this.scene.add.existing(child);
    });
  }

  /**
   * Update the mine count sprites.
   * @param count the new number to display
   */
  public updateSprites(count: number) {
    const sprites = numberToFrames(count);
    // @ts-ignore // ! phaser types not generic, can't tell it what child is
    this.getChildren().forEach((child: Phaser.GameObjects.Image, i) => {
      child.setFrame(sprites[i]);
    });
  }
}
