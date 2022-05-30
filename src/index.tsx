import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { ERROR_CODES, ERROR_NAMES, PATH } from './constants';
import './helpers/i18n';
import './helpers/taskCheck';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { BoardPage, BoardsPage, ErrorPage, HomePage, LoginPage, ProfilePage } from './views';
import { LOGIN_VIEWS } from './views/Login/utils/constants';

import './index.scss';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={PATH.home} element={<App />}>
              <Route index element={<HomePage />} />
              <Route path={PATH.login} element={<LoginPage />} />
              <Route path={PATH.signup} element={<LoginPage defaultView={LOGIN_VIEWS.signUp} />} />
              <Route
                path={PATH.profile}
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route
                path={PATH.boards}
                element={
                  <PrivateRoute>
                    <BoardsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={`${PATH.board}/:id`}
                element={
                  <PrivateRoute>
                    <BoardPage />
                  </PrivateRoute>
                }
              >
                <Route
                  path=":taskId"
                  element={
                    <PrivateRoute>
                      <BoardPage />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route path={PATH.error} element={<ErrorPage />} />
              <Route path="*" element={<ErrorPage code={ERROR_CODES[ERROR_NAMES.NOT_FOUND]} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
}
reportWebVitals();
