import { ReactNode, useEffect } from 'react';
import { AuthContext } from '../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  getUserProfile,
  selectIsAuthenticated
} from '../redux/slices/authSlice';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch, isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isLoggedIn: isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
