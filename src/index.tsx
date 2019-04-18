/** @jsx jsx **/
import { jsx, css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { createGame } from './scripts/game';
import MainMenu from './components/MainMenu';
import { BoardShadow, CountShadow } from './components/BoxShadow';
import { Scenes, GameEvents } from './scripts/events';
import { theme } from './styles/theme';
import { BoxShadowConfig } from '../typings/custom';
import { setBoxShadow } from './scripts/utils/setBoxShadow';
import Emoji, { EmojiConfig } from './components/Emoji';

function App() {
  const [game, setGame] = useState<Phaser.Game>();
  const [scene, setScene] = useState(Scenes.PRELOAD);
  const [board, setBoard] = useState<BoxShadowConfig | undefined>();
  const [mineCount, setMineCount] = useState<BoxShadowConfig | undefined>();
  const [timer, setTimer] = useState<BoxShadowConfig | undefined>();
  const [emojiConfig, setEmojiConfig] = useState<EmojiConfig | undefined>();

  /** Create the game on mount and init scene change listeners */
  useEffect(() => {
    if (!game) {
      createGame().then((game) => {
        setGame(game);
        // these listeners change the scene in state, to be used in render
        // to display different UIs according to state
        game.events.on(Scenes.MAINMENU, () => setScene(Scenes.MAINMENU));
        game.events.on(Scenes.GAME, () => {
          // remove pointer events for canvas pass-through
          document.getElementById('menu')!.style.pointerEvents = 'none';
          setScene(Scenes.GAME);
        });

        game.events.on(GameEvents.BOARD_GENERATED, (board: BoxShadowConfig) =>
          setBoxShadow(board, setBoard)
        );

        game.events.on(GameEvents.MINECOUNT_GENERATED, (box: BoxShadowConfig) =>
          setBoxShadow(box, setMineCount)
        );

        game.events.on(GameEvents.TIMER_GENERATED, (box: BoxShadowConfig) =>
          setBoxShadow(box, setTimer)
        );

        game.events.on(GameEvents.EMOJI_UPDATED, (box: EmojiConfig) => {
          setEmojiConfig(box);
        });
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
          <BoardShadow board={board} pointer />
        )}
        {scene === Scenes.GAME && mineCount && (
          <CountShadow board={mineCount} />
        )}
        {scene === Scenes.GAME && timer && <CountShadow board={timer} />}
        {scene === Scenes.GAME && emojiConfig && (
          <Emoji game={game} config={emojiConfig} />
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
