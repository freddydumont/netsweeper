import styled from '@emotion/styled';
import { shadow } from './Button';
import { BoxShadowConfig } from '../../typings/custom';

interface BoardProps {
  board: BoxShadowConfig;
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
  width: ${({ board }) => board.width}px;
  height: ${({ board }) => board.height}px;
  box-shadow: 0 2px 32px
    ${(props) => shadow({ color: props.board.color, ...props })};
`;

export default BoardShadow;
