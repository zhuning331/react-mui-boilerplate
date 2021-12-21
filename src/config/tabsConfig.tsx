import GroupsIcon from '@mui/icons-material/Groups';
import TheatersIcon from '@mui/icons-material/Theaters';
import ViewInArIcon from '@mui/icons-material/ViewInAr';

import { ITab } from '../types/Tab';

const tabsConfig: ITab[] = [
  {
    id: 0,
    name: 'Products',
    subTabs: [
      {
        name: 'Mock User',
        url: '/mock-user',
        icon: <GroupsIcon />,
        selected: true
      },
      {
        name: 'BBB',
        url: '/BBB',
        icon: <TheatersIcon />,
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
        icon: <ViewInArIcon />,
        selected: false
      },
      {
        name: 'DDD',
        url: '/DDD',
        icon: <TheatersIcon />,
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
        icon: <GroupsIcon />,
        selected: false
      },
      {
        name: 'FFF',
        url: '/FFF',
        icon: <TheatersIcon />,
        selected: false
      }
    ]
  }
];

  export default tabsConfig;