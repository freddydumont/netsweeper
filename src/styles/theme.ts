import styled, { CreateStyled } from '@emotion/styled';

export type Colors = 'teal' | 'pink' | 'purple' | 'blue' | 'dark' | 'red';

interface Theme {
  colors: {
    red: string;
    purple: string;
    teal: string;
    pink: string;
    blue: string;
    dark: string;
    redShadow: string;
    purpleShadow: string;
    pinkShadow: string;
    tealShadow: string;
    blueShadow: string;
    darkShadow: string;
  };
  fontSizes: {
    f1: string;
    f2: string;
    f3: string;
    f4: string;
    f5: string;
    f6: string;
    f7: string;
  };
}

export default styled as CreateStyled<Theme>;

export const theme = {
  colors: {
    red: 'rgb(255,0,0)',
    redShadow: 'rgb(255,0,0, 0.75)',
    purple: 'rgb(216,0,255)',
    purpleShadow: 'rgb(216,0,255, 0.75)',
    pink: 'rgb(234,0,217)',
    pinkShadow: 'rgb(234,0,217, 0.75)',
    teal: 'rgb(10,189,198)',
    tealShadow: 'rgb(10,189,198, 0.75)',
    blue: 'rgb(19,62,124)',
    blueShadow: 'rgb(19,62,124, 0.75)',
    dark: 'rgb(9,24,51)',
    darkShadow: 'rgb(9,24,51, 0.75)',
  },
  fontSizes: {
    f1: '3rem',
    f2: '2.25rem',
    f3: '1.5rem',
    f4: '1.25rem',
    f5: '1rem',
    f6: '0.875rem',
    f7: '0.75rem',
  },
};
