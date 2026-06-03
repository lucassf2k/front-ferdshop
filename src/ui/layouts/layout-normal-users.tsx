import { Outlet } from 'react-router';
import { MenuBar } from '@/ui/components/menu-bar';

export const LayoutNormalUsers = () => {
  return (
    <>
      <MenuBar />
      <Outlet />
    </>
  );
};
