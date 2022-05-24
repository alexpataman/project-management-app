import { Box, Card, CardContent, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { addTask, deleteColumn, updateColumn } from '../../../../store/board/board.slice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { getUserState } from '../../../../store/user/user.slice';
import { ColumnResponse } from '../../../../types/api';
import { BASE_GREY } from '../../utils/constants';
import { getTaskStyle } from '../../utils/dndHelpers';
import { modalStyle } from '../../utils/modalStyle';
import { ColumnEditForm } from '../../utils/types';
import { Confirmation } from '../ModalConfirmation';
import { ModalForm } from '../ModalForm';
import { TaskItem } from '../TaskItem';
import { EditColumn, UpdateColumn } from './Components';

import './Column.scss';

const Column = ({ column }: { column: ColumnResponse }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const params = useParams();
  const boardId = params.id || '';
  const userId = useAppSelector(getUserState).id;

  const { register, reset, handleSubmit } = useForm<ColumnEditForm>();

  const { id, title, order, tasks } = column;
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleRenameColumn = async (title: string) => {
    dispatch(updateColumn({ boardId, columnId: id, data: { title, order } }));
  };

  const handleDeleteColumn = () => {
    dispatch(deleteColumn({ boardId, columnId: id }));
  };

  const handleAddTask = async (title: string, description: string, responsible: string) => {
    const data = {
      title,
      description: description || ' ',
      userId: responsible || userId,
    };
    dispatch(addTask({ boardId, columnId: id, data }));
    setIsAdd(false);
  };

  const handleReset = () => {
    setIsEdit(false);
    reset({
      name: title,
    });
  };

  const onSubmit = (data: ColumnEditForm) => {
    if (data) {
      setIsEdit(false);
      handleRenameColumn(data.name);
    }
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
              {isEdit ? (
                <TextField
                  className="column-title-input"
                  variant="outlined"
                  defaultValue={title}
                  {...register('name', { required: true })}
                />
              ) : (
                <p className="column-title" onClick={() => setIsEdit(true)}>
                  {title}
                </p>
              )}
              {isEdit && (
                <EditColumn
                  titles={{ cancel: t('BOARD_MODAL_CANCEL'), save: t('BOARD_MODAL_SAVE') }}
                  callback={handleReset}
                />
              )}
            </form>
          </CardContent>
          <CardContent className="tasks" sx={{ padding: '16px 8px' }}>
            <Droppable droppableId={id} type="TASKS">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    minHeight: '20px',
                    maxHeight: '50vh',
                    overflowY: 'scroll',
                  }}
                >
                  {tasks &&
                    [...tasks]
                      .sort((a, b) => a.order - b.order)
                      .map((task, index) => (
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
          </CardContent>
          <UpdateColumn onAdd={() => setIsAdd(true)} onDelete={() => setIsDelete(true)} />
          <Modal open={isAdd} onClose={() => setIsAdd(false)}>
            <Box sx={modalStyle}>
              <ModalForm mode="task" saveTask={handleAddTask} closeModal={() => setIsAdd(false)} />
            </Box>
          </Modal>
          <Modal open={isDelete} onClose={() => setIsDelete(false)}>
            <Box sx={modalStyle}>
              <Confirmation
                deleteCallback={handleDeleteColumn}
                closeModal={() => setIsDelete(false)}
              />
            </Box>
          </Modal>
        </Card>
      )}
    </>
  );
};

export default Column;
