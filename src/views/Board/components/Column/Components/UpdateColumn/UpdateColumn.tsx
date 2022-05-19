import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, CardActions, IconButton } from '@mui/material';

interface IUpdateColumn {
  onAdd: () => void;
  onDelete: () => void;
}

export const UpdateColumn = ({ onAdd, onDelete }: IUpdateColumn) => (
  <>
    <CardActions>
      <Button variant="text" startIcon={<AddIcon />} size="small" onClick={onAdd}>
        Добавить карточку
      </Button>
    </CardActions>
    <IconButton className="delete-icon" onClick={onDelete} size="small">
      <DeleteIcon />
    </IconButton>
  </>
);
