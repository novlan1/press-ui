import { fileToUrl } from '../utils/file';

export function watchChange(event, count) {
  const tempFiles = [];
  const fileCount = event.target.files.length;

  for (let i = 0; i < fileCount; i++) {
    const file = event.target.files[i];
    let filePath;

    Object.defineProperty(file, 'path', {
      get() {
        filePath = filePath || fileToUrl(file);
        return filePath;
      },
    });
    if (i < count) tempFiles.push(file);
  }

  return tempFiles;
}
