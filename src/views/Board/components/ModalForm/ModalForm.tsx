import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';

import { Portal } from '../../../../components';

import './ModalForm.scss';

const ModalForm = ({
  saveTask,
  closeModal,
}: {
  saveTask: (task: string) => void;
  closeModal: () => void;
}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: unknown) => {
    if (data) {
      saveTask((data as { name: string }).name);
      closeModal();
    }
  };

  const onOverlayClick = (e: SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const formNode = (
    <div className="overlay" onClick={onOverlayClick}>
      <div className="ModalForm">
        <Typography variant="h4">Добавить элемент</Typography>
        <IconButton className="close-icon" aria-label="delete" onClick={closeModal}>
          <CloseIcon />
        </IconButton>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs">
            <TextField variant="outlined" label={'Имя'} {...register('name', { required: true })} />
            <TextField
              variant="outlined"
              label={'Описание'}
              {...register('info', { required: false })}
            />
          </div>
          <div className="buttons">
            <Button type="submit" variant="outlined" onClick={closeModal}>
              Отменить
            </Button>
            <Button type="submit" variant="contained">
              Добавить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return <Portal elem={formNode} />;
};

export default ModalForm;
