import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';
import CloseIcon from '@mui/icons-material/Close';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Card, CardContent, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../../store/hooks';
import { getUsersState } from '../../../../store/users/users.slice';
import { TaskResponse } from '../../../../types/api';
import { BASE_GREY } from '../../utils/constants';

import './CardInfo.scss';

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
    <Card className="CardInfo" sx={{ background: BASE_GREY }}>
      <IconButton className="close-icon" aria-label="delete" onClick={closeModal}>
        <CloseIcon />
      </IconButton>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} className="head">
          <CallToActionOutlinedIcon />
          <Typography variant="h5">{task.title}</Typography>
        </Stack>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem sx={{ borderRightWidth: 1 }} />}
          spacing={1.5}
        >
          <Typography variant="subtitle1" color="text.secondary">
            {`${t('BOARD_MODAL_IN_COLUMN')}  `} <i>{column}</i>
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PersonOutlineOutlinedIcon color="action" />
            <Typography variant="subtitle1" color="text.secondary">
              {userName}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>

      <CardContent>
        <div className="card-about">
          <Stack direction="row" alignItems="center" spacing={1}>
            <MenuOutlinedIcon />
            <Typography variant="h5">{`${t('BOARD_MODAL_DESCRIPTION')}`}</Typography>
          </Stack>
          {task.description === ' ' ? (
            <Typography variant="subtitle1" color="text.secondary">
              {t('BOARD_MODAL_NO_DESCRIPTION')}
            </Typography>
          ) : (
            <Typography>{task.description}</Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardInfo;
