import { useState } from 'react';

import { useIsGuest } from '../../hooks/useIsGuest';
import { LogOut } from './components/LogOut/LogOut';
import { SignIn } from './components/SignIn/SignIn';
import { SignUp } from './components/SignUp/SignUp';
import { LOGIN_VIEWS } from './utils/constants';

const LoginPage = () => {
  const [view, setView] = useState(LOGIN_VIEWS.signIn);
  const isGuest = useIsGuest();

  const changeView = (view: string) => {
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
