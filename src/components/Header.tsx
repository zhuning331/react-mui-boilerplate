import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TranslateIcon from '@mui/icons-material/Translate';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';

import { ITab, ISubTab } from '../types/Tab';
import IHeaderProps from '../types/HeaderProps';
import IHeaderState, { initialHeaderState } from '../types/HeaderState';
import MenuTab from '../styles/MenuTab';
import MenuButton from '../styles/MenuButton';
import TabPanel, { a11yProps } from './TabPanel';

const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => {
  const { projectName, version, tabs, setTabs } = props;
  const [headerState, setHeaderState] = useState<IHeaderState>(initialHeaderState);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleButtonClick = (st: ISubTab) => {
    const newTabs = tabs.map((tab: ITab) => {
      tab.subTabs.map((subTab: ISubTab) => {
        subTab.selected = subTab.name === st.name;
        return subTab;
      });
      return tab;
    });
    setTabs(newTabs);
  };
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setHeaderState((prev: IHeaderState) => ({ ...prev, tabValue: newValue }));
    const selectSubTab: ISubTab = tabs.find((tab: ITab) => tab.id === newValue)!.subTabs[0];
    handleButtonClick(selectSubTab);
    navigate(selectSubTab.url);
  };

  const logout = () => {
    //TODO
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    setHeaderState((prev: IHeaderState) => ({ ...prev, languageAnchorEl: null }));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar style={{ minHeight: 60 }}>
          <Typography variant="h6" component="span" sx={{ flexGrow: 0.005,  display: { xs: 'flex' } }}>
            {projectName}
          </Typography>
          <Typography variant="h6" component="span" sx={{ flexGrow: 0.02,  display: { xs: 'flex' }, fontSize: 12, marginTop: 1 }}>
            v{version}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
          <Tabs 
            value={headerState.tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="inherit"
            TabIndicatorProps={{
              style: {
                display: "none"
              }
            }}
          >
            {tabs.map((tab: ITab) => (
              <MenuTab key={tab.id} label={tab.name} {...a11yProps(tab.id)} />
            ))}
          </Tabs>
          </Box>
          <div>
            <IconButton
              size="large"
              aria-label="change current language"
              aria-controls="i18n-appbar"
              aria-haspopup="true"
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                setHeaderState((prev: IHeaderState) => ({ ...prev, languageAnchorEl: event.currentTarget }));
              }}
              color="inherit"
            >
              <TranslateIcon />
            </IconButton>
            <Menu
              id="i18n-appbar"
              anchorEl={headerState.languageAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(headerState.languageAnchorEl)}
              onClose={() => {
                setHeaderState((prev: IHeaderState) => ({ ...prev, languageAnchorEl: null }));
              }}
            >
              <MenuItem onClick={() => handleLanguageChange('zh')}>{t('global.zh')}</MenuItem>
              <MenuItem onClick={() => handleLanguageChange('en')}>{t('global.en')}</MenuItem>
            </Menu>
          </div>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                setHeaderState((prev: IHeaderState) => ({ ...prev, accountAnchorEl: event.currentTarget }));
              }}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={headerState.accountAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(headerState.accountAnchorEl)}
              onClose={() => {
                setHeaderState((prev: IHeaderState) => ({ ...prev, accountAnchorEl: null }));
              }}
            >
              <MenuItem onClick={logout}>{t('global.auth.logOut')}</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <AppBar position="static" color="secondary">
        <Toolbar style={{ minHeight: 44 }}>
          {tabs.map((tab: ITab) => (
            <TabPanel key={tab.id} value={headerState.tabValue} index={tab.id}>
              {tab.subTabs.map((subTab: ISubTab) => (
                <Link key={subTab.name} to={subTab.url} style={{textDecoration: 'none'}}>
                  <MenuButton 
                    variant="contained" 
                    color="secondary"
                    startIcon={subTab.icon}
                    selected={subTab.selected}
                    onClick={() => handleButtonClick(subTab)}
                    sx={{textTransform: 'none'}}
                  >{t(`entity.${subTab.i18n}.title`)}
                  </MenuButton>
                </Link>
              ))}
            </TabPanel>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
