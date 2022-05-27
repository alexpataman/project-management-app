import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { RESOLUTION } from '../../../../constants/resolution';
import { useBackendErrorCatcher } from '../../../../hooks/useBackendErrorCatcher';
import { deleteBoard, getBoardsState } from '../../../../store/boards/boards.slice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { Confirmation } from '../../../Board/components/ModalConfirmation';
import { modalStyle } from '../../../Board/utils/modalStyle';
import BoardsModal from '../BoardsModal/BoardsModal';

const BoardsList = () => {
  const { t } = useTranslation();

  const backendErrorCatcher = useBackendErrorCatcher();
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector(getBoardsState);

  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setIsModalOpened(false);
  };

  const handleDeleteBoard = async (id: string) => {
    backendErrorCatcher(dispatch(deleteBoard(id)));
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editingBoard, setEditingBoard] = useState(boards[0]);

  const [isDeleting, setIsDeleting] = useState(false);
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
              setIsDeleting(true);
            }}
          >
            <DeleteForeverRoundedIcon htmlColor="#fff"></DeleteForeverRoundedIcon>
          </Button>
          <Button
            className="board__edit"
            onClick={() => {
              setEditingBoard(board);
              setIsEditing(true);
              openModal();
            }}
          >
            <EditIcon htmlColor="#fff"></EditIcon>
          </Button>
        </Box>
      ))}

      <Modal open={isDeleting} onClose={() => setIsDeleting(false)}>
        <Box sx={modalStyle}>
          <Confirmation
            deleteCallback={() => handleDeleteBoard(deletingBoard)}
            closeModal={() => setIsDeleting(false)}
          />
        </Box>
      </Modal>

      <BoardsModal
        isModalOpened={isModalOpened}
        closeModal={closeModal}
        isEditingMode={isEditing}
        editingBoard={editingBoard}
      ></BoardsModal>

      <Button variant="contained" className="board board__create" onClick={openModal}>
        {t('LANG_CREATE_BOARD_TEXT')}
      </Button>
    </Box>
  );
};

export default BoardsList;
