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
import IGlobalContext, { GlobalContext } from './types/GlobalContext';
import IAlertState, { initialAlertState } from './types/AlertState';
import IAuthState, { initialAuthState } from './types/AuthState';
import AuthService from './services/AuthService';
import setupAxiosInterceptors from './utils/axios-interceptor';

const App: React.FC = () => {
  const { REACT_APP_VERSION } = process.env;
  const { t } = useTranslation();
  const [tabs, setTabs] = useState<ITab[]>(tabsConfig);
  const [alertState, setAlertState] = useState<IAlertState>(initialAlertState);
  const [authState, setAuthState] = useState<IAuthState>(initialAuthState);
  const globalContextValue: IGlobalContext = {
    alert: {alertState, setAlertState},
    auth: {authState, setAuthState}
  };
  
  useEffect(() => {
    setupAxiosInterceptors(() => AuthService.logout());
    setAuthState((prev: IAuthState) => ({ ...prev, isAuthenticated: !!AuthService.getCurrentUser() }));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalContext.Provider value={globalContextValue}>
        <Alert />
        {authState.isAuthenticated ?
        <>
          <Header projectName={t('global.title')} version={REACT_APP_VERSION} tabs={tabs} setTabs={setTabs} />
          <Content />
        </> :
        <SignInSide />}
      </GlobalContext.Provider>
    </ThemeProvider>
  );
}

export default App;
