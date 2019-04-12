/** @jsx jsx **/
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { palette } from '../styles/variables';
import { useLayoutEffect, useState } from 'react';

function MainMenu() {
  const [opacity, setOpacity] = useState(0);

  useLayoutEffect(() => {
    requestAnimationFrame(() => setOpacity(1));
  }, []);

  return (
    <div css={styles.menu(opacity)}>
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
  menu: (opacity: number) => css`
    color: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    opacity: ${opacity};
    transition: opacity 150ms ease-in-out;
  `,
};

export default MainMenu;
