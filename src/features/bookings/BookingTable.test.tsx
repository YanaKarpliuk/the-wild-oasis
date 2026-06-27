import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import BookingTable from './BookingTable';
import useBookings from './useBookings';
import type { Booking } from '../../utils/types.ts';

// useBookings is the single source of truth for this component's behavior.
// We mock it so each test can put the component into one specific state.
vi.mock('./useBookings');
const mockedUseBookings = vi.mocked(useBookings);

vi.mock('./BookingRow', () => ({
  default: ({ booking }: { booking: Booking }) => (
      <div data-testid="booking-row">{booking.id}</div>
  ),
}));

vi.mock('../../ui/Pagination', () => ({
  default: ({ count }: { count: number }) => (
      <div data-testid="pagination">{count}</div>
  ),
}));

vi.mock('../../ui/Menus', () => {
  const Pass = ({ children }: { children?: ReactNode }) => <>{children}</>;
  return { default: Pass };
});

function makeBooking(id: number): Booking {
  return {
    id,
    created_at: '2024-06-01T10:00:00.000Z',
    startDate: '2024-06-10T10:00:00.000Z',
    endDate: '2024-06-15T10:00:00.000Z',
    numNights: 5,
    numGuests: 2,
    totalPrice: 1500,
    status: 'unconfirmed',
    guests: { fullName: 'Jane Doe', email: 'jane@example.com' },
    cabins: { name: '001' },
  };
}

describe('BookingTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows a spinner while loading', () => {
    mockedUseBookings.mockReturnValue({
      isLoading: true,
      bookings: undefined,
      count: undefined,
    });

    render(<BookingTable />);

    expect(screen.queryByTestId('booking-row')).not.toBeInTheDocument();
  });

  it('shows an empty message when there are no bookings', () => {
    mockedUseBookings.mockReturnValue({
      isLoading: false,
      bookings: [],
      count: 0,
    });

    render(<BookingTable />);

    expect(screen.getByText('No bookings could be found.')).toBeInTheDocument();
    expect(screen.queryByTestId('booking-row')).not.toBeInTheDocument();
  });

  it('renders a row for each booking when data is present', () => {
    mockedUseBookings.mockReturnValue({
      isLoading: false,
      bookings: [makeBooking(1), makeBooking(2), makeBooking(3)],
      count: 3,
    });

    render(<BookingTable />);

    expect(screen.getAllByTestId('booking-row')).toHaveLength(3);
  });

  it('renders pagination with the total count when data is present', () => {
    mockedUseBookings.mockReturnValue({
      isLoading: false,
      bookings: [makeBooking(1)],
      count: 42,
    });

    render(<BookingTable />);

    expect(screen.getByTestId('pagination')).toHaveTextContent('42');
  });
});
