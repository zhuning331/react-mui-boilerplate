import { createContext } from 'react';
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

export interface IAlertContext {
  alertState: IAlertState,
  setAlertState: React.Dispatch<React.SetStateAction<IAlertState>>
}

export const AlertContext = createContext<IAlertContext>({
  alertState: initialAlertState,
  setAlertState: () => {}
});