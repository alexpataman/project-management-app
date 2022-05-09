import { useState } from 'react';

import { SignIn } from './components/SignIn/SignIn';
import { SignUp } from './components/SignUp/SignUp';
import { LOGIN_VIEWS } from './utils/constants';

const LoginPage = () => {
  const [view, setView] = useState(LOGIN_VIEWS.signIn);

  const changeView = (view: string) => {
    setView(view);
  };

  const component =
    view === LOGIN_VIEWS.signIn ? (
      <SignIn changeView={changeView} />
    ) : (
      <SignUp changeView={changeView} />
    );

  return <>{component}</>;
};

export default LoginPage;
