import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { IBoard } from '../BoardsPage';

interface IList {
  boards: IBoard[];
  openModal: () => void;
  deleteBoard: (i: number) => void;
}

const BoardsList = (props: IList) => {
  const { t } = useTranslation();

  return (
    <Box className="boards-list">
      {props.boards.map((board, i) => (
        <Box className={`board bg-${board.background}`} key={i}>
          <Box className="board__overlay"></Box>
          <Typography variant="h2" component="h2" className="board__title">
            {board.title}
          </Typography>

          <Button className="board__delete" onClick={() => props.deleteBoard(i)}>
            <DeleteForeverRoundedIcon htmlColor="#fff"></DeleteForeverRoundedIcon>
          </Button>
        </Box>
      ))}

      <Button variant="contained" className="board board__create" onClick={props.openModal}>
        {t('LANG_CREATE_BOARD_BUTTON_TEXT')}
      </Button>
    </Box>
  );
};

export default BoardsList;
