import { Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader } from '../../components';
import { useBackendErrorCatcher } from '../../hooks/useBackendErrorCatcher';
import { getBoards, getBoardsState } from '../../store/boards/boards.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import BoardsList from './components/BoardsList/BoardsList';

import './BoardsPage.scss';

const BoardsPage = () => {
  const { t } = useTranslation();
  const backendErrorCatcher = useBackendErrorCatcher();
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector(getBoardsState);

  useEffect(() => {
    backendErrorCatcher(dispatch(getBoards()));
    // eslint-disable-next-line
  }, []);

  return (
    <Container component="main" maxWidth="xl">
      <Typography variant="h1" component="h1" className="board-list__title">
        {t('LANG_BOARDS_TITLE')}
      </Typography>
      <Loader isLoading={isLoading}>
        <BoardsList></BoardsList>
      </Loader>
    </Container>
  );
};

export default BoardsPage;
