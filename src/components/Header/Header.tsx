import { useScrollTrigger } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import classnames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { UserNav } from '..';
import { GuestNav } from '..';
import { APP_NAME, PATH } from '../../constants';
import { useIsGuest } from '../../hooks/useIsGuest';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';

import './Header.scss';

export const Header = () => {
  const isGuest = useIsGuest();
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  return (
    <AppBar
      position="sticky"
      className={classnames('Header', { sticky: trigger })}
      color="transparent"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'inline' } }}>
            <Box component={Link} to={PATH.home} className="logo">
              {APP_NAME}
            </Box>
          </Box>

          <Button
            component={Link}
            to="/"
            className="logo"
            sx={{ flexGrow: 1, display: { xs: 'inline', md: 'none' } }}
          >
            {APP_NAME}
          </Button>

          <LanguageSwitcher />
          {isGuest ? <GuestNav /> : <UserNav />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
