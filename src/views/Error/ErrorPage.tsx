import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { ERROR_CODES, ERROR_NAMES, PATH } from '../../constants';
import { useIsGuest } from '../../hooks/useIsGuest';

interface IErrorPage {
  code?: number;
}

const ErrorPage: React.FC<IErrorPage> = ({ code }) => {
  const { t } = useTranslation();
  const location = useLocation() as { state: { code: string; message: string } };
  const errorCode = code || (location.state?.code as string) || '';
  const message = location.state?.message as string;
  const isGuest = useIsGuest();
  const navigate = useNavigate();

  useEffect(() => {
    if (errorCode === ERROR_CODES[ERROR_NAMES.NOT_FOUND]) {
      if (isGuest) {
        navigate(PATH.login);
      } else {
        navigate(PATH.boards);
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="xl">
      <h1>
        {t('LANG_ERROR_TITLE')} {errorCode}
      </h1>
      {message && <Typography>{message}</Typography>}
    </Container>
  );
};

export default ErrorPage;
