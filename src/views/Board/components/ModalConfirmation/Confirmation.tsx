import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, Typography } from '@mui/material';

import './Confirmation.scss';

const Confirmation = ({
  deleteCallback,
  closeModal,
}: {
  deleteCallback: () => void;
  closeModal: () => void;
}) => {
  const onDelete = () => {
    deleteCallback();
    closeModal();
  };

  return (
    <div className="Confirmation">
      <Typography variant="h4">Вы уверены, что хотите удалить этот элемент?</Typography>
      <IconButton className="close-icon" aria-label="delete" onClick={closeModal}>
        <CloseIcon />
      </IconButton>
      <div className="buttons">
        <Button variant="outlined" color="success" onClick={closeModal}>
          Отменить
        </Button>
        <Button variant="outlined" color="error" onClick={onDelete}>
          Удалить
        </Button>
      </div>
    </div>
  );
};

export default Confirmation;
