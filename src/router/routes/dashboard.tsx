import type { RouteObject } from 'react-router';
import { AuthGuard } from '@/router/guards/auth-guard';
import { RootDashboardLayout } from '@/ui/pages/dashboard/layout';
import { DashboradHomePage } from '@/ui/pages/dashboard/home';

export const dashboardRoutes: RouteObject = {
  element: <AuthGuard roles={['ADMIN']} />,
  children: [
    {
      path: 'dashboard',
      element: <RootDashboardLayout />,
      children: [{ index: true, element: <DashboradHomePage /> }],
    },
  ],
};
