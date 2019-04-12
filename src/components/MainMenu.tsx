/** @jsx jsx **/
import { jsx, css } from '@emotion/core';
import { useLayoutEffect, useState } from 'react';
import Button from './Button';

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
    transition: opacity 200ms ease-in-out;
  `,
};

export default MainMenu;
