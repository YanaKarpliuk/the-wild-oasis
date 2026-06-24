import { css, type Interpolation, type DefaultTheme } from 'styled-components';

// Media breakpoint mixins.
const breakpoints: Breakpoints = {
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1200
};

export const mediaBreakpointUp =
    (key: Breakpoint | number) =>
    (strings: TemplateStringsArray, ...interpolations: Interpolation<DefaultTheme>[]) => {
  const breakpointValue = typeof key === 'string' ? breakpoints[key] : key;

  return css`
    @media (min-width: ${breakpointValue}px) {
      ${css(strings, ...interpolations)}
    }
  `;
};

export const mediaBreakpointDown =
    (key: Breakpoint | number) =>
        (strings: TemplateStringsArray, ...interpolations: Interpolation<DefaultTheme>[]) => {
  const breakpointValue = typeof key === 'string' ? breakpoints[key] : key;

  return css`
    @media (max-width: ${breakpointValue - 1}px) {
      ${css(strings, ...interpolations)}
    }
  `;
};

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

type Breakpoints = {
  sm: number,
  md: number,
  lg: number,
  xl: number
};
