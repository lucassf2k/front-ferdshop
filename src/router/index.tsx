import { RouterProvider } from 'react-router/dom';
import { createBrowserRouter } from 'react-router';
import { HomePage } from '@/ui/pages/home';
import { SignInPage } from '@/ui/pages/sign-in';
import { SignUpPage } from '@/ui/pages/sign-up';
import { RootLayout } from '@/ui/pages/layout';
import { RooDashboardLayout } from '@/ui/pages/dashboard/layout';
import { DashboradHomePage } from '@/ui/pages/dashboard/home';
import { DashboardSignIn } from '@/ui/pages/dashboard/sign-in';
import { CartPage } from '@/ui/pages/cart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <h1>404</h1>,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'sign-in', element: <SignInPage /> },
      { path: 'sign-up', element: <SignUpPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'dashboard/sign-in', element: <DashboardSignIn /> },
    ],
  },
  {
    path: 'dashboard',
    element: <RooDashboardLayout />,
    children: [
      { index: true, element: <DashboradHomePage /> },
      { path: 'categories', element: <h1>Categorias</h1> },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
