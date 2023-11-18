<template>
  <div
    class="press-calendar__month"
    :style="true ? computed.getMonthStyle(visible, date, rowHeight) : ''"
  >
    <div
      v-if="showMonthTitle"
      class="press-calendar__month-title"
    >
      {{ computed.formatMonthTitle(date) }}
    </div>

    <div
      v-if="visible"
      class="press-calendar__days"
    >
      <div
        v-if="showMark"
        class="press-calendar__month-mark"
      >
        {{ computed.getMark(date) }}
      </div>

      <div
        v-for="(item,index) in (days)"
        :key="index"
        :style="true ? computed.getDayStyle(item.type, index, date, rowHeight, color, firstDayOfWeek) : ''"
        :class="true ? (utils.bem2('calendar__day', [item.type]))+' '+(item.className) : ''"
        :data-index="index"
        @click="onClick(index)"
      >
        <div
          v-if="item.type === 'selected'"
          class="press-calendar__selected-day"
          :style="'width: '+(rowHeight)+'px; height: '+(rowHeight)+'px; background: '+(color)"
        >
          <div
            v-if="item.topInfo"
            class="press-calendar__top-info"
          >
            {{ item.topInfo }}
          </div>
          {{ item.text }}
          <div
            v-if="item.bottomInfo"
            class="press-calendar__bottom-info"
          >
            {{ item.bottomInfo }}
          </div>
        </div>

        <div v-else>
          <div
            v-if="item.topInfo"
            class="press-calendar__top-info"
          >
            {{ item.topInfo }}
          </div>
          {{ item.text }}
          <div
            v-if="item.bottomInfo"
            class="press-calendar__bottom-info"
          >
            {{ item.bottomInfo }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from './computed';
import utils from '../../../common/utils/utils';
import { getMonthEndDay, compareDay, getPrevDay, getNextDay } from '../../utils';
import { SHARE_PROPS } from '../../share-props';
import { t } from '../../../locale';

export default {
  props: {
    date: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    color: SHARE_PROPS.color,
    minDate: SHARE_PROPS.minDate,
    maxDate: SHARE_PROPS.maxDate,
    showMark: SHARE_PROPS.showMark,
    rowHeight: SHARE_PROPS.rowHeight,
    formatter: SHARE_PROPS.formatter,
    currentDate: {
      type: [String, Number, Array],
      default: '',
    },
    firstDayOfWeek: SHARE_PROPS.firstDayOfWeek,
    allowSameDay: SHARE_PROPS.allowSameDay,
    showSubtitle: SHARE_PROPS.showSubtitle,
    showMonthTitle: Boolean,
  },
  emits: ['click'],
  data() {
    return {
      visible: true,
      days: [],

      computed,
      utils,
    };
  },
  watch: {
    date: {
      handler() {
        this.setDays();
      },
    },
    type: {
      handler() {
        this.setDays();
      },
    },
    minDate: {
      handler() {
        this.setDays();
      },
    },
    maxDate: {
      handler() {
        this.setDays();
      },
    },
    formatter: {
      handler() {
        this.setDays();
      },
    },
    currentDate: {
      handler() {
        this.setDays();
      },
    },
    firstDayOfWeek: {
      handler() {
        this.setDays();
      },
    },
  },
  mounted() {
    this.setDays();
  },
  methods: {
    onClick(index) {
      const item = this.days[index];
      if (item.type !== 'disabled') {
        this.$emit('click', item, this.days);
      }
    },
    setDays() {
      const days = [];
      const startDate = new Date(this.date);
      const year = startDate.getFullYear();
      const month = startDate.getMonth();
      const totalDay = getMonthEndDay(startDate.getFullYear(), startDate.getMonth() + 1);
      for (let day = 1; day <= totalDay; day++) {
        const date = new Date(year, month, day);
        const type = this.getDayType(date);
        let config = {
          date,
          type,
          text: day,
          bottomInfo: this.getBottomInfo(type),
        };

        if (this.formatter) {
          config = this.formatter(config);
        }
        days.push(config);
      }
      this.days = days;
    },
    getMultipleDayType(day) {
      const { currentDate } = this;
      if (!Array.isArray(currentDate)) {
        return '';
      }
      const isSelected = date => currentDate.some(item => compareDay(item, date) === 0);
      if (isSelected(day)) {
        const prevDay = getPrevDay(day);
        const nextDay = getNextDay(day);
        const prevSelected = isSelected(prevDay);
        const nextSelected = isSelected(nextDay);
        if (prevSelected && nextSelected) {
          return 'multiple-middle';
        }
        if (prevSelected) {
          return 'end';
        }
        return nextSelected ? 'start' : 'multiple-selected';
      }
      return '';
    },
    getRangeDayType(day) {
      const { currentDate, allowSameDay } = this;
      if (!Array.isArray(currentDate)) {
        return '';
      }
      const [startDay, endDay] = currentDate;
      if (!startDay) {
        return '';
      }
      const compareToStart = compareDay(day, startDay);
      if (!endDay) {
        return compareToStart === 0 ? 'start' : '';
      }
      const compareToEnd = compareDay(day, endDay);
      if (compareToStart === 0 && compareToEnd === 0 && allowSameDay) {
        return 'start-end';
      }
      if (compareToStart === 0) {
        return 'start';
      }
      if (compareToEnd === 0) {
        return 'end';
      }
      if (compareToStart > 0 && compareToEnd < 0) {
        return 'middle';
      }
      return '';
    },
    getDayType(day) {
      const { type, minDate, maxDate, currentDate } = this;
      if (compareDay(day, minDate) < 0 || compareDay(day, maxDate) > 0) {
        return 'disabled';
      }
      if (type === 'single') {
        return compareDay(day, currentDate) === 0 ? 'selected' : '';
      }
      if (type === 'multiple') {
        return this.getMultipleDayType(day);
      }
      if (type === 'range') {
        return this.getRangeDayType(day);
      }
      return '';
    },
    getBottomInfo(type) {
      if (this.type === 'range') {
        if (type === 'start') {
          return t('calendar.start');
        }
        if (type === 'end') {
          return t('calendar.end');
        }
        if (type === 'start-end') {
          return t('calendar.startEnd');
        }
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../../common/style/index.scss";
@import "../../../common/style/var.scss";

.press-calendar {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(
    --calendar-background-color,
    $calendar-background-color
  );

  &__month-title {
    text-align: center;
    height: var(--calendar-header-title-height, $calendar-header-title-height);
    font-weight: var(--font-weight-bold, $font-weight-bold);
    font-size: var(
      --calendar-month-title-font-size,
      $calendar-month-title-font-size
    );
    line-height: var(
      --calendar-header-title-height,
      $calendar-header-title-height
    );
  }

  &__days {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    user-select: none;
  }

  &__month-mark {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 0;
    transform: translate(-50%, -50%);
    pointer-events: none;
    color: var(--calendar-month-mark-color, $calendar-month-mark-color);
    font-size: var(
      --calendar-month-mark-font-size,
      $calendar-month-mark-font-size
    );
  }

  &__day,
  &__selected-day {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  &__day {
    position: relative;
    width: 14.285%;
    height: var(--calendar-day-height, $calendar-day-height);
    font-size: var(--calendar-day-font-size, $calendar-day-font-size);

    &--end,
    &--start,
    &--start-end,
    &--multiple-middle,
    &--multiple-selected {
      color: var(--calendar-range-edge-color, $calendar-range-edge-color);
      background-color: var(
        --calendar-range-edge-background-color,
        $calendar-range-edge-background-color
      );
    }

    &--start {
      border-radius: $border-radius-md 0 0 $border-radius-md;
    }

    &--end {
      border-radius: 0 $border-radius-md $border-radius-md 0;
    }

    &--start-end,
    &--multiple-selected {
      border-radius: $border-radius-md;
    }

    &--middle {
      color: var(--calendar-range-middle-color, $calendar-range-middle-color);

      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: currentColor;
        content: "";
        opacity: var(
          --calendar-range-middle-background-opacity,
          $calendar-range-middle-background-opacity
        );
      }
    }

    &--disabled {
      cursor: default;
      color: var(--calendar-day-disabled-color, $calendar-day-disabled-color);
    }
  }

  &__top-info,
  &__bottom-info {
    position: absolute;
    right: 0;
    left: 0;
    font-size: var(--calendar-info-font-size, $calendar-info-font-size);
    line-height: var(--calendar-info-line-height, $calendar-info-line-height);

    @media (max-width: 350px) {
      font-size: 9px;
    }
  }

  &__top-info {
    top: 6px;
  }

  &__bottom-info {
    bottom: 6px;
  }

  &__selected-day {
    width: var(--calendar-selected-day-size, $calendar-selected-day-size);
    height: var(--calendar-selected-day-size, $calendar-selected-day-size);
    color: var(--calendar-selected-day-color, $calendar-selected-day-color);
    background-color: var(
      --calendar-selected-day-background-color,
      $calendar-selected-day-background-color
    );
    border-radius: $border-radius-md;
  }
}
</style>
