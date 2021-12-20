import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';

import { ITab, ISubTab } from '../types/Tab';
import IHeaderProps from '../types/HeaderProps';
import MenuTab from '../styles/MenuTab';
import MenuButton from '../styles/MenuButton';
import TabPanel, { a11yProps } from './TabPanel';

const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {projectName, version, tabs, setTabs} = props;
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

  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const selectSubTab: ISubTab = tabs.find((tab: ITab) => tab.id === newValue)!.subTabs[0];
    handleButtonClick(selectSubTab);
    navigate(selectSubTab.url);
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
            value={value}
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
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <AppBar position="static" color="secondary">
        <Toolbar style={{ minHeight: 44 }}>
          {tabs.map((tab: ITab) => (
            <TabPanel key={tab.id} value={value} index={tab.id}>
              {tab.subTabs.map((subTab: ISubTab) => (
                <Link key={subTab.name} to={subTab.url} style={{textDecoration: 'none'}}>
                  <MenuButton 
                    variant="contained" 
                    color="secondary"
                    startIcon={subTab.icon}
                    selected={subTab.selected}
                    onClick={() => handleButtonClick(subTab)}
                    sx={{textTransform: 'none'}}
                  >{subTab.name}
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
