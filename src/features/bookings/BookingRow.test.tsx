import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import type { Booking } from '../../utils/types.ts';

vi.mock('../check-in-out/useCheckout', () => ({
  default: () => ({ checkout: vi.fn(), isCheckingOut: false }),
}));

vi.mock('./useDeleteBooking', () => ({
  default: () => ({ deleteBookingMutate: vi.fn(), isDeleting: false }),
}));

// Menus and Modal are compound components with their own context plumbing.
// Replace them with pass-throughs that just render children,
// so BookingRow's own logic is what's under test.
vi.mock('../../ui/Menus', () => {
  const Pass = ({ children }: { children?: ReactNode }) => <>{children}</>;
  Pass.Menu = Pass;
  Pass.Toggle = () => null;
  Pass.List = Pass;
  Pass.Button = ({ children }: { children?: ReactNode }) => <button>{children}</button>;
  return { default: Pass };
});

vi.mock('../../ui/Modal', () => {
  const Pass = ({ children }: { children?: ReactNode }) => <>{children}</>;
  Pass.Open = Pass;
  Pass.Window = Pass;
  return { default: Pass };
});

// Create a valid booking with possible overrides.
function makeBooking(overrides: Partial<Booking> = {}): Booking {
  return {
    id: 1,
    created_at: '2024-06-01T10:00:00.000Z',
    startDate: '2024-06-10T10:00:00.000Z',
    endDate: '2024-06-15T10:00:00.000Z',
    numNights: 5,
    numGuests: 2,
    totalPrice: 1500,
    status: 'unconfirmed',
    guests: { fullName: 'Jane Doe', email: 'jane@example.com' },
    cabins: { name: '001' },
    ...overrides,
  };
}

// BookingRow uses useNavigate (needs a router) and
// renders a <Table.Row>, which reads Table context.
function renderRow(booking: Booking) {
  return render(
      <MemoryRouter>
        <Table columns="1fr 1fr 1fr 1fr 1fr">
          <BookingRow booking={booking} />
        </Table>
      </MemoryRouter>
  );
}

describe('BookingRow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the guest name, email and cabin', () => {
    renderRow(makeBooking());

    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('001')).toBeInTheDocument();
  });

  it('formats the total price as currency', () => {
    renderRow(makeBooking({ totalPrice: 1500 }));

    expect(screen.getByText('$1,500.00')).toBeInTheDocument();
  });

  it('displays the status with the dash replaced by a space', () => {
    renderRow(makeBooking({ status: 'checked-in' }));

    expect(screen.getByText('checked in')).toBeInTheDocument();
  });

  it('renders each status value correctly', () => {
    const statuses: Booking['status'][] = [
      'unconfirmed',
      'checked-in',
      'checked-out',
    ];
    const expected = ['unconfirmed', 'checked in', 'checked out'];

    statuses.forEach((status, i) => {
      const { unmount } = renderRow(makeBooking({ status }));
      expect(screen.getByText(expected[i])).toBeInTheDocument();
      unmount(); // clean up between iterations so queries don't collide
    });
  });
});
