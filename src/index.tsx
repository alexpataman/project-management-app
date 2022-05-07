import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { ERROR_CODE_NOT_FOUND } from './utils/constants/errors.constants';
import { navigation } from './utils/constants/navigation.constants';
import './utils/helpres/i18n';
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
            <Route path={navigation.home.link} element={<App />}>
              <Route index element={<HomePage />} />
              <Route path={navigation.boards.link} element={<BoardsPage />} />
              <Route path={navigation.board.link}>
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
