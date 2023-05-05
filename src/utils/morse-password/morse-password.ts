class MorsePwd {
  /**
   * 初始化
   * @static
   * @param {Object} options 选项
   * @param {Array<number>} options.pwd 密码
   * @param {Function} options.cb 成功回调
   * @param {Boolean} options.quiet 是否安静模式（不打印日志）
   * @param {number} options.holdTime 等待多久后就恢复原位
   * @param {'H5' | 'h5' | 'mp' | 'MP'} options.envType 环境类型
   * @param {String} options.selector h5模式下的选择器
   *
   * @example <caption>小程序环境</caption>
   * <template>
   *   <div
   *     class="tip-match-header"
   *     /@longpress="onLongPressWrap"
   *     /@click.stop="onClickWrap"
   *   >
   * </template>
   *
   * <script>
   * export default {
   *   data() {
   *     return {
   *       morsePwd: null,
   *     };
   *   },
   *   mounted() {
   *     this.morsePwd = MorsePwd.init({
   *       pwd: [1, 1, 1, 2, 2, 2, 1, 1, 1],
   *       cb: () => {
   *         console.log('===');
   *         this.showToast('hhh');
   *       },
   *       envType: 'MP',
   *     });
   *   },
   *   beforeDestroy() {
   *     this.morsePwd.clear();
   *   },
   *   methods: {
   *     onLongPressWrap() {
   *       this.morsePwd.longPress();
   *     },
   *     onClickWrap() {
   *       this.morsePwd.click();
   *     },
   *   }
   * }
   * </script>
   * @example <caption>H5环境</caption>
   * <script>
   * export default {
   *   data() {
   *     return {
   *       morsePwd: null,
   *     };
   *   },
   *   mounted() {
   *     this.morsePwd = MorsePwd.init({
   *       pwd: [1, 1, 1, 2, 2, 2, 1, 1, 1],
   *       cb: () => {
   *         this.showToast('xxx');
   *       },
   *       selector: '#app',
   *       envType: 'H5',
   *     });
   *   },
   *   beforeDestroy() {
   *     this.morsePwd.clear();
   *   },
   * }
   * </script>
   *
   * @returns {Object} MorsePwd实例
   */
  static init(options) {
    return new MorsePwd(options);
  }

  pwd;
  cb;
  holdTime;
  quiet;
  selector;
  envType;

  clickCode;
  longPressCode;

  curIdx;
  holdTimer;
  h5Dom;

  longPressTimer;
  isLongTouch;

  /**
   * 摩斯密码初始化
   * @constructor
   * @param {Object} options 选项
   * @param {Array<number>} options.pwd 密码
   * @param {Function} options.cb 成功回调
   * @param {Boolean} options.quiet 是否安静模式（不打印日志）
   * @param {number} options.holdTime 等待多久后就恢复原位
   * @param {'H5' | 'h5' | 'mp' | 'MP'} options.envType 环境类型
   * @param {String} options.selector h5模式下的选择器
   */
  constructor(options) {
    const DEFAULT_CODE_MAP = {
      CLICK: 1,
      LONG_PRESS: 2,
    };
    const { pwd, cb, quiet = false, holdTime = 5000, envType = '', selector } = options;
    this.pwd = pwd || [];
    this.cb = cb;
    this.holdTime = holdTime;
    this.quiet = quiet;
    this.selector = selector;
    this.envType = envType;

    this.clickCode = DEFAULT_CODE_MAP.CLICK;
    this.longPressCode = DEFAULT_CODE_MAP.LONG_PRESS;

    this.curIdx = 0;
    this.holdTimer = null;
    this.h5Dom = null;

    this.longPressTimer = null;
    this.isLongTouch = false;

    if (this.envType === 'H5') {
      this.bindEvent();
    }
  }

  bindEvent() {
    if (!this.selector) return;
    this.h5Dom = document.querySelector(this.selector);
    if (!this.h5Dom) return;

    this.h5Dom.addEventListener('touchstart', this.onTouchStart.bind(this));
    this.h5Dom.addEventListener('touchend', this.onTouchEnd.bind(this));
    this.h5Dom.addEventListener('touchmove', this.onTouchMove.bind(this));
  }

  onTouchStart() {
    clearTimeout(this.longPressTimer);
    this.longPressTimer = setTimeout(() => {
      // 处理长按事件
      this.log('longPress');
      this.isLongTouch = true;
      this.longPress();
    }, 350);
  }

  onTouchEnd() {
    clearTimeout(this.longPressTimer);
    if (this.isLongTouch) {
      // 重置标志位
      this.isLongTouch = false;
    } else {
      // 处理点击事件
      this.log('click');
      this.click();
    }
  }

  onTouchMove() {
    clearTimeout(this.longPressTimer);
  }

  /**
   * 清除监听事件
   * @example
   * beforeDestroy() {
   *   this.morsePwd.clear();
   * }
   */
  clear() {
    if (!this.h5Dom) return;
    this.h5Dom.removeEventListener('touchstart', this.onTouchStart.bind(this));
    this.h5Dom.removeEventListener('touchend', this.onTouchEnd.bind(this));
    this.h5Dom.removeEventListener('touchmove', this.onTouchMove.bind(this));
  }

  operation(type) {
    this.log(`type: ${type}, curIdx: ${this.curIdx}, pwd: ${this.pwd}`);

    clearTimeout(this.holdTimer);
    if (this.pwd[this.curIdx] === type) {
      this.curIdx += 1;
      if (this.curIdx === this.pwd.length) {
        this.suc();
      } else {
        clearTimeout(this.holdTimer);
        this.holdTimer = setTimeout(() => {
          this.reset();
        }, this.holdTime);
      }
    } else {
      this.reset();
    }
  }

  reset() {
    this.curIdx = 0;
  }

  click() {
    this.operation(this.clickCode);
  }

  suc() {
    if (typeof this.cb === 'function') {
      this.cb();
      this.reset();
    }
  }
  longPress() {
    this.operation(this.longPressCode);
  }

  log(...args) {
    if (this.quiet) return;
    console.log(...args);
  }
}

export { MorsePwd };
