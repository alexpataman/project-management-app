import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Modal,
  TextField,
  Tooltip,
} from '@mui/material';
import Fade from '@mui/material/Fade';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { modalStyle } from '../../utils/modalStyle';
import { ListType } from '../../utils/types';
import { Confirmation } from '../ModalConfirmation';
import { ModalForm } from '../ModalForm';
import { TaskItem } from '../TaskItem';

import './TaskList.scss';

const CARD_BG_COLOR = '#ebecf0';

const TaskList = ({
  list,
  addTask,
  renameTask,
  deleteTask,
  renameList,
  deleteList,
}: {
  list: ListType;
  addTask: (title: string, task: string) => void;
  renameTask: (oldName: string, newName: string) => void;
  deleteTask: (task: string) => void;
  renameList: (title: string) => void;
  deleteList: () => void;
}) => {
  const { title, tasks } = list;

  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const { register, reset, handleSubmit } = useForm();

  const saveTask = (task: string) => {
    addTask(title, task);
    setIsAdd(false);
  };

  const resetTitle = () => {
    setIsEdit(false);
    reset({
      name: title,
    });
  };

  const onSubmit = (data: unknown) => {
    if (data) {
      setIsEdit(false);
      renameList((data as { name: string }).name);
    }
  };

  return (
    <Card className="TaskList" sx={{ backgroundColor: CARD_BG_COLOR }}>
      <CardContent>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} onInput={() => setIsEdit(true)}>
          <TextField
            InputProps={{ disableUnderline: true }}
            defaultValue={title}
            variant="standard"
            {...register('name', { required: true })}
          />

          {isEdit && (
            <>
              <Tooltip
                enterDelay={600}
                disableFocusListener
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 300 }}
                title="Отменить"
              >
                <IconButton aria-label="cancel" onClick={resetTitle}>
                  <CancelIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                enterDelay={300}
                disableFocusListener
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 300 }}
                title="Сохранить"
              >
                <IconButton aria-label="confirm" type="submit">
                  <CheckCircleIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </form>
      </CardContent>
      <CardContent className="tasks">
        {tasks.map((task, index) => (
          <TaskItem taskName={task} key={index} deleteTask={deleteTask} renameTask={renameTask} />
        ))}
      </CardContent>
      <CardActions>
        <Button variant="text" startIcon={<AddIcon />} size="small" onClick={() => setIsAdd(true)}>
          Добавить карточку
        </Button>
      </CardActions>
      <IconButton className="delete-icon" onClick={() => setIsDelete(true)} size="small">
        <DeleteIcon />
      </IconButton>
      <Modal open={isAdd} onClose={() => setIsAdd(false)}>
        <Box sx={modalStyle}>
          <ModalForm saveTask={saveTask} closeModal={() => setIsAdd(false)} />
        </Box>
      </Modal>
      <Modal open={isDelete} onClose={() => setIsDelete(false)}>
        <Box sx={modalStyle}>
          <Confirmation deleteCallback={deleteList} closeModal={() => setIsDelete(false)} />
        </Box>
      </Modal>
    </Card>
  );
};

export default TaskList;
