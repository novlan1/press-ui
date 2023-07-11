import { WHITE } from '../common/constant/color';

export const DEFAULT_OPTIONS = {
  selector: '#press-notify',
  type: 'danger',
  message: '',
  background: '',
  duration: 3000,
  show: true,
  zIndex: 110,
  top: 0,
  color: WHITE,
  safeAreaInsetTop: false,
  onClick: () => { },
  onOpened: () => { },
  onClose: () => { },


  // 动画持续时间
  animationDuration: 300,
};

export const DEFAULT_KEY = 'message';
