import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface IErrorPage {
  code?: number;
}

const ErrorPage: React.FC<IErrorPage> = ({ code }) => {
  const { t } = useTranslation();
  const location = useLocation() as { state: { code: string; message: string } };
  const errorCode = code || (location.state?.code as string) || '';
  const message = location.state?.message as string;
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
