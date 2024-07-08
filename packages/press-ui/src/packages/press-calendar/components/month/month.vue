<template>
  <div
    class="press-calendar__month"
    :style="true ? computed.getMonthStyle(visible, date, rowHeight) : ''"
    :data-date="date"
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
<style scoped lang="scss" src="../../css/month.scss">
</style>
