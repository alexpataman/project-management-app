import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer, Header } from './components';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
