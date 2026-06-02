import { Outlet } from 'react-router';
import { DashboardMenuBar } from '@/ui/components/menu-dashboard/menu-bar';

export const RootDashboardLayout = () => {
  return (
    <div className="grid grid-cols-[68px_auto]">
      <DashboardMenuBar />
      <Outlet />
    </div>
  );
};
