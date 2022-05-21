import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { PATH } from '../../constants';
import { useAppDispatch } from '../../store/hooks';
import { logOut } from '../../store/user/user.slice';

export const UserNav = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate(PATH.home);
    handleClose();
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
      >
        <AccountCircle sx={{ mr: '5px' }} />
        <Typography>{t('LANG_PROFILE_TITLE')}</Typography>
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
        <MenuItem component={Link} to={PATH.boards} onClick={handleClose}>
          {t('LANG_BOARDS_TEXT')}
        </MenuItem>
        <MenuItem component={Link} to={PATH.profile} onClick={handleClose}>
          {t('LANG_EDIT_PROFILE_TEXT')}
        </MenuItem>
        <MenuItem onClick={handleLogout}>{t('LANG_LOGOUT_TEXT')}</MenuItem>
      </Menu>
    </div>
  );
};
