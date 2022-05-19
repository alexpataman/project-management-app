import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { BoardsResponse } from '../../../../types/api';

interface IBoardsList {
  boards: BoardsResponse[];
  openModal: () => void;
  deleteBoard: (id: string) => void;
}

const BoardsList = ({ boards, openModal, deleteBoard }: IBoardsList) => {
  const { t } = useTranslation();

  return (
    <Box className="boards-list">
      {boards.map((board) => (
        <Box
          className={`board`}
          key={board.id}
          sx={{
            background: `${board.color}`,
          }}
        >
          <Box className="board__overlay"></Box>
          <Typography variant="h2" component="h2" className="board__title">
            {board.title}
          </Typography>
          <Typography variant="h6" component="h6" className="board__title">
            {board.description}
          </Typography>

          <Button className="board__delete" onClick={() => deleteBoard(board.id)}>
            <DeleteForeverRoundedIcon htmlColor="#fff"></DeleteForeverRoundedIcon>
          </Button>
        </Box>
      ))}

      <Button variant="contained" className="board board__create" onClick={openModal}>
        {t('LANG_CREATE_BOARD_BUTTON_TEXT')}
      </Button>
    </Box>
  );
};

export default BoardsList;
