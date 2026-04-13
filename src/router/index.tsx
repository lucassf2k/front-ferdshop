import { RouterProvider } from 'react-router/dom';
import { createBrowserRouter } from 'react-router';
import { HomePage } from '@/ui/pages/home';
import { SignInPage } from '@/ui/pages/sign-in';
import { SignUpPage } from '@/ui/pages/sign-up';
import { RootLayout } from '@/ui/pages/layout';
import { RooDashboardLayout } from '@/ui/pages/dashboard/layout';
import { DashboradHomePage } from '@/ui/pages/dashboard/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'sign-in', element: <SignInPage /> },
      { path: 'sign-up', element: <SignUpPage /> },
      { path: 'test', element: <div>test</div> },
      {
        path: 'dashboard',
        element: <RooDashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboradHomePage />,
          },
        ],
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
