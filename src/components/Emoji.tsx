/** @jsx jsx **/
import { jsx, css } from '@emotion/core';
import { useEffect, useState } from 'react';
import { GameEvents } from '../scripts/events';

export interface EmojiConfig {
  height: number;
  scale: number;
  x: number;
}

interface EmojiProps {
  game: Phaser.Game;
  config: EmojiConfig;
}

const emojis = {
  think: {
    alt: 'spinning thinking emoji',
    src: './assets/spinthink.gif',
  },
  gasp: {
    alt: 'gasping emoji',
    src: './assets/gasp.png',
  },
  pain: {
    alt: 'dizzy face emoji',
    src: './assets/dead.png',
  },
};

function Emoji({ game, config: { height, scale, x } }: EmojiProps) {
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
        position: absolute;
        height: ${scaledHeight}px;
        top: ${75 * scale - half}px;
        left: ${x - half}px;
      `}
      {...emoji}
    />
  );
}

export default Emoji;
