import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

interface ExtendButtonProps {
  selected: boolean;
}

const MenuButton = styled(Button)<ButtonProps | ExtendButtonProps>((props: any) => ({
  backgroundColor: props.selected ? '#eee' : 'initial',
  color: props.selected ? '#4a4a4a' : 'white',
  borderRadius: 25,
  boxShadow: 'none',
  height: 30,
  margin: '5px 4px',
  '&:hover': {
    backgroundColor: '#ffffff',
    color: '#333333',
    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
  }
}));

export default MenuButton;
