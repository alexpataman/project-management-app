import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { TaskEditForm } from '../../utils/types';

import './ModalForm.scss';

const ModalForm = ({
  saveTask,
  closeModal,
}: {
  saveTask: (title: string, description: string) => void;
  closeModal: () => void;
}) => {
  const { register, handleSubmit } = useForm<TaskEditForm>();

  const onSubmit = (data: TaskEditForm) => {
    if (data) {
      const { name, description } = data;
      saveTask(name, description);
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
            {...register('description', { required: false })}
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
