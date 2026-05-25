import { Navigate, Outlet } from 'react-router';
import { AppLoading } from '@/ui/components/app-loading';
import { useAuth } from '@/hooks/auth/use-auth';
import type { AuthRole } from '@/domain/entities/auth';

interface Props {
  roles?: AuthRole[];
}

export const AuthGuard = ({ roles = [] }: Props) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const hasRole =
    roles.length === 0 || Boolean(user && roles.includes(user.role));
  if (isLoading) return <AppLoading />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!hasRole) return <Navigate to="/403" replace />;
  return <Outlet />;
};
