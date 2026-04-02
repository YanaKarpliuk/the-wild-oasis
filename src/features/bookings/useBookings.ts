import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings.ts';
import { useSearchParams } from 'react-router-dom';

export default function useBookings() {
  const [searchParams] = useSearchParams();

  // Filter.
  const filterValue = searchParams.get('status');
  const filter = !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  // Sort.
  const sortByRaw = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortByRaw.split('-')
  const sortBy = {field, direction}

  const { isLoading, data: bookings } = useQuery({
    // filter obj needed to refetch data when filter value is changed.
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy })
  });

  return { isLoading, bookings };
}
