import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { authorization } from '../../../../api/backend';
import { PATH } from '../../../../constants';
import { ForbiddenError } from '../../../../errors/ForbiddenError';
import { useAppDispatch } from '../../../../store/hooks';
import { signIn } from '../../../../store/user/user.slice';
import { LOGIN_VIEWS } from '../../utils/constants';

interface SignIn {
  changeView: (view: LOGIN_VIEWS) => void;
}

export const SignIn: React.FC<SignIn> = ({ changeView }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [alert, setAlert] = useState('');
  const navigate = useNavigate();

  const validationSchema = yup.object({
    login: yup.string().required(t('LANG_FIELD_IS_REQUIRED')),
    password: yup.string().required(t('LANG_FIELD_IS_REQUIRED')),
  });

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const { token, name, id } = await authorization.signIn(values);
        dispatch(signIn({ token, name, id }));
        navigate(PATH.boards);
      } catch (error) {
        if (error instanceof ForbiddenError) {
          setAlert(t('LANG_FORBIDDEN_ERROR'));
        }
      }
    },
  });

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
          {t('LANG_LOGIN_TEXT')}
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          {alert && (
            <Grid item xs={12} sm={12}>
              <Alert severity="error">{alert}</Alert>
            </Grid>
          )}
          <TextField
            margin="normal"
            fullWidth
            id="login"
            label={t('LANG_FIELD_LABEL_LOGIN')}
            name="login"
            autoComplete="login"
            autoFocus
            value={formik.values.login}
            onChange={formik.handleChange}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label={t('LANG_FIELD_LABEL_PASSWORD')}
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {t('LANG_SUBMIT_BUTTON_TEXT')}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="#" variant="body2" onClick={() => changeView(LOGIN_VIEWS.signUp)}>
                {t('LANG_USER_HAS_NO_ACCOUNT_TEXT')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
