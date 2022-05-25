import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { RESOLUTION } from '../../../../constants/resolution';
import { BoardResponse } from '../../../../types/api';
import { Confirmation } from '../../../Board/components/ModalConfirmation';
import { modalStyle } from '../../../Board/utils/modalStyle';

interface IBoardsList {
  boards: BoardResponse[];
  openModal: () => void;
  deleteBoard: (id: string) => void;
}

const BoardsList = ({ boards, openModal, deleteBoard }: IBoardsList) => {
  const { t } = useTranslation();

  const [isDelete, setIsDelete] = useState(false);
  const [deletingBoard, setDeletingBoard] = useState('');

  return (
    <Box className="boards-list">
      {boards.map((board) => (
        <Box className="board" key={board.id}>
          <Box className="board__overlay"></Box>

          <Link to={`../board/${board.id}`} className="board__link">
            <Box
              className="board__background"
              sx={{ background: `url(${board.color}${RESOLUTION.medium})` }}
            ></Box>
            <Box className="board__click-area">
              <Typography variant="h2" component="h2" className="board__title">
                {board.title}
              </Typography>
              <Typography variant="h6" component="h6" className="board__title">
                {board.description}
              </Typography>
            </Box>
          </Link>

          <Button
            className="board__delete"
            onClick={() => {
              setDeletingBoard(board.id);
              setIsDelete(true);
            }}
          >
            <DeleteForeverRoundedIcon htmlColor="#fff"></DeleteForeverRoundedIcon>
          </Button>
        </Box>
      ))}

      <Modal open={isDelete} onClose={() => setIsDelete(false)}>
        <Box sx={modalStyle}>
          <Confirmation
            deleteCallback={() => deleteBoard(deletingBoard)}
            closeModal={() => setIsDelete(false)}
          />
        </Box>
      </Modal>

      <Button variant="contained" className="board board__create" onClick={openModal}>
        {t('LANG_CREATE_BOARD_BUTTON_TEXT')}
      </Button>
    </Box>
  );
};

export default BoardsList;
