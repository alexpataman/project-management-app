import AddIcon from '@mui/icons-material/Add';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { Button, CardActions, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface IUpdateColumn {
  onAdd: () => void;
  onDelete: () => void;
}

export const UpdateColumn = ({ onAdd, onDelete }: IUpdateColumn) => {
  const { t } = useTranslation();
  return (
    <>
      <CardActions>
        <Button variant="text" startIcon={<AddIcon />} size="small" onClick={onAdd}>
          {t('BOARD_ADD_CARD')}
        </Button>
      </CardActions>
      <IconButton className="delete-icon" onClick={onDelete} size="small">
        <DeleteForeverRoundedIcon />
      </IconButton>
    </>
  );
};
