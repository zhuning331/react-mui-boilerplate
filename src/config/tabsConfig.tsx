import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

import { ITab } from '../types/Tab';

const tabsConfig: ITab[] = [
  {
    id: 0,
    name: 'Products',
    subTabs: [
      {
        name: 'AAA',
        url: '/AAA',
        icon: <DeleteIcon />,
        selected: true
      },
      {
        name: 'BBB',
        url: '/BBB',
        icon: <SendIcon />,
        selected: false
      }
    ]
  },
  {
    id: 1,
    name: 'Pricing',
    subTabs: [
      {
        name: 'CCC',
        url: '/CCC',
        icon: <DeleteIcon />,
        selected: false
      },
      {
        name: 'DDD',
        url: '/DDD',
        icon: <DeleteIcon />,
        selected: false
      }
    ]
  },
  {
    id: 2,
    name: 'Blog',
    subTabs: [
      {
        name: 'EEE',
        url: '/EEE',
        icon: <DeleteIcon />,
        selected: false
      },
      {
        name: 'FFF',
        url: '/FFF',
        icon: <DeleteIcon />,
        selected: false
      }
    ]
  }
];

  export default tabsConfig;