import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer, Header } from './components';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
