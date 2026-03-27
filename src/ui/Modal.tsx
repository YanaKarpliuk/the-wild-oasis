import styled from 'styled-components';
import { mediaBreakpointDown } from '../styles/Mixins.ts';
import { HiXMark } from 'react-icons/hi2';
import { createPortal } from 'react-dom';
import {
  cloneElement,
  createContext,
  useContext,
  useState,
  type ReactNode,
  type ReactElement,
  type HTMLAttributes
} from 'react';
import useOutsideClick from '../hooks/useOutsideClick.ts';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 32px 40px;
  overflow-y: auto;
  max-height: 100vh;
  transition: all 0.5s;

  ${mediaBreakpointDown('lg')`
    width: 80vw;
  `}

  ${mediaBreakpointDown('md')`
    left: 0;
    transform: translateY(-50%);
    padding: 24px;
    width: 100vw;
  `}
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover, &:focus {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

type ModalProps = {
  children: ReactNode
}

type OpenProps = {
  children: ReactElement<HTMLAttributes<HTMLElement>>;
  opens: string;
}

type WindowChildProps = {
  onCloseModal?: () => void;
}

type WindowProps = {
  children: ReactElement<WindowChildProps>;
  name: string;
}

type ModalContextType = {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

// 1. Create a context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Get context values via custom hook to avoid undefined errors.
function useModalContext() {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }

  return context;
}

// 2. Create parent component
function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
      <ModalContext.Provider value={{ close, open, openName }}>
        {children}
      </ModalContext.Provider>
  );
}

// 3. Create child components
function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useModalContext();

  // We need to add event to button passed via children.
  // It can be cloned with all the necessary props.
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }: WindowProps) {
  const { openName, close } = useModalContext();
  const { ref } = useOutsideClick(close);

  if (openName !== name) return null;

  // Render modal as direct child of body.
  return createPortal(
      <Overlay>
        <StyledModal ref={ref}>
          <Button onClick={close} aria-label={'Close the modal'}>
            <HiXMark/>
          </Button>
          <div>{cloneElement(children, { onCloseModal: close })}</div>
        </StyledModal>
      </Overlay>,
      document.body
  );
}

// 4. Add child components as properties to parent component
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
