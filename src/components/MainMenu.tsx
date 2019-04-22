/** @jsx jsx **/
import { jsx, css } from '@emotion/core';
import { useLayoutEffect, useState } from 'react';
import Button from './Button';
import { difficulties } from '../scripts/difficulties';
import MainScene from '../scripts/scenes/mainScene';

export interface Scale {
  scaleX: number;
  scaleY: number;
}

interface Props {
  game: Phaser.Game;
  scale: Scale;
}

function MainMenu({ game, scale }: Props) {
  const [opacity, setOpacity] = useState(0);

  useLayoutEffect(() => {
    requestAnimationFrame(() => setOpacity(1));
  }, []);

  /** Set difficulty on MainScene and start the game */
  const handleClick = (difficulty: difficulties) => {
    const scene = game.scene.getScene('MainScene') as MainScene;
    scene.setDifficulty(difficulties[difficulty]);
    game.events.emit('start');
  };

  return (
    <div css={styles.menu(opacity, scale)}>
      <h1 css={(theme) => styles.title(theme)}>Netsweeper</h1>
      <h2 css={(theme) => styles.subtitle(theme)}>Choose your difficulty</h2>
      <div css={styles.buttons}>
        <Button color="teal" onClick={() => handleClick('easy')}>
          Easy
        </Button>
        <Button color="pink" onClick={() => handleClick('medium')}>
          Medium
        </Button>
        <Button color="purple" onClick={() => handleClick('hard')}>
          Hard
        </Button>
      </div>
      <div css={(theme) => styles.paragraph(theme)}>
        <p>Reset the game at any point by clicking on the Emoji.</p>
        <p>
          Return to the Main Menu by pressing <strong>Escape</strong> or{' '}
          <strong>Q</strong>.
        </p>
      </div>
    </div>
  );
}

const styles = {
  title: (theme) => css`
    font-size: ${theme.fontSizes.f1};
    font-weight: 400;
    margin-bottom: 3rem;
  `,

  subtitle: (theme) => css`
    white-space: nowrap;
    font-size: ${theme.fontSizes.f2};
    font-weight: 400;
    margin-bottom: 3rem;
  `,

  buttons: css`
    width: 66.6666%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: 3rem;
  `,

  paragraph: (theme) => css`
    text-align: center;
    font-size: ${theme.fontSizes.f4};
    width: 66.6666%;
  `,

  menu: (opacity: number, { scaleX, scaleY }: Scale) => css`
    transform: scale(${scaleX - 0.1}, ${scaleY - 0.1});
    pointer-events: all;
    color: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    opacity: ${opacity};
    transition: opacity 200ms ease-in-out;
  `,
};

export default MainMenu;
