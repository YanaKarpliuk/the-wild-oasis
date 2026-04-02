import styled from 'styled-components';
import { mediaBreakpointDown } from '../styles/Mixins.ts';

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  white-space: nowrap;

  ${mediaBreakpointDown('xl')`
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    overflow-x: auto;
  `}

  ${mediaBreakpointDown('md')`
    align-items: flex-start;
  `}
`;

export default TableOperations;
