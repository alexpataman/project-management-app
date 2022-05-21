import { useEffect, useState } from 'react';

import { useIsGuest } from '../../hooks/useIsGuest';
import { LogOut } from './components/LogOut/LogOut';
import { SignIn } from './components/SignIn/SignIn';
import { SignUp } from './components/SignUp/SignUp';
import { LOGIN_VIEWS } from './utils/constants';

interface ILoginPage {
  defaultView?: LOGIN_VIEWS;
}

const LoginPage = ({ defaultView = LOGIN_VIEWS.signIn }: ILoginPage) => {
  const [view, setView] = useState(defaultView);
  const isGuest = useIsGuest();

  useEffect(() => {
    setView(defaultView);
  }, [defaultView]);

  const changeView = (view: LOGIN_VIEWS) => {
    setView(view);
  };

  if (!isGuest) {
    return <LogOut />;
  } else {
    return view === LOGIN_VIEWS.signIn ? (
      <SignIn changeView={changeView} />
    ) : (
      <SignUp changeView={changeView} />
    );
  }
};

export default LoginPage;
