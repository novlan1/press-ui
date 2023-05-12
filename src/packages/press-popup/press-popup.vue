<template>
  <div
    v-if="innerShow"
    :class="['press-popup',popupClass ,isCrossSlab? 'press-popup__hor':'press-popup__vert']"
    :style="{zIndex: `${zIndex}`}"
    @touchmove.stop="preventTouchMove"
  >
    <!-- 透明遮罩 -->
    <div
      :class="['press-popup--mask',
               isShowPopup ? 'press--animation__fade-in':'press--animation__fade-out']"
      @click.stop="onClickTouch"
    />
    <div
      :class="['press-popup--content',
               isShowPopup ?
                 isCrossSlab ? 'press--animation__right-enter':'press--animation__bottom-enter':
                 isCrossSlab ? 'press--animation__right-leave':'press--animation__bottom-leave']"
      :style="{width:isCrossSlab ? `${widthNumber}%` : '100%'}"
    >
      <div
        v-if="!isShowTitle && (!isCrossSlab || !isShowpopupClose || !showBackArrow)"
        class="press-popup--title-line"
        @click.stop="clickCancel"
      />
      <div
        v-if="isShowTitle"
        class="press-popup--title-wrap"
      >
        <div
          v-if="isShowpopupClose"
          class="press-popup--close iconfont icon-close"
          @click.stop="clickCancel"
        />

        <div
          v-else-if="showBackArrow"
          class="press-popup--arrow iconfont icon-back"
          @click.stop="clickCancel"
        />

        <p
          v-if="popupTitle"
          class="press-popup--title"
        >
          {{ popupTitle }}
        </p>
        <slot
          v-else
          name="title"
        />

        <div class="press-popup--title-btn-wrap">
          <PressButton
            v-if="popupTitleBtn"
            :type="isBorderBtn ? 'e-sport-border' : 'e-sport-primary'"
            custom-style="width:auto;height:100%;padding:0 10px;font-size:inherit;"
            @click.stop="clickConfirm"
          >
            {{ popupTitleBtn }}
          </PressButton>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>
<script>
import PressButton from '../press-button/press-button.vue';
import { toPromise } from '../common/format/function';
const ANIMATION_TIME = 400;

export default {
  name: 'PopupContainer',
  components: {
    PressButton,
  },
  props: {
    // 是否显示标题
    isShowTitle: {
      type: Boolean,
      default: true,
      required: false,
    },
    // 横板弹窗宽度百分比
    widthNumber: {
      type: Number,
      default: 100,
      required: false,
    },
    // 是否切换横板样式
    isCrossSlab: {
      type: Boolean,
      default: false,
      required: false,
    },
    // 是否显示关闭按钮
    isShowpopupClose: {
      type: Boolean,
      default: false,
      required: false,
    },
    // 左上角是否显示为返回箭头
    showBackArrow: {
      type: Boolean,
      default: false,
    },
    // 弹窗标题
    popupTitle: {
      type: String,
      default: '',
      required: false,
    },
    // 弹窗标题按钮
    popupTitleBtn: {
      type: String,
      default: '',
      required: false,
    },
    // 标题按钮样式
    isBorderBtn: {
      type: Boolean,
      default: false,
      required: false,
    },
    // 在执行确认动画前，validateConfirm返回false则进行拦截
    validateConfirm: {
      type: [Function, null],
      default: null,
    },
    isShow: {
      type: Boolean,
      default: true,
      required: false,
    },
    // 弹窗层级
    zIndex: {
      type: String,
      default: '99',
      required: false,
    },
    // class
    popupClass: {
      type: String,
      default: '',
      required: false,
    },
    // 是否可以点击蒙版关闭
    canTouchRemove: {
      type: Boolean,
      default: true,
    },
  },
  options: {
    virtualHost: true,
  },
  data() {
    return {
      isShowPopup: true,
      innerShow: true,
      timer: 0,
    };
  },
  watch: {
    isShow: {
      handler(val) {
        this.isShowPopup = val;
        if (!val) {
          setTimeout(() => {
            this.innerShow = false;
          }, ANIMATION_TIME);
        } else {
          this.innerShow = true;
        }
      },
      immediate: true,
    },
    // #ifdef H5
    isShowPopup: {
      handler(val) {
        if (val) {
          document.body.style.overflowY = 'hidden';
        } else {
          document.body.style.overflowY = '';
        }
      },
      immediate: true,
    },
    // #endif
  },
  mounted() {
  },
  destroyed() {
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    preventTouchMove() {
      return;
    },
    onClickTouch() {
      if (this.canTouchRemove) {
        this.clickCancel();
      }
    },
    clickCancel() {
      if (this.$parent.validateCancel) {
        toPromise(this.$parent.validateCancel()).then((value) => {
          if (value) {
            this.emitCancel();
          }
        });
        return;
      }
      this.emitCancel();
    },
    emitCancel() {
      this.isShowPopup = false;
      this.timer = setTimeout(() => {
        this.$emit('onCancel');
      }, ANIMATION_TIME);
    },
    clickConfirm() {
      if (this.$parent.validateConfirm) {
        toPromise(this.$parent.validateConfirm()).then((value) => {
          if (value) {
            this.emitConfirm();
          }
        });
        return;
      }
      this.emitConfirm();
    },
    emitConfirm() {
      this.isShowPopup = false;
      this.timer = setTimeout(() => {
        this.$emit('onConfirm');
      }, ANIMATION_TIME);
    },
  },
};

</script>
<style lang="scss" scoped src="./css/index.scss"></style>
