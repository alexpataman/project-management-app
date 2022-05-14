import React from 'react';

interface IErrorPage {
  code: number;
}

const ErrorPage: React.FC<IErrorPage> = ({ code }) => {
  return <h1>Error {code}</h1>;
};

export default ErrorPage;
