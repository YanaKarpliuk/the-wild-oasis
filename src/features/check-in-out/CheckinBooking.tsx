import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox.tsx';

import Row from '../../ui/Row.tsx';
import Heading from '../../ui/Heading.tsx';
import ButtonGroup from '../../ui/ButtonGroup.tsx';
import Button from '../../ui/Button.tsx';
import ButtonText from '../../ui/ButtonText.tsx';

import { useMoveBack } from '../../hooks/useMoveBack.ts';
import useBooking from '../bookings/useBooking.ts';
import Spinner from '../../ui/Spinner.tsx';
import Checkbox from '../../ui/Checkbox.tsx';
import { useState } from 'react';
import { formatCurrency } from '../../utils/helpers.ts';
import useCheckin from './useCheckin.ts';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState<boolean>(false);
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const { checkin } = useCheckin();

  if (isLoading) return <Spinner/>;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {
    if (!booking?.isPaid && !confirmPaid) return;
    checkin(bookingId)
  }

  return (
      <>
        <Row type="horizontal">
          <Heading as="h1">Check in booking #{bookingId}</Heading>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>

        <BookingDataBox booking={booking}/>

        <Box>
          <Checkbox checked={confirmPaid || booking?.isPaid}
                    onChange={() => setConfirmPaid(prev => !prev)}
                    id={'confirm'}
                    disabled={booking?.isPaid}
          >
            I confirm that that {guests.fullName} has paid the total amount of {formatCurrency(totalPrice)}.
          </Checkbox>
        </Box>

        <ButtonGroup>
          <Button ariaLabel={`Check in booking #${bookingId}`}
                  onClick={handleCheckin}
                  disabled={!booking?.isPaid && !confirmPaid}
          >
            Check in booking #{bookingId}
          </Button>
          <Button ariaLabel={'Back'} $variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </>
  );
}

export default CheckinBooking;
