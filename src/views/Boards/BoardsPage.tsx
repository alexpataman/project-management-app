import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { boards } from '../../api/backend/boards';
import { BoardsCreateRequest, BoardsResponse } from '../../types/api';
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

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [boardsList, setBoardsList] = useState([] as BoardsResponse[]);

  useEffect(() => {
    getCurrentBoards();
  }, []);

  const getCurrentBoards = async () => {
    const data = await boards.getBoards();
    setBoardsList(data || []);
  };

  const openCreationModal = () => {
    setIsModalOpened(true);
  };

  const closeCreationModal = () => {
    setIsModalOpened(false);
  };

  const createBoard = async (title: string, description: string, color: string) => {
    const boardInfo: BoardsCreateRequest = {
      title: title,
      description: description,
      color: color,
    };

    await boards.createBoard(boardInfo);
    getCurrentBoards();

    closeCreationModal();
  };

  const deleteBoard = async (id: string) => {
    await boards.deleteBoard(id);
    getCurrentBoards();
  };

  return (
    <Container component="main">
      <BoardsModal
        isModalOpened={isModalOpened}
        closeModal={closeCreationModal}
        createBoard={createBoard}
      ></BoardsModal>

      <Typography variant="h1" component="h1" className="board-list__title">
        {t('LANG_BOARDS_TITLE')}
      </Typography>

      <BoardsList
        boards={boardsList}
        openModal={openCreationModal}
        deleteBoard={deleteBoard}
      ></BoardsList>
    </Container>
  );
};

export default BoardsPage;
