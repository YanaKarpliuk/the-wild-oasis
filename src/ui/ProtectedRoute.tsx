import { type ReactNode, useEffect } from 'react';
import useUser from '../features/authentication/useUser.ts';
import Spinner from './Spinner.tsx';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FullPage = styled.div`
  height: 100vh;
  background: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoute({ children }: Props) {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) return (
      <FullPage>
        <Spinner/>
      </FullPage>
  );

  if (isAuthenticated) return children;
}

type Props = {
  children: ReactNode
}
