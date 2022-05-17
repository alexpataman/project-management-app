import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box, Button, Container, Grid, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import BoardsList from './components/BoardsList';
import BoardsModal from './components/BoardsModal';

import './BoardsPage.scss';

export interface IBoard {
  title: string;
  background: number;
}

const BoardsPage = () => {
  const { t } = useTranslation();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [boards, setBoards] = useState([] as IBoard[]);

  const openCreationModal = () => {
    setIsModalOpened(true);
  };

  const closeCreationModal = () => {
    setIsModalOpened(false);
  };

  const createBoard = (title: string, background: number) => {
    const boardInfo: IBoard = {
      title: title,
      background: background,
    };

    setBoards([...boards, boardInfo]);
    closeCreationModal();
  };

  const deleteBoard = (index: number) => {
    const boardsCopy = boards.slice();

    boardsCopy.splice(index, 1);
    setBoards(boardsCopy);
  };

  return (
    <Container component="main">
      <BoardsModal
        isModalOpened={isModalOpened}
        closeModal={closeCreationModal}
        createBoard={createBoard}
      ></BoardsModal>

      <Typography variant="h1" component="h1" className="board-list__title">
        Ваши доски:
      </Typography>

      <BoardsList
        boards={boards}
        openModal={openCreationModal}
        deleteBoard={deleteBoard}
      ></BoardsList>
    </Container>
  );
};

export default BoardsPage;
