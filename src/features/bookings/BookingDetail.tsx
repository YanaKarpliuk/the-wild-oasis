import styled from 'styled-components';

import BookingDataBox from './BookingDataBox.tsx';
import Row from '../../ui/Row.tsx';
import Heading from '../../ui/Heading.tsx';
import Tag from '../../ui/Tag.tsx';
import ButtonGroup from '../../ui/ButtonGroup.tsx';
import Button from '../../ui/Button.tsx';
import ButtonText from '../../ui/ButtonText.tsx';

import { useMoveBack } from '../../hooks/useMoveBack.ts';
import useBooking from './useBooking.ts';
import Spinner from '../../ui/Spinner.tsx';
import { mediaBreakpointDown } from '../../styles/Mixins.ts';

const HeadingGroup = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;

  ${mediaBreakpointDown('md')`
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  `}
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner/>;

  const { status, id } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  } as const;

  type Status = keyof typeof statusToTagName;

  return (
      <>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Booking #{id}</Heading>
            <Tag $type={statusToTagName[status as Status]}>{status.replace('-', ' ')}</Tag>
          </HeadingGroup>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>

        <BookingDataBox booking={booking}/>

        <ButtonGroup>
          <Button $variation="secondary" onClick={moveBack} ariaLabel={'Back'}>
            Back
          </Button>
        </ButtonGroup>
      </>
  );
}

export default BookingDetail;
