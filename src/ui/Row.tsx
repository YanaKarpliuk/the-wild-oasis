import styled, { css } from 'styled-components';

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
          `
          : css`
            flex-direction: column;
            gap: 1.6rem;
          `
  }
`;

export default Row;
