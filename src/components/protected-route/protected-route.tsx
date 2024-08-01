import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { FC } from 'react';

export type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyUnAuth = false
}) => {
  const { isAuthChecked, data: user } = useSelector((state) => state.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user.email && user.name) {
    return <Navigate to={location.state || '/'} />;
  }

  if (!onlyUnAuth && (!user.email || !user.name)) {
    return <Navigate to={'/login'} state={location} />;
  }

  return <Outlet />;
};
