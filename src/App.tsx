import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';

import './App.css';
import SignInSide from './pages/auth/SignInSide';
import theme from './styles/theme';
import Header from './components/Header';
import Content from './components/Content';
import Alert from './components/Alert';
import tabsConfig from './config/tabsConfig';
import { ITab } from './types/Tab';
import IAlertState, { initialAlertState, AlertContext } from './types/AlertState';
import IAuthState, { initialAuthState, AuthContext } from './types/AuthState';
import AuthService from './services/AuthService';
import setupAxiosInterceptors from './utils/axios-interceptor';

const App: React.FC = () => {
  const { REACT_APP_VERSION } = process.env;
  const { t } = useTranslation();
  const [tabs, setTabs] = useState<ITab[]>(tabsConfig);
  const [alertState, setAlertState] = useState<IAlertState>(initialAlertState);
  const [authState, setAuthState] = useState<IAuthState>(initialAuthState);

  useEffect(() => {
    setupAxiosInterceptors(() => AuthService.logout());
    const user = AuthService.getCurrentUser();
    setAuthState((prev: IAuthState) => ({ ...prev, isAuthenticated: !!user }));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AlertContext.Provider value={{alertState, setAlertState}}>
        <Alert />
        <AuthContext.Provider value={{authState, setAuthState}}>
          {authState.isAuthenticated ?
          <>
            <Header projectName={t('global.title')} version={REACT_APP_VERSION} tabs={tabs} setTabs={setTabs} />
            <Content />
          </> :
          <SignInSide />}
        </AuthContext.Provider>
      </AlertContext.Provider>
    </ThemeProvider>
  );
}

export default App;
