import { getTileNeighbours } from '../getTileNeighbours';

describe('getTileNeighbours', () => {
  it('should return the tiles neighbours in an array', () => {
    expect(getTileNeighbours(5, 9, 9)).toEqual([6, 15, 14, 13, 4]);
  });
});
