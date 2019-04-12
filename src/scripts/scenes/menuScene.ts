import { Scenes } from '../events';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    // dispatch scene change event for react to load render main menu
    this.game.events.emit(Scenes.MAINMENU);
    // init global listeners
    this.game.events.on('start:easy', () => this.scene.start('MainScene'));
    this.game.events.on('start:medium', () => this.scene.start('MainScene'));
    this.game.events.on('start:hard', () => this.scene.start('MainScene'));
  }
}
