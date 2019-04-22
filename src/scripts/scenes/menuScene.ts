import { Scenes, GameEvents } from '../events';
import { syncStyles } from '../utils/syncStyles';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    // dispatch scene change event for react to load render main menu
    this.game.events.emit(Scenes.MAINMENU, this.getScale());
    // init global listeners
    this.game.events.once('start', () => this.scene.start('MainScene'));

    this.scale.on(Phaser.Scale.Events.RESIZE, () => {
      syncStyles('menu', this.game.canvas);
      this.game.events.emit(GameEvents.RESIZE, this.getScale());
    });
  }

  getScale() {
    // get the width and height of the canvas
    const { width, height } = this.game.canvas.style;

    // Get the current scale. This works because we can access the base dimensions.
    const scaleX = parseFloat(width!) / this.game.canvas.width;
    const scaleY = parseFloat(height!) / this.game.canvas.height;
    return { scaleX, scaleY };
  }
}
