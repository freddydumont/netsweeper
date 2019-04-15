import { Scenes } from '../events';
import { syncStyles } from '../utils/syncStyles';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    // dispatch scene change event for react to load render main menu
    this.game.events.emit(Scenes.MAINMENU);
    // init global listeners
    this.game.events.once('start', () => this.scene.start('MainScene'));

    this.scale.on(Phaser.Scale.Events.RESIZE, () => {
      syncStyles('menu', this.game.canvas);
    });
  }
}
