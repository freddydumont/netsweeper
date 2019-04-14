import styled from '@emotion/styled';
import { Colors } from '../styles/theme';
import { shadow } from './Button';

interface BoardProps {
  color: Colors;
  board: Required<GridAlignConfig>;
}

/**
 * Creates a Shadow effect the same color as the difficulty option
 * around the game board.
 * @param props
 * @param props.color difficulty color
 * @param props.board config that allows us to align to canvas board
 */
const BoardShadow = styled.div<BoardProps>`
  cursor: pointer;
  position: absolute;
  top: ${({ board }) => board.y}px;
  left: ${({ board }) => board.x}px;
  width: ${({ board }) => board.width * board.cellWidth}px;
  height: ${({ board }) => board.height * board.cellHeight}px;
  box-shadow: 0 2px 32px ${(props) => shadow(props)};
`;

export default BoardShadow;
