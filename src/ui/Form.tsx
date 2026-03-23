import styled, { css } from "styled-components";
import { mediaBreakpointDown } from '../styles/Mixins.ts';

type Props = {
  type?: 'modal'
}

const Form = styled.form<Props>`
  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 24px 32px;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      ${mediaBreakpointDown('lg')`
        padding: 24px;
      `}
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;
