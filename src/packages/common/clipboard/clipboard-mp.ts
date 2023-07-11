/**
 * 复制到剪切板
 * @param text 待复制的文本
 */
export const clipboardMp = function (text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (wx) {
      wx.setClipboardData({
        data: `${text}`,
        success: () => {
          resolve();
        },
        fail: (error) => {
          console.log(error);
          reject();
        },
      });
    } else {
      reject();
    }
  });
};

