import type { RouteObject } from 'react-router';
import { AuthGuard } from '@/router/guards/auth-guard';
import { RootDashboardLayout } from '@/ui/pages/dashboard/layout';
import { DashboardUsersPage } from '@/ui/pages/dashboard/users';
import { DashboardProductsPage } from '@/ui/pages/dashboard/products';
import { DashboardOrdersPage } from '@/ui/pages/dashboard/orders';
import { DashboardCategoriesPage } from '@/ui/pages/dashboard/categorias';
import { DashboardOrderDetailsPage } from '@/ui/pages/dashboard/orders/details';
import { DashboardOrganizationPage } from '@/ui/pages/dashboard/organization';
import { DashboardHomePage } from '@/ui/pages/dashboard';

export const dashboardRoutes: RouteObject = {
  path: 'dashboard',
  element: <AuthGuard roles={['ADMIN']} />,
  children: [
    {
      element: <RootDashboardLayout />,
      children: [
        { index: true, element: <DashboardHomePage /> },
        { path: 'produtos', element: <DashboardProductsPage /> },
        { path: 'usuarios', element: <DashboardUsersPage /> },
        {
          path: 'pedidos',
          element: <DashboardOrdersPage />,
        },
        {
          path: 'pedidos/:orderId',
          element: <DashboardOrderDetailsPage />,
        },
        { path: 'categorias', element: <DashboardCategoriesPage /> },
        { path: 'organizacao', element: <DashboardOrganizationPage /> },
      ],
    },
  ],
};
