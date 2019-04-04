/**
 * Returns the centered coordinates of an object.
 * @param camera scene main camera
 * @param width width of the object
 * @param height height of the object
 * @returns centered coordinates
 */
export function centerOnScreen(
  camera: Phaser.Cameras.Scene2D.Camera,
  width: number,
  height: number
): {
  x: number;
  y: number;
} {
  const { centerX, centerY } = camera;
  return {
    x: centerX - width / 2,
    y: centerY - height / 2,
  };
}
