import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin, type NewCabin } from '../../services/apiCabins.ts';
import toast from 'react-hot-toast';

type UpdateTypes = {
  newCabinData: NewCabin;
  id: number | undefined
}

export default function useUpdateCabin() {
  const queryClient = useQueryClient();

  // Update cabin.
  const { mutate: updateCabinMutate, isPending: isUpdating } = useMutation({
    mutationFn: ({ newCabinData, id }: UpdateTypes) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin was successfully edited.');
      // Refresh UI to display updated data.
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
    },
    onError: (err) => toast.error(err.message)
  });

  return { updateCabinMutate, isUpdating };
}
