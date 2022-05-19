import {
  Box,
  Card,
  CardContent,
  Modal,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';

import { columns, tasks as tasksApi } from '../../../../api/backend';
import { ColumnResponse, TaskResponse } from '../../../../types/api';
import { BOARD_ID } from '../../TEMP_ID';
import { getItemStyle, reorderTasks } from '../../utils/dndHelpers';
import { modalStyle } from '../../utils/modalStyle';
import { Confirmation } from '../ModalConfirmation';
import { ModalForm } from '../ModalForm';
import { TaskItem } from '../TaskItem';
import { EditColumn, UpdateColumn } from './Components';

import './Column.scss';

const CARD_BG_COLOR = '#ebecf0';

// temporary id
const USER_ID = '17522703-d0a3-491a-a00a-c975c72e752b';

const Column = ({ column }: { column: ColumnResponse }) => {
  const { id, title, order, tasks } = column;

  const [columnParams, setColumnParams] = useState<ColumnResponse>(column || {});
  const [taskList, setTaskList] = useState<TaskResponse[]>(tasks || []);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const { register, reset, handleSubmit } = useForm();

  const renameColumn = async (title: string) => {
    const newParams = await columns.updateColumn(BOARD_ID, id, { title, order });
    setColumnParams(newParams);
  };

  const deleteColumn = () => {
    columns.deleteColumn(BOARD_ID, column.id).then(() => {
      const title = '';
      setColumnParams((params) => {
        return { ...params, title };
      });
    });
  };

  const addTask = async (title: string, description: string) => {
    const data = {
      title,
      description: description || ' ',
      order: taskList?.length || 0,
      userId: USER_ID,
    };
    const newTask = await tasksApi.createTask(BOARD_ID, column.id, data);
    setTaskList((list) => [...list, newTask]);
    setIsAdd(false);
  };

  const resetColumnTitle = () => {
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

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = reorderTasks(taskList, result.source.index, result.destination.index);
    setTaskList(items);
  };

  return (
    <>
      {columnParams.title && (
        <Card className="Column" sx={{ backgroundColor: CARD_BG_COLOR }}>
          <CardContent>
            <form
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              onInput={() => setIsEdit(true)}
            >
              <TextField
                InputProps={{ disableUnderline: true }}
                defaultValue={title}
                variant="standard"
                {...register('name', { required: true })}
              />
              {isEdit && (
                <EditColumn
                  titles={{ cancel: 'Отменить', save: 'Сохранить' }}
                  callback={resetColumnTitle}
                />
              )}
            </form>
          </CardContent>
          <CardContent className="tasks">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {taskList.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(provided.draggableProps.style)}
                          >
                            {<TaskItem task={task} key={task.id} column={column} />}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </CardContent>
          <UpdateColumn onAdd={() => setIsAdd(true)} onDelete={() => setIsDelete(true)} />
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
      )}
    </>
  );
};

export default Column;
