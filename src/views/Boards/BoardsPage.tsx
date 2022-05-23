import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader } from '../../components';
import { useBackendErrorCatcher } from '../../hooks/useBackendErrorCatcher';
import {
  createBoard,
  deleteBoard,
  getBoards,
  getBoardsState,
} from '../../store/boards/boards.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { BoardRequest } from '../../types/api';
import BoardsList from './components/BoardsList/BoardsList';
import BoardsModal from './components/BoardsModal/BoardsModal';

import './BoardsPage.scss';

const BoardsPage = () => {
  const { t } = useTranslation();
  const backendErrorCatcher = useBackendErrorCatcher();
  const dispatch = useAppDispatch();
  const { isLoading, boards } = useAppSelector(getBoardsState);

  const [isModalOpened, setIsModalOpened] = useState(false);

  useEffect(() => {
    backendErrorCatcher(dispatch(getBoards()));
  }, []);

  const openCreationModal = () => {
    setIsModalOpened(true);
  };

  const closeCreationModal = () => {
    setIsModalOpened(false);
  };

  const handleCreateBoard = async (title: string, description: string, color: string) => {
    const boardInfo: BoardRequest = {
      title: title,
      description: description,
      color: color,
    };

    backendErrorCatcher(dispatch(createBoard(boardInfo)));
    closeCreationModal();
  };

  const handleDeleteBoard = async (id: string) => {
    backendErrorCatcher(dispatch(deleteBoard(id)));
  };

  return (
    <Container component="main" maxWidth="xl">
      <BoardsModal
        isModalOpened={isModalOpened}
        closeModal={closeCreationModal}
        createBoard={handleCreateBoard}
      ></BoardsModal>

      <Typography variant="h1" component="h1" className="board-list__title">
        {t('LANG_BOARDS_TITLE')}
      </Typography>
      <Loader isLoading={isLoading}>
        <BoardsList
          boards={boards}
          openModal={openCreationModal}
          deleteBoard={handleDeleteBoard}
        ></BoardsList>
      </Loader>
    </Container>
  );
};

export default BoardsPage;
