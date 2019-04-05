import { Machine } from 'xstate';
import Tile from './Tile';
import { Tiles, TilesByNumbers } from '../utils/Tiles';
import { getTileNeighbours } from '../utils/getTileNeighbours';

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
            NEIGHBOUR_REVEALED: {
              target: 'reveal',
              cond: 'isZero',
            },
          },
        },
        flag: {
          onEntry: 'display_flag',
          on: {
            RIGHT_CLICK: 'mark',
          },
        },
        mark: {
          onEntry: 'display_mark',
          on: {
            LEFT_CLICK: 'reveal',
            RIGHT_CLICK: 'idle',
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
        isZero(tile) {
          return tile.surroundingMines === 0;
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
        display_flag(tile) {
          tile.setFrame(Tiles.FLAG);
        },
        display_mark(tile) {
          tile.setFrame(Tiles.QUESTION_MARK);
        },
        generate_mines(tile) {
          tile.scene.generateMines(tile.id);
        },
        /** Display appropriate tile */
        reveal(tile) {
          tile.setFrame(TilesByNumbers[tile.surroundingMines]);
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
      },
    },
    context
  );

export { TileSchema, TileEvent, createTileMachine };
