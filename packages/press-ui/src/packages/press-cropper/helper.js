export function chooseImageInH5() {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.style.visibility = 'hidden';
    input.type = 'file'; // 添加file类型
    input.accept = 'image/*';
    input.style.height = '100%';
    input.style.width = '100%';
    input.id = 'inputfile';
    document.body.appendChild(input);

    input.onchange = (event) => {
      const file = event.target.files[0];

      onSelectFile(file, input).then((res) => {
        resolve(res);
      });
    };

    input.click();
  });
}


function onSelectFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      let data;

      if (typeof e.target.result === 'object') {
        // 把 Array Buffer 转化为 blob 如果是 base64不需要
        data = window.URL.createObjectURL(new Blob([e.target.result]));
      } else {
        data = e.target.result;
      }

      resolve(data);
    };
    // 转化为 base64
    // reader.readAsDataURL(file)
    // 转化为 blob
    reader.readAsArrayBuffer(file);
  });
}
