import { DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

type DraggableStyle = DraggingStyle | NotDraggingStyle | undefined;

export const getTaskStyle = (draggableStyle: DraggableStyle) => ({
  height: '40px',
  ...draggableStyle,
});

export const getColumnStyle = (draggableStyle: DraggableStyle) => ({
  marginRight: '16px',
  ...draggableStyle,
});
