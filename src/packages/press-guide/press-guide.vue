<template>
  <div>
    <PressOverlay
      v-if="modeType === 'popover'"
      :show="visible"
      :using-custom-navbar="usingCustomNavbar"
      background-color="transparent"
      custom-class="press-guide___overlay"
      :z-index="zIndex"
      :enter-callback="callback"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
    >
      <div :class="classPrefix">
        <div
          :class="[`${classPrefix}__reference`, `${nonOverlay ? classPrefix + '__reference--nonoverlay' : ''}`]"
          :style="referenceStyle"
        />
        <div
          :class="[`${classPrefix}__container`, `${title || body ? classPrefix + '__container--' + modeType : ''}`]"
          :style="popoverStyle"
        >
          <GuideContent
            :class-prefix="classPrefix"
            :title="title"
            :body="body"
            :steps="steps"
            :current="innerCurrent"
            :mode-type="modeType"
            :skip-button="iButtonProps.skipButton"
            :back-button="iButtonProps.backButton"
            :next-button="iButtonProps.nextButton"
            :finish-button="iButtonProps.finishButton"
            @clickButton="onTplButtonTap"
          >
            <template
              v-if="innerCurrent === 0"
              #content-0
            >
              <slot name="content-0" />
            </template>
            <template
              v-if="innerCurrent === 1"
              #content-1
            >
              <slot name="content-1" />
            </template>
            <template
              v-if="innerCurrent === 2"
              #content-2
            >
              <slot name="content-2" />
            </template>
            <template
              v-if="innerCurrent === 3"
              #content-3
            >
              <slot name="content-3" />
            </template>
            <template
              v-if="innerCurrent === 4"
              #content-4
            >
              <slot name="content-4" />
            </template>
            <template
              v-if="innerCurrent === 5"
              #content-5
            >
              <slot name="content-5" />
            </template>
            <template
              v-if="innerCurrent === 6"
              #content-6
            >
              <slot name="content-6" />
            </template>
          </GuideContent>
        </div>
      </div>
    </PressOverlay>
    <PressPopup
      v-else-if="modeType === 'dialog'"
      :show="visible"
      :show-overlay="!nonOverlay"
      :using-custom-navbar="usingCustomNavbar"
      :z-index="zIndex"
      placement="center"
    >
      <div :class="classPrefix">
        <div
          :class="[`${classPrefix}__container`, `${title || body ? classPrefix + '__container--' + modeType : ''}`]"
        >
          <GuideContent
            :class-prefix="classPrefix"
            :title="title"
            :body="body"
            :steps="steps"
            :current="innerCurrent"
            :mode-type="modeType"
            :button-props="iButtonProps"
            :skip-button="iButtonProps.skipButton"
            :back-button="iButtonProps.backButton"
            :next-button="iButtonProps.nextButton"
            :finish-button="iButtonProps.finishButton"
            @clickButton="onTplButtonTap"
          >
            <template
              v-if="innerCurrent === 0"
              #content-0
            >
              <slot name="content-0" />
            </template>
            <template
              v-if="innerCurrent === 1"
              #content-1
            >
              <slot name="content-1" />
            </template>
            <template
              v-if="innerCurrent === 2"
              #content-2
            >
              <slot name="content-2" />
            </template>
            <template
              v-if="innerCurrent === 3"
              #content-3
            >
              <slot name="content-3" />
            </template>
            <template
              v-if="innerCurrent === 4"
              #content-4
            >
              <slot name="content-4" />
            </template>
            <template
              v-if="innerCurrent === 5"
              #content-5
            >
              <slot name="content-5" />
            </template>
            <template
              v-if="innerCurrent === 6"
              #content-6
            >
              <slot name="content-6" />
            </template>
          </GuideContent>
        </div>
      </div>
    </PressPopup>
  </div>
</template>
<script>
import { getRect, getWindowWidth } from '../common/dom/rect';
import { getPx as unitConvert } from '../common/utils/add-unit';
import { rpx2px } from '../common/utils/rpx';

import styles from '../common/utils/style';
import { nextTick } from '../common/utils/system';
import { isNumber } from '../common/utils/validator';

import GuideContent from '../press-guide-content/press-guide-content.vue';
import PressOverlay from '../press-overlay/press-overlay.vue';
import PressPopup from '../press-popup-plus/press-popup-plus.vue';

import props from './props';


const classPrefix = 'press-guide';
const prefix = 'press';

let that;

export default {
  name: 'PressGuide',
  components: {
    PressOverlay,
    PressPopup,
    GuideContent,
  },
  options: {
    styleIsolation: 'shared',
  },
  props,
  data() {
    that = this;
    return {
      prefix,
      classPrefix,

      innerCurrent: -1,
      innerSteps: [],
      referenceStyle: '',
      referenceRawStyle: {},

      popoverStyle: 'opacity: 0',
      title: '',
      body: '',
      nonOverlay: false,
      iButtonProps: {},
      entered: false,
    };
  },
  computed: {
    currentStep() {
      const { steps, innerCurrent } = this;
      const step = steps[innerCurrent];
      return step;
    },
    modeType() {
      const result =  (this.currentStep?.mode ?? this.mode) === 'dialog' ? 'dialog' : 'popover';
      return result;
    },
    visible() {
      return !!this.currentStep;
    },
  },
  watch: {
    steps() {
      this.init();
    },
    current: {
      handler(value) {
        this.innerCurrent = value;
        this.init();
      },
      immediate: true,
    },
    showOverlay() {
      this.init();
    },
  },
  created() {
    this.iGetPlacement = this.getPlacement();
  },
  mounted() {
    this.init();
  },
  methods: {
    async callback() {
      nextTick(async () => {
        const popoverStyle = await that.placementOffset(that.currentStep, that.referenceRawStyle);
        that.setData({ popoverStyle });
      });
    },
    afterEnter() {
      this.entered = true;
    },
    afterLeave() {
      this.entered = false;
    },
    setData(data, cb) {
      Object.keys(data).forEach((key) => {
        this[key] = data[key];
      });
      if (typeof cb === 'function') {
        setTimeout(() => {
          cb();
        });
      }
    },
    async init() {
      const { currentStep: step, modeType } = this;
      const { windowHeight, windowWidth } = getWindowWidth();

      if (!step) {
        return;
      }
      const showOverlay = step.showOverlay ?? this.showOverlay;
      this.setData({ nonOverlay: !showOverlay });

      if (modeType === 'popover') {
        const rect = await getRect(null, step.element, true);
        if (!rect) return;

        const highlightPadding = rpx2px(step.highlightPadding ?? this.highlightPadding);
        // rect.top 和 windowHeight 都处理了 windowTop，这里不用单独处理
        const referenceTop = rect.top - highlightPadding;
        const referenceRight = windowWidth - rect.right - highlightPadding;
        const referenceBottom = windowHeight - rect.bottom - highlightPadding;
        const referenceLeft = rect.left - highlightPadding;

        const style = {
          top: `${referenceTop}px`,
          right: `${referenceRight}px`,
          bottom: `${referenceBottom}px`,
          left: `${referenceLeft}px`,
        };

        this.setData({
          innerSteps: this.steps,
          referenceStyle: styles(style),
          referenceRawStyle: style,

          title: step.title ?? '',
          body: step.body ?? '',
          iButtonProps: this.buttonProps(step, 'popover'),
        });


        if (this.entered) {
          this.callback();
        }
      } else {
        this.setData({
          innerSteps: this.steps,
          title: step.title ?? '',
          body: step.body ?? '',
          iButtonProps: this.buttonProps(step, 'dialog'),
        });
      }
    },
    async placementOffset({ placement, offset }, place) {
      const rect = await getRect(this, `.${classPrefix}__container`, true);
      const style = this.iGetPlacement[placement]?.(rect, place, offset);
      return styles({ position: 'absolute', ...style });
    },
    buttonProps(step, mode) {
      let skipButton = step.skipButtonProps ?? this.skipButtonProps;
      const size = mode === 'popover' ? 'small' : 'normal';
      skipButton = {
        type: 'default',
        content: '跳过',
        size,
        ...skipButton,
        class: `${prefix}-class-skip ${classPrefix}__button ${step.hideSkip ? `${classPrefix}__button--hidden` : ''} ${
          skipButton?.class || ''
        }`,
        iType: 'skip',
      };

      let nextButton = step.nextButtonProps ?? this.nextButtonProps;
      nextButton = {
        type: 'primary',
        content: '下一步',
        size,
        ...nextButton,
        class: `${prefix}-class-next ${classPrefix}__button ${nextButton?.class || ''}`,
        iType: 'next',
      };
      nextButton = { ...nextButton, content: this.buttonContent(nextButton) };

      let backButton = step.backButtonProps ?? this.backButtonProps;
      backButton = {
        type: 'default',
        content: '返回',
        size,
        ...backButton,
        class: `${prefix}-class-back ${classPrefix}__button ${backButton?.class || ''}`,
        iType: 'back',
      };

      let finishButton = step.finishButtonProps ?? this.finishButtonProps;
      finishButton = {
        type: 'primary',
        content: '完成',
        size,
        ...finishButton,
        class: `${prefix}-class-finish ${classPrefix}__button ${finishButton?.class || ''}`,
        iType: 'finish',
      };
      finishButton = { ...finishButton, content: this.buttonContent(finishButton) };

      return {
        skipButton,
        nextButton,
        backButton,
        finishButton,
      };
    },
    buttonContent(button) {
      const { steps, innerCurrent, hideCounter } = this;
      return `${button.content.replace(/ \(.*?\)/, '')}${hideCounter ? '' : ` (${innerCurrent + 1}/${steps.length})`}`;
    },
    onTplButtonTap(type) {
      const params = { current: this.innerCurrent, total: this.steps.length };
      switch (type) {
        case 'next':
          this.$emit('next-step-click', { next: this.innerCurrent + 1, ...params });
          this.setData({ innerCurrent: this.innerCurrent + 1 });
          break;
        case 'skip':
          this.$emit('skip', params);
          this.setData({ innerCurrent: -1 });
          break;
        case 'back':
          this.$emit('back', params);
          this.setData({ innerCurrent: 0 });
          break;
        case 'finish':
          this.$emit('finish', params);
          this.setData({ innerCurrent: 99999999 });
          break;
        default:
          break;
      }

      this.init();
      this.$emit('change', { current: this.innerCurrent });
    },
    getPlacement() {
      const { windowHeight, windowWidth } = getWindowWidth();

      const space = rpx2px(32);
      const offsetLeft = offset => unitConvert(isNumber(offset?.[0]) ? `${offset?.[0]}rpx` : offset?.[0] || 0);
      const offsetTop = offset => unitConvert(isNumber(offset?.[1]) ? `${offset?.[1]}rpx` : offset?.[1] || 0);

      const bottom = place => parseFloat(place.bottom);
      const left = place => parseFloat(place.left);
      const right = place => parseFloat(place.right);
      const top = place => parseFloat(place.top);

      // 指示器的高度、宽度
      const height = place => windowHeight - bottom(place) - top(place);
      const width = place => windowWidth - left(place) - right(place);

      return {
        center: (rect, place, offset) => ({
          top: `${Math.max(height(place) + top(place) + space + offsetTop(offset), 1)}px`,
          left: `${Math.max(width(place) / 2 + left(place) - rect.width / 2 + offsetLeft(offset), 1)}px`,
        }),
        bottom: (rect, place, offset) => ({
          top: `${Math.max(height(place) + top(place) + space + offsetTop(offset), 1)}px`,
          left: `${Math.max(width(place) / 2 + left(place) - rect.width / 2 + offsetLeft(offset), 1)}px`,
        }),
        'bottom-left': (rect, place, offset) => ({
          top: `${Math.max(height(place) + top(place) + space + offsetTop(offset), 1)}px`,
          left: `${Math.max(left(place) + offsetLeft(offset), 1)}px`,
        }),
        'bottom-right': (rect, place, offset) => ({
          top: `${Math.max(height(place) + top(place) + space + offsetTop(offset), 1)}px`,
          right: `${Math.max(right(place) - offsetLeft(offset), 1)}px`,
        }),
        left: (rect, place, offset) => ({
          top: `${Math.max(height(place) / 2 + top(place) - rect.height / 2 + offsetTop(offset), 1)}px`,
          right: `${Math.max(width(place) + right(place) + space - offsetLeft(offset), 1)}px`,
        }),
        'left-top': (rect, place, offset) => ({
          top: `${Math.max(top(place) + offsetTop(offset), 1)}px`,
          right: `${Math.max(width(place) + right(place) + space - offsetLeft(offset), 1)}px`,
        }),
        'left-bottom': (rect, place, offset) => ({
          bottom: `${Math.max(bottom(place) - offsetTop(offset), 1)}px`,
          right: `${Math.max(width(place) + right(place) + space - offsetLeft(offset), 1)}px`,
        }),
        right: (rect, place, offset) => ({
          top: `${Math.max(height(place) / 2 + top(place) - rect.height / 2 + offsetTop(offset), 1)}px`,
          left: `${Math.max(left(place) + width(place) + space + offsetLeft(offset), 1)}px`,
        }),
        'right-top': (rect, place, offset) => ({
          top: `${Math.max(top(place) + offsetTop(offset), 1)}px`,
          left: `${Math.max(left(place) + width(place) + space + offsetLeft(offset), 1)}px`,
        }),
        'right-bottom': (rect, place, offset) => ({
          bottom: `${Math.max(bottom(place) - offsetTop(offset), 1)}px`,
          left: `${Math.max(left(place) + width(place) + space + offsetLeft(offset), 1)}px`,
        }),
        top: (rect, place, offset) => ({
          bottom: `${Math.max(height(place) + bottom(place) + space - offsetTop(offset), 1)}px`,
          left: `${Math.max(width(place) / 2 + left(place) - rect.width / 2 + offsetLeft(offset), 1)}px`,
        }),
        'top-left': (rect, place, offset) => ({
          bottom: `${Math.max(height(place) + bottom(place) + space - offsetTop(offset), 1)}px`,
          left: `${Math.max(left(place) + offsetLeft(offset), 1)}px`,
        }),
        'top-right': (rect, place, offset) => ({
          bottom: `${Math.max(height(place) + bottom(place) + space - offsetTop(offset), 1)}px`,
          right: `${Math.max(right(place) - offsetLeft(offset), 1)}px`,
        }),
      };
    },
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
