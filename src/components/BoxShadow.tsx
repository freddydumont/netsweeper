import styled from '@emotion/styled';
import { shadow } from './Button';
import { BoxShadow } from '../../typings/custom';

interface BoardProps {
  board: BoxShadow;
  pointer?: boolean;
}

/**
 * Creates a Shadow effect the same color as the difficulty option
 * around the game board.
 * @param props
 * @param props.board config that allows us to align to canvas board
 */
const BoardShadow = styled.div<BoardProps>`
  cursor: ${(props) => (props.pointer ? 'pointer' : 'default')};
  border-radius: 4px;
  position: absolute;
  top: ${({ board }) => board.y}px;
  left: ${({ board }) => board.x}px;
  width: ${({ board }) => board.width}px;
  height: ${({ board }) => board.height}px;
  box-shadow: 0 2px 32px
    ${(props) => shadow({ color: props.board.color, ...props })};
`;

const CountShadow = styled.div<BoardProps>`
  cursor: ${(props) => (props.pointer ? 'pointer' : 'default')};
  border-radius: 4px;
  position: absolute;
  top: ${({ board }) => board.y - 1}px;
  left: ${({ board }) => board.x - 1}px;
  width: ${({ board }) => board.width + 2}px;
  height: ${({ board }) => board.height + 2}px;
  box-shadow: 0 0 8px
    ${(props) => shadow({ color: props.board.color, ...props })} inset;
`;

export { BoardShadow, CountShadow };
