import getWindowOffset from './get-window-offset';
import { safeAreaInsets } from './safe-area-insets';

export function getWindowInfo() {
  const { screen } = window;
  const pixelRatio = window.devicePixelRatio;
  // 横屏时 iOS 获取的屏幕宽高颠倒，进行纠正
  const screenFix = /^Apple/.test(navigator.vendor) && typeof window.orientation === 'number';
  const landscape = screenFix && Math.abs(+window.orientation) === 90;
  const screenWidth = screenFix ? Math[landscape ? 'max' : 'min'](screen.width, screen.height) : screen.width;
  const screenHeight = screenFix ? Math[landscape ? 'min' : 'max'](screen.height, screen.width) : screen.height;
  const windowWidth = Math.min(window.innerWidth, document.documentElement.clientWidth, screenWidth) || screenWidth;
  let windowHeight = window.innerHeight;
  const statusBarHeight = safeAreaInsets.top;

  const safeArea = {
    left: safeAreaInsets.left,
    right: windowWidth - safeAreaInsets.right,
    top: safeAreaInsets.top,
    bottom: windowHeight - safeAreaInsets.bottom,
    width: windowWidth - safeAreaInsets.left - safeAreaInsets.right,
    height: windowHeight - safeAreaInsets.top - safeAreaInsets.bottom,
  };

  const {
    top: windowTop,
    bottom: windowBottom,
  } = getWindowOffset();

  windowHeight -= windowTop;
  windowHeight -= windowBottom;

  return {
    windowTop,
    windowBottom,
    windowWidth,
    windowHeight,
    pixelRatio,
    screenWidth,
    screenHeight,
    statusBarHeight,
    safeArea,
    safeAreaInsets: {
      top: safeAreaInsets.top,
      right: safeAreaInsets.right,
      bottom: safeAreaInsets.bottom,
      left: safeAreaInsets.left,
    },
    screenTop: screenHeight - windowHeight,
  };
}
