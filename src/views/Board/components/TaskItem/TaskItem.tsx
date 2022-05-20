import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Modal } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { tasks } from '../../../../api/backend';
import { useAuthControl } from '../../../../hooks/useAuthControl';
import { ColumnResponse, TaskResponse } from '../../../../types/api';
import { modalStyle } from '../../utils/modalStyle';
import { ModalEdit } from '../ModalEdit';

import './TaskItem.scss';

const USER_ID = '17522703-d0a3-491a-a00a-c975c72e752b';

const TaskItem = ({ task, column }: { task: TaskResponse; column: ColumnResponse }) => {
  const params = useParams();
  const boardId = params.id || '';
  const authControl = useAuthControl();
  const { title, order, id, description } = task;
  const [taskParams, setTaskParams] = useState<{ title: string; description: string }>({
    title,
    description,
  });
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const updateTask = async (title: string, description: string) => {
    const data = { order, title, description, userId: USER_ID, boardId };
    const newParams = await authControl(tasks.updateTask(boardId, column.id, id, data));
    if (!newParams) return;
    setTaskParams({ title: newParams.title, description: newParams.description });
  };

  const deleteTask = () => {
    authControl(
      tasks.deleteTask(boardId, column.id, id).then(() => {
        setTaskParams({ title: '', description: '' });
      })
    );
  };

  return (
    <>
      {taskParams.title && (
        <div className="TaskItem">
          <p>{taskParams.title}</p>
          <IconButton className="edit-icon" onClick={handleOpen} size="small">
            <EditIcon />
          </IconButton>
          <Modal open={isOpen} onClose={handleClose}>
            <Box sx={modalStyle}>
              <ModalEdit
                task={{ title: taskParams.title, description: taskParams.description }}
                updateTask={updateTask}
                deleteTask={deleteTask}
                closeModal={handleClose}
              />
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
};

export default TaskItem;
