import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ERROR_CODES, ERROR_NAMES, PATH } from '../constants';
import { AppContext } from '../context/AppContext';
import { CustomError } from '../errors/CustomError';
import { useAppDispatch } from '../store/hooks';
import { logOut } from '../store/user/user.slice';

export const useBackendErrorCatcher = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { snackbar } = useContext(AppContext);
  const { t } = useTranslation();

  return <T>(promise: Promise<T>) => {
    return promise
      .then((result) => result)
      .catch((error) => {
        if (error instanceof CustomError) {
          const { code, message } = error;

          switch (code) {
            case ERROR_CODES[ERROR_NAMES.UNAUTHORIZED]:
              snackbar.setMessage(t('LANG_UNAUTHORISED_TEXT'));
              dispatch(logOut());
              navigate(PATH.home);
              break;
            case ERROR_CODES[ERROR_NAMES.NOT_FOUND]:
              navigate(PATH.error, { state: { code, message } });
              snackbar.setMessage(t('LANG_NOT_FOUND_TEXT'));
              break;
            default:
              navigate(PATH.boards);
              snackbar.setMessage(message || t('LANG_SOMETHING_WENT_WRONG_TEXT'));
          }
        }
      });
  };
};
