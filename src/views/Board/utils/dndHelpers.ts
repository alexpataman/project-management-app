import { DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

import { TaskResponse } from '../../../types/api';

type DraggableStyle = DraggingStyle | NotDraggingStyle | undefined;

export const reorderTasks = (tasks: TaskResponse[], startIndex: number, endIndex: number) => {
  const result = [...tasks];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const getItemStyle = (draggableStyle: DraggableStyle) => ({
  margin: '0 0 8px 0',
  ...draggableStyle,
});
