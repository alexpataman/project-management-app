import { DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

type DraggableStyle = DraggingStyle | NotDraggingStyle | undefined;

export const getItemStyle = (draggableStyle: DraggableStyle) => ({
  margin: '0 0 8px 0',
  ...draggableStyle,
});
