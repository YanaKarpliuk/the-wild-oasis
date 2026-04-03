import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from 'react-icons/hi2';

import DataItem from '../../ui/DataItem.tsx';
import { Flag } from '../../ui/Flag.tsx';

import { formatDistanceFromNow, formatCurrency } from '../../utils/helpers.ts';
import { mediaBreakpointDown } from '../../styles/Mixins.ts';

type StyledPrice = {
  $isPaid: boolean;
}

type GuestData = {
  fullName: string;
  email: string;
  country: string;
  countryFlag: string;
  nationalID: string;
}

type CabinData = {
  name: string;
}

type Booking = {
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extraPrice: number;
  totalPrice: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
  guests: GuestData;
  cabins: CabinData;
}

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mediaBreakpointDown('md')`
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
  `}
  > p {
    ${mediaBreakpointDown('md')`
      margin-top: 10px;
      font-size: 14px;
    `}
  }

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;

  ${mediaBreakpointDown('md')`
    padding: 24px 16px;
  `}
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  ${mediaBreakpointDown('md')`
    flex-direction: column;
    align-items: flex-start;
  `}
  p {
    display: flex;
    align-items: center;
    gap: 6px;

    &:not(:last-child) {
      &::after {
        content: '';
        display: inline-block;
        height: 4px;
        width: 4px;
        border-radius: 50%;
        background: var(--color-grey-500);
      }
    }

    &:first-of-type {
      font-weight: 500;
      color: var(--color-grey-700);
    }
  }
`;

const Price = styled.div<StyledPrice>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;
  background-color: ${(props) =>
      props.$isPaid ? 'var(--color-green-100)' : 'var(--color-yellow-100)'};
  color: ${(props) =>
      props.$isPaid ? 'var(--color-green-700)' : 'var(--color-yellow-700)'};

  ${mediaBreakpointDown('md')`
    flex-direction: column;
  `}
  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

// A purely presentational component
function BookingDataBox({ booking }: { booking: Booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extraPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;

  return (
      <StyledBookingDataBox>
        <Header>
          <div>
            <HiOutlineHomeModern/>
            <p>
              {numNights} nights in Cabin <span>{cabinName}</span>
            </p>
          </div>

          <p>
            {format(new Date(startDate), 'EEE, MMM dd yyyy')} (
            {isToday(new Date(startDate))
                ? 'Today'
                : formatDistanceFromNow(startDate)}
            ) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
          </p>
        </Header>

        <Section>
          <Guest>
            {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`}/>}
            <p>
              {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ''}
            </p>
            <p>{email}</p>
            <p>National ID {nationalID}</p>
          </Guest>

          {observations && (
              <DataItem
                  icon={<HiOutlineChatBubbleBottomCenterText/>}
                  label="Observations"
              >
                {observations}
              </DataItem>
          )}

          <DataItem icon={<HiOutlineCheckCircle/>} label="Breakfast included?">
            {hasBreakfast ? 'Yes' : 'No'}
          </DataItem>

          <Price $isPaid={isPaid}>
            <DataItem icon={<HiOutlineCurrencyDollar/>} label={`Total price`}>
              {formatCurrency(totalPrice)}

              {hasBreakfast &&
                  ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(extraPrice)} breakfast)`}
            </DataItem>

            <p>{isPaid ? 'Paid' : 'Will pay at property'}</p>
          </Price>
        </Section>

        <Footer>
          <p>Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}</p>
        </Footer>
      </StyledBookingDataBox>
  );
}

export default BookingDataBox;
