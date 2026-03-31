import styled from 'styled-components';
import { mediaBreakpointDown } from '../styles/Mixins.ts';

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  ${mediaBreakpointDown('lg')`
    flex-direction: column;
    align-items: flex-start;
  `}
`;

export default TableOperations;
