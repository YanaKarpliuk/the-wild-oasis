import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin, type NewCabin } from '../../services/apiCabins.ts';
import toast from 'react-hot-toast';

type CreateTypes = {
  newCabinData: NewCabin
}

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  // Create cabin.
  const { mutate: createCabinMutate, isPending: isCreating } = useMutation({
    mutationFn: ({ newCabinData }: CreateTypes) => createEditCabin(newCabinData),
    onSuccess: () => {
      toast.success('Cabin was successfully created.');
      // Refresh UI to display updated data.
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
    },
    onError: (err) => toast.error(err.message)
  });

  return { createCabinMutate, isCreating };
}
