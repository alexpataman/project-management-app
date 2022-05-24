import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { users as usersApi } from '../../../../api/backend';
import { User } from '../../../../types/api';
import { TaskEditForm } from '../../utils/types';

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
  const [responsible, setResponsible] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const load = async () => {
      const users = await usersApi.getUsers();
      if (!users) return;
      setUsers(users);
    };
    load();
  }, []);
  const { register, handleSubmit } = useForm<TaskEditForm>();
  const { t } = useTranslation();
  const onSubmit = (data: TaskEditForm) => {
    if (data) {
      const { name, description } = data;
      saveTask(name, description, responsible);
      closeModal();
    }
  };

  return (
    <div className="ModalForm">
      <Typography variant="h5">{t(`BOARD_MODAL_ADD_${mode.toUpperCase()}`)}</Typography>
      <IconButton className="close-icon" aria-label="delete" onClick={closeModal}>
        <CloseIcon />
      </IconButton>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs">
          <TextField
            autoFocus
            variant="outlined"
            label={t('BOARD_MODAL_NAME')}
            {...register('name', { required: true })}
          />
          {mode === 'task' && (
            <TextField
              variant="outlined"
              label={t('BOARD_MODAL_DESCRIPTION')}
              multiline
              {...register('description', { required: false })}
            />
          )}
          {mode === 'task' && (
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
      </form>
    </div>
  );
};

export default ModalForm;
