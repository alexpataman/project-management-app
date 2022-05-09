import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { useAppDispatch } from '../../../../store/hooks';
import { signUp } from '../../../../store/user/user.slice';
import {
  FIELD_IS_REQUIRED,
  FIELD_LABEL_EMAIL,
  FIELD_LABEL_NAME,
  FIELD_LABEL_PASSWORD,
  LOGIN_VIEWS,
  REGISTRATION_TEXT,
  SUBMIT_BUTTON_TEXT,
  USER_HAS_ACCOUNT_TEXT,
} from '../../utils/constants';

interface SignUp {
  changeView: (view: string) => void;
}

export const SignUp: React.FC<SignUp> = ({ changeView }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const validationSchema = yup.object({
    name: yup.string().required(t(FIELD_IS_REQUIRED)),
    login: yup.string().required(t(FIELD_IS_REQUIRED)),
    password: yup.string().required(t(FIELD_IS_REQUIRED)),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      login: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(signUp(values));
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t(REGISTRATION_TEXT)}
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="name"
                name="name"
                fullWidth
                id="name"
                label={t(FIELD_LABEL_NAME)}
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
                label={t(FIELD_LABEL_EMAIL)}
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
                label={t(FIELD_LABEL_PASSWORD)}
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {t(SUBMIT_BUTTON_TEXT)}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="#" variant="body2" onClick={() => changeView(LOGIN_VIEWS.signIn)}>
                {t(USER_HAS_ACCOUNT_TEXT)}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
