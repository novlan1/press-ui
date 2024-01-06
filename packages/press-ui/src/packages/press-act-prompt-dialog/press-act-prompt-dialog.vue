<template>
  <div
    v-if="show"
    :class="[getActClass('cover'), {
      'press-act--hidden-tip': hideTipStyle,
    }, 'press-act']"
  >
    <div
      :class="[getActClass('dialog','dialog--prompt'),
               propsData.dialogClass
      ]"
    >
      <!-- 新增对勾dom -->
      <p
        v-if="propsData.hasHook"
        :class="[getActClass('hook')]"
      />
      <p :class="[getActClass('title','title--prompt')]">
        {{ propsData.title || '温馨提示' }}
      </p>
      <a
        v-if="showCloseBtn"
        :class="[getActClass('close')]"
        @click="closeDialog"
      />
      <div :class="[getActClass('content')]">
        <div :class="[getActClass('box')]">
          <!-- 地主提示空图片 -->
          <div
            v-if="showPic"
            :class="[getActClass('empty')]"
          />
          <!-- 商户图 -->
          <div
            v-if="propsData.storePic"
            :class="[getActClass('pic-wrap')]"
          >
            <img :src="propsData.storePic">
            <p>{{ propsData.storeName }}</p>
          </div>
          <p
            :class="[getActClass('notice')]"
            v-html="propsData.content"
          />
          <p
            v-if="propsData.subContent"
            :class="[getActClass('text', {
              [getActClass('text--gold')]: propsData.isGold
            }),
            ]"
          >
            {{ propsData.subContent }}
          </p>
        </div>
        <div :class="[getActClass('button-wrap')]">
          <!--  press__btn--cancel 关闭按钮
                press__btn--sure   提交按钮
                press__btn--back   返回修改按钮
                press__btn--enter  进入游戏按钮
                press__btn--form 填写个人信息按钮
                press__btn--i-know 我知道了按钮
                press__btn--i-notify 开启通知按钮
          -->
          <a
            v-if="propsData.cancelBtnText"
            :class="[
              getActClass('btn--cancel'),
              getActClass('btn--medium-secondary'),
              propsData.cancelBtnClass || '',
            ]"
            @click="onClickCancelButton"
          >{{ propsData.cancelBtnText }}</a>
          <a
            v-if="propsData.btnText"
            :class="[
              getActClass('btn--medium-primary'),
              propsData.btnClass
            ]"
            @click="onClickButton"
          >{{ propsData.btnText }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getActClass } from './utils';
import { getHideBaseStyleMixin } from '../mixins/act/hide-base-style';


export default {
  name: 'PressActPromptDialog',
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
  mixins: [getHideBaseStyleMixin()],
  props: {
    show: {
      type: Boolean,
      default: false,
      required: false,
    },
    showPic: {
      type: Boolean,
      default: false,
      required: false,
    },
    propsData: {
      type: Object,
      default: () => ({}),
    },
    showCloseBtn: {
      type: Boolean,
      default: true,
    },
    useTipClass: {
      type: Boolean,
      default: false,
    },
    hideTipStyle: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeDialog() {
      this.$emit('update:show', false);
      this.$emit('onClickCloseButton');
    },
    onClickCancelButton() {
      this.$emit('update:show', false);
      this.$emit('onClickCancelButton');
    },
    onClickButton() {
      this.$emit('clickButton');
    },
    getActClass(...args) {
      return getActClass(this.useTipClass, args);
    },
  },
};
</script>

<style scoped lang="scss">
// body:not(.press-act-prompt-dialog--hidden) {
//   @import "./css/pvp-vertical.scss";
// }
.press__dialog {
  box-sizing: border-box;
}
</style>
<style scoped lang="scss" src="@TIP_STYLE_NAME"></style>
<style scoped lang="scss" src="./css/base.scss"></style>
