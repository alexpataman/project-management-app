import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { modalStyle } from '../../utils/modalStyle';
import { Confirmation } from '../ModalConfirmation';

import './ModalEdit.scss';

const ModalEdit = ({
  name,
  saveName,
  deleteTask,
  closeModal,
}: {
  name: string;
  saveName: (name: string) => void;
  deleteTask: () => void;
  closeModal: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    closeModal;
  };
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: unknown) => {
    if (data) {
      saveName((data as { name: string }).name);
      closeModal();
    }
  };
  return (
    <div className="ModalEdit">
      <Typography variant="h5">Изменить карточку</Typography>
      <IconButton className="close-icon" aria-label="delete" onClick={closeModal}>
        <CloseIcon />
      </IconButton>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs">
          <TextField
            variant="outlined"
            label={'Имя'}
            defaultValue={name}
            {...register('name', { required: true })}
          />
        </div>
        <div className="buttons">
          <Button variant="outlined" onClick={closeModal}>
            Отменить
          </Button>
          <Button type="submit" variant="contained">
            Сохранить
          </Button>
        </div>
        <Button variant="outlined" color="error" onClick={handleOpen}>
          Удалить карточку
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
