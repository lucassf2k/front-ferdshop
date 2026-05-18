import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import { MenuBar } from '@/ui/components/menu-bar';

export const RootLayout = () => {
  return (
    <>
      <MenuBar />
      <Outlet />
      <Toaster richColors theme="light" position="top-center" />
    </>
  );
};
