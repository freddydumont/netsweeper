import { Machine } from 'xstate';
import Tile from './Tile';
import { Tiles } from '../utils';

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
                actions: 'lose_game',
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
        isFirstClick(context) {
          return !context.areMinesGenerated;
        },
        isMined(context) {
          return context.isMined;
        },
        isZero(context) {
          return context.surroundingMines === 0;
        },
      },
      actions: {
        display_idle(context) {
          if (context.frame.sourceIndex !== Tiles.DEFAULT) {
            context.setFrame(Tiles.DEFAULT);
          }
        },
      },
    },
    context
  );

export { TileSchema, TileEvent, createTileMachine };
