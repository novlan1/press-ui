<template>
  <div class="press-code-input">
    <div
      v-for="(item, index) in codeLength"
      :key="index"
      class="press-code-input__item"
      :style="[itemStyle(index)]"
    >
      <div
        v-if="dot && codeArray.length > index"
        class="press-code-input__item__dot"
      />
      <span
        v-else
        :style="{
          fontSize: addUnit(fontSize),
          fontWeight: bold ? 'bold' : 'normal',
          color: color
        }"
      >
        {{ codeArray[index] || '' }}
      </span>
      <div
        v-if="mode === 'line'"
        class="press-code-input__item__line"
        :style="[lineStyle]"
      />
      <!-- #ifndef APP-PLUS -->
      <div
        v-if="isFocus && codeArray.length === index"
        :style="{backgroundColor: color}"
        class="press-code-input__item__cursor"
      />
      <!-- #endif -->
    </div>
    <input
      :disabled="disabledKeyboard"
      type="number"
      :focus="focus"
      :value="inputValue"
      :maxlength="maxLength"
      :adjustPosition="adjustPosition"
      class="press-code-input__input"
      :style="{
        height: addUnit(size)
      }"
      @input="inputHandler"
      @focus="isFocus = true"
      @blur="isFocus = false"
    >
  </div>
</template>

<script>
import { addUnit } from '../common/utils/add-unit';
import props, { getPx } from './computed';


export default {
  name: 'PressCodeInput',
  mixins: [props],
  emits: [
    'change',
    'finish',
    'input',
  ],
  data() {
    return {
      inputValue: '',
      isFocus: this.focus,
    };
  },
  computed: {
    // 根据长度，循环输入框的个数，因为头条小程序数值不能用于v-for
    codeLength() {
      const res = new Array(Number(this.maxLength));

      return res;
    },
    // 循环item的样式
    itemStyle() {
      return (index) => {
        const style = {
          width: addUnit(this.size),
          height: addUnit(this.size),
        };
        // 盒子模式下，需要额外进行处理
        if (this.mode === 'box') {
          // 设置盒子的边框，如果是细边框，则设置为0.5px宽度
          style.border = `${this.hairline ? 0.5 : 1}px solid ${this.borderColor}`;
          // 如果盒子间距为0的话
          if (getPx(this.space) === 0) {
            // 给第一和最后一个盒子设置圆角
            if (index === 0) {
              style.borderTopLeftRadius = '3px';
              style.borderBottomLeftRadius = '3px';
            }
            if (index === this.codeLength.length - 1) {
              style.borderTopRightRadius = '3px';
              style.borderBottomRightRadius = '3px';
            }
            // 最后一个盒子的右边框需要保留
            if (index !== this.codeLength.length - 1) {
              style.borderRight = 'none';
            }
          }
        }
        if (index !== this.codeLength.length - 1) {
          // 设置验证码字符之间的距离，通过margin-right设置，最后一个字符，无需右边框
          style.marginRight = addUnit(this.space);
        } else {
          // 最后一个盒子的有边框需要保留
          style.marginRight = 0;
        }

        return style;
      };
    },
    // 将输入的值，转为数组，给item历遍时，根据当前的索引显示数组的元素
    codeArray() {
      return String(this.inputValue).split('');
    },
    // 下划线模式下，横线的样式
    lineStyle() {
      const style = {};
      style.height = this.hairline ? '2px' : '4px';
      style.width = addUnit(this.size);
      // 线条模式下，背景色即为边框颜色
      style.backgroundColor = this.borderColor;
      return style;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        // 转为字符串，超出部分截掉
        this.inputValue = String(val).substring(0, this.maxLength) || '';
      },
    },
  },
  methods: {
    addUnit,
    // 监听输入框的值发生变化
    inputHandler(e) {
      const { value } = e.detail;
      this.inputValue = value;
      // 是否允许输入“.”符号
      if (this.disabledDot) {
        this.$nextTick(() => {
          this.inputValue = value.replace('.', '');
        });
      }
      // 未达到maxLength之前，发送change事件，达到后发送finish事件
      this.$emit('change', value);
      // 修改通过v-model双向绑定的值
      this.$emit('input', value);
      // 达到用户指定输入长度时，发出完成事件
      if (String(value).length >= Number(this.maxLength)) {
        this.$emit('finish', value);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$press-code-input-cursor-width: 1px;
$press-code-input-cursor-height: 40%;
$press-code-input-cursor-animation-duration: 1s;
$press-code-input-cursor-animation-name: press-cursor-flicker;

.press-code-input {
  display: flex;
  position: relative;
  overflow: hidden;

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &__text {
      font-size: 15px;
      color: #606266;
    }

    &__dot {
      width: 7px;
      height: 7px;
      border-radius: 100px;
      background-color: #606266;
    }

    &__line {
      position: absolute;
      bottom: 0;
      height: 4px;
      border-radius: 100px;
      width: 40px;
      background-color: #606266;
    }
    /* #ifndef APP-PLUS */
    &__cursor {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: $press-code-input-cursor-width;
      height: $press-code-input-cursor-height;
      animation: $press-code-input-cursor-animation-duration
        press-cursor-flicker infinite;
    }
    /* #endif */
  }

  &__input {
    // 之所以需要input输入框，是因为有它才能唤起键盘
    // 这里将它设置为两倍的屏幕宽度，再将左边的一半移出屏幕，为了不让用户看到输入的内容
    position: absolute;
    left: -750rpx;
    width: 1500rpx;
    top: 0;
    background-color: transparent;
    text-align: left;
  }
}

/* #ifndef APP-PLUS */
@keyframes press-cursor-flicker {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
/* #endif */
</style>
