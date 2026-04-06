import { createBrowserRouter, Outlet } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { SignInPage } from '@/ui/pages/sign-in';
import { SignUpPage } from '@/ui/pages/sign-up';
import { Toaster } from '@/ui/components/ui/sonner';

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster richColors theme="light" position="top-center" />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <SignInPage /> },
      { path: 'sign-up', element: <SignUpPage /> },
      { path: 'test', element: <div>test</div> },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
