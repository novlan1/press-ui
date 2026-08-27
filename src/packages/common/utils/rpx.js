import { getWindowWidth } from '../dom/rect';

const systemInfo = getWindowWidth();

export const rpx2px = rpx => Math.floor((systemInfo.windowWidth * rpx) / 750);
