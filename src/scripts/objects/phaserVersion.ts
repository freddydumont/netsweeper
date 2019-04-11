export default class PhaserVersion extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene) {
    super(
      scene,
      scene.cameras.main.width - 15,
      15,
      `Phaser v${Phaser.VERSION}`,
      {
        color: '#fff',
        fontSize: 24,
      }
    );
    scene.add.existing(this);
    this.setOrigin(1, 0);
  }
}
