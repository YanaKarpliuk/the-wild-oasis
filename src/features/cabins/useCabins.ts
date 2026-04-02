import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins.ts';
import { useSearchParams } from 'react-router-dom';

export default function useCabins() {
  const [searchParams] = useSearchParams();

  // Filter.
  const filterValue = searchParams.get('discount');
  const filter = !filterValue || filterValue === 'all'
      ? null
      : { field: 'discount', value: 0, method: filterValue === 'no-discount' ? 'eq' : 'gt' };

  // Sort.
  const sortByRaw = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortByRaw.split('-')
  const sortBy = {field, direction}

  const { isLoading, data: cabins } = useQuery({
    queryKey: ['cabins', filter, sortBy],
    queryFn: () => getCabins({ filter, sortBy })
  });

  return { isLoading, cabins };
}
