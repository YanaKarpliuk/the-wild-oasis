import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from './ui/AppLayout';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import GlobalStyles from './styles/GlobalStyles';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import Booking from './pages/Booking.tsx';
import Checkin from './pages/Checkin.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time for storing cached data (1 min).
      staleTime: 60 * 1000
    }
  }
});

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    errorElement: <PageNotFound/>,
    children: [
      {
        path: '/',
        element: <Navigate replace to={'/dashboard'}/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/bookings',
        element: <Bookings/>
      },
      {
        path: '/bookings/:id',
        element: <Booking/>
      },
      {
        path: '/checkin/:id',
        element: <Checkin/>
      },
      {
        path: '/cabins',
        element: <Cabins/>
      },
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/settings',
        element: <Settings/>
      },
      {
        path: '/account',
        element: <Account/>
      },
      {
        path: '/login',
        element: <Login/>
      },
    ]
  }
]);

export default function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false}/>
        <GlobalStyles/>
        <RouterProvider router={router}/>
        <Toaster
            position={'top-center'}
            gutter={12}
            containerStyle={{ margin: '8px' }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000
              },
              style: {
                fontSize: '16px',
                maxWidth: '500px',
                padding: '16px 24px',
                backgroundColor: 'var(--color-grey-0)',
                color: 'var(--color-grey-700)',
              }
            }}
        />
      </QueryClientProvider>
  );
}
