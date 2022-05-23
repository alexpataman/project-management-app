import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { PATH } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUserState, logOut } from '../../store/user/user.slice';

export const UserNav = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { t } = useTranslation();
  const { name } = useAppSelector(getUserState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logOut());
    navigate(PATH.home);
  };
  return (
    <div>
      <Button
        size="large"
        aria-label="account of current user"
        aria-controls="menu-user"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        sx={{ textTransform: 'none' }}
        className="user-nav"
      >
        <AccountCircle sx={{ mr: '5px' }} />
        <Typography>{name}</Typography>
      </Button>
      <Menu
        id="menu-user"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
      >
        <MenuItem component={Link} to={PATH.boards} onClick={() => handleClose()}>
          {t('LANG_BOARDS_TEXT')}
        </MenuItem>
        <MenuItem component={Link} to={PATH.profile} onClick={() => handleClose()}>
          {t('LANG_EDIT_PROFILE_TEXT')}
        </MenuItem>
        <MenuItem onClick={handleLogout}>{t('LANG_LOGOUT_TEXT')}</MenuItem>
      </Menu>
    </div>
  );
};
