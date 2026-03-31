import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings.ts';

export default function useBookings() {
  const { isLoading, data: bookings } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings
  });

  return { isLoading, bookings };
}
