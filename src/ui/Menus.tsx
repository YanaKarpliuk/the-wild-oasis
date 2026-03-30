import styled from 'styled-components';
import { createContext, type ReactNode, useState } from 'react';
import useSafeContext from '../hooks/useSafeContext.ts';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { useFloating, autoUpdate, offset, flip, shift } from '@floating-ui/react';
import useOutsideClick from '../hooks/useOutsideClick.ts';

type FloatingStyles = {
  position: 'absolute' | 'fixed';
  top: string;
  left: string;
};

type MenusContextType = {
  openId: number;
  close: () => void;
  open: (id: number) => void;
}

type FloatingContextType = {
  refs: ReturnType<typeof useFloating>['refs'];
  floatingStyles: FloatingStyles;
}

type ChildrenProps = {
  children: ReactNode
}

type IdProps = {
  id: number
}

type ButtonProps = {
  icon: ReactNode;
  onClick?: () => void;
}

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  z-index: 10;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover, &:focus {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext<MenusContextType | undefined>(undefined);
const FloatingContext = createContext<FloatingContextType | null | undefined>(null);

// It's a general wrapper to ensure that only one context menu is open at a time.
function Menus({ children }: ChildrenProps) {
  const [openId, setOpenId] = useState<number>(0);

  const close = () => setOpenId(0);
  const open = setOpenId;

  return (
      <MenusContext.Provider value={{ openId, close, open }}>
        <div>
          {children}
        </div>
      </MenusContext.Provider>
  );
}

function Menu({ children, id }: ChildrenProps & IdProps) {
  const { openId } = useSafeContext(MenusContext);

  const isOpen = openId === id;

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    placement: 'bottom-end',
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate, // This ensures it follows scroll
  });

  return (
      <FloatingContext.Provider value={{ refs, floatingStyles }}>
        <StyledMenu>
          {children}
        </StyledMenu>
      </FloatingContext.Provider>
  );
}

function Toggle({ id }: IdProps) {
  const { openId, close, open } = useSafeContext(MenusContext);
  const { refs } = useSafeContext(FloatingContext);

  function handleClick(e) {
    e.stopPropagation();
    return openId === 0 || openId !== id ? open(id) : close();
  }

  return (
      // eslint-disable-next-line react-hooks/refs
      <StyledToggle onClick={handleClick} ref={refs.setReference}>
        <HiEllipsisVertical/>
      </StyledToggle>
  );
}

function List({ id, children }: IdProps & ChildrenProps) {
  const { openId, close } = useSafeContext(MenusContext);
  const { refs, floatingStyles } = useSafeContext(FloatingContext);
  const { ref } = useOutsideClick(close)

  if (id !== openId) return null;

  return (
      <div ref={ref}>
        {/* eslint-disable-next-line react-hooks/refs */}
        <StyledList ref={refs.setFloating} style={floatingStyles}>
          {children}
        </StyledList>
      </div>
  );
}

function Button({ children, icon, onClick }: ChildrenProps & ButtonProps) {
  const { close } = useSafeContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
      <li>
        <StyledButton onClick={handleClick}>
          {icon}
          <span>{children}</span>
        </StyledButton>
      </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
