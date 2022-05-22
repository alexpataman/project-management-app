import { useNavigate } from 'react-router-dom';

import { ERROR_CODES, ERROR_NAME_UNAUTHORIZED, PATH } from '../constants';
import { CustomError } from '../errors/CustomError';
import { useAppDispatch } from '../store/hooks';
import { logOut } from '../store/user/user.slice';

export const useBackendErrorCatcher = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return <T>(promise: Promise<T>) => {
    return promise
      .then((result) => result)
      .catch((error) => {
        if (error instanceof CustomError) {
          const { code, message } = error;
          if (code === ERROR_CODES[ERROR_NAME_UNAUTHORIZED]) {
            dispatch(logOut());
            navigate(PATH.home);
          } else {
            navigate(PATH.error, { state: { code, message } });
          }
        }
      });
  };
};
