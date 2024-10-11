export const systemInfo = wx.getSystemInfoSync();

export const rpx2px = rpx => Math.floor((systemInfo.windowWidth * rpx) / 750);
