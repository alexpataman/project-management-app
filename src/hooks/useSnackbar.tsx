import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';
import { useState } from 'react';

import { SNACKBAR_TIMEOUT } from '../constants';

export const useSnackbar = () => {
  const [message, setMessage] = useState('');

  const handleClose = () => {
    setMessage('');
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const SnackbarElement = (
    <Snackbar
      open={!!message}
      autoHideDuration={SNACKBAR_TIMEOUT}
      onClose={handleClose}
      action={action}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );

  return { setMessage, SnackbarElement };
};
