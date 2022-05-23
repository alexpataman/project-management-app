import { Box, Card, CardContent, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { columns, tasks as tasksApi } from '../../../../api/backend';
import { useBackendErrorCatcher } from '../../../../hooks/useBackendErrorCatcher';
import { BoardActions } from '../../../../store/board/board.slice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { getUserState } from '../../../../store/user/user.slice';
import { ColumnResponse } from '../../../../types/api';
import { BASE_GREY } from '../../utils/constants';
import { getTaskStyle, reorderTasks } from '../../utils/dndHelpers';
import { modalStyle } from '../../utils/modalStyle';
import { ColumnEditForm } from '../../utils/types';
import { Confirmation } from '../ModalConfirmation';
import { ModalForm } from '../ModalForm';
import { TaskItem } from '../TaskItem';
import { EditColumn, UpdateColumn } from './Components';

import './Column.scss';

const Column = ({ column }: { column: ColumnResponse }) => {
  const { t } = useTranslation();
  const backendErrorCatcher = useBackendErrorCatcher();
  const dispatch = useAppDispatch();
  const params = useParams();
  const boardId = params.id || '';
  const userId = useAppSelector(getUserState).id;

  const { register, reset, handleSubmit } = useForm<ColumnEditForm>();

  const { id, title, order, tasks } = column;
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const renameColumn = async (title: string) => {
    const updatedColumn = await backendErrorCatcher(
      columns.updateColumn(boardId, id, { title, order })
    );
    if (!updatedColumn) return;
    dispatch(BoardActions.editColumn({ columnId: id, column: updatedColumn }));
  };

  const deleteColumn = () => {
    backendErrorCatcher(
      columns.deleteColumn(boardId, id).then(() => {
        dispatch(BoardActions.deleteColumn({ columnId: id }));
      })
    );
  };

  const addTask = async (title: string, description: string, responsible: string) => {
    const data = {
      title,
      description: description || ' ',
      userId: responsible || userId,
    };
    const newTask = await backendErrorCatcher(tasksApi.createTask(boardId, id, data));
    if (!newTask) return;
    const updatedColumn = { ...column };
    updatedColumn.tasks = tasks ? [...tasks, newTask] : [newTask];
    dispatch(BoardActions.editColumn({ columnId: id, column: updatedColumn }));
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

  const onDragEnd = (res: DropResult) => {
    if (!res.destination) return;
    if (!tasks) return;
    const items = reorderTasks(boardId, id, tasks, res.source.index, res.destination.index);
    const updatedColumn = { ...column };
    updatedColumn.tasks = items;
    dispatch(BoardActions.editColumn({ columnId: id, column: updatedColumn }));
  };

  return (
    <>
      {column.title && (
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
                  titles={{ cancel: t('BOARD_MODAL_CANCEL'), save: t('BOARD_MODAL_SAVE') }}
                  callback={resetColumnTitle}
                />
              )}
            </form>
          </CardContent>
          {tasks && (
            <CardContent className="tasks" sx={{ padding: '16px 8px' }}>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getTaskStyle(provided.draggableProps.style)}
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
          )}
          <UpdateColumn onAdd={() => setIsAdd(true)} onDelete={() => setIsDelete(true)} />
          <Modal open={isAdd} onClose={() => setIsAdd(false)}>
            <Box sx={modalStyle}>
              <ModalForm mode="task" saveTask={addTask} closeModal={() => setIsAdd(false)} />
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
