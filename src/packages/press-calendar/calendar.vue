<template>
  <div
    class="press-calendar"
  >
    <CalendarHeader
      :title="title"
      :show-title="showTitle"
      :subtitle="subtitle"
      :show-subtitle="showSubtitle"
      :first-day-of-week="firstDayOfWeek"
      @click-subtitle="onClickSubtitle"
    >
      <slot
        slot="title"
        name="title"
      />
    </CalendarHeader>

    <scroll-view
      class="press-calendar__body"
      scroll-y
      :scroll-into-view="scrollIntoViewData"
    >
      <month
        v-for="(item,index) in (computed.getMonths(minDate, maxDate))"
        :id="'month'+(index)"
        :key="item.index"
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
      <press-button
        v-if="showConfirm"
        round
        block
        type="danger"
        :color="color"
        custom-class="press-calendar__confirm"
        :disabled="computed.getButtonDisabled(type, currentDate)"
        native-type="text"
        @click="onConfirm"
      >
        {{
          computed.getButtonDisabled(type, currentDate)
            ? confirmDisabledText
            : confirmText
        }}
      </press-button>
    </div>
  </div>
</template>

<script>
import CalendarHeader from './components/header/header.vue';
import Month from './components/month/month.vue';
import PressButton from '../press-button/press-button.vue';
import computed from './computed';
import utils from '../common/utils/utils';
import { SHARE_PROPS } from './share-props';

import {
  formatMonthTitle,
} from './utils';


export default {
  components: {
    CalendarHeader,
    Month,
    PressButton,
  },
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
  },
  data() {
    return {
      computed,
      utils,
      subtitle: '',
    };
  },
  computed: {
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
      const contentObserver = uni.createIntersectionObserver(this, {
        thresholds: [0, 0.1, 0.9, 1],
        observeAll: true,
      });

      this.contentObserver = contentObserver;
      contentObserver.relativeTo('.press-calendar__body');

      contentObserver.observe('.month', (res) => {
        if (res.boundingClientRect.top <= res.relativeRect.top) {
          this.subtitle = formatMonthTitle(res.dataset.date);
        }
      });
    },
  },
};
</script>
<style platform="mp-weixin" lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-calendar {
  &__body {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  &__footer {
    flex-shrink: 0;
    padding: 0 var(--padding-md, $padding-md);

    &--safe-area-inset-bottom {
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
    }
  }

  &__footer:empty,
  &__footer + &__footer {
    display: none;
  }

  &__footer:empty + &__footer {
    display: block !important;
  }

  &__confirm {
    height: var(
      --calendar-confirm-button-height,
      $calendar-confirm-button-height
    ) !important;
    margin: var(
      --calendar-confirm-button-margin,
      $calendar-confirm-button-margin
    ) !important;
    line-height: var(
      --calendar-confirm-button-line-height,
      $calendar-confirm-button-line-height
    ) !important;
  }
}
</style>
