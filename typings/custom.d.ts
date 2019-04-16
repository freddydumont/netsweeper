import { Colors } from '../src/styles/theme';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface BoxShadowConfig extends Omit<Required<GridAlignConfig>, 'position'> {
  scaleX: number;
  scaleY: number;
  color: Colors;
}

interface BoxShadow {
  x: number;
  y: number;
  width: number;
  height: number;
  color: Colors;
}
