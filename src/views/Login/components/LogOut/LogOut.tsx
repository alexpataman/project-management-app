import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../../../store/hooks';
import { logOut } from '../../../../store/user/user.slice';

interface LogOut {}

export const LogOut: React.FC<LogOut> = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('LANG_LOGGED_IN_TEXT')}
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => dispatch(logOut())}
        >
          {t('LANG_LOGOUT_TEXT')}
        </Button>
      </Box>
    </Container>
  );
};
