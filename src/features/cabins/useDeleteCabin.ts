import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../services/apiCabins.ts';
import toast from 'react-hot-toast';

export default function useDeleteCabin() {
  const queryClient = useQueryClient();

  // Delete cabin.
  const { mutate: deleteCabinMutate, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteCabin(id),
    onSuccess: () => {
      toast.success('Cabin was successfully deleted.');
      // Refresh UI to display updated data.
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
    },
    onError: (err) => toast.error(err.message)
  });

  return { deleteCabinMutate, isDeleting };
}