import React, { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import IAlertState, { AlertContext, IAlertContext } from '../types/AlertState';

const Alert: React.FC = () => {
  const { alertState, setAlertState } = useContext<IAlertContext>(AlertContext); 

  const handleClose = (evt: React.SyntheticEvent | Event) => {
    setAlertState((prev: IAlertState) => ({ ...prev, open: false }));
  };

  return (
    <Snackbar open={alertState.open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
      <MuiAlert onClose={handleClose} severity={alertState.severity}>
        {alertState.message}
      </MuiAlert>
    </Snackbar>
  )
};

export default Alert;

