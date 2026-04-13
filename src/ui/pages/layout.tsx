import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

export const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster richColors theme="light" position="top-center" />
    </>
  );
};
