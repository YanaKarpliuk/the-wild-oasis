import styled from 'styled-components';
import { mediaBreakpointDown } from '../styles/Mixins.ts';
import type { ReactElement } from 'react';

interface ChildWithId {
  id: string;
}

type Props = {
  label?: string;
  error?: string;
  children: ReactElement<ChildWithId>;
}

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 24px;
  padding: 12px 0;

  ${mediaBreakpointDown('lg')`
    grid-template-columns: 1fr;
    gap: 12px;
  `}
  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

export default function FormRow({ label, error, children }: Props) {
  return (
      <StyledFormRow>
        {label && <Label htmlFor={children.props.id}>{label}</Label>}
        {children}
        {error && <Error>{error}</Error>}
      </StyledFormRow>
  );
}