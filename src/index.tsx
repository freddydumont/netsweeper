/** @jsx jsx **/
import { jsx, css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { createGame } from './scripts/game';
import MainMenu from './components/MainMenu';
import { Scenes, GameEvents } from './scripts/events';
import { theme } from './styles/theme';

function App() {
  const [game, setGame] = useState<Phaser.Game>();
  const [scene, setScene] = useState(Scenes.PRELOAD);
  // TODO: extract board to its own component
  const [board, setBoard] = useState<GridAlignConfig>({});

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
          (board: Required<GridAlignConfig>, { scaleX, scaleY }) => {
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
        // @ts-ignore
        {scene === Scenes.GAME && <div css={styles.board(board)} />}
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

  board: (board: Required<GridAlignConfig>) => css`
    cursor: pointer;
    position: absolute;
    top: ${board.y}px;
    left: ${board.x}px;
    width: ${board.width * board.cellWidth}px;
    height: ${board.height * board.cellHeight}px;
    box-shadow: 0 2px 32px rgb(10, 189, 198, 0.75);
  `,
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('react')
);
