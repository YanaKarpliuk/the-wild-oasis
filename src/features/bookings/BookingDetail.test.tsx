import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import BookingDetail from './BookingDetail';
import useBooking from './useBooking';
import useCheckout from '../check-in-out/useCheckout';
import useDeleteBooking from './useDeleteBooking';

vi.mock('./useBooking');
vi.mock('../check-in-out/useCheckout');
vi.mock('./useDeleteBooking');

const mockedUseBooking = vi.mocked(useBooking);
const mockedUseCheckout = vi.mocked(useCheckout);
const mockedUseDeleteBooking = vi.mocked(useDeleteBooking);

// Mock navigation: useMoveBack and useNavigate both come from react-router
const navigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

// Mock heavy children that have their own tests
vi.mock('./BookingDataBox', () => ({
  default: () => <div data-testid="booking-data-box" />,
}));

vi.mock('../../ui/Modal', () => {
  const Pass = ({ children }: { children?: ReactNode }) => <>{children}</>;
  Pass.Open = Pass;
  Pass.Window = Pass;
  return { default: Pass };
});

// Reusable mutation/checkout return shapes
const checkout = vi.fn();
const deleteBookingMutate = vi.fn();

function setBooking(
    booking: { id: number; status: 'unconfirmed' | 'checked-in' | 'checked-out' } | undefined,
    isLoading = false
) {
  mockedUseBooking.mockReturnValue({ booking, isLoading } as never);
}

beforeEach(() => {
  vi.clearAllMocks();
  mockedUseCheckout.mockReturnValue({ checkout, isCheckingOut: false } as never);
  mockedUseDeleteBooking.mockReturnValue({ deleteBookingMutate, isDeleting: false } as never);
});

describe('BookingDetail', () => {
  it('shows a spinner while loading', () => {
    setBooking(undefined, true);
    render(<BookingDetail />);

    expect(screen.queryByTestId('booking-data-box')).not.toBeInTheDocument();
  });

  it('renders the booking id, status tag and data box once loaded', () => {
    setBooking({ id: 7, status: 'checked-in' });
    render(<BookingDetail />);

    expect(screen.getByText('Booking #7')).toBeInTheDocument();
    expect(screen.getByText('checked in')).toBeInTheDocument(); // dash replaced
    expect(screen.getByTestId('booking-data-box')).toBeInTheDocument();
  });

  describe('status-dependent action button', () => {
    it('shows "Check in" only for an unconfirmed booking', () => {
      setBooking({ id: 1, status: 'unconfirmed' });
      render(<BookingDetail />);

      expect(screen.getByRole('button', { name: 'Check in' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Check out' })).not.toBeInTheDocument();
    });

    it('shows "Check out" only for a checked-in booking', () => {
      setBooking({ id: 1, status: 'checked-in' });
      render(<BookingDetail />);

      expect(screen.getByRole('button', { name: 'Check out' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Check in' })).not.toBeInTheDocument();
    });

    it('shows neither check-in nor check-out for a checked-out booking', () => {
      setBooking({ id: 1, status: 'checked-out' });
      render(<BookingDetail />);

      expect(screen.queryByRole('button', { name: 'Check in' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Check out' })).not.toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('navigates to the check-in page when "Check in" is clicked', async () => {
      const user = userEvent.setup();
      setBooking({ id: 42, status: 'unconfirmed' });
      render(<BookingDetail />);

      await user.click(screen.getByRole('button', { name: 'Check in' }));

      expect(navigate).toHaveBeenCalledWith('/checkin/42');
    });

    it('calls checkout with the booking id when "Check out" is clicked', async () => {
      const user = userEvent.setup();
      setBooking({ id: 42, status: 'checked-in' });
      render(<BookingDetail />);

      await user.click(screen.getByRole('button', { name: 'Check out' }));

      expect(checkout).toHaveBeenCalledWith(42);
    });

    it('goes back when the secondary "Back" button is clicked', async () => {
      const user = userEvent.setup();
      setBooking({ id: 1, status: 'checked-out' });
      render(<BookingDetail />);

      await user.click(screen.getByRole('button', { name: 'Back' }));

      expect(navigate).toHaveBeenCalledWith(-1);
    });

    it('disables the check-out button while a checkout is in progress', () => {
      mockedUseCheckout.mockReturnValue({ checkout, isCheckingOut: true } as never);
      setBooking({ id: 1, status: 'checked-in' });
      render(<BookingDetail />);

      expect(screen.getByRole('button', { name: 'Check out' })).toBeDisabled();
    });
  });
});
