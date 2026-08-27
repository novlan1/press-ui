
import jsBarcode from 't-comm/barcode';

let barcode = {};


(function () {
  // 初始化
  barcode = function (cont, ctxid, options, ctxsize, result, error) {
    const ops = {};
    const globaCtxid = ctxid;
    const cbCanvasSize = ctxsize;
    const cbResult = result;
    const cbError = error;
    const newOptions = Object.assign(ops, options);

    // 修成margin
    fixMargin(newOptions);
    // 处理options 数据
    if (newOptions.text == '' || !cont) {
      return false;
    }

    // 校验字符集：CODE128 / CODE39 / EAN / UPC 等一维码规范上只支持 ASCII，
    // 传入中文等非 ASCII 字符时，编码器会抛
    // 「RangeError: The encoding does not start with a start character」
    // 该异常会中断整个绘制流程，且旧代码没有捕获，页面只能看到一条控制台报错。
    // 这里提前拦截并通过 error 回调告知调用方，避免未捕获异常。
    // eslint-disable-next-line no-control-regex
    if (/[^\x00-\x7F]/.test(String(newOptions.text))) {
      const message = `[press-barcode] ${newOptions.format} 只支持 ASCII 字符，无法编码「${newOptions.text}」`;
      console.warn(message);
      if (typeof cbError === 'function') {
        cbError({ type: 'INVALID_CHARACTER', message, text: newOptions.text });
      }
      // 这里不重置 canvas 尺寸：置 0 会让下一次成功绘制落回零尺寸画布的竞态。
      // 是否展示由组件的 errorMessage 控制。
      return false;
    }

    // 获取ctx
    const globaContext = cont;
    // 这个 ctx 仅用于 fixEncodings 里的 measureText 量文字宽度，
    // 此时 canvas 在视图层的宽高还是初始的 0x0。
    const measureCtx = uni.createCanvasContext(globaCtxid, globaContext);
    // 注意：此处原有一行 `console.log(ctx.measureText())` 调试代码，
    // measureText 缺少必填的 text 参数，在 APP 端会直接抛错并中断后续绘制，
    // 导致条形码完全不显示。已移除，请勿加回。
    // 获取编码数据
    // 用 try/catch 兜住编码器可能抛出的各种校验异常（长度、校验位、字符集等），
    // 否则异常会冒泡成未捕获错误，后续绘制全部中断。
    let encodings;
    try {
      encodings = new jsBarcode[newOptions.format.toUpperCase()](newOptions.text, newOptions).encode();
    } catch (err) {
      const message = `[press-barcode] 编码失败（format=${newOptions.format}, text=${newOptions.text}）`;
      console.warn(message, err);
      if (typeof cbError === 'function') {
        cbError({ type: 'ENCODE_ERROR', message, text: newOptions.text, error: err });
      }
      return false;
    }
    const fixencodings = fixEncodings(encodings, newOptions);
    // 返回canvas实际大小
    cbCanvasSize({ width: fixencodings.width, height: fixencodings.height });

    // 绘制canvas
    // canvas 宽高由上面 cbCanvasSize 通过响应式数据写入 style，
    // 而 measureCtx 是在宽高还为 0 时创建的，用它绘制会画进零尺寸画布 ——
    // 这正是「首次进页面不显示，删掉重新输入才显示」的原因：
    // 首次 mounted 时 canvas 尺寸为 0，第二次 watch 触发时尺寸已经有了。
    //
    // 固定延时（如 50ms）在真机上并不可靠：首次渲染还要等 webview 布局，
    // 时间不确定。这里改为**轮询查询 canvas 的真实尺寸**，
    // 确认已经不是 0 之后才创建 ctx 绘制。
    //
    // 注意：drawCanvas 的各方法都通过参数接收 ctx，不依赖闭包变量，
    // 否则重建的 ctx 与闭包引用的 ctx 会不一致，导致绘制失效。
    const doRender = () => {
      const ctx = uni.createCanvasContext(globaCtxid, globaContext);
      drawCanvas.render(ctx, newOptions, fixencodings);
    };

    const MAX_TRY = 20;
    const RETRY_DELAY = 30;

    const waitCanvasReady = (tried = 0) => {
      // 查询不到尺寸信息时（如某些平台不支持），兜底直接绘制
      if (tried >= MAX_TRY) {
        console.warn('[press-barcode] 等待 canvas 尺寸超时，仍尝试绘制');
        doRender();
        return;
      }

      uni.createSelectorQuery()
        .in(cont)
        .select(`#${globaCtxid}`)
        .boundingClientRect((rect) => {
          if (rect && rect.width > 0 && rect.height > 0) {
            doRender();
          } else {
            setTimeout(() => waitCanvasReady(tried + 1), RETRY_DELAY);
          }
        })
        .exec();
    };

    if (cont.$nextTick) {
      cont.$nextTick(() => waitCanvasReady());
    } else {
      setTimeout(() => waitCanvasReady(), 0);
    }
    // 绘制canvas
    const drawCanvas = {
      render(ctx, options, encoding) {
        this.prepare(ctx, options, encoding);
        encoding.encodings.forEach((v, _i) => {
          this.barcode(ctx, options, v);
          this.text(ctx, options, v);
          this.move(ctx, v);
        });
        this.draw(ctx, options, encoding);
      },
      barcode(ctx, options, encoding) {
        const binary = encoding.data;
        let yFrom;
        if (options.textPosition == 'top') {
          yFrom = options.marginTop + options.fontSize + options.textMargin;
        } else {
          yFrom = options.marginTop;
        }
        // 绘制条码
        // 用 setFillStyle 而非 ctx.fillStyle = xxx：
        // uni.createCanvasContext 返回的旧版 CanvasContext 只认方法写法，
        // 属性赋值不生效会导致填充色为透明，条码画不出来
        ctx.setFillStyle(options.lineColor);
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
      text(ctx, options, encoding) {
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
          ctx.setFillStyle(options.fontColor);
          if (encoding.text != undefined) {
            ctx.fillText(encoding.text, x, y);
          }
        }
      },
      move(ctx, encoding) {
        ctx.translate(encoding.width, 0);
      },
      prepare(ctx, options, encoding) {
        // 绘制背景
        if (options.background) {
          ctx.setFillStyle(options.background);
          ctx.fillRect(0, 0, encoding.width, encoding.height);
        }
        ctx.translate(options.marginLeft, 0);
      },
      draw(ctx, options, encoding) {
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
              // 原先这里直接 cbResult(res)，把错误对象当成图片路径塞给 <image :src>，
              // 会导致已经画好的条码被一个非法 src 覆盖（表现为「闪一下就没了」）。
              // 失败时保持原有结果不变，仅打日志。
              console.warn('[press-barcode] canvasToTempFilePath 失败', res);
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
        const textWidth = measureCtx.measureText(encodingArr[i].text ? encodingArr[i].text : '').width;
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
