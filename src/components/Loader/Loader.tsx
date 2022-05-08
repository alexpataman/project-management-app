import { ReactNode } from 'react';

interface ILoader {
  isLoading: boolean;
  children: ReactNode;
}

export const Loader = ({ children, isLoading }: ILoader) => (
  <>{isLoading ? 'Loading...' : children}</>
);
