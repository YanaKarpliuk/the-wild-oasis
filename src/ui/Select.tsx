import styled from 'styled-components';
import type { ChangeEvent } from 'react';

type Option = {
  value: string;
  label: string
}

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  type?: 'white';
  options: Option[]
}

type StyledProps = {
  $type?: 'white';
}

const StyledSelect = styled.select<StyledProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid ${(props) =>
      props.$type === 'white'
          ? 'var(--color-grey-100)'
          : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select({ options, value, type, onChange }: Props) {
  return (
      <StyledSelect value={value} $type={type} onChange={onChange}>
        {options.map(option => (
            <option value={option.value} key={option.value}>{option.label}</option>
        ))}
      </StyledSelect>
  );
}

export default Select;
