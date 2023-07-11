/**
 * 复制到剪切板
 * @param text 待复制的文本
 */
export const clipboardWeb = function (text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const pasteText = document.getElementById('#clipboard');
    pasteText?.remove();
    const textarea = document.createElement('textarea');
    textarea.id = '#clipboard';
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.zIndex = '-9999';
    document.body.appendChild(textarea);
    textarea.value = `${text}`;
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    const result = document.execCommand('Copy', false);
    textarea.blur();
    if (result) {
      resolve();
    } else {
      reject();
    }
  });
};

