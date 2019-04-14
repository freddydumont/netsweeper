/** @jsx jsx **/
import { jsx, css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { createGame } from './scripts/game';
import MainMenu from './components/MainMenu';
import BoardShadow from './components/BoardShadow';
import { Scenes, GameEvents } from './scripts/events';
import { theme, Colors } from './styles/theme';

function App() {
  const [game, setGame] = useState<Phaser.Game>();
  const [scene, setScene] = useState(Scenes.PRELOAD);
  const [board, setBoard] = useState<Required<GridAlignConfig> | undefined>();
  const [color, setColor] = useState<Colors>('teal');

  /** Create the game on mount and init scene change listeners */
  useEffect(() => {
    if (!game) {
      createGame().then((game) => {
        setGame(game);
        // these listeners change the scene in state, to be used in render
        // to display different UIs according to state
        game.events.on(Scenes.MAINMENU, () => setScene(Scenes.MAINMENU));
        game.events.on(Scenes.GAME, () => setScene(Scenes.GAME));

        game.events.on(
          GameEvents.BOARD_GENERATED,
          (board: Required<GridAlignConfig>, { scaleX, scaleY, color }) => {
            setColor(color);
            setBoard({
              ...board,
              x: (board.x - board.cellWidth / 2) * scaleX,
              y: (board.y - board.cellHeight / 2) * scaleY,
              width: board.width * scaleX,
              height: board.height * scaleY,
            });
          }
        );
      });
    }
  }, [game]);

  if (!game) return null;

  return (
    // ids are important for positioning, see game.ts
    <div id="phaser-game" css={styles.game}>
      <div id="menu" css={styles.menu}>
        {scene === Scenes.MAINMENU && <MainMenu game={game} />}
        {scene === Scenes.GAME && board && (
          <BoardShadow board={board} color={color} />
        )}
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

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('react')
);
