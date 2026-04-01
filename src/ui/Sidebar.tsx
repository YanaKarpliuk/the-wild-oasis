import styled, { css } from 'styled-components';
import Logo from './Logo';
import { mediaBreakpointDown, mediaBreakpointUp } from '../styles/Mixins';
import { HiOutlineChevronDoubleRight } from 'react-icons/hi2';
import { useState } from 'react';
import MainNav from "./MainNav.tsx";
import Uploader from '../data/Uploader.tsx';

type StyledProps = {
  $isOpen: boolean;
}

const StyledSidebar = styled.aside<StyledProps>`
  background-color: var(--color-grey-0);
  padding: 12px 6px;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${mediaBreakpointDown('lg')`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100vh;
    width: 50px;
    max-width: 80vw;
    
    ${(props: StyledProps) => props.$isOpen && css`
      width: 400px;

      .toggle-btn {
        transform: rotate(180deg);
      }
  
      .logo {
        display: block;
      }
  
      .mobile-logo {
        display: none;
      }
    `}
  `}

  ${mediaBreakpointUp('lg')`
    padding: 24px 12px;
    gap: 24px;
  `}
`;

const ToggleBtn = styled.button`
  width: 24px;
  height: 24px;
  color: var(--color-brand-600);
  background-color: transparent;
  border: 0;
  margin-left: auto;
  font-weight: 700;
  
  &:hover, &:focus {
    color: var(--color-brand-900);
    outline: none;
  }
  
  ${mediaBreakpointUp('lg')`
    display: none;
  `}
`;

const StyledWrapper = styled.div`
  ${mediaBreakpointDown('lg')`
    aside:not(.sidebar-is-open) & {
      display: none;
    }
  `}
`;

function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
      <StyledSidebar $isOpen={isOpen} className={isOpen ? 'sidebar-is-open' : ''}>
        <ToggleBtn
            onClick={() => setIsOpen(prev => !prev)}
            aria-label={`${isOpen ? 'Close the sidebar' : 'Open the sidebar'}`}
            className={'toggle-btn'}
        >
          <HiOutlineChevronDoubleRight/>
        </ToggleBtn>
        <Logo/>
        <MainNav />
        <StyledWrapper>
          <Uploader/>
        </StyledWrapper>
      </StyledSidebar>
  );
}

export default Sidebar;
