import PhaserLogo from '../objects/phaserLogo';
import FpsText from '../objects/fpsText';
import PhaserVersion from '../objects/phaserVersion';

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    new PhaserLogo(this, this.cameras.main.width / 2, 0);
    new PhaserVersion(this);
    this.fpsText = new FpsText(this);
  }

  update() {
    this.fpsText.update(this);
  }
}
//
