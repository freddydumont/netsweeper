/**
 * Syncs the provided element's styles with the canvas. (Position, etc.)
 * @param id html element id
 * @param [canvas] default will be querySelector, better to provide it with `this.game.canvas`
 * @returns true if succesful, false if id was not found
 */
function syncStyles(id: string, canvas?: HTMLCanvasElement) {
  const styles = canvas
    ? canvas.style
    : document.querySelector('canvas')!.style;
  const element = document.getElementById(id);
  if (element) {
    element.setAttribute('style', styles.cssText);
    return true;
  }
  return false;
}

export { syncStyles };
