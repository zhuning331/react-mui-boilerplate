import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import './App.css';

import theme from './styles/theme';
import Header from './components/Header';
import Content from './components/Content';
import tabsConfig from './config/tabsConfig';
import { ITab } from './types/Tab';

const App: React.FC = () => {
  const [tabs, setTabs] = useState<ITab[]>(tabsConfig);
  const {REACT_APP_NAME, REACT_APP_VERSION} = process.env;

  return (
    <ThemeProvider theme={theme}>
      <Header projectName={REACT_APP_NAME} version={REACT_APP_VERSION} tabs={tabs} setTabs={setTabs} />
      <Content />
    </ThemeProvider>
  );
}

export default App;
