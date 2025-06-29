export class CountTo {
  constructor(options) {
    // 默认配置
    const defaultOptions = {
      startValue: 0,
      endValue: 0,
      duration: 2000,
      autoplay: true,
      decimals: 0,
      decimal: '.',
      separator: '',
      useEasing: true,
      easingFn: (t, b, c, d) => (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b,
      onChange: () => {},
      onEnd: () => {},
    };

    // 合并配置
    this.config = { ...defaultOptions, ...options };

    // 状态变量
    this.localStartVal = this.config.startValue;
    this.displayValue = this.formatNumber(this.config.startValue);
    this.printVal = null;
    this.paused = false;
    this.localDuration = Number(this.config.duration);
    this.startTime = null;
    this.timestamp = null;
    this.remaining = null;
    this.rAF = null;
    this.lastTime = 0;

    // 计算属性
    this.countDown = this.config.startValue > this.config.endValue;

    // 自动开始
    if (this.config.autoplay) {
      this.start();
    }
  }

  requestAnimationFrame(callback) {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - this.lastTime));
    const id = setTimeout(() => {
      callback(currTime + timeToCall);
    }, timeToCall);
    this.lastTime = currTime + timeToCall;
    return id;
  }

  cancelAnimationFrame(id) {
    clearTimeout(id);
  }

  // 开始滚动数字
  start(config) {
    if (config) {
      this.config = { ...this.config, ...(config || {}) };
    }
    this.countDown = this.config.startValue > this.config.endValue;

    this.localStartVal = this.config.startValue;
    this.startTime = null;
    this.localDuration = this.config.duration;
    this.paused = false;
    this.rAF = this.requestAnimationFrame(this.count.bind(this));
  }

  // 暂停/继续切换
  reStart() {
    if (this.paused) {
      this.resume();
      this.paused = false;
    } else {
      this.stop();
      this.paused = true;
    }
  }

  // 暂停
  stop() {
    this.cancelAnimationFrame(this.rAF);
  }

  // 继续(从暂停状态)
  resume() {
    if (!this.remaining) return;
    this.startTime = 0;
    this.localDuration = this.remaining;
    this.localStartVal = this.printVal;
    this.requestAnimationFrame(this.count.bind(this));
  }

  // 重置
  reset() {
    this.startTime = null;
    this.cancelAnimationFrame(this.rAF);
    this.displayValue = this.formatNumber(this.config.startValue);
    this.config.onChange?.(this.displayValue);
  }

  // 核心动画逻辑
  count(timestamp) {
    if (!this.startTime) this.startTime = timestamp;

    this.timestamp = timestamp;
    const progress = timestamp - this.startTime;
    this.remaining = this.localDuration - progress;

    if (this.config.useEasing) {
      if (this.countDown) {
        this.printVal = this.localStartVal - this.config.easingFn(
          progress,
          0,
          this.localStartVal - this.config.endValue,
          this.localDuration,
        );
      } else {
        this.printVal = this.config.easingFn(
          progress,
          this.localStartVal,
          this.config.endValue - this.localStartVal,
          this.localDuration,
        );
      }
    } else {
      if (this.countDown) {
        this.printVal = this.localStartVal
        - (this.localStartVal - this.config.endValue) * (progress / this.localDuration);
      } else {
        this.printVal = this.localStartVal
        + (this.config.endValue - this.localStartVal) * (progress / this.localDuration);
      }
    }

    // 边界检查
    if (this.countDown) {
      this.printVal = this.printVal < this.config.endValue ? this.config.endValue : this.printVal;
    } else {
      this.printVal = this.printVal > this.config.endValue ? this.config.endValue : this.printVal;
    }

    this.displayValue = this.formatNumber(this.printVal) || 0;
    this.config.onChange?.(this.displayValue);

    // 继续动画或结束
    if (progress < this.localDuration) {
      this.rAF = this.requestAnimationFrame(this.count.bind(this));
    } else {
      this.config.onEnd?.();
    }
  }

  // 格式化数字
  formatNumber(num) {
    num = Number(num);
    num = num.toFixed(Number(this.config.decimals));
    num += '';
    const x = num.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? this.config.decimal + x[1] : '';

    const rgx = /(\d+)(\d{3})/;
    if (this.config.separator && !this.isNumber(this.config.separator)) {
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, `$1${this.config.separator}$2`);
      }
    }
    return x1 + x2;
  }

  // 判断是否为数字
  isNumber(val) {
    return !isNaN(parseFloat(val));
  }

  // 销毁清理
  destroy() {
    this.cancelAnimationFrame(this.rAF);
  }
}
