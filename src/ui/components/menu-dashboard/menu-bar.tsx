import { HomeIcon } from 'lucide-react';
import { DashboardMenuBarItem } from '@/ui/components/menu-dashboard/menu-bar-item';

export const DashboardMenuBar = () => {
  return (
    <div className="flex h-112 w-full flex-col items-center gap-5 rounded-br-4xl bg-blue-700 pt-4">
      <DashboardMenuBarItem title="Menu" Icon={HomeIcon} to="/" />
      <DashboardMenuBarItem
        title="Dashboard"
        Icon={HomeIcon}
        to="/casdastrar/categorias"
      />
      <DashboardMenuBarItem title="Settings" Icon={HomeIcon} to="/settings" />
    </div>
  );
};
