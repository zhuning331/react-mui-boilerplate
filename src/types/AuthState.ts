import { createContext } from 'react';

export default interface IAuthState {
  isAuthenticated: boolean
}
  
export const initialAuthState: IAuthState = {
  isAuthenticated: false
}

export interface IAuthContext {
  authState: IAuthState,
  setAuthState: React.Dispatch<React.SetStateAction<IAuthState>>
}

export const AuthContext = createContext<IAuthContext>({
  authState: initialAuthState,
  setAuthState: () => {}
});