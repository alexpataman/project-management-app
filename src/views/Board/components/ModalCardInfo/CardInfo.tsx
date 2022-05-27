import CloseIcon from '@mui/icons-material/Close';
import WorkIcon from '@mui/icons-material/Work';
import { Avatar, Card, CardContent, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../../store/hooks';
import { getUsersState } from '../../../../store/users/users.slice';
import { TaskResponse } from '../../../../types/api';

import './CardInfo.scss';

const USER_AVATAR_COLOR = '#f81018';

const CardInfo = ({
  task,
  column,
  closeModal,
}: {
  task: TaskResponse;
  column: string;
  closeModal: () => void;
}) => {
  const { users } = useAppSelector(getUsersState);
  const [userName] = useState(users.find((u) => u.id === task.userId)?.name || '');

  const { t } = useTranslation();

  return (
    <Card className="CardInfo">
      <IconButton className="close-icon" aria-label="delete" onClick={closeModal}>
        <CloseIcon />
      </IconButton>
      <CardContent>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          <WorkIcon />
          {`  ${task.title}`}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          {`${t('BOARD_MODAL_IN_COLUMN')}  `} <span className="underlined">{column}</span>
        </Typography>
      </CardContent>

      <div className="card-about">
        <Typography variant="h5">{`${t('BOARD_MODAL_DESCRIPTION')}:`}</Typography>
        {task.description === ' ' ? (
          <Typography variant="caption" color="text.secondary">
            {t('BOARD_MODAL_NO_DESCRIPTION')}
          </Typography>
        ) : (
          <span>{task.description}</span>
        )}
      </div>

      <div className="card-about inline">
        <Avatar sx={{ bgcolor: USER_AVATAR_COLOR }}>{userName.charAt(0).toUpperCase()}</Avatar>
        <span className="underlined">{userName}</span>
      </div>
    </Card>
  );
};

export default CardInfo;
