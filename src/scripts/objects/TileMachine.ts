import { Machine } from 'xstate';
import Tile from './Tile';
import { Tiles, TilesByNumbers } from '../utils/Tiles';
import { GameEvents } from '../events';

interface TileSchema {
  states: {
    idle: {};
    down: {};
    flag: {};
    mark: {};
    mark_down: {};
    reveal: {};
    end: {};
  };
}

type TileEvent =
  | { type: 'RIGHT_CLICK' }
  | { type: 'NEIGHBOUR_REVEALED' }
  | { type: 'POINTER_DOWN' }
  | { type: 'POINTER_OUT' }
  | { type: 'POINTER_UP' }
  | { type: 'POINTER_OVER' };

/**
 * Generates a state machine based on the provided context.
 * @param context instance of a Tile class eg. `this`
 */
const createTileMachine = (context: Tile) =>
  Machine<Tile, TileSchema, TileEvent>(
    {
      id: 'tile',
      initial: 'idle',
      states: {
        idle: {
          onEntry: 'display_idle',
          on: {
            POINTER_DOWN: 'down',
            POINTER_OVER: {
              target: 'down',
              cond: 'isPointerDown',
            },
            RIGHT_CLICK: 'flag',
            NEIGHBOUR_REVEALED: 'reveal',
          },
        },
        down: {
          onEntry: 'display_zero',
          on: {
            POINTER_OUT: 'idle',
            POINTER_UP: 'reveal',
          },
        },
        flag: {
          onEntry: 'display_flag',
          on: {
            RIGHT_CLICK: 'mark',
            NEIGHBOUR_REVEALED: 'reveal',
          },
        },
        mark: {
          onEntry: 'display_mark',
          on: {
            POINTER_DOWN: 'mark_down',
            POINTER_OVER: {
              target: 'mark_down',
              cond: 'isPointerDown',
            },
            RIGHT_CLICK: 'idle',
            NEIGHBOUR_REVEALED: 'reveal',
          },
        },
        mark_down: {
          onEntry: 'display_mark_down',
          on: {
            POINTER_OUT: 'mark',
            POINTER_UP: 'reveal',
          },
        },
        reveal: {
          on: {
            '': [
              {
                cond: 'isFirstClick',
                target: 'end',
                actions: ['generate_mines', 'reveal'],
              },
              {
                cond: 'isMined',
                target: 'end',
                actions: ['reveal_mines', 'lose_game'],
              },
              {
                target: 'end',
                actions: ['reveal'],
              },
            ],
          },
        },
        end: {
          type: 'final',
          onEntry: 'unregister_listeners',
        },
      },
    },
    {
      guards: {
        isFirstClick(tile) {
          return !tile.scene.areMinesGenerated;
        },
        isMined(tile) {
          return tile.isMined;
        },
        isPointerDown(tile) {
          return tile.scene.input.activePointer.primaryDown;
        },
      },
      actions: {
        /**
         * This is called `onEntry` of the initial state.
         * Since it already has the right frame, we need a condition
         * to avoid calling `setFrame` uselessly.
         */
        display_idle(tile) {
          if (tile.frame.name !== Tiles.DEFAULT.toString()) {
            tile.setFrame(Tiles.DEFAULT);
            tile.scene.game.events.emit(GameEvents.EMOJI_THINK);
          }
        },

        display_zero(tile) {
          tile.setFrame(Tiles.ZERO);
          tile.scene.game.events.emit(GameEvents.EMOJI_GASP);
        },

        display_mark_down(tile) {
          tile.setFrame(Tiles.QUESTION_MARK_PRESSED);
          tile.scene.game.events.emit(GameEvents.EMOJI_GASP);
        },

        /** Display flag sprite and decrease hidden mine count in scene */
        display_flag(tile) {
          tile.setFrame(Tiles.FLAG);
          tile.scene.flagMine();
        },

        /** Display mark sprite and increase hidden mine count in scene */
        display_mark(tile) {
          tile.setFrame(Tiles.QUESTION_MARK);
          tile.scene.unflagMine();
        },

        generate_mines(tile) {
          tile.scene.generateMines(tile.id);
        },

        /** Display appropriate tile */
        reveal(tile) {
          tile.scene.game.events.emit(GameEvents.EMOJI_THINK);
          tile.setFrame(TilesByNumbers[tile.surroundingMines]);

          // if you reveal a zero, all surrounding tiles are revealed
          if (tile.surroundingMines === 0) {
            tile.neighbours.forEach((tile) => {
              tile.onNeighbourRevealed();
            });
          }
        },

        /** Reveal all mines. The one that was clicked is highlighted. */
        reveal_mines(tile) {
          tile.scene.tiles.forEach((t) => {
            if (t.isMined) {
              t.setFrame(Tiles.MINE);
            }
          });

          tile.setFrame(Tiles.MINE_WRONG);
        },

        /** Disable clicks on Tile when end state is reached */
        unregister_listeners(tile) {
          tile.removeInteractive();
        },

        lose_game(tile) {
          // remove interactivity on all tiles
          tile.scene.tiles.forEach((t) => {
            t.removeInteractive();
          });
          // stop the timer
          clearInterval(tile.scene.clock);
          // display losing emoji
          tile.scene.game.events.emit(GameEvents.EMOJI_DEAD);
        },
      },
    },
    context
  );

export { TileSchema, TileEvent, createTileMachine };
