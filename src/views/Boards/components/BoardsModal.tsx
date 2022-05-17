import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import '../BoardsPage.scss';

interface IModal {
  isModalOpened: boolean;
  closeModal: () => void;
  createBoard: (title: string, description: string, color: string) => void;
}

const BoardsModal = (props: IModal) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('darkcyan');

  const handleTitleInput = (e: React.ChangeEvent) => {
    const input = e.currentTarget as HTMLInputElement;
    const value = input.value;
    setTitle(value);
  };

  const handleDescriptionInput = (e: React.ChangeEvent) => {
    const input = e.currentTarget as HTMLInputElement;
    const value = input.value;
    setDescription(value);
  };

  const handleColorSelect = (color: string) => {
    setColor(color);
  };

  const handleSubmit = () => {
    props.createBoard(title, description, color);
    resetValues();
  };

  const closeModalAndReset = () => {
    props.closeModal();
    resetValues();
  };

  const resetValues = () => {
    setTitle('');
    setDescription('');
    setColor('darkcyan');
  };

  return (
    <Modal open={props.isModalOpened} className="boards-page__modal">
      <Box component="div" className="modal-container">
        <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3" component="h3" className="modal__title">
            {t('LANG_CREATE_BOARD_BUTTON_TEXT')}
          </Typography>

          <Button onClick={closeModalAndReset} className="modal__close">
            <CloseRoundedIcon htmlColor="#000" className="close-icon"></CloseRoundedIcon>
          </Button>
        </Box>

        <Box component="div">
          <TextField
            label={t('LANG_BOARDS_TITLE_TEXT')}
            fullWidth
            onChange={handleTitleInput}
          ></TextField>
          <Typography variant="h5" component="h5" className="modal__title">
            {t('LANG_ENTER_BOARDS_TITLE')}
          </Typography>
        </Box>

        <Box component="div">
          <TextField
            label={t('LANG_BOARDS_DESCRIPTION_TEXT')}
            fullWidth
            onChange={handleDescriptionInput}
          ></TextField>
          <Typography variant="h5" component="h5" className="modal__title">
            {t('LANG_ENTER_BOARDS_DESCRIPTION')}
          </Typography>
        </Box>

        <Box component="div" sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <Grid container spacing={1} justifyContent="center">
            {['darkcyan', 'orange', 'green'].map((currentColor: string, key: number) => (
              <Grid item md={4} key={key} onClick={() => handleColorSelect(currentColor)}>
                <Box
                  component="div"
                  className="bg__wrapper"
                  sx={{
                    background: `${currentColor}`,
                  }}
                >
                  <Box
                    component="div"
                    className={`modal__bg ${currentColor === color ? 'selected' : ''}`}
                  >
                    <CheckRoundedIcon htmlColor="#fff"></CheckRoundedIcon>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={1} justifyContent="center">
            {['red', 'purple', 'pink'].map((currentColor: string, key: number) => (
              <Grid item md={4} key={key} onClick={() => handleColorSelect(currentColor)}>
                <Box
                  component="div"
                  className="bg__wrapper"
                  sx={{
                    background: `${currentColor}`,
                  }}
                >
                  <Box
                    component="div"
                    className={`modal__bg ${currentColor === color ? 'selected' : ''}`}
                  >
                    <CheckRoundedIcon htmlColor="#fff"></CheckRoundedIcon>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h5" component="h5" className="modal__title">
            {t('LANG_SELECT_BOARD_BACKGROUND')}
          </Typography>
        </Box>

        <Button
          variant="contained"
          className="modal__submit"
          disabled={!title || !description}
          onClick={handleSubmit}
        >
          {t('LANG_CREATE_BUTTON_TEXT')}
        </Button>
      </Box>
    </Modal>
  );
};

export default BoardsModal;
