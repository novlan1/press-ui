<template>
  <div
    class="press-calendar"
  >
    <PressCalendarHeader
      :title="title"
      :show-title="showTitle"
      :subtitle="subtitle"
      :show-subtitle="showSubtitle"
      :first-day-of-week="firstDayOfWeek"
      @click-subtitle="onClickSubtitle"
    >
      <template #title>
        <slot
          name="title"
        />
      </template>
    </PressCalendarHeader>

    <scroll-view
      class="press-calendar__body"
      scroll-y
      :scroll-into-view="scrollIntoViewData"
    >
      <PressCalendarMonth
        v-for="(item, index) in (computed.getMonths(minDate, maxDate))"
        :id="'month'+(index)"
        :key="index"
        class="month"
        :data-date="item"
        :date="item"
        :type="type"
        :color="color"
        :min-date="minDate"
        :max-date="maxDate"
        :show-mark="showMark"
        :formatter="formatter"
        :row-height="rowHeight"
        :current-date="currentDate"
        :show-subtitle="showSubtitle"
        :allow-same-day="allowSameDay"
        :show-month-title="index !== 0 || !showSubtitle"
        :first-day-of-week="firstDayOfWeek"
        @click="onClickDay"
      />
    </scroll-view>

    <div :class="true ? utils.bem2('calendar__footer', { safeAreaInsetBottom }) : ''">
      <slot name="footer" />
    </div>

    <div :class="true ? utils.bem2('calendar__footer', { safeAreaInsetBottom }) : ''">
      <PressButton
        v-if="showConfirm"
        round
        block
        type="danger"
        :color="color"
        custom-class="press-calendar__confirm"
        :custom-style="innerButtonStyle"
        :disabled="computed.getButtonDisabled(type, currentDate)"
        native-type="text"
        @click="onConfirm"
      >
        {{
          computed.getButtonDisabled(type, currentDate)
            ? confirmDisabledText
            : confirmText
        }}
      </PressButton>
    </div>
  </div>
</template>

<script>
import { style } from '../common/utils/style';

// #ifdef H5
import { intersectionObserverPloyFill } from '../common/utils/system';
// #endif

import utils from '../common/utils/utils';
import { ScrollViewPureMixin } from '../mixins/pure/scroll-view';

import PressButton from '../press-button/press-button.vue';
import PressCalendarHeader from '../press-calendar-header/press-calendar-header.vue';
import PressCalendarMonth from '../press-calendar-month/press-calendar-month.vue';

import { SHARE_PROPS } from '../press-calendar/share-props';

import {
  formatMonthTitle,
} from '../press-calendar/utils';

import computed from './computed';


export default {
  name: 'Calendar',
  options: {
    styleIsolation: 'shared',
  },
  components: {
    PressCalendarHeader,
    PressCalendarMonth,
    PressButton,
  },
  mixins: [ScrollViewPureMixin],
  props: {
    ...SHARE_PROPS,
    scrollIntoViewData: {
      type: String,
      default: '',
    },
    currentDate: {
      type: [String, Number, Array],
      default: null,
    },
    buttonStyle: {
      type: [String, Number],
      default: '',
    },
  },
  emits: [
    'onConfirm',
    'onClickSubtitle',
    'scrollIntoView',
    'onClickDay',
  ],
  data() {
    return {
      computed,
      utils,
      subtitle: '',
    };
  },
  computed: {
    innerButtonStyle() {
      let result = {};
      // #ifdef MP-TOUTIAO
      result = {
        height: '36px',
        margin: '7px 0',
        lineHeight: '34px',
      };
      // #endif
      return style([
        result,
        this.buttonStyle,
      ]);
    },
  },
  mounted() {
    this.initRect();
  },
  methods: {
    onConfirm(...args) {
      this.$emit('onConfirm', ...args);
    },
    onClickSubtitle(...args) {
      this.$emit('onClickSubtitle', ...args);
    },
    scrollIntoView(...args) {
      this.$emit('scrollIntoView', ...args);
    },
    onClickDay(...args) {
      this.$emit('onClickDay', ...args);
    },
    initRect() {
      if (this.contentObserver != null) {
        this.contentObserver.disconnect();
      }

      const rootSelector = '.press-calendar__body';
      let selector = '.month';
      // #ifdef MP-ALIPAY
      selector = '.press-calendar__month';
      // #endif

      const threshold = [0, 0.1, 0.9, 1];
      const observeAll = true;

      // #ifdef H5
      if (intersectionObserverPloyFill({
        selector,
        options: {
          threshold,
          observeAll,
          root: document.querySelector(rootSelector),
        },
        callback: (changes) => {
          for (const change of changes) {
            if (change.boundingClientRect.top <= change.rootBounds.top) {
              this.subtitle = formatMonthTitle(+change.target.dataset.date);
              break;
            }
          }
        },
      })) {
        return;
      }
      // #endif

      const contentObserver = uni.createIntersectionObserver(this, {
        thresholds: threshold,
        observeAll,
        dataset: true,
      });

      this.contentObserver = contentObserver;
      contentObserver.relativeTo(rootSelector);

      contentObserver.observe(selector, (res) => {
        if (res.boundingClientRect.top <= res.relativeRect.top) {
          this.subtitle = formatMonthTitle(+res.dataset.date);
        }
      });
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
