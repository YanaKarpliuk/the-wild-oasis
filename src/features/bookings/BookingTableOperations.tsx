import SortBy from '../../ui/SortBy.tsx';
import Filter from '../../ui/Filter.tsx';
import TableOperations from '../../ui/TableOperations.tsx';

function BookingTableOperations() {
  return (
      <TableOperations>
        <Filter
            filterField="status"
            options={[
              { value: 'all', label: 'All' },
              { value: 'checked-out', label: 'Checked out' },
              { value: 'checked-in', label: 'Checked in' },
              { value: 'unconfirmed', label: 'Unconfirmed' },
            ]}
        />

        <SortBy
            options={[
              { value: 'startDate-asc', label: 'Sort by date (earlier first)' },
              { value: 'startDate-desc', label: 'Sort by date (recent first)' },
              { value: 'totalPrice-desc', label: 'Sort by amount (high first)', },
              { value: 'totalPrice-asc', label: 'Sort by amount (low first)' },
            ]}
        />
      </TableOperations>
  );
}

export default BookingTableOperations;
