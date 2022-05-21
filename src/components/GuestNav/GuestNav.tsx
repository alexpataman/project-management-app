import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { PATH } from '../../constants';

export const GuestNav = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { t } = useTranslation();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        sx={{ textTransform: 'none' }}
        className="user-nav"
      >
        <AccountCircle sx={{ mr: '5px' }} />
        <Typography>{t('LANG_GUEST_TITLE')}</Typography>
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to={PATH.login} onClick={handleClose}>
          {t('LANG_LOGIN_TEXT')}
        </MenuItem>
        <MenuItem component={Link} to={PATH.signup} onClick={handleClose}>
          {t('LANG_SIGNUP_TEXT')}
        </MenuItem>
      </Menu>
    </div>
  );
};
