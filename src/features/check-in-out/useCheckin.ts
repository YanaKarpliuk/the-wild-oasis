import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings.ts';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type UpdateBooking = {
  bookingId: number,
  breakfast: {
    hasBreakfast?: boolean,
    extraPrice?: number,
    totalPrice?: number
  }
}

export default function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }: UpdateBooking) => updateBooking(bookingId, {
      status: 'checked-in',
      isPaid: true,
      ...breakfast
    }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in.`);
      queryClient.invalidateQueries({ type: 'active' });
      navigate('/');
    },
    onError: () => toast.error('There was an error while checking in.')
  });

  return { checkin, isCheckingIn };
}
