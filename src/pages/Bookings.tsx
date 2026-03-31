import Heading from '../ui/Heading.tsx';
import Row from '../ui/Row.tsx';
import BookingTable from '../features/bookings/BookingTable.tsx';

function Bookings() {
  return (
      <>
        <Row type="horizontal">
          <Heading as="h1">All bookings</Heading>
          <p>TEST</p>
        </Row>
        <BookingTable/>
      </>
  );
}

export default Bookings;
