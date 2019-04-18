/** @jsx jsx **/
import { jsx, css } from '@emotion/core';

export interface EmojiConfig {
  height: number;
  scale: number;
  x: number;
}

interface EmojiProps {
  config: EmojiConfig;
}

function Emoji({ config: { height, scale, x } }: EmojiProps) {
  /** This is also the width since original dimensions are 128 x 128 */
  const scaledHeight = height * scale;
  const half = scaledHeight / 2;

  return (
    <img
      css={css`
        position: absolute;
        height: ${scaledHeight}px;
        top: ${75 * scale - half}px;
        left: ${x - half}px;
      `}
      alt="spinning thinking emoji"
      src="./assets/spinthink.gif"
    />
  );
}

export default Emoji;
