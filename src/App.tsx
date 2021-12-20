import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import './App.css';

import theme from './styles/theme';
import Header from './components/Header';
import Content from './components/Content';
import Alert from './components/Alert';
import tabsConfig from './config/tabsConfig';
import { ITab } from './types/Tab';
import IAlertState, { AlertContext } from './types/AlertState';

const App: React.FC = () => {
  const {REACT_APP_NAME, REACT_APP_VERSION} = process.env;
  const [tabs, setTabs] = useState<ITab[]>(tabsConfig);
  const [alertState, setAlertState] = useState<IAlertState>({
    open: false,
    severity: 'success',
    message: 'Hello, world!'
  });

  return (
    <ThemeProvider theme={theme}>
      <AlertContext.Provider value={{alertState, setAlertState}}>
        <Alert />
        <Header projectName={REACT_APP_NAME} version={REACT_APP_VERSION} tabs={tabs} setTabs={setTabs} />
        <Content />
      </AlertContext.Provider>
    </ThemeProvider>
  );
}

export default App;
