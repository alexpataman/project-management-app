import AddIcon from '@mui/icons-material/Add';
import { Container, IconButton, Modal, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';

import { Loader } from '../../components';
import { addColumn, getBoardById, getBoardState, updateTask } from '../../store/board/board.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Column, ModalForm } from '../Board/components';
import { modalStyle } from './utils/modalStyle';

import './BoardPage.scss';

const COLUMNS_LIMIT = 5;

const BoardsPage = () => {
  const params = useParams();
  const boardId = params.id || '';
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, columns } = useAppSelector(getBoardState);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    dispatch(getBoardById(boardId));
  }, [boardId]);

  const handleAddColumn = async (title: string) => {
    dispatch(addColumn({ boardId, title }));
  };

  const onDragEnd = (res: DropResult) => {
    const { source, destination } = res;
    const taskId = res.draggableId;
    if (!destination) return;
    if (!columns) return;
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
      dispatch(
        updateTask({
          boardId,
          columnId: source.droppableId,
          taskId,
          data,
        })
      );
    }
  };

  return (
    <Loader isLoading={isLoading}>
      <Container component="main" maxWidth="xl">
        <section className="BoardPage">
          <Stack className="Columns" direction="row" spacing={2}>
            <DragDropContext onDragEnd={onDragEnd}>
              {columns.map((column) => (
                <Column column={column} key={column.id} />
              ))}
            </DragDropContext>
            {columns.length < COLUMNS_LIMIT && (
              <IconButton
                aria-label="add"
                className="add-column-button"
                size="large"
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
              <ModalForm mode="column" saveTask={handleAddColumn} closeModal={handleClose} />
            </Box>
          </Modal>
        </section>
      </Container>
    </Loader>
  );
};

export default BoardsPage;
