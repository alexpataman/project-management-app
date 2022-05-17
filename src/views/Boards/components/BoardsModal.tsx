import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import '../BoardsPage.scss';

interface IModal {
  isModalOpened: boolean;
  closeModal: () => void;
  createBoard: (title: string, background: number) => void;
}

const BoardsModal = (props: IModal) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState('');
  const [selectedBG, setSelectedBG] = useState(0);

  const handleInput = (e: React.ChangeEvent) => {
    const input = e.currentTarget as HTMLInputElement;
    const value = input.value;
    setTitle(value);
  };

  const handleBackgroundSelect = (index: number) => {
    setSelectedBG(index);
  };

  const handleSubmit = () => {
    props.createBoard(title, selectedBG);
    setTitle('');
    setSelectedBG(0);
  };

  return (
    <Modal open={props.isModalOpened} className="boards-page__modal">
      <Box component="div" className="modal-container">
        <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3" component="h3" className="modal__title">
            {t('LANG_CREATE_BOARD_BUTTON_TEXT')}
          </Typography>

          <Button onClick={props.closeModal} className="modal__close">
            <CloseRoundedIcon htmlColor="#000" className="close-icon"></CloseRoundedIcon>
          </Button>
        </Box>

        <Box component="div">
          <TextField
            label={t('LANG_BOARDS_TITLE_TEXT')}
            fullWidth
            onChange={handleInput}
          ></TextField>
          <Typography variant="h5" component="h5" className="modal__title">
            {t('LANG_ENTER_BOARDS_TITLE')}
          </Typography>
        </Box>

        <Box component="div" sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <Grid container spacing={1} justifyContent="center">
            {['darkcyan', 'orange', 'green'].map((color: string, key: number) => (
              <Grid item md={4} key={key} onClick={() => handleBackgroundSelect(key)}>
                <Box
                  component="div"
                  className="bg__wrapper"
                  sx={{
                    background: `${color}`,
                  }}
                >
                  <Box
                    component="div"
                    className={`modal__bg ${key === selectedBG ? 'selected' : ''}`}
                  >
                    <CheckRoundedIcon htmlColor="#fff"></CheckRoundedIcon>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={1} justifyContent="center">
            {['red', 'purple', 'pink'].map((color: string, key: number) => (
              <Grid item md={4} key={key} onClick={() => handleBackgroundSelect(key + 3)}>
                <Box
                  component="div"
                  className="bg__wrapper"
                  sx={{
                    background: `${color}`,
                  }}
                >
                  <Box
                    component="div"
                    className={`modal__bg ${key + 3 === selectedBG ? 'selected' : ''}`}
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
          disabled={!title}
          onClick={handleSubmit}
        >
          {t('LANG_CREATE_BUTTON_TEXT')}
        </Button>
      </Box>
    </Modal>
  );
};

export default BoardsModal;
