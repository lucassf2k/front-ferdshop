import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import NextTopLoader from 'nextjs-toploader';
import { ReactQueryLoader } from '../components/react-query-loader';

export const RootLayout = () => {
  return (
    <>
      <NextTopLoader color="#fd9a00" />
      <ReactQueryLoader />
      <Outlet />
      <Toaster richColors theme="light" position="top-center" />
    </>
  );
};
