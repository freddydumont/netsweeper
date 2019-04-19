import { Colors } from '../styles/theme';

type difficulties = 'easy' | 'medium' | 'hard';

interface Difficulty {
  width: number;
  height: number;
  mines: number;
  tiles: number;
  tileSize: number;
  color: Colors;
}

interface Difficulties {
  easy: Difficulty;
  medium: Difficulty;
  hard: Difficulty;
}

const difficulties: Difficulties = {
  easy: {
    width: 9,
    height: 9,
    tiles: 81,
    mines: 10,
    tileSize: 32,
    color: 'teal',
  },
  medium: {
    width: 16,
    height: 16,
    tiles: 256,
    mines: 40,
    tileSize: 24,
    color: 'pink',
  },
  hard: {
    width: 30,
    height: 16,
    tiles: 480,
    mines: 99,
    tileSize: 24,
    color: 'purple',
  },
};

export { difficulties, Difficulty };
