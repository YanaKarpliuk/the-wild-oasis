import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking } from '../../services/apiBookings.ts';

export default function useDeleteBooking() {
  const queryClient = useQueryClient();

  // Delete booking.
  const { mutate: deleteBookingMutate, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteBooking(id),
    onSuccess: () => {
      toast.success('Booking was successfully deleted.');
      // Refresh UI to display updated data.
      queryClient.invalidateQueries({
        queryKey: ['bookings']
      });
    },
    onError: (err) => toast.error(err.message)
  });

  return { deleteBookingMutate, isDeleting };
}
