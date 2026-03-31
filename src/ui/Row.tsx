import styled, { css } from 'styled-components';
import { mediaBreakpointDown } from '../styles/Mixins.ts';

type Props = {
  type?: 'horizontal' | 'vertical';
}

const Row = styled.div<Props>`
  display: flex;

  ${(props) =>
      props.type === 'horizontal'
          ? css`
            justify-content: space-between;
            align-items: center;

            ${mediaBreakpointDown('md')`
              flex-direction: column;
              align-items: flex-start;
              gap: 1.6rem;
            `}
          `
          : css`
            flex-direction: column;
            gap: 1.6rem;
          `
  }
`;

export default Row;
