import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting } from '../../services/apiSettings.ts';
import toast from 'react-hot-toast';

export default function useUpdateSetting() {
  const queryClient = useQueryClient();

  // Edit settings.
  const { mutate: updateSettingMutate, isPending: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Setting was successfully updated.');
      // Refresh UI to display updated data.
      queryClient.invalidateQueries({
        queryKey: ['settings']
      });
    },
    onError: (err) => toast.error(err.message)
  });

  return { updateSettingMutate, isUpdating };
}
