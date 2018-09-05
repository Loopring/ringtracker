import intl from 'react-intl-universal'
// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const asideMenuConfig = [
  {
    name: intl.get('taps.home'),
    path: '/',
  },
  {
    name: intl.get('taps.trades'),
    path: '/trades',
  },
  {
    name: intl.get('taps.tokens'),
    path: '/tokens',
  },
  {
    name: intl.get('taps.relays'),
    path: '/relays',
  },
  {
    name: intl.get('taps.dexs'),
    path: '/dexs',
  },
  {
    name: intl.get('taps.rings'),
    path: '/rings?page=1',
  },
];

const headerMenuConfig = asideMenuConfig;

export default headerMenuConfig;
