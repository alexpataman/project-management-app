import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATH } from '../../constants';
import { useIsGuest } from '../../hooks/useIsGuest';
import { SignIn } from './components/SignIn/SignIn';
import { SignUp } from './components/SignUp/SignUp';
import { LOGIN_VIEWS } from './utils/constants';

interface ILoginPage {
  defaultView?: LOGIN_VIEWS;
}

const LoginPage = ({ defaultView = LOGIN_VIEWS.signIn }: ILoginPage) => {
  const [view, setView] = useState(defaultView);
  const isGuest = useIsGuest();
  const navigate = useNavigate();

  useEffect(() => {
    setView(defaultView);
  }, [defaultView]);

  useEffect(() => {
    if (!isGuest) {
      navigate(PATH.boards);
    }
  }, []);

  const changeView = (view: LOGIN_VIEWS) => {
    setView(view);
  };

  return view === LOGIN_VIEWS.signIn ? (
    <SignIn changeView={changeView} />
  ) : (
    <SignUp changeView={changeView} />
  );
};

export default LoginPage;
