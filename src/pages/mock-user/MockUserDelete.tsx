import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AxiosResponse } from 'axios';

import IUpdateModalProps from '../../types/UpdateModalProps';
import MockUserService from '../../services/MockUserService';

const MockUserDelete: React.FC<IUpdateModalProps> = (props: IUpdateModalProps) => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  const handleConform = () => {
    id && MockUserService.deleteMockUser(+id)
      .then((res: AxiosResponse) => {
        console.log(res);
        props.onRefreshList();
      })
      .catch((e: Error) => {
        console.error(e);
      });
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">Delete Mock User</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure to delete mock user id: {id}?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} sx={{textTransform: 'none'}}>Cancel</Button>
      <Button onClick={handleConform} sx={{textTransform: 'none'}} autoFocus>Confirm</Button>
    </DialogActions>
    </Dialog>
  );
};

export default MockUserDelete;