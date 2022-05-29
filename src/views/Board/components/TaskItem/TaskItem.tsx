import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Modal } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useBackendErrorCatcher } from '../../../../hooks/useBackendErrorCatcher';
import { deleteTask, updateTask } from '../../../../store/board/board.slice';
import { useAppDispatch } from '../../../../store/hooks';
import { ColumnResponse, TaskResponse } from '../../../../types/api';
import { modalStyle } from '../../utils/modalStyle';
import { CardInfo } from '../ModalCardInfo';
import { ModalEdit } from '../ModalEdit';

import './TaskItem.scss';

const TaskItem = ({ task, column }: { task: TaskResponse; column: ColumnResponse }) => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const backendErrorCatcher = useBackendErrorCatcher();

  const boardId = params.id || '';
  const columnId = column.id;
  const { order, id } = task;

  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => setIsEdit(true);
  const handleSave = () => setIsEdit(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleUpdateTask = async (title: string, description: string, userId: string) => {
    const data = { order, title, description, userId, boardId, columnId };
    backendErrorCatcher(dispatch(updateTask({ boardId, columnId, taskId: id, data })));
  };

  const handleDeleteTask = () => {
    backendErrorCatcher(dispatch(deleteTask({ boardId, columnId, taskId: id })));
    handleClose();
  };

  return (
    <>
      {task.title && (
        <div className="TaskItem">
          <p onClick={handleOpen}>{task.title}</p>
          <IconButton className="edit-icon" onClick={handleEdit} size="small">
            <EditIcon />
          </IconButton>
          <Modal open={isEdit} onClose={handleSave}>
            <Box sx={modalStyle}>
              <ModalEdit
                task={task}
                updateTask={handleUpdateTask}
                deleteTask={handleDeleteTask}
                closeModal={handleSave}
              />
            </Box>
          </Modal>
          <Modal open={isOpen} onClose={handleClose}>
            <Box sx={{ ...modalStyle, width: '90%' }}>
              <CardInfo task={task} column={column.title} closeModal={handleClose} />
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
};

export default TaskItem;
