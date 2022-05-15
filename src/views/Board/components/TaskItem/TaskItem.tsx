import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { useState } from 'react';

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
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="TaskItem">
      <p>{taskName}</p>
      <IconButton
        className="edit-icon"
        onClick={() => {
          setIsEdit(true);
        }}
        size="small"
      >
        <EditIcon />
      </IconButton>
      {isEdit && (
        <ModalEdit
          name={taskName}
          saveName={(newName: string) => renameTask(taskName, newName)}
          deleteTask={() => deleteTask(taskName)}
          closeModal={() => setIsEdit(false)}
        />
      )}
    </div>
  );
};

export default TaskItem;
