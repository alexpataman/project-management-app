import { DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

type DraggableStyle = DraggingStyle | NotDraggingStyle | undefined;

export const getTaskStyle = (draggableStyle: DraggableStyle) => ({
  marginBottom: '8px',
  ...draggableStyle,
});

export const getColumnStyle = (draggableStyle: DraggableStyle) => ({
  margin: '0 8px',
  ...draggableStyle,
});
