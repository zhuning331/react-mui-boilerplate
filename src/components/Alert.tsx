import React, { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import IGlobalContext, { GlobalContext } from '../types/GlobalContext';

const Alert: React.FC = () => {
  const { alert } = useContext<IGlobalContext>(GlobalContext); 
  const { alertState, setAlertState } = alert;

  const handleClose = () => {
    setAlertState({ ...alertState, open: false });
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

