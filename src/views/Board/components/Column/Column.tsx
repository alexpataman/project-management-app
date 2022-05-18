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

import { columns, tasks as tasksApi } from '../../../../api/backend';
import { ColumnResponse } from '../../../../types/api';
import { BOARD_ID } from '../../TEMP_ID';
import { modalStyle } from '../../utils/modalStyle';
import { Confirmation } from '../ModalConfirmation';
import { ModalForm } from '../ModalForm';
import { TaskItem } from '../TaskItem';

import './Column.scss';

const CARD_BG_COLOR = '#ebecf0';

// temporary id
const USER_ID = '17522703-d0a3-491a-a00a-c975c72e752b';

const Column = ({ column }: { column: ColumnResponse }) => {
  const { id, title, order, tasks } = column;

  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const { register, reset, handleSubmit } = useForm();

  const renameColumn = (title: string) => {
    columns.updateColumn(BOARD_ID, id, { title, order });
  };

  const deleteColumn = () => {
    columns.deleteColumn(BOARD_ID, column.id);
  };

  const addTask = async (title: string, description: string) => {
    const data = {
      title,
      description: description || ' ',
      order: tasks?.length || 0,
      userId: USER_ID,
    };
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
      renameColumn((data as { name: string }).name);
    }
  };

  return (
    <Card className="Column" sx={{ backgroundColor: CARD_BG_COLOR }}>
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
        {tasks ? (
          tasks.map((task, index) => <TaskItem task={task} key={index} column={column} />)
        ) : (
          <></>
        )}
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
          <ModalForm saveTask={addTask} closeModal={() => setIsAdd(false)} />
        </Box>
      </Modal>
      <Modal open={isDelete} onClose={() => setIsDelete(false)}>
        <Box sx={modalStyle}>
          <Confirmation deleteCallback={deleteColumn} closeModal={() => setIsDelete(false)} />
        </Box>
      </Modal>
    </Card>
  );
};

export default Column;
