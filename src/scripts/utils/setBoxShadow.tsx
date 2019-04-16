import { Dispatch, SetStateAction } from 'react';
import { BoxShadowConfig } from '../../../typings/custom';

export function setBoxShadow(
  box: BoxShadowConfig,
  setCallback: Dispatch<SetStateAction<BoxShadowConfig | undefined>>
) {
  return setCallback({
    ...box,
    x: (box.x - box.cellWidth / 2) * box.scaleX,
    y: (box.y - box.cellHeight / 2) * box.scaleY,
    width: box.width * box.scaleX * box.cellWidth,
    height: box.height * box.scaleY * box.cellHeight,
  });
}
