import AddIcon from '@mui/icons-material/Add';
import { Container, IconButton, Modal, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';

import { columns as columnsApi } from '../../api/backend';
import { Loader } from '../../components';
import { RESOLUTION } from '../../constants/resolution';
import { useBackendErrorCatcher } from '../../hooks/useBackendErrorCatcher';
import { BoardActions, getBoardById, getBoardState } from '../../store/board/board.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ColumnResponse } from '../../types/api';
import { Column, ModalForm } from '../Board/components';
import { BASE_GREY, HOVER_GREY } from './utils/constants';
import { getColumnStyle, reorderColumns } from './utils/dndHelpers';
import { modalStyle } from './utils/modalStyle';

import './BoardPage.scss';

const COLUMNS_LIMIT = 5;

const BoardsPage = () => {
  const params = useParams();
  const boardId = params.id || '';
  const backendErrorCatcher = useBackendErrorCatcher();
  const dispatch = useAppDispatch();
  const [columns, setColumns] = useState<ColumnResponse[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [background, setBackground] = useState('');
  const { isLoading, board } = useAppSelector(getBoardState);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    dispatch(getBoardById(boardId));

    // eslint-disable-next-line
  }, [boardId]);

  useEffect(() => {
    if (board) {
      setBackground(board.color);
      if (board.columns) {
        setColumns(board.columns);
      }
    }
  }, [board]);

  const addColumn = async (title: string) => {
    const newColumn = await backendErrorCatcher(columnsApi.createColumn(boardId, { title }));
    if (!newColumn) return;
    dispatch(BoardActions.addColumn({ column: newColumn }));
  };

  const onDragEnd = (res: DropResult) => {
    if (!res.destination) return;
    if (!columns) return;
    const items = reorderColumns(boardId, columns, res.source.index, res.destination.index);
    dispatch(BoardActions.reorderColumns({ columns: items }));
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
          <Stack className="Columns" direction="row" spacing={2}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
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
              <ModalForm mode="column" saveTask={addColumn} closeModal={handleClose} />
            </Box>
          </Modal>
        </section>
      </Container>
    </Loader>
  );
};

export default BoardsPage;
