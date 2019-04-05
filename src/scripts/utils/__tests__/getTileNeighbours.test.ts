import { getTileNeighbours } from '../getTileNeighbours';

describe('getTileNeighbours', () => {
  it('should return the tiles neighbours in an array', () => {
    expect(getTileNeighbours(5, 9, 9)).toEqual([6, 15, 14, 13, 4]);
  });

  it('should return neighbours', () => {
    expect(getTileNeighbours(49, 9, 9)).toEqual([
      39,
      40,
      41,
      50,
      59,
      58,
      57,
      48,
    ]);
  });
});
