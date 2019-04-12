import styled, { Colors } from '../styles/theme';

interface ButtonProps {
  color: Colors;
}

/** This creates a drop shadow border, add to box-shadow */
const border = (props) => `0 0 0 3px ${props.theme.colors[props.color]};`;
/** returns the shadow color */
const shadow = (props) => props.theme.colors[`${props.color}Shadow`];

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  position: relative;
  color: ${(props) => props.theme.colors[props.color]};
  font-size: ${(props) => props.theme.fontSizes.f2};
  background: transparent;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px ${(props) => shadow(props)}, ${(props) => border(props)};
  width: 20rem;
  height: 5rem;
  transition: background-color 250ms ease-in;
  transition: color 250ms ease-in;

  &::before {
    /* Position the pseudo-element. */
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    /* Create the box shadow at expanded size. */
    box-shadow: 0 0 16px 2px ${(props) => shadow(props)},
      0 0 16px 0 ${(props) => shadow(props)} inset;

    /* Hidden by default. */
    opacity: 0;
    transition: opacity 100ms ease-in;
  }

  &:hover::before,
  &:focus::before {
    opacity: 1;
    filter: brightness(112.5%);
  }

  &:active {
    color: ${(props) => props.theme.colors.dark};
    background: ${(props) => props.theme.colors[props.color]};
  }
`;

export default Button;
