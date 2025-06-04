<template>
  <div
    class="press-calendar-index"
    :class="customClass"
  >
    <PressPopup
      v-if="poppable"
      :custom-class="'press-calendar__popup--'+(position)"
      :custom-style="innerPopupCustomStyle"
      close-icon-class="press-calendar__close-icon"
      :show="show"
      :round="round"
      :position="position"
      :closeable="showTitle || showSubtitle"
      :close-on-click-overlay="closeOnClickOverlay"
      @enter="onOpen"
      @close="onClose"
      @after-enter="onOpened"
      @after-leave="onClosed"
    >
      <PressCalendarInner
        :title="title"
        :color="color"
        :formatter="formatter"
        :confirm-text="confirmText"
        :confirm-disabled-text="confirmDisabledText"
        :allow-same-day="allowSameDay"
        :type="type"
        :min-date="minDate"
        :max-date="maxDate"
        :row-height="rowHeight"
        :show-mark="showMark"
        :show-title="showTitle"
        :show-confirm="showConfirm"
        :show-subtitle="showSubtitle"
        :safe-area-inset-bottom="safeAreaInsetBottom"
        :first-day-of-week="firstDayOfWeek"
        :scroll-into-view-data="scrollIntoViewData"
        :current-date="currentDate"
        :subtitle="subtitle"
        :poppable="poppable"
        :button-style="buttonStyle"
        @onConfirm="onConfirm"
        @onClickSubtitle="onClickSubtitle"
        @scrollIntoView="scrollIntoView"
        @onClickDay="onClickDay"
      />
    </PressPopup>

    <PressCalendarInner
      v-else
      :max-date="maxDate"
      :row-height="rowHeight"
      :show-mark="showMark"
      :show-title="showTitle"
      :show-confirm="showConfirm"
      :show-subtitle="showSubtitle"
      :title="title"
      :color="color"
      :formatter="formatter"
      :confirm-text="confirmText"
      :confirm-disabled-text="confirmDisabledText"
      :allow-same-day="allowSameDay"
      :type="type"
      :min-date="minDate"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :first-day-of-week="firstDayOfWeek"
      :scroll-into-view-data="scrollIntoViewData"
      :current-date="currentDate"
      :subtitle="subtitle"
      :poppable="poppable"
      :button-style="buttonStyle"
      @scrollIntoView="scrollIntoView"
      @onClickDay="onClickDay"
      @onConfirm="onConfirm"
      @onClickSubtitle="onClickSubtitle"
    />

    <!-- #ifndef H5 -->
    <PressToast
      id="press-toast"
      ref="press-toast"
    />
    <!-- #endif -->
  </div>
</template>
<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { style } from '../common/utils/style';
import { requestAnimationFrame, nextTick } from '../common/utils/system';
import { t } from '../locale';

import PressCalendarInner from '../press-calendar-inner/press-calendar-inner.vue';
import PressPopup from '../press-popup/press-popup.vue';

import Toast from '../press-toast/handler';
import PressToast from '../press-toast/press-toast.vue';

import { SHARE_PROPS } from './share-props';
import {
  getPrevDay,
  getNextDay,
  getToday,
  compareDay,
  copyDates,
  calcDateNum,
  compareMonth,
  getMonths,
  getDayByOffset,
} from './utils';


const getTime = date => (date instanceof Date ? date.getTime() : date);

export default {
  name: 'PressCalendar',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressCalendarInner,
    PressPopup,
    PressToast,
  },
  props: {
    ...SHARE_PROPS,
    show: {
      type: Boolean,
      default: false,
    },
    rangePrompt: { type: String, default: '' },
    showRangePrompt: {
      type: Boolean,
      default: true,
    },
    defaultDate: {
      type: [String, Number],
      default: '',
    },
    position: {
      type: String,
      default: 'bottom',
    },
    round: {
      type: Boolean,
      default: true,
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    maxRange: {
      type: [String, Number],
      default: null,
    },
    popupStyle: {
      type: [String, Object],
      default: '',
    },
    buttonStyle: {
      type: [String, Number],
      default: '',
    },
    readonly: Boolean,
    ...defaultProps,
  },
  emits: [
    'open',
    'opened',
    'close',
    'closed',
    'unselect',
    'select',
    'over-range',
    'confirm',
    'click-subtitle',
  ],
  data() {
    return {
      subtitle: '',
      currentDate: null,
      scrollIntoViewData: '',
    };
  },
  computed: {
    innerPopupCustomStyle() {
      let result = {};
      // #ifdef MP-TOUTIAO
      result = ['top', 'bottom'].includes(this.position)
        ? {
          height: '80%',
        }
        : {
          height: 'calc(100% - var(--window-top, 0px))',
          bottom: 0,
          top: 'calc(50% + var(--window-top, 0px) / 2)',
        };
      // #endif
      return style([
        result,
        this.popupStyle,
      ]);
    },
  },
  watch: {
    show: {
      handler(val) {
        if (val) {
          this.scrollIntoView();
        }
      },
    },
    defaultDate: {
      handler(val) {
        this.currentDate = val;
        this.scrollIntoView();
      },
    },
    type: {
      handler() {
        this.reset();
      },
    },
  },
  created() {
    this.currentDate = this.getInitialDate(this.defaultDate);
  },
  mounted() {
    if (this.show || !this.poppable) {
      this.scrollIntoView();
    }
  },
  methods: {
    reset() {
      this.currentDate = this.getInitialDate();
      this.scrollIntoView();
    },
    limitDateRange(date, minDate = null, maxDate = null) {
      minDate = minDate || this.minDate;
      maxDate = maxDate || this.maxDate;
      if (compareDay(date, minDate) === -1) {
        return minDate;
      }
      if (compareDay(date, maxDate) === 1) {
        return maxDate;
      }
      return date;
    },
    getInitialDate(defaultDate = null) {
      const { type, minDate, maxDate } = this;
      const now = getToday().getTime();
      if (type === 'range') {
        if (!Array.isArray(defaultDate)) {
          defaultDate = [];
        }
        const [startDay, endDay] = defaultDate || [];
        const start = this.limitDateRange(startDay || now, minDate, getPrevDay(new Date(maxDate)).getTime());
        const end = this.limitDateRange(endDay || now, getNextDay(new Date(minDate)).getTime());
        return [start, end];
      }
      if (type === 'multiple') {
        if (Array.isArray(defaultDate)) {
          return defaultDate.map(date => this.limitDateRange(date));
        }
        return [this.limitDateRange(now)];
      }
      if (!defaultDate || Array.isArray(defaultDate)) {
        defaultDate = now;
      }
      return this.limitDateRange(defaultDate);
    },
    scrollIntoView() {
      requestAnimationFrame(() => {
        const { currentDate, type, show, poppable, minDate, maxDate } = this;
        const targetDate = type === 'single' ? currentDate : currentDate[0];
        const displayed = show || !poppable;
        if (!targetDate || !displayed) {
          return;
        }
        const months = getMonths(minDate, maxDate);
        months.some((month, index) => {
          if (compareMonth(month, targetDate) === 0) {
            this.scrollIntoViewData = `month${index}`;
            return true;
          }
          return false;
        });
      });
    },
    onOpen() {
      this.$emit('open');
    },
    onOpened() {
      this.$emit('opened');
    },
    onClose() {
      this.$emit('close');
    },
    onClosed() {
      this.$emit('closed');
    },
    onClickDay({ date }, days) {
      if (this.readonly) {
        return;
      }
      const { type, currentDate, allowSameDay } = this;
      if (type === 'range') {
        const [startDay, endDay] = currentDate;
        if (startDay && !endDay) {
          const compareToStart = compareDay(date, startDay);
          if (compareToStart === 1) {
            days.some((day, index) => {
              const isDisabled = day.type === 'disabled'
                                && getTime(startDay) < getTime(day.date)
                                && getTime(day.date) < getTime(date);
              if (isDisabled) {
                ({ date } = days[index - 1]);
              }
              return isDisabled;
            });
            this.select([startDay, date], true);
          } else if (compareToStart === -1) {
            this.select([date, null]);
          } else if (allowSameDay) {
            this.select([date, date]);
          }
        } else {
          this.select([date, null]);
        }
      } else if (type === 'multiple') {
        let selectedIndex;
        const selected = currentDate.some((dateItem, index) => {
          const equal = compareDay(dateItem, date) === 0;
          if (equal) {
            selectedIndex = index;
          }
          return equal;
        });
        if (selected) {
          const cancelDate = currentDate.splice(selectedIndex, 1);
          this.currentDate = currentDate;
          this.unselect(cancelDate);
        } else {
          this.select([...currentDate, date]);
        }
      } else {
        this.select(date, true);
      }
    },
    unselect(dateArray) {
      const date = dateArray[0];
      if (date) {
        this.$emit('unselect', copyDates(date));
      }
    },
    select(date, complete) {
      if (complete && this.type === 'range') {
        const valid = this.checkRange(date);
        if (!valid) {
          // auto selected to max range if showConfirm
          if (this.showConfirm) {
            this.emit([
              date[0],
              getDayByOffset(date[0], this.maxRange - 1),
            ]);
          } else {
            this.emit(date);
          }
          return;
        }
      }
      this.emit(date);
      if (complete && !this.showConfirm) {
        this.onConfirm();
      }
    },
    emit(date) {
      this.currentDate = Array.isArray(date) ? date.map(getTime) : getTime(date);
      this.$emit('select', copyDates(date));
    },
    checkRange(date) {
      const { maxRange, rangePrompt, showRangePrompt } = this;
      if (maxRange && calcDateNum(date) > maxRange) {
        if (showRangePrompt) {
          Toast({
            context: this,
            message: rangePrompt || t('calendar.rangePrompt', maxRange),
          });
        }
        this.$emit('over-range');
        return false;
      }
      return true;
    },
    onConfirm() {
      if (this.type === 'range'
                && !this.checkRange(this.currentDate)) {
        return;
      }
      nextTick(() => {
        this.$emit('confirm', copyDates(this.currentDate));
      });
    },
    onClickSubtitle(event) {
      this.$emit('click-subtitle', event);
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
