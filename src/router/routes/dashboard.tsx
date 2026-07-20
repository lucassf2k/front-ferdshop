import type { RouteObject } from 'react-router';
import { AuthGuard } from '@/router/guards/auth-guard';
import { RootDashboardLayout } from '@/ui/pages/dashboard/layout';
import { DashboardUsersPage } from '@/ui/pages/dashboard/users';
import { DashboardProductsPage } from '@/ui/pages/dashboard/products';

export const dashboardRoutes: RouteObject = {
  path: 'dashboard',
  element: <AuthGuard roles={['ADMIN']} />,
  children: [
    {
      element: <RootDashboardLayout />,
      children: [
        { path: 'produtos', element: <DashboardProductsPage /> },
        { path: 'usuarios', element: <DashboardUsersPage /> },
      ],
    },
  ],
};
