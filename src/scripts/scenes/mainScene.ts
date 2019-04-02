import FpsText from '../objects/fpsText';
import PhaserVersion from '../objects/phaserVersion';

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    new PhaserVersion(this);
    this.fpsText = new FpsText(this);
  }

  update() {
    this.fpsText.update(this);
  }
}
//
