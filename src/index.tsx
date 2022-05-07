import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { navigation } from './utils/constants/navigation.constants';
import './index.scss';
import { HomePage } from './views/Home/HomePage';
import { BoardPage } from './views/Board/BoardPage';
import { BoardsPage } from './views/Boards/BoardsPage';
import { ErrorPage } from './views/Error/ErrorPage';
import { ERROR_CODE_NOT_FOUND } from './utils/constants/errors.constants';

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
