import { Navigate } from 'react-router-dom';

import { PATH } from '../../constants';
import { useIsGuest } from '../../hooks/useIsGuest';

interface IPrivateRoute {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: IPrivateRoute) => {
  const isGuest = useIsGuest();

  return !isGuest ? children : <Navigate to={PATH.login} />;
};
