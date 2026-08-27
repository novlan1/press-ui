import { watchChange } from './choose-common';
import innerCreateInput from './create_input';

let fileInput = null;

export function chooseFile({
  count,
  sourceType,
  type,
  extension,
  success,
}) {
  if (fileInput) {
    document.body.removeChild(fileInput);
    fileInput = null;
  }

  fileInput = innerCreateInput({
    count,
    sourceType,
    type,
    extension,
  });
  document.body.appendChild(fileInput);

  fileInput.addEventListener('change', (event) => {
    const tempFiles = watchChange(event, count);

    const res = {
      errMsg: 'chooseFile:ok',
      get tempFilePaths() {
        return tempFiles.map(({ path }) => path);
      },
      tempFiles,
    };
    success(res);
  });

  fileInput.click();
}
