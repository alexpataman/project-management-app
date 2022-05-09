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
import { signIn } from '../../../../store/user/user.slice';
import {
  FIELD_IS_REQUIRED,
  FIELD_LABEL_EMAIL,
  FIELD_LABEL_PASSWORD,
  LOGIN_TEXT,
  LOGIN_VIEWS,
  SUBMIT_BUTTON_TEXT,
  USER_HAS_NO_ACCOUNT_TEXT,
} from '../../utils/constants';

interface SignIn {
  changeView: (view: string) => void;
}

export const SignIn: React.FC<SignIn> = ({ changeView }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const validationSchema = yup.object({
    login: yup.string().required(t(FIELD_IS_REQUIRED)),
    password: yup.string().required(t(FIELD_IS_REQUIRED)),
  });

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(signIn(values));
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
          {t(LOGIN_TEXT)}
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="login"
            label={t(FIELD_LABEL_EMAIL)}
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
            label={t(FIELD_LABEL_PASSWORD)}
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {t(SUBMIT_BUTTON_TEXT)}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="#" variant="body2" onClick={() => changeView(LOGIN_VIEWS.signUp)}>
                {t(USER_HAS_NO_ACCOUNT_TEXT)}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
