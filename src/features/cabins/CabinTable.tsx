import Spinner from '../../ui/Spinner.tsx';
import CabinRow from './CabinRow.tsx';
import useCabins from './useCabins.ts';
import Table from '../../ui/Table.tsx';
import Menus from '../../ui/Menus.tsx';
import Empty from '../../ui/Empty.tsx';
import Pagination from '../../ui/Pagination.tsx';

export default function CabinTable() {
  // Fetch cabins.
  const { isLoading, cabins, count } = useCabins();

  if (isLoading) return <Spinner/>;

  if (cabins && !cabins.length) return <Empty resource={'cabins'}/>

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
          <Table.Body data={cabins} render={(cabin) => (
              <CabinRow cabin={cabin} key={cabin.id}/>
          )}/>
          <Table.Footer>
            <Pagination count={count!}/>
          </Table.Footer>
        </Table>
      </Menus>
  );
}
