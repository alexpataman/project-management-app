import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import { ERROR_CODE_NOT_FOUND, PATH } from './constants';
import './helpers/i18n';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { BoardPage, BoardsPage, ErrorPage, HomePage } from './views';

import './index.scss';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={PATH.home} element={<App />}>
              <Route index element={<HomePage />} />
              <Route path={PATH.boards} element={<BoardsPage />} />
              <Route path={PATH.board}>
                <Route path=":id" element={<BoardPage />} />
              </Route>
              <Route path="*" element={<ErrorPage code={ERROR_CODE_NOT_FOUND} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}
reportWebVitals();
