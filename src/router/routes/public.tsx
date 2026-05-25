import type { RouteObject } from 'react-router';
import { ForbiddenPage } from '@/ui/pages/forbidden';
import { HomePage } from '@/ui/pages/home';
import { SignInPage } from '@/ui/pages/sign-in';
import { SignUpPage } from '@/ui/pages/sign-up';

export const publicRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: 'login',
    element: <SignInPage />,
  },
  {
    path: 'cadastro/usuario',
    element: <SignUpPage />,
  },
  {
    path: '403',
    element: <ForbiddenPage />,
  },
];
