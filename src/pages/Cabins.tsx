import Heading from '../ui/Heading.tsx';
import Row from '../ui/Row.tsx';
import CabinTable from '../features/cabins/CabinTable.tsx';
import Button from '../ui/Button.tsx';
import { useState } from 'react';
import CreateCabinForm from '../features/cabins/CreateCabinForm.tsx';

function Cabins() {
  const [showForm, setShowForm] = useState<boolean>(true)

  return (
      <>
        <Row type="horizontal">
          <Heading as="h1">All cabins</Heading>
          <p>Filter/sort</p>
        </Row>
        <Row>
          <CabinTable/>
          <Button onClick={() => setShowForm(prev => !prev)}>Add new cabin</Button>
          {showForm && <CreateCabinForm/>}
        </Row>
      </>
  );
}

export default Cabins;
