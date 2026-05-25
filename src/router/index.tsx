import { RouterProvider } from 'react-router/dom';
import { createBrowserRouter } from 'react-router';
import { RootLayout } from '@/ui/pages/layout';
import { publicRoutes } from '@/router/routes/public';
import { appRoutes } from '@/router/routes/app';
import { dashboardRoutes } from '@/router/routes/dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [...publicRoutes, appRoutes, dashboardRoutes],
  },
]);

export const Router = () => <RouterProvider router={router} />;
