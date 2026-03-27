import Heading from '../ui/Heading.tsx';
import Row from '../ui/Row.tsx';
import CabinTable from '../features/cabins/CabinTable.tsx';
import AddCabin from '../features/cabins/AddCabin.tsx';

function Cabins() {
  return (
      <>
        <Row type="horizontal">
          <Heading as="h1">All cabins</Heading>
          <p>Filter/sort</p>
        </Row>
        <Row>
          <CabinTable/>
          <AddCabin/>
        </Row>
      </>
  );
}

export default Cabins;
