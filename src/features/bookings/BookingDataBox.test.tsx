import { render, screen } from '@testing-library/react';
import BookingDataBox from './BookingDataBox';
import type { BookingFull } from '../../utils/types.ts';

function makeBooking(overrides: Partial<BookingFull> = {}): BookingFull {
  return {
    created_at: '2024-06-01T10:00:00.000Z',
    startDate: '2024-06-10T10:00:00.000Z',
    endDate: '2024-06-15T10:00:00.000Z',
    numNights: 5,
    numGuests: 2,
    cabinPrice: 1000,
    extraPrice: 500,
    totalPrice: 1500,
    hasBreakfast: true,
    observations: 'No pets please',
    isPaid: true,
    guests: {
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      country: 'Italy',
      countryFlag: 'https://example.com/it.png',
      nationalID: 'ABC123',
    },
    cabins: { name: '001' },
    ...overrides,
  } as BookingFull;
}

describe('BookingDataBox', () => {
  it('renders core guest and cabin details', () => {
    render(<BookingDataBox booking={makeBooking()} />);

    expect(screen.getByText('Jane Doe', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('001')).toBeInTheDocument();
    expect(screen.getByText(/National ID ABC123/)).toBeInTheDocument();
  });

  describe('night pluralization', () => {
    it('says "night" (singular) for a one-night stay', () => {
      render(<BookingDataBox booking={makeBooking({ numNights: 1 })} />);
      expect(screen.getByText(/1 night in Cabin/)).toBeInTheDocument();
    });

    it('says "nights" (plural) for a multi-night stay', () => {
      render(<BookingDataBox booking={makeBooking({ numNights: 3 })} />);
      expect(screen.getByText(/3 nights in Cabin/)).toBeInTheDocument();
    });
  });

  describe('guest count phrasing', () => {
    it('shows no extra-guest text for a single guest', () => {
      render(<BookingDataBox booking={makeBooking({ numGuests: 1 })} />);
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      expect(screen.queryByText(/\+ \d+ guest/)).not.toBeInTheDocument();
    });

    it('says "+ 1 guest" (singular) for two guests', () => {
      render(<BookingDataBox booking={makeBooking({ numGuests: 2 })} />);
      expect(screen.getByText(/\+ 1 guest$/)).toBeInTheDocument();
    });

    it('says "+ 2 guests" (plural) for three guests', () => {
      render(<BookingDataBox booking={makeBooking({ numGuests: 3 })} />);
      expect(screen.getByText(/\+ 2 guests/)).toBeInTheDocument();
    });
  });

  describe('observations', () => {
    it('shows observations when present', () => {
      render(<BookingDataBox booking={makeBooking({ observations: 'No pets please' })} />);
      expect(screen.getByText('Observations')).toBeInTheDocument();
      expect(screen.getByText('No pets please')).toBeInTheDocument();
    });

    it('hides the observations row when absent', () => {
      render(<BookingDataBox booking={makeBooking({ observations: '' })} />);
      expect(screen.queryByText('Observations')).not.toBeInTheDocument();
    });
  });

  describe('breakfast', () => {
    it('shows "Yes" and a price breakdown when breakfast is included', () => {
      render(
          <BookingDataBox
              booking={makeBooking({ hasBreakfast: true, cabinPrice: 1000, extraPrice: 500 })}
          />
      );
      expect(screen.getByText('Yes')).toBeInTheDocument();
      expect(screen.getByText(/cabin \+/)).toBeInTheDocument();
    });

    it('shows "No" and no breakdown when breakfast is not included', () => {
      render(<BookingDataBox booking={makeBooking({ hasBreakfast: false })} />);
      expect(screen.getByText('No')).toBeInTheDocument();
      expect(screen.queryByText(/cabin \+/)).not.toBeInTheDocument();
    });
  });

  describe('payment status', () => {
    it('shows "Paid" when the booking is paid', () => {
      render(<BookingDataBox booking={makeBooking({ isPaid: true })} />);
      expect(screen.getByText('Paid')).toBeInTheDocument();
    });

    it('shows "Will pay at property" when unpaid', () => {
      render(<BookingDataBox booking={makeBooking({ isPaid: false })} />);
      expect(screen.getByText('Will pay at property')).toBeInTheDocument();
    });
  });

  describe('country flag', () => {
    it('renders the flag image when a flag URL is present', () => {
      render(<BookingDataBox booking={makeBooking({
        guests: {
          fullName: 'Jane Doe', email: 'jane@example.com', country: 'Italy',
          countryFlag: 'https://example.com/it.png', nationalID: 'ABC123',
        },
      })} />);
      expect(screen.getByAltText('Flag of Italy')).toBeInTheDocument();
    });

    it('renders no flag when the flag URL is empty', () => {
      render(<BookingDataBox booking={makeBooking({
        guests: {
          fullName: 'Jane Doe', email: 'jane@example.com', country: 'Italy',
          countryFlag: '', nationalID: 'ABC123',
        },
      })} />);
      expect(screen.queryByAltText('Flag of Italy')).not.toBeInTheDocument();
    });
  });
});
