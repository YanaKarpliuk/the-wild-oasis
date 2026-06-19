import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../../services/apiAuth.ts';
import type { Login } from '../../utils/types.ts';
import toast from 'react-hot-toast';

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: ({ email, password }: Login) => login({ email, password }),
    onSuccess: (user) => {
      // Save data in cache.
      queryClient.setQueriesData(['user'], user)
      navigate('/dashboard');
    },
    onError: error => {
      console.log(error);
      toast.error('Provided email or password are incorrect.');
    }
  });

  return { loginMutate, isPending };
}
