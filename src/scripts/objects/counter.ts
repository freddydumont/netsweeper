import { Digits } from '../utils/Digits';
import { numberToFrames } from '../utils/numberToFrames';

interface CounterConfig {
  scene: Phaser.Scene;
  initialCount: number;
  positon: {
    x: number;
    y: number;
  };
}

/**
 * Displays a counter in digit images.
 */
export default class Counter extends Phaser.GameObjects.Group {
  gridAlignConfig: GridAlignConfig;

  constructor(params: CounterConfig) {
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
      x: params.positon.x,
      y: params.positon.y,
    };

    Phaser.Actions.GridAlign(this.getChildren(), this.gridAlignConfig);

    this.children.each((child, i) => {
      // give images the right sprite
      const sprites = numberToFrames(params.initialCount);
      (child as Phaser.GameObjects.Image).setFrame(sprites[i]);
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
    this.children.each((child, i) => {
      (child as Phaser.GameObjects.Image).setFrame(sprites[i]);
    });
  }
}
