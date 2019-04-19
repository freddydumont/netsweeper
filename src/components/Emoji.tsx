/** @jsx jsx **/
import { jsx, css } from '@emotion/core';
import { useEffect, useState } from 'react';
import { withTheme } from 'emotion-theming';
import { GameEvents } from '../scripts/events';
import spinthink from '../assets/spinthink.gif';
import gasp from '../assets/gasp.png';
import dead from '../assets/dead.png';
import { Colors, Theme } from '../styles/theme';
import { shadow } from './Button';

export interface EmojiConfig {
  height: number;
  scale: number;
  x: number;
}

interface EmojiProps {
  game: Phaser.Game;
  theme: Theme;
  color: Colors;
  config: EmojiConfig;
}

// Preload images
new Image().src = spinthink;
new Image().src = gasp;
new Image().src = dead;

const emojis = {
  think: {
    alt: 'spinning thinking emoji',
    src: spinthink,
  },
  gasp: {
    alt: 'gasping emoji',
    src: gasp,
  },
  pain: {
    alt: 'dizzy face emoji',
    src: dead,
  },
};

function Emoji({
  game,
  color,
  theme,
  config: { height, scale, x },
}: EmojiProps) {
  /** This is also the width since original is square */
  const scaledHeight = height * scale;
  const half = scaledHeight / 2;

  const [emoji, setEmoji] = useState(emojis.think);

  useEffect(() => {
    game.events.on(GameEvents.EMOJI_GASP, () => setEmoji(emojis.gasp));
    game.events.on(GameEvents.EMOJI_THINK, () => setEmoji(emojis.think));
    game.events.on(GameEvents.EMOJI_DEAD, () => setEmoji(emojis.pain));
  }, [game]);

  return (
    <img
      css={css`
        pointer-events: all;
        cursor: pointer;
        position: absolute;
        height: ${scaledHeight}px;
        top: ${75 * scale - half}px;
        left: ${x - half}px;
        border-radius: 50%;
        transition: box-shadow 100ms ease-in;

        &:hover {
          box-shadow: 0 0 16px 2px ${shadow({ color, theme })},
            0 0 32px 0 ${shadow({ color, theme })} inset;
        }
      `}
      onClick={() => game.events.emit(GameEvents.RESTART)}
      {...emoji}
    />
  );
}

export default withTheme(Emoji);
