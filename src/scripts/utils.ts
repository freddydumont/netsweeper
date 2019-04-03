/**
 * Mapping of tile names to tileset.
 * The order is important because of the enum's implicit number values.
 */
export enum Tiles {
  DEFAULT,
  ZERO,
  FLAG,
  QUESTION_MARK,
  QUESTION_MARK_PRESSED,
  MINE,
  MINE_WRONG,
  FLAG_WRONG,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
}

/**
 * Centers an object on the scene.
 * @param camera scene main camera
 * @param width width of the object
 * @param height height of the object
 * @returns centered coordinates
 */
export function centerOnScreen(
  camera: Phaser.Cameras.Scene2D.Camera,
  width: number,
  height: number
): { x: number; y: number } {
  const { centerX, centerY } = camera;
  return {
    x: centerX - width / 2,
    y: centerY - height / 2,
  };
}
