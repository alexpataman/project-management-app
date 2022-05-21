import { useNavigate } from 'react-router-dom';

import { PATH } from '../constants';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { useAppDispatch } from '../store/hooks';
import { logOut } from '../store/user/user.slice';

export const useAuthControl = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return <T>(promise: Promise<T>) => {
    return promise
      .then((result) => result)
      .catch((error) => {
        if (error instanceof UnauthorizedError) {
          dispatch(logOut());
          navigate(PATH.home);
        }
      });
  };
};
