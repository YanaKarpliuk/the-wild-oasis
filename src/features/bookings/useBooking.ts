import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings.ts';
import { useParams } from 'react-router-dom';

export default function useBooking() {
  const { id } = useParams();

  const { isLoading, data: booking, error } = useQuery({
    queryKey: ['booking', id],
    queryFn: () => getBooking(Number(id)),
    // By default, React query tries to fetch data 3 times in case of error.
    // Here we disable it.
    retry: false
  });

  return { isLoading, booking, error };
}
