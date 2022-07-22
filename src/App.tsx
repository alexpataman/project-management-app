import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer, Header } from './components';
import { AppContext } from './context/AppContext';
import { useSnackbar } from './hooks/useSnackbar';

import './App.scss';

function App() {
  const { setMessage, SnackbarElement } = useSnackbar();

  const contextData = {
    snackbar: {
      setMessage,
    },
  };

  return (
    <AppContext.Provider value={contextData}>
      <div className="App">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        {SnackbarElement}
      </div>
    </AppContext.Provider>
  );
}

export default App;
