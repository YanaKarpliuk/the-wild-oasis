import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings.ts';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants.ts';

export default function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter.
  const filterValue = searchParams.get('status');
  const filter = !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  // Sort.
  const sortByRaw = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // Pagination.
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const { isLoading, data: { data: bookings, count } = {} } = useQuery({
    // these values are needed to refetch data when they change.
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page })
  });

  // Pre-fetching
  const pageCount = count && Math.ceil(count / PAGE_SIZE)

  if (pageCount && page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
    });
  }

  return { isLoading, bookings, count };
}
