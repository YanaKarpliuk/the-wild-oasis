import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth.ts';

export default function useUser() {
  const { data: user, isLoading } = useQuery({
    // The data will taken from cache because it was set here manually.
    queryKey: ['user'],
    queryFn: getCurrentUser
  });

  const isAuthenticated = user?.role === 'authenticated';

  return { user, isLoading, isAuthenticated };
}
