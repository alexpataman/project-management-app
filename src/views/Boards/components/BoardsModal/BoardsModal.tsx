import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { RESOLUTION } from '../../../../constants/resolution';
import { useBackendErrorCatcher } from '../../../../hooks/useBackendErrorCatcher';
import { createBoard, updateBoard } from '../../../../store/boards/boards.slice';
import { useAppDispatch } from '../../../../store/hooks';
import { BoardRequest } from '../../../../types/api';
import { COLORS_ARRAY, MODAL_DEFAULT_VALUES } from './constants';

interface IBoardsModal {
  isModalOpened: boolean;
  closeModal: () => void;
  isEditingMode: boolean;
  editingBoardId: string;
}

const BoardsModal = ({
  isModalOpened,
  closeModal,
  isEditingMode,
  editingBoardId,
}: IBoardsModal) => {
  const { t } = useTranslation();

  const backendErrorCatcher = useBackendErrorCatcher();
  const dispatch = useAppDispatch();

  const [color, setColor] = useState(MODAL_DEFAULT_VALUES.color);

  const validationSchema = yup.object({
    title: yup.string().required(t('LANG_FIELD_IS_REQUIRED')),
    description: yup.string().required(t('LANG_FIELD_IS_REQUIRED')),
  });

  const formik = useFormik({
    initialValues: {
      title: MODAL_DEFAULT_VALUES.title,
      description: MODAL_DEFAULT_VALUES.description,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { title, description } = values;

      if (isEditingMode) {
        handleEditBoard(title, description, color, editingBoardId);
      } else {
        handleCreateBoard(title, description, color);
      }

      resetValues();
    },
  });

  const handleCreateBoard = async (title: string, description: string, color: string) => {
    const data: BoardRequest = {
      title: title,
      description: description,
      color: `${color}`,
    };

    backendErrorCatcher(dispatch(createBoard(data)));
    closeModal();
  };

  const handleEditBoard = async (title: string, description: string, color: string, id: string) => {
    const data: BoardRequest = {
      title: title,
      description: description,
      color: `${color}`,
    };

    backendErrorCatcher(dispatch(updateBoard({ id, data })));
    closeModal();
  };

  const resetValues = () => {
    formik.resetForm();
    setColor(MODAL_DEFAULT_VALUES.color);
  };

  const closeAndReset = () => {
    closeModal();
    resetValues();
  };

  return (
    <Modal open={isModalOpened} className="boards-page__modal">
      <Box component="form" onSubmit={formik.handleSubmit} className="modal-container">
        <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3" component="h3" className="modal__title">
            {isEditingMode ? t('LANG_EDIT_BOARD_TEXT') : t('LANG_CREATE_BOARD_TEXT')}
          </Typography>

          <Button onClick={closeAndReset} className="modal__close">
            <CloseRoundedIcon htmlColor="#000" className="close-icon"></CloseRoundedIcon>
          </Button>
        </Box>

        <TextField
          id="title"
          label={t('LANG_BOARDS_TITLE_TEXT')}
          fullWidth
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        ></TextField>

        <TextField
          id="description"
          label={t('LANG_BOARDS_DESCRIPTION_TEXT')}
          fullWidth
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        ></TextField>

        <Box component="div" className="color-container">
          {COLORS_ARRAY.map((currentColor: string, key: number) => (
            <Box
              key={key}
              component="div"
              className="color__wrapper"
              sx={{
                background: `url(${currentColor}${RESOLUTION.small})`,
              }}
              onClick={() => setColor(currentColor)}
            >
              <Box
                component="div"
                className={`modal__bg ${currentColor === color ? 'selected' : ''}`}
              >
                <CheckRoundedIcon htmlColor="#fff"></CheckRoundedIcon>
              </Box>
            </Box>
          ))}
        </Box>

        {isEditingMode ? (
          <Button type="submit" variant="contained" className="modal__submit">
            SAVE
          </Button>
        ) : (
          <Button type="submit" variant="contained" className="modal__submit">
            {t('LANG_CREATE_BUTTON_TEXT')}
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default BoardsModal;
