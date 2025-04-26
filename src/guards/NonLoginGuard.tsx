import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PageURLs } from '../utils/navigate';

type NonLoginGuardProps = {
  children: ReactNode;
};
export function NonLoginGuard({ children }: NonLoginGuardProps) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={PageURLs.ofHome()} />;
  }

  return <>{children}</>;
}
