import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { SignInPage } from '@/ui/pages/sign-in';
import { SignUpPage } from '@/ui/pages/sign-up';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignInPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  {
    path: '/test',
    element: <div>test</div>,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
