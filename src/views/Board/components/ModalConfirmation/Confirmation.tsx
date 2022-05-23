import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

  return (
    <div className="Confirmation">
      <Typography variant="h5">{t('LANG_CONFIRMATION_MODAL_TEXT')}</Typography>
      <IconButton className="close-icon" aria-label="delete" onClick={closeModal}>
        <CloseIcon />
      </IconButton>
      <div className="buttons">
        <Button variant="outlined" color="success" onClick={closeModal}>
          {t('LANG_CONFIRMATION_MODAL_CANCEL')}
        </Button>
        <Button variant="outlined" color="error" onClick={onDelete}>
          {t('LANG_CONFIRMATION_MODAL_DELETE')}
        </Button>
      </div>
    </div>
  );
};

export default Confirmation;
