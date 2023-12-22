import { fileToUrl, revokeObjectURL } from '../utils/file';
import innerCreateInput from './create_input';


let videoInput = null;

export function chooseVideo({
  sourceType,
  extension,
  success,
}) {
  if (videoInput) {
    document.body.removeChild(videoInput);
    videoInput = null;
  }

  videoInput = innerCreateInput({
    sourceType,
    extension,
    type: 'video',
  });
  document.body.appendChild(videoInput);

  videoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const callbackResult = {
      errMsg: 'chooseVideo:ok',
      tempFile: file,
      size: file.size,
      duration: 0,
      width: 0,
      height: 0,
      name: file.name,
    };
    let filePath;
    Object.defineProperty(callbackResult, 'tempFilePath', {
      get() {
        filePath = filePath || fileToUrl(this.tempFile);
        return filePath;
      },
    });

    const video = document.createElement('video');
    if (video.onloadedmetadata !== undefined) {
      const filePath = fileToUrl(file);
      // 尝试获取视频的宽高信息
      video.onloadedmetadata = function () {
        revokeObjectURL(filePath);
        success(Object.assign(callbackResult, {
          duration: video.duration || 0,
          width: video.videoWidth || 0,
          height: video.videoHeight || 0,
        }));
      };
      // 部分浏览器（如微信内置浏览器）未播放无法触发loadedmetadata事件
      setTimeout(() => {
        video.onloadedmetadata = null;
        revokeObjectURL(filePath);
        success(callbackResult);
      }, 300);
      video.src = filePath;
    } else {
      success(callbackResult);
    }
  });

  videoInput.click();
}
