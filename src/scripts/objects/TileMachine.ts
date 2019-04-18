import { Machine } from 'xstate';
import Tile from './Tile';
import { Tiles, TilesByNumbers } from '../utils/Tiles';

interface TileSchema {
  states: {
    idle: {};
    flag: {};
    mark: {};
    reveal: {};
    end: {};
  };
}

type TileEvent =
  | { type: 'LEFT_CLICK' }
  | { type: 'RIGHT_CLICK' }
  | { type: 'NEIGHBOUR_REVEALED' };

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
            LEFT_CLICK: 'reveal',
            RIGHT_CLICK: 'flag',
            NEIGHBOUR_REVEALED: 'reveal',
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
            LEFT_CLICK: 'reveal',
            RIGHT_CLICK: 'idle',
            NEIGHBOUR_REVEALED: 'reveal',
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
          }
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
          tile.off(Phaser.Input.Events.POINTER_DOWN);
        },

        lose_game(tile) {
          // remove interactivity on all tiles
          tile.scene.tiles.forEach((t) => {
            t.removeInteractive();
          });
          // stop the timer
          clearInterval(tile.scene.clock);
        },
      },
    },
    context
  );

export { TileSchema, TileEvent, createTileMachine };
