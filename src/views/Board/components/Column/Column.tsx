import { Box, Card, CardContent, Modal, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import { useBackendErrorCatcher } from '../../../../hooks/useBackendErrorCatcher';
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
  const backendErrorCatcher = useBackendErrorCatcher();
  const params = useParams();
  const boardId = params.id || '';
  const userId = useAppSelector(getUserState).id;

  const validationSchema = yup.object({
    title: yup.string().required(t('LANG_FIELD_IS_REQUIRED')),
  });

  const formik = useFormik({
    initialValues: {
      title: column.title || '',
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const { title } = values;
      handleRenameColumn(title);
      setIsEdit(false);
    },
  });

  const { id, title, order, tasks } = column;
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleRenameColumn = async (title: string) => {
    backendErrorCatcher(dispatch(updateColumn({ boardId, columnId: id, data: { title, order } })));
  };

  const handleDeleteColumn = () => {
    backendErrorCatcher(dispatch(deleteColumn({ boardId, columnId: id })));
  };

  const handleAddTask = async (title: string, description: string, responsible: string) => {
    const data = {
      title,
      description: description || ' ',
      userId: responsible || userId,
    };
    backendErrorCatcher(dispatch(addTask({ boardId, columnId: id, data })));
    setIsAdd(false);
  };

  return (
    <>
      {column.title && (
        <Card className="Column" sx={{ backgroundColor: BASE_GREY }}>
          <CardContent sx={{ padding: '8px' }}>
            <Box component="form" onSubmit={formik.handleSubmit} onInput={() => setIsEdit(true)}>
              {isEdit ? (
                <TextField
                  className="column-title-input"
                  variant="outlined"
                  id="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  helperText={formik.touched.title && formik.errors.title}
                />
              ) : (
                <p className="column-title" onClick={() => setIsEdit(true)}>
                  {title}
                </p>
              )}
              {isEdit && (
                <EditColumn
                  titles={{ cancel: t('BOARD_MODAL_CANCEL'), save: t('BOARD_MODAL_SAVE') }}
                  callback={() => {}}
                />
              )}
            </Box>
          </CardContent>
          <CardContent className="tasks" sx={{ padding: '8px 8px' }}>
            <Droppable droppableId={id} type="TASKS">
              {(provided) => (
                <div
                  className="tasks-container"
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
