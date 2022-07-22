import { createContext } from 'react';

interface IAppContext {
  snackbar: {
    setMessage: (value: string) => void;
  };
}

export const AppContext = createContext<IAppContext>({
  snackbar: {
    setMessage: () => {},
  },
});
