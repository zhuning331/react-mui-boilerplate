import React, { useState, useEffect, useContext, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AxiosResponse } from 'axios';

import IMockUser, { initialMockUser } from '../../types/MockUser';
import IUpdateModalProps from '../../types/UpdateModalProps';
import MockUserService from '../../services/MockUserService';
import { AlertContext, IAlertContext } from '../../types/AlertState';

const MockUserUpdate: React.FC<IUpdateModalProps> = (props: IUpdateModalProps) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const { setAlertState } = useContext<IAlertContext>(AlertContext); 

  const [mockUser, setMockUser] = useState<IMockUser>(initialMockUser);
  useEffect(() => {
    id && MockUserService.getMockUser(+id)
      .then((res: AxiosResponse) => {
        setMockUser(res.data);
       })
      .catch((e: Error) => {
        console.error(e);
      });
  }, [id]);

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  const handleConfirm = () => {
    if (id) {
      MockUserService.updateMockUser(mockUser)
        .then((res: AxiosResponse) => {
          console.log(res);
          setAlertState({
            open: true,
            severity: 'success',
            message: 'Edit Mock User Successfully!'
          });
          props.onRefreshList();
        })
        .catch((e: Error) => {
          console.error(e);
        });
    } else {
      MockUserService.addMockUser(mockUser)
        .then((res: AxiosResponse) => {
          console.log(res);
          setAlertState({
            open: true,
            severity: 'success',
            message: 'Add Mock User Successfully!'
          });
          props.onRefreshList();
        })
        .catch((e: Error) => {
          console.error(e);
        });
    }
    handleClose();
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setMockUser({ ...mockUser, [name]: value });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {id ? 'Edit ' : 'Add '}
        Mock User
      </DialogTitle>
      <DialogContent>
        <TextField
          required
          autoFocus
          name="firstName"
          label="First Name"
          value={mockUser.firstName}
          onChange={handleInputChange}
          fullWidth
          variant="standard"
          margin="dense"
        />
        <TextField
          required
          name="lastName"
          label="Last Name"
          value={mockUser.lastName}
          onChange={handleInputChange}
          fullWidth
          variant="standard"
          margin="dense"
        />
        <TextField
          name="age"
          label="Age"
          value={mockUser.age}
          onChange={handleInputChange}
          type="number"
          fullWidth
          variant="standard"
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{textTransform: 'none'}}>Cancel</Button>
        <Button onClick={handleConfirm} sx={{textTransform: 'none'}}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

export default MockUserUpdate;
