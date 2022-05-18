import AddIcon from '@mui/icons-material/Add';
import { IconButton, Modal, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

import { boards, columns as columnsApi } from '../../api/backend';
import { useAuthControl } from '../../hooks/useAuthControl';
import { ColumnResponse } from '../../types/api';
import { Column, ModalForm } from '../Board/components';
import { BOARD_ID } from './TEMP_ID';
import { modalStyle } from './utils/modalStyle';

import './BoardPage.scss';

const COLUMNS_LIMIT = 5;

const BoardsPage = () => {
  const authControl = useAuthControl();
  const [columns, setColumns] = useState<ColumnResponse[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const load = async () => {
      const data = await authControl(boards.getBoardById(BOARD_ID));
      if (data) {
        if (data.columns) {
          setColumns(data.columns.sort((a, b) => a.order - b.order) || []);
        }
      }
    };
    load();
  }, []);

  const addColumn = (title: string) => {
    columnsApi.createColumn(BOARD_ID, { title: title, order: columns.length });
  };

  return (
    <section className="BoardPage">
      <Stack className="Columns" direction="row" spacing={2}>
        {columns.map((items, index) => (
          <Column column={items} key={index} />
        ))}
        {columns.length < COLUMNS_LIMIT && (
          <IconButton
            aria-label="add"
            size="large"
            sx={{ height: 50, width: 50, backgroundColor: '#ebecf0' }}
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
          <ModalForm saveTask={addColumn} closeModal={handleClose} />
        </Box>
      </Modal>
    </section>
  );
};

export default BoardsPage;
