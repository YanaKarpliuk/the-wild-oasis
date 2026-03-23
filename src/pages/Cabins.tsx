import Heading from '../ui/Heading.tsx';
import Row from '../ui/Row.tsx';
import CabinTable from '../features/cabins/CabinTable.tsx';

function Cabins() {
  return (
      <>
        <Row type="horizontal">
          <Heading as="h1">All cabins</Heading>
          <p>Filter/sort</p>
        </Row>
        <Row>
          <CabinTable/>
        </Row>
      </>
  );
}

export default Cabins;
