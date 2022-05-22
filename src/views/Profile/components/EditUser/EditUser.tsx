import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Alert, AlertColor } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { users } from '../../../../api/backend';
import { AlreadyExistsError } from '../../../../errors/AlreadyExistsError';
import { useAuthControl } from '../../../../hooks/useAuthControl';
import { User } from '../../../../types/api';

interface IEditUser {
  data: User;
}

export const EditUser: React.FC<IEditUser> = ({ data }) => {
  const { name, login, id } = data;
  const [alert, setAlert] = useState<{ type: AlertColor; message: string }>();
  const { t } = useTranslation();
  const authControl = useAuthControl();

  const validationSchema = yup.object({
    name: yup.string().required(t('LANG_FIELD_IS_REQUIRED')),
    login: yup.string().required(t('LANG_FIELD_IS_REQUIRED')),
    password: yup.string().required(t('LANG_FIELD_IS_REQUIRED')),
  });

  const formik = useFormik({
    initialValues: {
      name: name || '',
      login: login || '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await authControl(users.updateUser(id, values));
        setAlert({ type: 'success', message: t('LANG_EDIT_PROFILE_SUCCESS_TEXT') });
      } catch (error) {
        if (error instanceof AlreadyExistsError) {
          setAlert({ type: 'error', message: t('LANG_USER_EXISTS_ERROR') });
        } else {
          setAlert({ type: 'error', message: t('LANG_SOMETHING_WENT_WRONG_TEXT') });
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
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('LANG_EDIT_PROFILE_TEXT')}
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {alert && (
              <Grid item xs={12} sm={12}>
                <Alert severity={alert.type}>{alert.message}</Alert>
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {t('LANG_SUBMIT_BUTTON_TEXT')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
