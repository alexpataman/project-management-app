import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { PATH } from '../../constants';
import { useIsGuest } from '../../hooks/useIsGuest';
import { useSearchModal } from '../../hooks/useSearchModal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUserState, logOut } from '../../store/user/user.slice';

export const UserNav = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { t } = useTranslation();
  const isGuest = useIsGuest();
  const { name } = useAppSelector(getUserState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { SearchPortal, setIsModalOpen } = useSearchModal();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = () => {
    handleMenuClose();
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logOut());
    navigate(PATH.home);
  };

  let menuItems;
  if (isGuest) {
    menuItems = [
      <MenuItem component={Link} to={PATH.login} onClick={handleMenuClose} key={PATH.login}>
        {t('LANG_LOGIN_TEXT')}
      </MenuItem>,
      <MenuItem component={Link} to={PATH.signup} onClick={handleMenuClose} key={PATH.signup}>
        {t('LANG_SIGNUP_TEXT')}
      </MenuItem>,
    ];
  } else {
    menuItems = [
      <MenuItem component={Link} to={PATH.boards} onClick={handleMenuClose} key={PATH.boards}>
        {t('LANG_BOARDS_TEXT')}
      </MenuItem>,
      <MenuItem onClick={handleSearch} key="search">
        {t('LANG_SEARCH_TEXT')}
      </MenuItem>,
      <MenuItem component={Link} to={PATH.profile} onClick={handleMenuClose} key={PATH.profile}>
        {t('LANG_EDIT_PROFILE_TEXT')}
      </MenuItem>,
      <MenuItem onClick={handleLogout} key="logout">
        {t('LANG_LOGOUT_TEXT')}
      </MenuItem>,
    ];
  }

  return (
    <div>
      <Button
        size="large"
        aria-label="account of current user"
        aria-controls="menu-user"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
        sx={{ textTransform: 'none' }}
        className="user-nav"
      >
        <AccountCircle sx={{ mr: '5px' }} />
        <Typography>{isGuest ? t('LANG_GUEST_TITLE') : name}</Typography>
      </Button>
      <Menu id="menu-user" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {menuItems}
      </Menu>
      {SearchPortal}
    </div>
  );
};
