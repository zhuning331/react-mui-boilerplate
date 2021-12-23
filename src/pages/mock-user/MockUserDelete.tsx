import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AxiosResponse } from 'axios';

import IUpdateModalProps from '../../types/UpdateModalProps';
import MockUserService from '../../services/MockUserService';
import { AlertContext, IAlertContext } from '../../types/AlertState';

const MockUserDelete: React.FC<IUpdateModalProps> = (props: IUpdateModalProps) => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const { setAlertState } = useContext<IAlertContext>(AlertContext);
  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  const handleConform = () => {
    id && MockUserService.deleteMockUser(+id)
      .then(() => {
        setAlertState({
          open: true,
          severity: 'success',
          message: t('entity.mockUser.message.deleteSuccess')
        });
        props.onRefreshList();
      }, (res: AxiosResponse) => {
        console.error(res);
        setAlertState({
          open: true,
          severity: 'error',
          message: t('entity.mockUser.message.deleteFail')
        });
      })
      .catch((e: Error) => {
        console.error(e);
        setAlertState({
          open: true,
          severity: 'error',
          message: t('entity.mockUser.message.deleteFail')
        });
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
    <DialogTitle id="alert-dialog-title">{t('entity.mockUser.action.delete')}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {t('entity.mockUser.message.delete', {id})}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} sx={{textTransform: 'none'}}>{t('global.action.cancel')}</Button>
      <Button onClick={handleConform} sx={{textTransform: 'none'}} autoFocus>{t('global.action.confirm')}</Button>
    </DialogActions>
    </Dialog>
  );
};

export default MockUserDelete;