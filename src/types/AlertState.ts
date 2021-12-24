import { AlertColor } from '@mui/material/Alert';

export default interface IAlertState {
  open: boolean,
  severity: AlertColor,
  message: string
}

export const initialAlertState: IAlertState = {
  open: false,
  severity: 'success',
  message: 'Hello, world!'
}