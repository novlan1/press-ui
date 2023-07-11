const http = require('http');
const path = require('path');
const fs = require('fs');

function postFile(fileDataInfo, fileKeyValue, options) {
  return new Promise(((resolve, reject) => {
    if (!options) {
      const dot = '.';
      options = {
        host: `9${dot}134${dot}54${dot}128`,	// 腾讯云服务器
        // host: `127${dot}0${dot}0${dot}1`, // 本地调试
        port: '3005',
        method: 'POST',
        path: '/web-publish/publish',
      };
    }

    const req = http.request(options, (res) => {
      // console.log("RES:" + res);
      // console.log('STATUS: ' + res.statusCode);
      // console.log('HEADERS: ' + JSON.stringify(res.headers));
      // res.setEncoding("utf8");
      res.on('data', (chunk) => {
        // console.log("BODY:" + chunk);
        const result = JSON.parse(chunk);
        console.log(result);
        resolve(result);
      });
    });
    req.on('error', (e) => {
      console.log(`problem with request:${e.message}`);
      reject(e);
    });

    const boundaryKey = Math.random().toString(16);
    const endData = `\r\n----${boundaryKey}--`;

    let dataLength = 0;
    // eslint-disable-next-line no-array-constructor
    const dataArr = [];
    for (const item of fileDataInfo) {
      const dataInfo = `\r\n----${boundaryKey}\r\n` + `Content-Disposition: form-data; name="${item.urlKey}"\r\n\r\n${item.urlValue}`;
      const dataBinary = Buffer.from(dataInfo, 'utf-8');
      dataLength += dataBinary.length;
      dataArr.push({
        dataInfo,
      });
    }

    // eslint-disable-next-line no-array-constructor
    const files = [];
    for (const item of fileKeyValue) {
      const content = `\r\n----${boundaryKey}\r\n` + 'Content-Type: application/octet-stream\r\n' + `Content-Disposition: form-data; name="${item.urlKey}"; filename="${path.basename(item.urlValue)}"\r\n` + 'Content-Transfer-Encoding: binary\r\n\r\n';
      const contentBinary = Buffer.from(content, 'utf-8'); // 当编码为ascii时，中文会乱码。
      files.push({
        contentBinary,
        filePath: item.urlValue,
      });
    }
    let contentLength = 0;
    for (const item of files) {
      const { filePath } = item;
      if (fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath);
        contentLength += stat.size;
      } else {
        contentLength += Buffer.from('\r\n', 'utf-8').length;
      }
      contentLength += item.contentBinary.length;
    }

    req.setHeader('Content-Type', `multipart/form-data; boundary=--${boundaryKey}`);
    req.setHeader('Content-Length', dataLength + contentLength + Buffer.byteLength(endData));

    // 将参数发出
    for (const item of dataArr) {
      req.write(item.dataInfo);
    }

    let fileIndex = 0;
    const doOneFile = function () {
      req.write(files[fileIndex].contentBinary);
      const currentFilePath = files[fileIndex].filePath;
      if (fs.existsSync(currentFilePath)) {
        const fileStream = fs.createReadStream(currentFilePath, { bufferSize: 4 * 1024 });
        fileStream.pipe(req, { end: false });
        fileStream.on('end', () => {
          fileIndex += 1;
          if (fileIndex === files.length) {
            req.end(endData);
          } else {
            doOneFile();
          }
        });
      } else {
        req.write('\r\n');
        fileIndex += 1;
        if (fileIndex === files.length) {
          req.end(endData);
        } else {
          doOneFile();
        }
      }
    };
    if (fileIndex === files.length) {
      req.end(endData);
    } else {
      doOneFile();
    }
  }));
}

module.exports = postFile;
