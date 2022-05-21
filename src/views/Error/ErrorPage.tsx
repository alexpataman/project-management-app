import Container from '@mui/material/Container';
import React from 'react';

interface IErrorPage {
  code: number;
}

const ErrorPage: React.FC<IErrorPage> = ({ code }) => {
  return (
    <Container maxWidth="xl">
      <h1>Error {code}</h1>
    </Container>
  );
};

export default ErrorPage;
