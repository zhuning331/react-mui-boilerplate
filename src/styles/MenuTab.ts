import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';

const MenuTab = styled(Tab)({
  height: 60,
  '&.Mui-selected': {
    backgroundColor: '#4B58AD',
  },
});

export default MenuTab;