import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TaskEditForm } from '../../utils/types';

import './ModalForm.scss';

const ModalForm = ({
  title,
  saveTask,
  closeModal,
}: {
  title: string;
  saveTask: (title: string, description: string) => void;
  closeModal: () => void;
}) => {
  const { register, handleSubmit } = useForm<TaskEditForm>();
  const { t } = useTranslation();
  const onSubmit = (data: TaskEditForm) => {
    if (data) {
      const { name, description } = data;
      saveTask(name, description);
      closeModal();
    }
  };

  return (
    <div className="ModalForm">
      <Typography variant="h4">{t(`BOARD_MODAL_ADD_${title}`)}</Typography>
      <IconButton className="close-icon" aria-label="delete" onClick={closeModal}>
        <CloseIcon />
      </IconButton>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs">
          <TextField
            variant="outlined"
            label={t('BOARD_MODAL_NAME')}
            {...register('name', { required: true })}
          />
          <TextField
            variant="outlined"
            label={t('BOARD_MODAL_DESCRIPTION')}
            {...register('description', { required: false })}
          />
        </div>
        <div className="buttons">
          <Button type="submit" variant="outlined" onClick={closeModal}>
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
