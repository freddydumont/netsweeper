/** @jsx jsx **/
import { jsx, css } from '@emotion/core';
import { useLayoutEffect, useState } from 'react';
import Button from './Button';

interface Props {
  game: Phaser.Game;
}

type difficulties = 'easy' | 'medium' | 'hard';

function MainMenu({ game }: Props) {
  const [opacity, setOpacity] = useState(0);

  useLayoutEffect(() => {
    requestAnimationFrame(() => setOpacity(1));
  }, []);

  const handleClick = (difficulty: difficulties) => {
    game.events.emit(`start:${difficulty}`);
  };

  return (
    <div css={styles.menu(opacity)}>
      <h1 css={(theme) => styles.title(theme)}>Netsweeper</h1>
      <h2 css={(theme) => styles.subtitle(theme)}>Choose your difficulty:</h2>
      <div css={styles.buttons}>
        <Button color="teal" onClick={() => handleClick('easy')}>
          Easy
        </Button>
        <Button color="pink" onClick={() => handleClick('medium')}>
          Medium
        </Button>
        <Button color="blue" onClick={() => handleClick('hard')}>
          Hard
        </Button>
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
    font-size: ${theme.fontSizes.f2};
    font-weight: 400;
    margin-bottom: 3rem;
  `,

  buttons: css`
    width: 66.6666%;
    display: flex;
    justify-content: space-around;
  `,

  menu: (opacity: number) => css`
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
