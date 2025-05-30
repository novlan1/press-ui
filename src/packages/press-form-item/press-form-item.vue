<template>
  <div class="press-form-item">
    <div
      class="press-form-item__body"
      :style="bodyStyle"
      @click="clickHandler"
    >
      <!-- 微信小程序中，将一个参数设置空字符串，结果会变成字符串"true" -->
      <slot name="label">
        <!-- {{required}} -->
        <div
          v-if="required || leftIcon || label"
          class="press-form-item__body__left"
          :style="{
            width: addUnit(labelWidth || parentData.labelWidth),
            marginBottom: parentData.labelPosition === 'left' ? 0 : '5px',
          }"
        >
          <!-- 为了块对齐 -->
          <div class="press-form-item__body__left__content">
            <!-- nvue不支持伪元素before -->
            <span
              v-if="required"
              class="press-form-item__body__left__content__required"
            >
              *
            </span>
            <div
              v-if="leftIcon"
              class="press-form-item__body__left__content__icon"
            >
              <PressIconPlus
                :name="leftIcon"
                :custom-style="leftIconStyle"
              />
            </div>
            <span
              class="press-form-item__body__left__content__label"
              :style="[parentData.labelStyle, {
                justifyContent: parentData.labelAlign === 'left'
                  ? 'flex-start'
                  : parentData.labelAlign === 'center' ? 'center' : 'flex-end'
              }]"
            >
              {{ label }}
            </span>
          </div>
        </div>
      </slot>
      <div class="press-form-item__body__right">
        <div class="press-form-item__body__right__content">
          <div class="press-form-item__body__right__content__slot">
            <slot />
          </div>
          <div
            v-if="$slots.right"
            class="item__body__right__content__icon"
          >
            <slot name="right" />
          </div>
        </div>
      </div>
    </div>
    <slot name="error">
      <span
        v-if="!!message && parentData.errorType === 'message'"
        class="press-form-item__body__right__message"
        :style="{
          marginLeft: addUnit(parentData.labelPosition === 'top' ? 0 : (labelWidth || parentData.labelWidth))
        }"
      >
        {{ message }}
      </span>
    </slot>
    <div
      v-if="borderBottom"
      :style="lineStyle"
      class="press-form-item__line"
    />
  </div>
</template>

<script>
import { addUnit } from '../common/utils/add-unit';
import { getParentData } from '../common/utils/parent';
import { getProperty, setProperty } from '../common/utils/property';

import { style as styleUtil } from '../common/utils/style';
import { errorTip } from '../common/utils/validator';
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';

import props from './props.js';


export default {
  name: 'PressFormItem',
  components: {
    PressIconPlus,
  },
  mixins: [props],
  emits: [
    'click',
  ],
  data() {
    return {
      // 错误提示语
      message: '',
      parentData: {
        // 提示文本的位置
        labelPosition: 'left',
        // 提示文本对齐方式
        labelAlign: 'left',
        // 提示文本的样式
        labelStyle: {},
        // 提示文本的宽度
        labelWidth: 45,
        // 错误提示方式
        errorType: 'message',
      },
    };
  },
  // 组件创建完成时，将当前实例保存到press-form中
  computed: {
    propsLine() {
      return {
        color: '#d6d7d9',
        length: '100%',
        direction: 'row',
        hairline: true,
        margin: 0,
        dashed: false,
      };
    },
    bodyStyle() {
      return styleUtil([
        {
          flexDirection: (this.labelPosition || this.parentData.labelPosition) === 'left' ? 'row' : 'column',
        },
        this.customStyle,
      ]);
    },
    lineStyle() {
      const { message, parentData, propsLine } = this;
      return styleUtil({
        marginTop: message && parentData.errorType === 'message' ? '5px' : 0,
        color: message && parentData.errorType === 'border-bottom' ? '#fa3534' : propsLine.color,
      });
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 父组件的实例
      this.updateParentData();
      if (!this.parent) {
        errorTip('press-form-item需要结合press-form组件使用');
      }
    },
    // 获取父组件的参数
    updateParentData() {
      // 此方法写在mixin中
      getParentData.call(this, 'PressForm');
    },
    // 移除press-form-item的校验结果
    clearValidate() {
      this.message = null;
    },
    // 清空当前的组件的校验结果，并重置为初始值
    resetField() {
      // 找到原始值
      const value = getProperty(this.parent.originalModel, this.prop);
      // 将press-form的model的prop属性链还原原始值
      setProperty(this.parent.model, this.prop, value);
      // 移除校验结果
      this.message = null;
    },
    // 点击组件
    clickHandler() {
      this.$emit('click');
    },
    addUnit,
  },
};
</script>

<style lang="scss" scoped src="./css/index.scss">
</style>
