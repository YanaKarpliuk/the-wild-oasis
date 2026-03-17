import { css } from 'styled-components';

// Media breakpoint mixins.
const breakpoints = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1200
};

export const mediaBreakpointUp = (key) => (...args) => {
  const breakpointValue = breakpoints[key] || key;

  return css`
    @media (min-width: ${breakpointValue}px) {
      ${css(...args)}
    }
  `;
};

export const mediaBreakpointDown = (key) => (...args) => {
  const breakpointValue = breakpoints[key] || key;

  return css`
    @media (max-width: ${breakpointValue - 1}px) {
      ${css(...args)}
    }
  `;
};