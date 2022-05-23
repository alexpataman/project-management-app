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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { users as usersApi } from '../../../../api/backend';
import { User } from '../../../../types/api';
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
  task: { title: string; description: string; responsible: string };
  updateTask: (name: string, description: string, responsible: string) => void;
  deleteTask: () => void;
  closeModal: () => void;
}) => {
  const [responsible, setResponsible] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      const users = await usersApi.getUsers();
      if (!users) return;
      setUsers(users);
      setResponsible(task.responsible);
    };
    load();
  }, []);

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
      updateTask(name, description, responsible);
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
              {users.map((user, index) => (
                <MenuItem value={user.id} key={index}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </div>
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
