import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

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

  return (
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
  );
};

export default ModalForm;
