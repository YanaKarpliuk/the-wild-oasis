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
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers.ts';
import useCheckin from './useCheckin.ts';
import useSettings from '../settings/useSettings.ts';

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState<boolean>(false);
  const [addBreakfast, setAddBreakfast] = useState<boolean>(false);
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    // eslint-disable-next-line
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  if (isLoading || isLoadingSettings) return <Spinner/>;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfast = settings?.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId, breakfast: {
          hasBreakfast: true,
          extraPrice: optionalBreakfast,
          totalPrice: totalPrice + optionalBreakfast
        }
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
      <>
        <Row type="horizontal">
          <Heading as="h1">Check in booking #{bookingId}</Heading>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>

        <BookingDataBox booking={booking}/>

        {!hasBreakfast &&
            <Box>
              <Checkbox checked={addBreakfast || booking?.hasBreakfast}
                        onChange={() => {
                          setAddBreakfast(prev => !prev);
                          setConfirmPaid(false);
                        }}
                        id={'addBreakfast'}
                        disabled={booking?.hasBreakfast}
              >
                Want to add breakfast for {formatCurrency(optionalBreakfast)}?
              </Checkbox>
            </Box>
        }

        <Box>
          <Checkbox checked={confirmPaid}
                    onChange={() => setConfirmPaid(prev => !prev)}
                    id={'confirm'}
                    disabled={!addBreakfast && booking?.isPaid}
          >
            I confirm that that {guests.fullName} has paid the total amount of{' '}
            {!addBreakfast
                ? formatCurrency(totalPrice)
                : `${formatCurrency(totalPrice + optionalBreakfast)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfast)}).`}
          </Checkbox>
        </Box>

        <ButtonGroup>
          <Button ariaLabel={`Check in booking #${bookingId}`}
                  onClick={handleCheckin}
                  disabled={!confirmPaid}
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
