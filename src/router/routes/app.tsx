import type { RouteObject } from 'react-router';
import { AuthGuard } from '@/router/guards/auth-guard';
import { CartPage } from '@/ui/pages/cart';

export const appRoutes: RouteObject = {
  element: <AuthGuard />,
  children: [{ path: 'carrinho', element: <CartPage /> }],
};
