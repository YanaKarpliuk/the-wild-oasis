import styled from "styled-components";
import { mediaBreakpointDown } from '../styles/Mixins.ts';
import type { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}

const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;
  
  ${mediaBreakpointDown('md')`
    flex-direction: column;
    align-items: flex-start;
  `}
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }
`;

function DataItem({ icon, label, children }: Props) {
  return (
    <StyledDataItem>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  );
}

export default DataItem;
