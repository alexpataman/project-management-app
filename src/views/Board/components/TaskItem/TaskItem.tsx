import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Modal } from '@mui/material';
import { useState } from 'react';

import { tasks } from '../../../../api/backend';
import { ColumnResponse, TaskResponse } from '../../../../types/api';
import { BOARD_ID } from '../../TEMP_ID';
import { modalStyle } from '../../utils/modalStyle';
import { ModalEdit } from '../ModalEdit';

import './TaskItem.scss';

const USER_ID = '17522703-d0a3-491a-a00a-c975c72e752b';

const TaskItem = ({ task, column }: { task: TaskResponse; column: ColumnResponse }) => {
  const { title, order, id, description } = task;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const updateTask = (title: string, description: string) => {
    const data = { order, title, description, userId: USER_ID, boardId: BOARD_ID };
    tasks.updateTask(BOARD_ID, column.id, id, data);
  };

  const deleteTask = () => {
    tasks.deleteTask(BOARD_ID, column.id, id);
  };

  return (
    <div className="TaskItem">
      <p>{title}</p>
      <IconButton className="edit-icon" onClick={handleOpen} size="small">
        <EditIcon />
      </IconButton>
      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={modalStyle}>
          <ModalEdit
            task={{ title, description }}
            updateTask={updateTask}
            deleteTask={deleteTask}
            closeModal={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default TaskItem;
