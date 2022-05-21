import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { ERROR_CODE_NOT_FOUND, PATH } from './constants';
import './helpers/i18n';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { BoardPage, BoardsPage, ErrorPage, HomePage, LoginPage, UsersPage } from './views';
import { LOGIN_VIEWS } from './views/Login/utils/constants';

import './index.scss';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div />}>
          <Routes>
            <Route path={PATH.home} element={<App />}>
              <Route index element={<HomePage />} />
              <Route path={PATH.login} element={<LoginPage />} />
              <Route path={PATH.signup} element={<LoginPage defaultView={LOGIN_VIEWS.signUp} />} />
              <Route path={PATH.users} element={<UsersPage />} />
              <Route
                path={PATH.boards}
                element={
                  <PrivateRoute>
                    <BoardsPage />
                  </PrivateRoute>
                }
              />
              <Route path={PATH.board}>
                <Route path=":id" element={<BoardPage />} />
              </Route>
              <Route path="*" element={<ErrorPage code={ERROR_CODE_NOT_FOUND} />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}
reportWebVitals();
