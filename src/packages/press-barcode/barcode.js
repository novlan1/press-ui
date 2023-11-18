
import jsBarcode from 't-comm/barcode';
let barcode = {};


(function () {
  // 初始化
  barcode = function (cont, ctxid, options, ctxsize, result) {
    const ops = {};
    const globaCtxid = ctxid;
    const cbCanvasSize = ctxsize;
    const cbResult = result;
    const newOptions = Object.assign(ops, options);

    // 修成margin
    fixMargin(newOptions);
    // 处理options 数据
    if (newOptions.text == '' || cont == '') {
      return false;
    }

    // 获取ctx
    const globaContext = cont;
    const ctx = uni.createCanvasContext(globaCtxid, globaContext);
    console.log(ctx.measureText());
    // 获取编码数据
    const encodings = new jsBarcode[newOptions.format.toUpperCase()](newOptions.text, newOptions).encode();
    const fixencodings = fixEncodings(encodings, newOptions);
    // 返回canvas实际大小
    cbCanvasSize({ width: fixencodings.width, height: fixencodings.height });
    // 绘制canvas
    setTimeout(() => {
      drawCanvas.render(newOptions, fixencodings);
    }, 10);
    // 绘制canvas
    const drawCanvas = {
      render(options, encoding) {
        this.prepare(options, encoding);
        encoding.encodings.forEach((v, _i) => {
          this.barcode(options, v);
          this.text(options, v);
          this.move(v);
        });
        this.draw(options, encoding);
      },
      barcode(options, encoding) {
        const binary = encoding.data;
        let yFrom;
        if (options.textPosition == 'top') {
          yFrom = options.marginTop + options.fontSize + options.textMargin;
        } else {
          yFrom = options.marginTop;
        }
        // 绘制条码
        ctx.fillStyle = options.lineColor;
        for (let b = 0; b < binary.length; b++) {
          const x = b * options.width + encoding.barcodePadding;
          let { height } = options;
          if (encoding.options) {
            if (encoding.options.height != undefined) {
              height = encoding.options.height;
            }
          }
          if (binary[b] === '1') {
            ctx.fillRect(x, yFrom, options.width, height);
          } else if (binary[b]) {
            ctx.fillRect(x, yFrom, options.width, height * binary[b]);
          }
        }
      },
      text(options, encoding) {
        if (options.displayValue) {
          let x; let y; let align; let size;
          if (options.textPosition == 'top') {
            y = options.marginTop + options.fontSize;
          } else {
            y = options.height + options.textMargin + options.marginTop + options.fontSize;
          }
          if (encoding.options) {
            if (encoding.options.textAlign != undefined) {
              align = encoding.options.textAlign;
            }
            if (encoding.options.fontSize != undefined) {
              size = encoding.options.fontSize;
            }
          } else {
            align = options.textAlign;
            size = options.fontSize;
          }
          ctx.setFontSize(size);
          if (align == 'left' || encoding.barcodePadding > 0) {
            x = 0;
            ctx.setTextAlign('left');
          } else if (align == 'right') {
            x = encoding.width - 1;
            ctx.setTextAlign('right');
          } else {
            x = encoding.width / 2;
            ctx.setTextAlign('center');
          }
          ctx.fillStyle = options.fontColor;
          if (encoding.text != undefined) {
            ctx.fillText(encoding.text, x, y);
          }
        }
      },
      move(encoding) {
        ctx.translate(encoding.width, 0);
      },
      prepare(options, encoding) {
        // 绘制背景
        if (options.background) {
          ctx.fillStyle = options.background;
          ctx.fillRect(0, 0, encoding.width, encoding.height);
        }
        ctx.translate(options.marginLeft, 0);
      },
      draw(options, encoding) {
        ctx.draw(false, () => {
          this.toImgs(options, encoding);
        });
      },
      toImgs(options, encoding) {
        setTimeout(() => {
          uni.canvasToTempFilePath({
            width: encoding.width,
            height: encoding.height,
            // destWidth: encoding.width,
            // destHeight: encoding.height,
            canvasId: globaCtxid,
            fileType: 'png',
            success(res) {
              cbResult(res.tempFilePath);
            },
            fail(res) {
              cbResult(res);
            },
            complete() {
              uni.hideLoading();
            },
          }, globaContext);
        }, options.text.length + 100);
      },
    };
    // 混入canvas数据
    function fixEncodings(encoding, options) {
      let encodingArr = []; let width = options.marginLeft + options.marginRight; let height;
      if (!Array.isArray(encoding)) {
        encodingArr[0] = JSON.parse(JSON.stringify(encoding));
      } else {
        encodingArr = [...encoding];
      }
      encodingArr.forEach((v, i) => {
        // 获取文本宽度
        const textWidth = ctx.measureText(encodingArr[i].text ? encodingArr[i].text : '').width;
        // 获取条形码宽度
        const barcodeWidth = encodingArr[i].data.length * options.width;
        // 获取内边距
        let barcodePadding = 0;
        if (options.displayValue && barcodeWidth < textWidth) {
          if (options.textAlign == 'center') {
            barcodePadding = Math.floor((textWidth - barcodeWidth) / 2);
          } else if (options.textAlign == 'left') {
            barcodePadding = 0;
          } else if (options.textAlign == 'right') {
            barcodePadding = Math.floor(textWidth - barcodeWidth);
          }
        }
        // 混入encodingArr[i]
        encodingArr[i].barcodePadding = barcodePadding;
        encodingArr[i].width = Math.ceil(Math.max(textWidth, barcodeWidth));
        width += encodingArr[i].width;
        if (encodingArr[i].options) {
          if (encodingArr[i].options.height != undefined) {
            encodingArr[i].height = encodingArr[i].options.height + (options.displayValue && (encodingArr[i].text ? encodingArr[i].text : '').length > 0 ? options.fontSize + options.textMargin : 0) + options.marginTop + options.marginBottom;
          } else {
            height = options.height + (options.displayValue && (encodingArr[i].text ? encodingArr[i].text : '').length > 0 ? options.fontSize + options.textMargin : 0) + options.marginTop + options.marginBottom;
            encodingArr[i].height = height;
          }
        } else {
          height = options.height + (options.displayValue && (encodingArr[i].text ? encodingArr[i].text : '').length > 0 ? options.fontSize + options.textMargin : 0) + options.marginTop + options.marginBottom;
          encodingArr[i].height = height;
        }
      });
      return { encodings: encodingArr, width, height };
    }
    // 修正Margin
    function fixMargin(options) {
      options.marginTop = options.marginTop == undefined ? options.margin : options.marginTop;
      options.marginBottom = options.marginBottom == undefined ? options.margin : options.marginBottom;
      options.marginRight = options.marginRight == undefined ? options.margin : options.marginRight;
      options.marginLeft = options.marginLeft == undefined ? options.margin : options.marginLeft;
    }
  };
}());

export default barcode;
