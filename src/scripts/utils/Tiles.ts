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

export const TilesByNumbers = [
  Tiles.ZERO,
  Tiles.ONE,
  Tiles.TWO,
  Tiles.THREE,
  Tiles.FOUR,
  Tiles.FIVE,
  Tiles.SIX,
  Tiles.SEVEN,
  Tiles.EIGHT,
];
