/** @jsx jsx **/
import { jsx, css } from '@emotion/core';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { createGame } from './scripts/game';
import MainMenu from './components/MainMenu';
import { Scenes } from './scripts/events';

function App() {
  const [game, setGame] = useState<Phaser.Game>();
  const [scene, setScene] = useState(Scenes.PRELOAD);

  /** Create the game on mount and init scene change listeners */
  useEffect(() => {
    if (!game) {
      setGame(createGame());
    } else {
      // init game listeners
      game.events.on(Scenes.MAINMENU, () => setScene(Scenes.MAINMENU));
      game.events.on(Scenes.GAME, () => setScene(Scenes.GAME));
    }
  }, [game]);

  return (
    // ids are important for positioning, see game.ts
    <div id="phaser-game" css={styles.game}>
      <div id="menu" css={styles.menu}>
        {scene === Scenes.MAINMENU && <MainMenu />}
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
