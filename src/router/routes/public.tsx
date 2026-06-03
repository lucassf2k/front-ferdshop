import type { RouteObject } from 'react-router';
import { ForbiddenPage } from '@/ui/pages/forbidden';
import { HomePage } from '@/ui/pages/home';
import { SignInPage } from '@/ui/pages/sign-in';
import { SignUpPage } from '@/ui/pages/sign-up';
import { LayoutNormalUsers } from '@/ui/layouts/layout-normal-users';
import { CartPage } from '@/ui/pages/cart';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutNormalUsers />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: 'carrinho', element: <CartPage /> },
    ],
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
