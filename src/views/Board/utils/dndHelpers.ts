import { DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

import { columns as columnsApi, tasks as tasksApi } from '../../../api/backend';
import { ColumnResponse, TaskResponse } from '../../../types/api';

type DraggableStyle = DraggingStyle | NotDraggingStyle | undefined;

export const getTaskStyle = (draggableStyle: DraggableStyle) => ({
  marginBottom: '8px',
  ...draggableStyle,
});

export const getColumnStyle = (draggableStyle: DraggableStyle) => ({
  margin: '0 8px',
  ...draggableStyle,
});

export const reorderColumns = (
  boardId: string,
  columns: ColumnResponse[],
  startIndex: number,
  endIndex: number
) => {
  const result = [...columns];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  result.forEach((column, index) => {
    const { title, id } = column;
    const data = { title, order: index + 1 };
    columnsApi.updateColumn(boardId, id, data);
  });
  return result;
};

export const reorderTasks = (
  boardId: string,
  columnId: string,
  tasks: TaskResponse[],
  startIndex: number,
  endIndex: number
) => {
  const result = [...tasks];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  result.forEach((task, index) => {
    const { title, description, userId } = task;
    const data = { title, description, userId, boardId, order: index + 1 };
    tasksApi.updateTask(boardId, columnId, task.id, data);
  });
  return result;
};
