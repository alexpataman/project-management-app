import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { useAppSelector } from '../../../../store/hooks';
import { getUserState } from '../../../../store/user/user.slice';
import { getUsersState } from '../../../../store/users/users.slice';

import './ModalForm.scss';

const ModalForm = ({
  mode,
  saveTask,
  closeModal,
}: {
  mode: 'column' | 'task';
  saveTask: (title: string, description: string, responsible: string) => void;
  closeModal: () => void;
}) => {
  const { t } = useTranslation();
  const userId = useAppSelector(getUserState).id;
  const [responsible, setResponsible] = useState<string>(userId);
  const { users } = useAppSelector(getUsersState);

  const validationSchema = yup.object({
    title: yup.string().required(t('LANG_FIELD_IS_REQUIRED')),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const { title, description } = values;
      saveTask(title, description, responsible);
      closeModal();
    },
  });

  return (
    <div className="ModalForm">
      <Typography variant="h5">{t(`BOARD_MODAL_ADD_${mode.toUpperCase()}`)}</Typography>
      <IconButton className="close-icon" aria-label="delete" onClick={closeModal}>
        <CloseIcon />
      </IconButton>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <div className="inputs">
          <TextField
            autoFocus
            id="title"
            variant="outlined"
            label={t('BOARD_MODAL_NAME')}
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          {mode === 'task' && (
            <>
              <TextField
                id="description"
                variant="outlined"
                label={t('BOARD_MODAL_DESCRIPTION')}
                multiline
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />

              <div className="form-select">
                <InputLabel id="select-label">{`${t('BOARD_MODAL_RESPONSIBLE')}:`}</InputLabel>
                <Select
                  labelId="select-label"
                  sx={{ minWidth: 120 }}
                  value={responsible}
                  onChange={(e: SelectChangeEvent) => {
                    setResponsible(e.target.value);
                  }}
                >
                  {users.map((user) => (
                    <MenuItem value={user.id} key={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </>
          )}
        </div>
        <div className="buttons">
          <Button type="button" variant="outlined" onClick={closeModal}>
            {t('BOARD_MODAL_CANCEL')}
          </Button>
          <Button type="submit" variant="contained">
            {t('BOARD_MODAL_ADD')}
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default ModalForm;
