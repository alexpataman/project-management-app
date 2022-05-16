import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Modal } from '@mui/material';
import { useState } from 'react';

import { modalStyle } from '../../utils/modalStyle';
import { ModalEdit } from '../ModalEdit';

import './TaskItem.scss';

const TaskItem = ({
  taskName,
  renameTask,
  deleteTask,
}: {
  taskName: string;
  renameTask: (oldName: string, newName: string) => void;
  deleteTask: (task: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="TaskItem">
      <p>{taskName}</p>
      <IconButton className="edit-icon" onClick={handleOpen} size="small">
        <EditIcon />
      </IconButton>
      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={modalStyle}>
          <ModalEdit
            name={taskName}
            saveName={(newName: string) => renameTask(taskName, newName)}
            deleteTask={() => deleteTask(taskName)}
            closeModal={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default TaskItem;
