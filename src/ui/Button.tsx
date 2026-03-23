import styled, { css } from 'styled-components';
import type { MouseEvent } from 'react';

type StyledProps = {
  $size?: 'small' | 'medium' | 'large',
  $variation?: 'primary' | 'secondary' | 'danger',
}

type Props = StyledProps & {
  ariaLabel?: string,
  type?: 'reset',
  children: string,
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover, &:focus {
      background-color: var(--color-brand-700);
    }

    &:disabled {
      background-color: var(--color-grey-400);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover, &:focus {
      background-color: var(--color-grey-50);
    }

    &:disabled {
      background-color: var(--color-grey-200);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover, &:focus {
      background-color: var(--color-red-800);
    }
  `,
};

const ButtonEl = styled.button<StyledProps>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${(props) => sizes[props.$size || 'medium']}
  ${(props) => variations[props.$variation || 'primary']}
`;

function Button({ ariaLabel, onClick, type, disabled, $size, $variation, children }: Props) {
  return (
      <ButtonEl
          aria-label={ariaLabel || children}
          onClick={onClick}
          $size={$size}
          $variation={$variation}
          type={type}
          disabled={disabled}
      >
        {children}
      </ButtonEl>
  );
}

export default Button;
