/** @jsx jsx **/
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { palette } from '../styles/variables';

function MainMenu() {
  return (
    <div css={styles.menu}>
      <Button>test</Button>
    </div>
  );
}

const Button = styled.button`
  cursor: pointer;
  color: #fff;
  font-size: 1.5rem;
  background: ${palette.teal};
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(10, 189, 198, 0.75);
  width: 100px;
  height: 50px;
`;

const styles = {
  menu: css`
    color: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
};

export default MainMenu;
