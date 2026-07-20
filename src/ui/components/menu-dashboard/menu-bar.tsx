import { HomeIcon, LogOut, LucideUsersRound } from 'lucide-react';
import { DashboardMenuBarItem } from '@/ui/components/menu-dashboard/menu-bar-item';
import { Button } from '../base-button';
import { useLogOut } from '@/hooks/auth/use-logout';
import { MdOutlineCategory } from 'react-icons/md';
import { FiPackage } from 'react-icons/fi';

export const DashboardMenuBar = () => {
  const { logOut } = useLogOut();

  return (
    <div className="flex h-112 w-full flex-col items-center justify-between gap-5 rounded-br-4xl border border-amber-500 bg-zinc-50 py-4">
      <div>
        <DashboardMenuBarItem title="Menu" Icon={HomeIcon} to="/" />
        <DashboardMenuBarItem
          title="Categorias"
          Icon={MdOutlineCategory}
          to="/dashboard/categorias"
        />
        <DashboardMenuBarItem
          title="Usuários"
          Icon={LucideUsersRound}
          to="/dashboard/usuarios"
        />
        <DashboardMenuBarItem
          title="Produtos"
          Icon={FiPackage}
          to="/dashboard/produtos"
        />
        <DashboardMenuBarItem title="Settings" Icon={HomeIcon} to="/settings" />
      </div>

      <Button
        type="button"
        onClick={logOut}
        className="cursor-pointer bg-transparent text-red-600 hover:bg-transparent hover:text-red-500"
      >
        <LogOut className="h-6! w-6!" />
      </Button>
    </div>
  );
};
