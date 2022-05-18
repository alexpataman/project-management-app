import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader } from '../../components';
import {
  createBoard,
  deleteBoard,
  getBoards,
  getBoardsState,
} from '../../store/boards/boards.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { BoardsCreateRequest } from '../../types/api';
import BoardsList from './components/BoardsList';
import BoardsModal from './components/BoardsModal';

import './BoardsPage.scss';

export interface IBoard {
  title: string;
  description: string;
  color: string;
}

const BoardsPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoading, boards } = useAppSelector(getBoardsState);

  const [isModalOpened, setIsModalOpened] = useState(false);

  useEffect(() => {
    dispatch(getBoards());
  }, []);

  const openCreationModal = () => {
    setIsModalOpened(true);
  };

  const closeCreationModal = () => {
    setIsModalOpened(false);
  };

  const handleCreateBoard = async (title: string, description: string, color: string) => {
    const boardInfo: BoardsCreateRequest = {
      title: title,
      description: description,
      color: color,
    };

    dispatch(createBoard(boardInfo));
    closeCreationModal();
  };

  const handleDeleteBoard = async (id: string) => {
    dispatch(deleteBoard(id));
  };

  return (
    <Container component="main">
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
