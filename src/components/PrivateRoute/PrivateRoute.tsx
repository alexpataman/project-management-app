import { Navigate } from 'react-router-dom';

import { useIsGuest } from '../../hooks/useIsGuest';

interface IPrivateRoute {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: IPrivateRoute) => {
  const isGuest = useIsGuest();

  return !isGuest ? children : <Navigate to="/login" />;
};
