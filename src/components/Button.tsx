import styled from '../styles/theme';

const Button = styled.button`
  cursor: pointer;
  color: #fff;
  font-size: ${(props) => props.theme.fontSizes.f2};
  background: ${(props) => props.theme.colors.teal};
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px ${(props) => props.theme.colors.tealShadow};
  width: 20rem;
  height: 5rem;
`;

export default Button;
