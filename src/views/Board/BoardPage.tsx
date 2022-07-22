import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, Container, IconButton, Modal, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { Loader } from '../../components';
import { PATH } from '../../constants';
import { RESOLUTION } from '../../constants/resolution';
import { useBackendErrorCatcher } from '../../hooks/useBackendErrorCatcher';
import {
  addColumn,
  getBoardById,
  getBoardState,
  updateColumn,
  updateTask,
} from '../../store/board/board.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUsers } from '../../store/users/users.slice';
import { Column, ModalForm } from '../Board/components';
import { BASE_GREY, HOVER_GREY } from './utils/constants';
import { getColumnStyle } from './utils/dndHelpers';
import { modalStyle } from './utils/modalStyle';

import './BoardPage.scss';

const COLUMNS_LIMIT = 100;

const BoardPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { title, isLoading, columns, background, columnsLoading } = useAppSelector(getBoardState);
  const backendErrorCatcher = useBackendErrorCatcher();

  const boardId = params.id || '';

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    backendErrorCatcher(dispatch(getBoardById(boardId)));
    // eslint-disable-next-line
  }, [boardId]);

  useEffect(() => {
    backendErrorCatcher(dispatch(getUsers()));
    // eslint-disable-next-line
  }, []);

  const handleAddColumn = async (title: string) => {
    backendErrorCatcher(dispatch(addColumn({ boardId, title })));
  };

  const onDragEnd = (res: DropResult) => {
    const { source, destination } = res;
    const taskId = res.draggableId;
    if (!destination) return;
    if (!columns) return;
    if (destination.droppableId === boardId) {
      const movedColumn = columns.find((col) => col.id === res.draggableId);
      if (movedColumn) {
        const data = { title: movedColumn?.title, order: destination.index + 1 };
        backendErrorCatcher(dispatch(updateColumn({ boardId, columnId: movedColumn.id, data })));
        return;
      }
    }
    const colIdx = columns.findIndex((col) => col.id === source.droppableId);
    const movedTask = columns[colIdx].tasks?.find((task) => task.id === res.draggableId);
    if (movedTask) {
      const data = {
        title: movedTask.title,
        description: movedTask.description,
        boardId: boardId,
        columnId: destination.droppableId,
        order: destination.index + 1,
        userId: movedTask.userId,
      };
      backendErrorCatcher(
        dispatch(
          updateTask({
            boardId,
            columnId: source.droppableId,
            taskId,
            data,
          })
        )
      );
    }
  };

  return (
    <Loader isLoading={isLoading}>
      <Container component="main" maxWidth="xl">
        <Box
          className="BoardPage__background"
          sx={{
            backgroundImage: `url(${background}${RESOLUTION.big})`,
          }}
        ></Box>
        <section className="BoardPage">
          <Button
            className="back-btn"
            variant="text"
            startIcon={<ArrowBackIosIcon />}
            to={PATH.boards}
            component={Link}
          >
            {t('BOARD_BACK_BUTTON')}
          </Button>
          <Typography variant="h1">{title}</Typography>
          <Stack
            className={classNames(['Columns', { columnsLoading }])}
            direction="row"
            spacing={2}
          >
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId={boardId} type="COLUMNS" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ display: 'flex' }}
                  >
                    {columns.map((column, index) => (
                      <Draggable key={column.id} draggableId={column.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getColumnStyle(provided.draggableProps.style)}
                          >
                            {<Column column={column} key={column.id} />}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {columns.length < COLUMNS_LIMIT && (
              <IconButton
                aria-label="add"
                className="add-column-button"
                size="large"
                sx={{
                  height: 50,
                  width: 50,
                  backgroundColor: BASE_GREY,
                  transition: '0.2s ease',
                  '&:hover': { backgroundColor: HOVER_GREY },
                }}
                onClick={handleOpen}
              >
                <AddIcon />
              </IconButton>
            )}
          </Stack>
          <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <ModalForm
                mode="column"
                task={undefined}
                deleteTask={undefined}
                saveTask={handleAddColumn}
                closeModal={handleClose}
              />
            </Box>
          </Modal>
        </section>
      </Container>
    </Loader>
  );
};

export default BoardPage;
