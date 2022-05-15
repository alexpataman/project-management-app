import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Portal } from '../../../../components';
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
  const [isDelete, setIsDelete] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: unknown) => {
    if (data) {
      saveName((data as { name: string }).name);
      closeModal();
    }
  };

  const onOverlayClick = (e: SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const editNode = (
    <div className="overlay" onClick={onOverlayClick}>
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
          <Button variant="outlined" color="error" onClick={() => setIsDelete(true)}>
            Удалить карточку
          </Button>
        </form>
      </div>
      {isDelete && (
        <Confirmation deleteCallback={deleteTask} closeModal={() => setIsDelete(false)} />
      )}
    </div>
  );

  return <Portal elem={editNode} />;
};

export default ModalEdit;
