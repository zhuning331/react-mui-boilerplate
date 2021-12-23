import React, { useState, useEffect, useContext, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
        .then(() => {
          setAlertState({
            open: true,
            severity: 'success',
            message: t('entity.mockUser.message.editSuccess')
          });
          props.onRefreshList();
        }, (res: AxiosResponse) => {
          console.error(res);
          setAlertState({
            open: true,
            severity: 'error',
            message: t('entity.mockUser.message.editFail')
          });
        })
        .catch((e: Error) => {
          console.error(e);
          setAlertState({
            open: true,
            severity: 'error',
            message: t('entity.mockUser.message.editFail')
          });
        });
    } else {
      MockUserService.addMockUser(mockUser)
        .then(() => {
          setAlertState({
            open: true,
            severity: 'success',
            message: t('entity.mockUser.message.addSuccess')
          });
          props.onRefreshList();
        }, (res: AxiosResponse) => {
          console.error(res);
          setAlertState({
            open: true,
            severity: 'error',
            message: t('entity.mockUser.message.addFail')
          });
        })
        .catch((e: Error) => {
          console.error(e);
          setAlertState({
            open: true,
            severity: 'error',
            message: t('entity.mockUser.message.addFail')
          });
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
        {t('entity.mockUser.action.' + (id ? 'edit' : 'add'))}
      </DialogTitle>
      <DialogContent>
        <TextField
          required
          autoFocus
          name="firstName"
          label={t('entity.mockUser.column.firstName')}
          value={mockUser.firstName}
          onChange={handleInputChange}
          fullWidth
          variant="standard"
          margin="dense"
        />
        <TextField
          required
          name="lastName"
          label={t('entity.mockUser.column.lastName')}
          value={mockUser.lastName}
          onChange={handleInputChange}
          fullWidth
          variant="standard"
          margin="dense"
        />
        <TextField
          name="age"
          label={t('entity.mockUser.column.age')}
          value={mockUser.age}
          onChange={handleInputChange}
          type="number"
          fullWidth
          variant="standard"
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{textTransform: 'none'}}>{t('global.action.cancel')}</Button>
        <Button onClick={handleConfirm} sx={{textTransform: 'none'}}>{t('global.action.confirm')}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default MockUserUpdate;
