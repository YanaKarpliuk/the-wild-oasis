import Filter from '../../ui/Filter.tsx';
import TableOperations from '../../ui/TableOperations.tsx';

export default function CabinTableOperations() {
  return (
      <TableOperations>
        <Filter filterField={'discount'}
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'no-discount', label: 'No discount' },
                  { value: 'with-discount', label: 'With discount' },
                ]}/>
      </TableOperations>
  );
}
