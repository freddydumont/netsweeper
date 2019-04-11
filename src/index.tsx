/** @jsx jsx **/
import { jsx, css } from '@emotion/core';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createGame } from './scripts/game';

function App() {
  let game: Phaser.Game;

  useEffect(() => {
    game = createGame();
  }, []);

  return (
    // ids are important for positioning, see game.ts
    <div id="phaser-game" css={styles.game}>
      <div id="menu" css={styles.menu}>
        <button style={{ width: 50, height: 50, background: 'red' }}>
          test
        </button>
      </div>
    </div>
  );
}

const styles = {
  game: css`
    position: relative;
  `,

  menu: css`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  `,
};

ReactDOM.render(<App />, document.getElementById('react'));
