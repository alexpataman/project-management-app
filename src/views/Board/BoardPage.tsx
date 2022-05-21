import AddIcon from '@mui/icons-material/Add';
import { Container, IconButton, Modal, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { boards, columns as columnsApi } from '../../api/backend';
import { Loader } from '../../components';
import { useAuthControl } from '../../hooks/useAuthControl';
import { ColumnResponse } from '../../types/api';
import { Column, ModalForm } from '../Board/components';
import { BASE_GREY } from './utils/constants';
import { modalStyle } from './utils/modalStyle';

import './BoardPage.scss';

const COLUMNS_LIMIT = 5;

const BoardsPage = () => {
  const params = useParams();
  const boardId = params.id || '';
  const authControl = useAuthControl();
  const [columns, setColumns] = useState<ColumnResponse[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const load = async () => {
      const data = await authControl(boards.getBoardById(boardId));
      setIsLoading(false);
      if (!data || !data.columns) return;
      setColumns(data.columns.sort((a, b) => a.order - b.order) || []);
    };
    load();
  }, []);

  const addColumn = async (title: string) => {
    const newColumn = await authControl(
      columnsApi.createColumn(boardId, {
        title: title,
        order: columns.length,
      })
    );
    if (!newColumn) return;
    setColumns((columns) => [...columns, newColumn]);
  };

  return (
    <Loader isLoading={isLoading}>
      <Container component="main" maxWidth="xl">
        <section className="BoardPage">
          <Stack className="Columns" direction="row" spacing={2}>
            {columns.map((items, index) => (
              <Column column={items} key={index} />
            ))}
            {columns.length < COLUMNS_LIMIT && (
              <IconButton
                aria-label="add"
                size="large"
                sx={{ height: 50, width: 50, backgroundColor: BASE_GREY }}
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
              <ModalForm title="COLUMN" saveTask={addColumn} closeModal={handleClose} />
            </Box>
          </Modal>
        </section>
      </Container>
    </Loader>
  );
};

export default BoardsPage;
