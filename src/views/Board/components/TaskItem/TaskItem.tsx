import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Modal } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { tasks } from '../../../../api/backend';
import { useBackendErrorCatcher } from '../../../../hooks/useBackendErrorCatcher';
import { BoardActions } from '../../../../store/board/board.slice';
import { useAppDispatch } from '../../../../store/hooks';
import { ColumnResponse, TaskResponse } from '../../../../types/api';
import { modalStyle } from '../../utils/modalStyle';
import { CardInfo } from '../ModalCardInfo';
import { ModalEdit } from '../ModalEdit';

import './TaskItem.scss';

const USER_ID = '17522703-d0a3-491a-a00a-c975c72e752b';

const TaskItem = ({ task, column }: { task: TaskResponse; column: ColumnResponse }) => {
  const params = useParams();
  const boardId = params.id || '';
  const dispatch = useAppDispatch();
  const backendErrorCatcher = useBackendErrorCatcher();
  const { title, order, id, description } = task;
  const [taskParams, setTaskParams] = useState<{ title: string; description: string }>({
    title,
    description,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleEdit = () => setIsEdit(true);
  const handleSave = () => setIsEdit(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const updateTask = async (title: string, description: string) => {
    const data = { order, title, description, userId: USER_ID, boardId };
    const newParams = await backendErrorCatcher(tasks.updateTask(boardId, column.id, id, data));
    if (!newParams) return;
    setTaskParams({ title: newParams.title, description: newParams.description });
    const updatedColumn = { ...column };
    updatedColumn.tasks = updatedColumn.tasks
      ? updatedColumn.tasks.map((task) => {
          if (task.id !== id) return task;
          return { ...task, order, title, description };
        })
      : [{ ...task, order, title, description }];
    dispatch(BoardActions.editColumn({ columnId: column.id, column: updatedColumn }));
  };

  const deleteTask = () => {
    backendErrorCatcher(
      tasks.deleteTask(boardId, column.id, id).then(() => {
        setTaskParams({ title: '', description: '' });
        const updatedColumn = { ...column };
        updatedColumn.tasks = updatedColumn.tasks?.filter((task) => task.id !== id);
        dispatch(BoardActions.editColumn({ columnId: column.id, column: updatedColumn }));
      })
    );
  };

  return (
    <>
      {taskParams.title && (
        <div className="TaskItem">
          <p onClick={handleOpen}>{taskParams.title}</p>
          <IconButton className="edit-icon" onClick={handleEdit} size="small">
            <EditIcon />
          </IconButton>
          <Modal open={isEdit} onClose={handleSave}>
            <Box sx={modalStyle}>
              <ModalEdit
                task={{ title: taskParams.title, description: taskParams.description }}
                updateTask={updateTask}
                deleteTask={deleteTask}
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
