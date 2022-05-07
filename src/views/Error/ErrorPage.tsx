import React from 'react';

interface IErrorPage {
  code: number;
}

export const ErrorPage: React.FC<IErrorPage> = ({ code }) => {
  return <h1>Error {code}</h1>;
};
