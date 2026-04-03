import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins.ts';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants.ts';

export default function useCabins() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter.
  const filterValue = searchParams.get('discount');
  const filter = !filterValue || filterValue === 'all'
      ? null
      : { field: 'discount', value: 0, method: filterValue === 'no-discount' ? 'eq' : 'gt' };

  // Pagination.
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // Sort.
  const sortByRaw = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortByRaw.split('-')
  const sortBy = {field, direction}

  const { isLoading, data: { data: cabins, count } = {} } = useQuery({
    queryKey: ['cabins', filter, sortBy, page],
    queryFn: () => getCabins({ filter, sortBy, page })
  });

  // Pre-fetching
  const pageCount = count && Math.ceil(count / PAGE_SIZE)

  if (pageCount && page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['cabins', filter, sortBy, page + 1],
      queryFn: () => getCabins({ filter, sortBy, page: page + 1 })
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['cabins', filter, sortBy, page - 1],
      queryFn: () => getCabins({ filter, sortBy, page: page - 1 })
    });
  }

  return { isLoading, cabins, count };
}
