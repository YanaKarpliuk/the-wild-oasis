import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.tsx';
import Header from './Header.tsx';
import styled from 'styled-components';
import { mediaBreakpointDown, mediaBreakpointUp } from '../styles/Mixins';

const StyledAppLayout = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;

  ${mediaBreakpointDown('lg')`
    padding-left: 50px;
    
    &:has(.sidebar-is-open) {
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  `}

  ${mediaBreakpointUp('lg')`
    grid-template-columns: 300px 1fr;
  `}
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 24px;
`;

function AppLayout() {
  return (
      <StyledAppLayout>
        <Header/>
        <Sidebar/>
        <Main>
          <Outlet/>
        </Main>
      </StyledAppLayout>
  );
}

export default AppLayout;
