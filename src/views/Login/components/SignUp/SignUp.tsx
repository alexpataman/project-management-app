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
import { Loader } from '../../../../components';
import { PATH } from '../../../../constants';
import { AlreadyExistsError } from '../../../../errors';
import { useAppDispatch } from '../../../../store/hooks';
import { signIn } from '../../../../store/user/user.slice';
import { LOGIN_VIEWS } from '../../utils/constants';

interface SignUp {
  changeView: (view: LOGIN_VIEWS) => void;
}

export const SignUp: React.FC<SignUp> = ({ changeView }) => {
  const [alert, setAlert] = useState('');
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object({
    name: yup.string().required(t('LANG_FIELD_IS_REQUIRED')),
    login: yup.string().required(t('LANG_FIELD_IS_REQUIRED')),
    password: yup.string().required(t('LANG_FIELD_IS_REQUIRED')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      login: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await authorization.signUp(values);
        const { login, password } = values;
        const { token, name, id } = await authorization.signIn({ login, password });
        await dispatch(signIn({ token, name, id }));
        setIsLoading(false);
        navigate(PATH.boards);
      } catch (error) {
        if (error instanceof AlreadyExistsError) {
          setAlert(t('LANG_USER_EXISTS_ERROR'));
        }
        setIsLoading(false);
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
          {t('LANG_REGISTRATION_TEXT')}
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {alert && (
              <Grid item xs={12} sm={12}>
                <Alert severity="error">{alert}</Alert>
              </Grid>
            )}
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="name"
                name="name"
                fullWidth
                id="name"
                label={t('LANG_FIELD_LABEL_NAME')}
                autoFocus
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="login"
                label={t('LANG_FIELD_LABEL_LOGIN')}
                name="login"
                autoComplete="login"
                type="login"
                value={formik.values.login}
                onChange={formik.handleChange}
                error={formik.touched.login && Boolean(formik.errors.login)}
                helperText={formik.touched.login && formik.errors.login}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label={t('LANG_FIELD_LABEL_PASSWORD')}
                type="password"
                id="password"
                autoComplete="new-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
          </Grid>
          <Loader isLoading={isLoading}>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {t('LANG_SUBMIT_BUTTON_TEXT')}
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="#" variant="body2" onClick={() => changeView(LOGIN_VIEWS.signIn)}>
                  {t('LANG_USER_HAS_ACCOUNT_TEXT')}
                </Link>
              </Grid>
            </Grid>
          </Loader>
        </Box>
      </Box>
    </Container>
  );
};
