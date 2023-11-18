<template>
  <div
    v-if="innerShow"
    :class="[
      'press-popup',
      getPropOrData('popupClass'),
      getPropOrData('horizontal') ? 'press-popup__hor' : 'press-popup__vert',
      mode === 'white' ? 'press-popup--white' : ''
    ]"
    :style="popupStyle"
    @touchmove.stop="preventTouchMove"
  >
    <!-- 透明遮罩 -->
    <div
      :class="['press-popup--mask',
               isEnter ? 'press--animation__fade-in':'press--animation__fade-out']"
      @click.stop="onClickTouch"
    />
    <div
      :class="['press-popup--content',
               isEnter ?
                 getPropOrData('horizontal') ? 'press--animation__right-enter':'press--animation__bottom-enter':
                 getPropOrData('horizontal') ? 'press--animation__right-leave':'press--animation__bottom-leave']"
      :style="{width: getPropOrData('horizontal') ? `${getPropOrData('widthNumber')}%` : '100%'}"
    >
      <div
        v-if="!getPropOrData('showTitle')
          && (!getPropOrData('horizontal') || !getPropOrData('closeIcon') || !getPropOrData('arrowIcon'))"
        class="press-popup--title-line"
        @click.stop="clickCancel"
      />
      <div
        v-if="getPropOrData('showTitle')"
        class="press-popup--title-wrap"
      >
        <div class="press-popup__left">
          <slot name="icon">
            <div
              v-if="getPropOrData('closeIcon')"
              class="press-popup--close iconfont icon-close"
              @click.stop="clickCancel"
            />

            <div
              v-else-if="getPropOrData('arrowIcon')"
              class="press-popup--arrow iconfont icon-back"
              @click.stop="clickCancel"
            />
          </slot>
        </div>

        <p
          v-if="getPropOrData('title')"
          class="press-popup--title"
        >
          {{ getPropOrData('title') }}
        </p>
        <slot
          v-else
          name="title"
        />

        <div class="press-popup--title-btn-wrap">
          <slot name="button">
            <PressButton
              v-if="getPropOrData('button')"
              :type="buttonType"
              custom-style="width:auto;height:100%;padding:0 10px;font-size:inherit;"
              @click.stop="clickConfirm"
            >
              {{ getPropOrData('button') }}
            </PressButton>
          </slot>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>
<script>
import PressButton from '../press-button/press-button.vue';
import { toPromise } from '../common/format/function';
import { getDefaultProps, FUNCTIONAL, getPropOrData } from '../common/component-handler/press-component';
import { allProps, propsKeyMap } from './computed';


const ANIMATION_TIME = 300;

export default {
  name: 'PressPopup',
  components: {
    PressButton,
  },
  props: {
    ...allProps,
  },
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
  emits: ['onCancel', 'cancel', 'onConfirm', 'confirm'],
  data() {
    return {
      isEnter: true,
      innerShow: this.mode === FUNCTIONAL ? false : !!this.isShow,
      timer: 0,
      watchShowTimer: null,
      functionModeData: { ...getDefaultProps(allProps) },
    };
  },
  computed: {
    buttonType() {
      if (this.getPropOrData('borderButton')) {
        return 'e-sport-border';
      }
      if (this.getPropOrData('disabledButton')) {
        return 'e-sport-primary-disabled';
      }
      return 'e-sport-primary';
    },
    popupStyle() {
      const customStyle = this.getPropOrData('customStyle');
      const zIndex = this.getPropOrData('zIndex');
      return `z-index: ${zIndex};${customStyle};`;
    },
    isFunctionMode() {
      return this.mode === FUNCTIONAL;
    },
  },
  watch: {
    isShow: {
      handler(val) {
        if (this.isFunctionMode) return;
        this.isEnter = val;

        if (!val) {
          clearTimeout(this.watchShowTimer);
          this.watchShowTimer = setTimeout(() => {
            this.innerShow = false;
          }, ANIMATION_TIME);
        } else {
          clearTimeout(this.watchShowTimer);
          this.innerShow = true;
        }
      },
      immediate: true,
    },
    // #ifdef H5
    isEnter: {
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
  beforeDestroy() {
    this.onBeforeDestroy();
  },
  beforeUnmount() {
    this.onBeforeDestroy();
  },
  methods: {
    onBeforeDestroy() {
      clearTimeout(this.timer);
    },
    showDialog(options) {
      if (options) {
        this.functionModeData = {
          ...this.functionModeData,
          ...options,
        };
      }
      this.innerShow = true;
      this.isEnter = true;
    },
    getPropOrData(key) {
      const res = getPropOrData({
        allProps,
        isFunctionMode: this.isFunctionMode,
        functionModeData: this.functionModeData,
        propsKeyMap,
        key,
        context: this,
      });

      return res;
    },
    preventTouchMove() {
      return;
    },
    onClickTouch() {
      if (this.getPropOrData('closeOnClickOverlay')) {
        this.clickCancel();
      }
    },
    clickCancel() {
      if (typeof this.asyncCancel === 'function') {
        toPromise(this.asyncCancel()).then((value) => {
          if (value) {
            this.emitCancel();
          }
        });
        return;
      }
      if (typeof this.asyncClose === 'function') {
        toPromise(this.asyncClose()).then((value) => {
          if (value) {
            this.emitCancel();
          }
        });
        return;
      }
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
      this.isEnter = false;

      this.timer = setTimeout(() => {
        this.$emit('onCancel');
        this.$emit('cancel');
        this.innerShow = false;
      }, ANIMATION_TIME);

      const { callback } = this.functionModeData;
      if (typeof callback === 'function') {
        callback('cancel');
      }
    },
    clickConfirm() {
      if (typeof this.asyncConfirm === 'function') {
        toPromise(this.asyncConfirm()).then((value) => {
          if (value) {
            this.emitConfirm();
          }
        });
        return;
      }

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
      this.isEnter = false;

      this.timer = setTimeout(() => {
        this.$emit('onConfirm');
        this.$emit('confirm');
        this.innerShow = false;
      }, ANIMATION_TIME);

      const { callback } = this.functionModeData;
      if (typeof callback === 'function') {
        callback('confirm');
      }
    },
  },
};

</script>
<style lang="scss" scoped src="./css/index.scss"></style>
