import { ReactNode } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import { PageURLs } from '../utils/navigate';

type AuthGuardProps = {
  children: ReactNode;
};
export function AuthGuard({ children }: AuthGuardProps) {
  // const { isLoggedIn } = useAuth();

  // if (!isLoggedIn) {
  //   return <Navigate to={PageURLs.ofAuth()} replace />;
  // }

  return <>{children}</>;
}
