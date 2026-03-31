import Spinner from '../../ui/Spinner.tsx';
import CabinRow from './CabinRow.tsx';
import useCabins from './useCabins.ts';
import Table from '../../ui/Table.tsx';
import Menus from '../../ui/Menus.tsx';
import { useSearchParams } from 'react-router-dom';

export default function CabinTable() {
  const [searchParams] = useSearchParams();

  // Fetch cabins.
  const { isLoading, cabins } = useCabins();

  // Filter.
  const filterValue = searchParams.get('discount') || 'all';
  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount') filteredCabins = cabins && cabins.filter(cabin => cabin.discount === 0);
  if (filterValue === 'with-discount') filteredCabins = cabins && cabins.filter(cabin => cabin.discount > 0);

  // Sort.
  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins && filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  if (isLoading) return <Spinner/>;

  return (
      <Menus>
        <Table columns={'0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'}>
          <Table.Header>
            <div></div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </Table.Header>
          {/* Render prop pattern. */}
          <Table.Body data={sortedCabins} render={(cabin) => (
              <CabinRow cabin={cabin} key={cabin.id}/>
          )}/>
        </Table>
      </Menus>
  );
}
