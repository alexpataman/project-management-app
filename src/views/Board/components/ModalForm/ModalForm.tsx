import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { ModalConfirmation } from '../../../../components';
import { useAppSelector } from '../../../../store/hooks';
import { getUserState } from '../../../../store/user/user.slice';
import { getUsersState } from '../../../../store/users/users.slice';
import { INPUT_MAX_ROWS } from '../../utils/constants';
import { modalStyle } from '../../utils/modalStyle';

import './ModalForm.scss';

const ModalForm = ({
  mode,
  task,
  saveTask,
  deleteTask,
  closeModal,
}: {
  mode: 'column' | 'task' | 'edit';
  task: { title: string; description: string; userId: string } | undefined;
  saveTask: (title: string, description: string, responsible: string) => void;
  deleteTask: (() => void) | undefined;
  closeModal: () => void;
}) => {
  const { t } = useTranslation();
  const userId = useAppSelector(getUserState).id;
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    closeModal;
  };
  const [responsible, setResponsible] = useState<string>(userId);
  const { users } = useAppSelector(getUsersState);

  const validationSchema = yup.object({
    title: yup.string().required(t('LANG_FIELD_IS_REQUIRED')),
  });

  const formik = useFormik({
    initialValues: {
      title: mode === 'edit' ? (task ? task.title : '') : '',
      description: mode === 'edit' ? (task ? task.description : '') : '',
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
      <Typography variant="h5">{t(`BOARD_MODAL_FORM_${mode.toUpperCase()}`)}</Typography>
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
          {mode !== 'column' && (
            <>
              <TextField
                id="description"
                variant="outlined"
                label={t('BOARD_MODAL_DESCRIPTION')}
                multiline
                rows={3}
                maxRows={INPUT_MAX_ROWS}
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
            {t(mode === 'edit' ? 'BOARD_MODAL_SAVE' : 'BOARD_MODAL_ADD')}
          </Button>
        </div>
        {mode === 'edit' && (
          <Button variant="outlined" type="button" color="error" onClick={handleOpen}>
            {t('BOARD_MODAL_DELETE_CARD')}
          </Button>
        )}
      </Box>
      {deleteTask && (
        <Modal open={isOpen} onClose={handleClose}>
          <Box sx={modalStyle}>
            <ModalConfirmation deleteCallback={deleteTask} closeModal={handleClose} />
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default ModalForm;
