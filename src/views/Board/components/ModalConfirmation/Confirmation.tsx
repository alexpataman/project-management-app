import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, Typography } from '@mui/material';
import { SyntheticEvent } from 'react';

import { Portal } from '../../../../components';

import './Confirmation.scss';

const Confirmation = ({
  deleteCallback,
  closeModal,
}: {
  deleteCallback: () => void;
  closeModal: () => void;
}) => {
  const onOverlayClick = (e: SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const onDelete = () => {
    deleteCallback();
    closeModal();
  };

  const confirmNode = (
    <div className="overlay" onClick={onOverlayClick}>
      <div className="Confirmation">
        <Typography variant="h4">Вы уверены, что хотите удалить этот элемент?</Typography>
        <IconButton className="close-icon" aria-label="delete" onClick={closeModal}>
          <CloseIcon />
        </IconButton>
        <div className="buttons">
          <Button variant="outlined" color="success" onClick={closeModal}>
            Отменить
          </Button>
          <Button variant="outlined" color="error" onClick={() => onDelete()}>
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );

  return <Portal elem={confirmNode} />;
};

export default Confirmation;
