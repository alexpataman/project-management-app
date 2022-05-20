import { Box, Card, CardContent, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { columns, tasks as tasksApi } from '../../../../api/backend';
import { useAuthControl } from '../../../../hooks/useAuthControl';
import { ColumnResponse, TaskResponse } from '../../../../types/api';
import { USER_ID } from '../../TEMP_ID';
import { BASE_GREY } from '../../utils/constants';
import { getItemStyle } from '../../utils/dndHelpers';
import { modalStyle } from '../../utils/modalStyle';
import { ColumnEditForm } from '../../utils/types';
import { Confirmation } from '../ModalConfirmation';
import { ModalForm } from '../ModalForm';
import { TaskItem } from '../TaskItem';
import { EditColumn, UpdateColumn } from './Components';

import './Column.scss';

const Column = ({ column }: { column: ColumnResponse }) => {
  const authControl = useAuthControl();
  const params = useParams();
  const boardId = params.id || '';
  const { register, reset, handleSubmit } = useForm<ColumnEditForm>();
  const { id, title, order, tasks } = column;
  const [columnParams, setColumnParams] = useState<ColumnResponse>(column || {});
  const [taskList, setTaskList] = useState<TaskResponse[]>(
    tasks?.sort((a, b) => a.order - b.order) || []
  );
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const renameColumn = async (title: string) => {
    const newParams = await authControl(columns.updateColumn(boardId, id, { title, order }));
    if (!newParams) return;
    setColumnParams(newParams);
  };

  const deleteColumn = () => {
    authControl(
      columns.deleteColumn(boardId, column.id).then(() => {
        const title = '';
        setColumnParams((params) => {
          return { ...params, title };
        });
      })
    );
  };

  const addTask = async (title: string, description: string) => {
    const data = {
      title,
      description: description || ' ',
      order: taskList?.length || 0,
      userId: USER_ID,
    };
    const newTask = await authControl(tasksApi.createTask(boardId, column.id, data));
    if (!newTask) return;
    setTaskList((list) => [...list, newTask]);
    setIsAdd(false);
  };

  const resetColumnTitle = () => {
    setIsEdit(false);
    reset({
      name: title,
    });
  };

  const onSubmit = (data: ColumnEditForm) => {
    if (data) {
      setIsEdit(false);
      renameColumn(data.name);
    }
  };

  const reorderTasks = (tasks: TaskResponse[], startIndex: number, endIndex: number) => {
    const result = [...tasks];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    result.forEach((task, index) => {
      const { title, description, userId } = task;
      const data = { title, description, userId, boardId, order: index };
      tasksApi.updateTask(boardId, column.id, task.id, data);
    });
    return result;
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
        <Card className="Column" sx={{ backgroundColor: BASE_GREY }}>
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
