import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

export const Portal = ({ elem }: { elem: ReactNode }) => {
  const root = document.getElementById('root');
  if (root) {
    return ReactDOM.createPortal(elem, root);
  }
  return <></>;
};
