import { watchChange } from './choose-common';
import innerCreateInput from './create_input';


let imageInput = null;

export function chooseImage({
  count,
  sourceType,
  extension,
  success,
}) {
  if (imageInput) {
    document.body.removeChild(imageInput);
    imageInput = null;
  }

  imageInput = innerCreateInput({
    count,
    sourceType,
    extension,
    type: 'image',
  });
  document.body.appendChild(imageInput);
  imageInput.addEventListener('change', (event) => {
    const tempFiles = watchChange(event, count);

    const res = {
      errMsg: 'chooseImage:ok',
      get tempFilePaths() {
        return tempFiles.map(({ path }) => path);
      },
      tempFiles,
    };
    success(res);
  });

  imageInput.click();
}
