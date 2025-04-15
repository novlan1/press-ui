<template>
  <div class="press-form">
    <slot />
  </div>
</template>

<script>
import props from './props.js';
import Schema from '../common/async-validator/index';
import { errorTip } from '../common/utils/validator';
import { getProperty, setProperty } from '../common/utils/property';
import { deepClone } from '../common/utils/deep-clone';
import { nextTick } from '../common/utils/system';


// 去除警告信息
Schema.warning = function () {};


export default {
  name: 'PressForm',
  mixins: [props],
  provide() {
    return {
      uForm: this,
    };
  },
  data() {
    return {
      formRules: {},
      // 规则校验器
      validator: {},
      // 原始的 model 快照，用于 resetFields 方法重置表单时使用
      originalModel: null,
    };
  },
  computed: {
    propsChange() {
      return [
        this.errorType,
        this.borderBottom,
        this.labelPosition,
        this.labelWidth,
        this.labelAlign,
        this.labelStyle,
      ];
    },
  },
  watch: {
    // 监听规则的变化
    rules: {
      immediate: true,
      handler(n) {
        this.setRules(n);
      },
    },
    // 监听属性的变化，通知子组件 press-form-item 重新获取信息
    propsChange() {
      if (this.children?.length) {
        this.children.map((child) => {
          // 判断子组件(press-form-item)如果有 updateParentData 方法的话，就就执行(执行的结果是子组件重新从父组件拉取了最新的值)
          typeof child.updateParentData === 'function'
              && child.updateParentData();
        });
      }
    },
    // 监听 model 的初始值作为重置表单的快照
    model: {
      immediate: true,
      deep: true,
      handler(n) {
        if (!this.originalModel) {
          this.originalModel = deepClone(n);
        }
      },
    },
  },
  created() {
    // 存储当前form下的所有press-form-item的实例
    // 不能定义在data中，否则微信小程序会造成循环引用而报错
    this.children = [];
  },
  methods: {
    // 手动设置校验的规则，如果规则中有函数的话，微信小程序中会过滤掉，所以只能手动调用设置规则
    setRules(rules) {
      // 判断是否有规则
      if (Object.keys(rules).length === 0) return;
      if (process.env.NODE_ENV === 'development' && Object.keys(this.model).length === 0) {
        errorTip('设置rules，model必须设置！如果已经设置，请刷新页面。');
        return;
      }
      this.formRules = rules;
      // 重新将规则赋予Validator
      this.validator = new Schema(rules);

      console.log('validator', this.validator);
    },
    // 清空所有press-form-item组件的内容，本质上是调用了press-form-item组件中的resetField()方法
    resetFields() {
      this.resetModel();
    },
    // 重置model为初始值的快照
    resetModel() {
      // 历遍所有press-form-item，根据其prop属性，还原model的原始快照
      this.children.map((child) => {
        const prop = child?.prop;
        const value = getProperty(this.originalModel, prop);
        setProperty(this.model, prop, value);
      });
    },
    // 清空校验结果
    clearValidate(props) {
      props = [].concat(props);
      this.children.map((child) => {
        // 如果press-form-item的prop在props数组中，则清除对应的校验结果信息
        if (props[0] === undefined || props.includes(child.prop)) {
          child.message = null;
        }
      });
    },
    // 对部分表单字段进行校验
    async validateField(value, callback, event = null) {
      // nextTick 是必须的，否则 model 的变更，可能会延后于此方法的执行
      nextTick(() => {
        // 校验错误信息，返回给回调方法，用于存放所有 form-item 的错误信息
        const errorsRes = [];
        // 如果为字符串，转为数组
        value = [].concat(value);
        // 历遍 children 所有子 form-item
        this.children.map((child) => {
          // 用于存放form-item的错误信息
          const childErrors = [];
          if (value.includes(child.prop)) {
            // 获取对应的属性，通过类似'a.b.c'的形式
            const propertyVal = getProperty(
              this.model,
              child.prop,
            );
            // 属性链数组
            const propertyChain = child.prop.split('.');
            const propertyName = propertyChain[propertyChain.length - 1];

            const rule = this.formRules[child.prop];
            // 如果不存在对应的规则，直接返回，否则校验器会报错
            if (!rule) return;
            // rule规则可为数组形式，也可为对象形式，此处拼接成为数组
            const rules = [].concat(rule);

            // 对rules数组进行校验
            for (let i = 0; i < rules.length; i++) {
              const ruleItem = rules[i];
              // 将press-form-item的触发器转为数组形式
              const trigger = [].concat(ruleItem?.trigger);
              // 如果是有传入触发事件，但是此form-item却没有配置此触发器的话，不执行校验操作
              if (event && !trigger.includes(event)) continue;
              // 实例化校验对象，传入构造规则
              const validator = new Schema({
                [propertyName]: ruleItem,
              });
              validator.validate(
                {
                  [propertyName]: propertyVal,
                },
                (errors) => {
                  if (Array.isArray(errors)) {
                    errorsRes.push(...errors);
                    childErrors.push(...errors);
                  }
                  child.message = childErrors[0]?.message || null;
                },
              );
            }
          }
        });
        // 执行回调函数
        typeof callback === 'function' && callback(errorsRes);
      });
    },
    // 校验全部数据
    validate() {
      // 开发环境才提示，生产环境不会提示
      if (process.env.NODE_ENV === 'development' && Object.keys(this.formRules).length === 0) {
        errorTip('未设置rules，请看文档说明！如果已经设置，请刷新页面。');
        return;
      }
      return new Promise((resolve, reject) => {
        // nextTick 是必须的，否则 model 的变更，可能会延后于 validate 方法
        nextTick(() => {
          // 获取所有form-item的prop，交给validateField方法进行校验
          const formItemProps = this.children.map(item => item.prop);
          this.validateField(formItemProps, (errors) => {
            if (errors.length) {
              // 如果错误提示方式为toast，则进行提示
              this.errorType === 'toast' && uni.showToast({ title: errors[0].message });
              reject(errors);
            } else {
              resolve(true);
            }
          });
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
