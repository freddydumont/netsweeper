type difficulties = 'easy' | 'medium' | 'hard';

interface Difficulty {
  width: number;
  height: number;
  mines: number;
  tileSize: number;
}

const difficulties = {
  easy: {
    width: 9,
    height: 9,
    mines: 10,
    tileSize: 32,
  },
  medium: {
    width: 16,
    height: 16,
    mines: 40,
    tileSize: 24,
  },
  hard: {
    width: 30,
    height: 16,
    mines: 99,
    tileSize: 24,
  },
};

export { difficulties, Difficulty };
