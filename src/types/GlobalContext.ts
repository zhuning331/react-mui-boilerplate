import { createContext } from 'react';
import IAlertState, { initialAlertState } from './AlertState';
import IAuthState, { initialAuthState } from './AuthState';

export default interface IGlobalContext {
  alert: {
    alertState: IAlertState,
    setAlertState: React.Dispatch<React.SetStateAction<IAlertState>>
  },
  auth: {
    authState: IAuthState,
    setAuthState: React.Dispatch<React.SetStateAction<IAuthState>>
  }
}
  
export const GlobalContext = createContext<IGlobalContext>({
  alert: {
    alertState: initialAlertState,
    setAlertState: () => {}
  },
  auth: {
    authState: initialAuthState,
    setAuthState: () => {}
  }
});