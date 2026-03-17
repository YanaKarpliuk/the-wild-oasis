import styled from "styled-components";
import { mediaBreakpointUp } from '../styles/Mixins';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 12px 24px;
  border-bottom: 1px solid var(--color-grey-100);

  ${mediaBreakpointUp('lg')`
    padding: 24px;
  `}
`;

function Header() {
  return <StyledHeader>HEADER</StyledHeader>;
}

export default Header;
