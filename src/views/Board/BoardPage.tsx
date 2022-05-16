import AddIcon from '@mui/icons-material/Add';
import { IconButton, Modal, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

import { ModalForm, TaskList } from '../Board/components';
import { modalStyle } from './utils/modalStyle';
import { ListType } from './utils/types';

import './BoardPage.scss';

// TODO: move const to a separate file and change the initialValue @saratovkin

const LISTS_LIMIT = 5;

const initialValue = [
  { title: 'Todo', tasks: ['add DnD', 'add API requests', 'add adaptive layout'] },
  { title: 'In Progress', tasks: ['rename tasks', 'delete tasks'] },
];

const BoardsPage = () => {
  const [lists, setLists] = useState<ListType[]>(initialValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // TODO: rewrite add/delete functions with api requests @saratovkin

  const addList = (title: string) => {
    setLists((prevState) => {
      return [...prevState, { title: title, tasks: [] }];
    });
  };

  const renameList = (title: string, newTitle: string) => {
    setLists((prevState) => {
      const newState = [...prevState];
      newState.map((list) => {
        if (list.title === title) {
          list.title = newTitle;
          return;
        }
      });
      return newState;
    });
  };

  const deleteList = (title: string) => {
    setLists((prevState) => {
      return [...prevState].filter((list) => list.title !== title);
    });
  };

  const addTask = (title: string, task: string) => {
    setLists((prevState) => {
      const newState = [...prevState];
      newState.map((list) => {
        if (list.title === title) {
          list.tasks = [...list.tasks, task];
        }
      });
      return newState;
    });
  };

  const renameTask = (title: string, oldName: string, newName: string) => {
    setLists((prevState) => {
      const newState = [...prevState];
      newState.map((list) => {
        if (list.title === title) {
          list.tasks[list.tasks.indexOf(oldName)] = newName;
        }
      });
      return newState;
    });
  };

  const deleteTask = (title: string, task: string) => {
    setLists((prevState) => {
      const newState = [...prevState];
      newState.map((list) => {
        if (list.title === title) {
          list.tasks = list.tasks.filter((t) => t !== task);
        }
      });
      return newState;
    });
  };

  return (
    <section className="BoardPage">
      <Stack className="Columns" direction="row" spacing={2}>
        {lists.map((list, index) => (
          <TaskList
            list={list}
            addTask={addTask}
            renameTask={(oldName: string, newName: string) =>
              renameTask(list.title, oldName, newName)
            }
            deleteTask={(task: string) => deleteTask(list.title, task)}
            renameList={(newTitle: string) => renameList(list.title, newTitle)}
            deleteList={() => deleteList(list.title)}
            key={index}
          />
        ))}
        {lists.length < LISTS_LIMIT && (
          <IconButton
            aria-label="add"
            size="large"
            sx={{ height: 50, width: 50, backgroundColor: '#ebecf0' }}
            onClick={handleOpen}
          >
            <AddIcon />
          </IconButton>
        )}
      </Stack>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <ModalForm saveTask={addList} closeModal={handleClose} />
        </Box>
      </Modal>
    </section>
  );
};

export default BoardsPage;
