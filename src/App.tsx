import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import './App.css';

import theme from './styles/theme';
import Header from './components/Header';
import Content from './components/Content';
import Alert from './components/Alert';
import tabsConfig from './config/tabsConfig';
import { ITab } from './types/Tab';
import IAlertState, { initialAlertState, AlertContext } from './types/AlertState';

const App: React.FC = () => {
  const { REACT_APP_VERSION } = process.env;
  const { t } = useTranslation();
  const [tabs, setTabs] = useState<ITab[]>(tabsConfig);
  const [alertState, setAlertState] = useState<IAlertState>(initialAlertState);

  return (
    <ThemeProvider theme={theme}>
      <AlertContext.Provider value={{alertState, setAlertState}}>
        <Alert />
        <Header projectName={t('global.title')} version={REACT_APP_VERSION} tabs={tabs} setTabs={setTabs} />
        <Content />
      </AlertContext.Provider>
    </ThemeProvider>
  );
}

export default App;
