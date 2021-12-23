import GroupsIcon from '@mui/icons-material/Groups';
import TheatersIcon from '@mui/icons-material/Theaters';
import ViewInArIcon from '@mui/icons-material/ViewInAr';

import { ITab } from '../types/Tab';

const tabsConfig: ITab[] = [
  {
    id: 0,
    name: 'Tab 1',
    subTabs: [
      {
        name: 'Mock User',
        url: '/mock-user',
        i18n: 'mockUser',
        icon: <GroupsIcon />,
        selected: true
      },
      {
        name: 'BBB',
        url: '/BBB',
        i18n: 'mockUser',
        icon: <TheatersIcon />,
        selected: false
      }
    ]
  },
  {
    id: 1,
    name: 'Tab 2',
    subTabs: [
      {
        name: 'CCC',
        url: '/CCC',
        i18n: 'mockUser',
        icon: <ViewInArIcon />,
        selected: false
      },
      {
        name: 'DDD',
        url: '/DDD',
        i18n: 'mockUser',
        icon: <TheatersIcon />,
        selected: false
      }
    ]
  }
];

  export default tabsConfig;