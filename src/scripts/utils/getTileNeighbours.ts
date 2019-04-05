/** Return an array of neighbouring tile IDs */
export function getTileNeighbours(
  id: number,
  width: number,
  height: number
): number[] {
  let result: number[] = [];
  const hasLeftNeighbours = id % width !== 1;
  const hasRightNeighbours = id % width !== 0;
  // top left
  result.push(hasLeftNeighbours ? id - width - 1 : -1);
  // top
  result.push(id - width);
  // top right
  result.push(hasRightNeighbours ? id - width + 1 : -1);
  // right
  result.push(hasRightNeighbours ? id + 1 : -1);
  // bottom right
  result.push(hasRightNeighbours ? id + width + 1 : -1);
  // bottom
  result.push(id + width);
  // bottom left
  result.push(hasLeftNeighbours ? id + width - 1 : -1);
  // left
  result.push(hasLeftNeighbours ? id - 1 : -1);
  // filter out ids that don't exist
  return result.filter((id) => id > 0 && id <= width * height);
}
