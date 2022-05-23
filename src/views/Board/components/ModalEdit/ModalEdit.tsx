import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { modalStyle } from '../../utils/modalStyle';
import { TaskEditForm } from '../../utils/types';
import { Confirmation } from '../ModalConfirmation';

import './ModalEdit.scss';

const ModalEdit = ({
  task,
  updateTask,
  deleteTask,
  closeModal,
}: {
  task: { title: string; description: string };
  updateTask: (name: string, description: string) => void;
  deleteTask: () => void;
  closeModal: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    closeModal;
  };
  const { register, handleSubmit } = useForm<TaskEditForm>();
  const { t } = useTranslation();

  const onSubmit = (data: TaskEditForm) => {
    if (data) {
      const { name, description } = data;
      updateTask(name, description);
      closeModal();
    }
  };
  return (
    <div className="ModalEdit">
      <Typography variant="h5">{t('BOARD_MODAL_CHANGE_CARD')}</Typography>
      <IconButton className="close-icon" aria-label="delete" onClick={closeModal}>
        <CloseIcon />
      </IconButton>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs">
          <TextField
            variant="outlined"
            label={t('BOARD_MODAL_NAME')}
            defaultValue={task.title}
            {...register('name', { required: true })}
          />
          <TextField
            variant="outlined"
            label={t('BOARD_MODAL_DESCRIPTION')}
            defaultValue={task.description}
            multiline
            {...register('description', { required: true })}
          />
        </div>
        <div className="buttons">
          <Button variant="outlined" onClick={closeModal}>
            {t('BOARD_MODAL_CANCEL')}
          </Button>
          <Button type="submit" variant="contained">
            {t('BOARD_MODAL_CHANGE')}
          </Button>
        </div>
        <Button variant="outlined" color="error" onClick={handleOpen}>
          {t('BOARD_MODAL_DELETE_CARD')}
        </Button>
      </form>
      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Confirmation deleteCallback={deleteTask} closeModal={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default ModalEdit;
