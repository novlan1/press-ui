<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <press-cell
        :title="t('selectSingle')"
        is-link
        :value="singleValue"
        @click="onDisplay('single')"
      />
      <press-cell
        :title="t('selectMultiple')"
        is-link
        :value="multipleValue"
        @click="onDisplay('multiple')"
      />
      <press-cell
        :title="t('selectRange')"
        is-link
        :value="rangeValue"
        @click="onDisplay('range')"
      />
    </demo-block>

    <demo-block :title="t('quickSelect')">
      <press-cell
        :title="t('selectSingle')"
        is-link
        :value="singleValue"
        @click="onDisplay('single', false)"
      />

      <press-cell
        :title="t('selectRange')"
        is-link
        :value="rangeValue"
        @click="onDisplay('range', false)"
      />
    </demo-block>

    <demo-block :title="t('customCalendar')">
      <press-cell
        :title="t('customColor')"
        is-link
        :value="singleValue"
        @click="onDisplay('single', true, {
          color: '#07c160'
        })"
      />
      <press-cell
        :title="t('customRange')"
        is-link
        :value="singleValue"
        @click="onDisplay('single', true, {
          minDate: new Date(2010, 0, 1).getTime(),
          maxDate: new Date(2010, 0, 31).getTime(),
        })"
      />
      <press-cell
        :title="t('customConfirm')"
        is-link
        :value="rangeValue"
        @click="onDisplay('range', true, {
          confirmText: t('confirmText'),
          confirmDisabledText: t('confirmDisabledText'),
        })"
      />
      <press-cell
        :title="t('customDayText')"
        is-link
        :value="rangeValue"
        @click="onDisplay('range', true, {
          useFormatter: true,
        })"
      />
      <press-cell
        :title="t('customPosition')"
        is-link
        :value="singleValue"
        @click="onDisplay('single', true, {
          position: 'right'
        })"
      />
      <press-cell
        :title="t('maxRange')"
        is-link
        :value="rangeValue"
        @click="onDisplay('range', true, {
          maxRange: 3
        })"
      />
      <press-cell
        :title="t('firstDayOfWeek')"
        is-link
        :value="singleValue"
        @click="onDisplay('single', true, {
          firstDayOfWeek: 1,
        })"
      />
    </demo-block>

    <press-calendar
      v-if="ifShow"
      :show="show"
      :type="type"
      :show-confirm="showConfirm"
      :color="color"
      :min-date="minDate"
      :max-date="maxDate"
      :confirm-text="confirmText"
      :confirm-disabled-text="confirmDisabledText"
      :formatter="useFormatter ? tFormatter : null"
      :position="position"
      :max-range="maxRange"
      :first-day-of-week="firstDayOfWeek"
      @close="onClose"
      @confirm="onConfirm"
    />

    <demo-block :title="t('tiledDisplay')">
      <press-calendar
        :poppable="false"
        :show-confirm="false"
        custom-class="calendar"
      />
    </demo-block>
  </div>
</template>
<script>
import PressCalendar from 'src/packages/press-calendar/press-calendar.vue';
import PressCell from 'src/packages/press-cell/press-cell.vue';
import { INITIAL_MIX_DATE, INITIAL_MAX_DATE } from 'src/packages/press-calendar/utils';
import { t } from 'src/packages/locale';
import { timeStampFormat } from 'src/packages/common/format/time';

const DEFAULT_DATA = {
  color: '',
  minDate: INITIAL_MIX_DATE,
  maxDate: INITIAL_MAX_DATE,
  confirmText: t('calendar.confirm'),
  confirmDisabledText: t('calendar.confirm'),
  useFormatter: false,
  position: 'bottom',
  maxRange: null,
  firstDayOfWeek: 0,
};
let that = null;


export default {
  i18n: {
    'zh-CN': {
      in: '入店',
      out: '离店',
      today: '今天',
      laborDay: '劳动节',
      youthDay: '青年节',
      calendar: '日历',
      maxRange: '日期区间最大范围',
      selectCount: count => `选择了 ${count} 个日期`,
      selectSingle: '选择单个日期',
      selectMultiple: '选择多个日期',
      selectRange: '选择日期区间',
      quickSelect: '快捷选择',
      confirmText: '完成',
      customColor: '自定义颜色',
      customRange: '自定义日期范围',
      customConfirm: '自定义按钮文字',
      customDayText: '自定义日期文案',
      customPosition: '自定义弹出位置',
      customCalendar: '自定义日历',
      confirmDisabledText: '请选择结束时间',
      firstDayOfWeek: '自定义周起始日',
      tiledDisplay: '平铺展示',
    },
    'en-US': {
      in: 'In',
      out: 'Out',
      today: 'Today',
      laborDay: 'Labor day',
      youthDay: 'Youth Day',
      calendar: 'Calendar',
      maxRange: 'Max Range',
      selectCount: count => `${count} dates selected`,
      selectSingle: 'Select Single Date',
      selectMultiple: 'Select Multiple Date',
      selectRange: 'Select Date Range',
      quickSelect: 'Quick Select',
      confirmText: 'OK',
      customColor: 'Custom Color',
      customRange: 'Custom Date Range',
      customConfirm: 'Custom Confirm Text',
      customDayText: 'Custom Day Text',
      customPosition: 'Custom Position',
      customCalendar: 'Custom Calendar',
      firstDayOfWeek: 'Custom First Day Of Week',
      confirmDisabledText: 'Select End Time',
      tiledDisplay: 'Tiled display',
    },
  },
  components: {
    PressCalendar,
    PressCell,
  },
  data() {
    that = this;
    return {
      show: false,
      ifShow: false,
      type: 'single',
      singleValue: '',
      multipleValue: '',
      rangeValue: '',
      showConfirm: true,

      ...DEFAULT_DATA,
    };
  },
  methods: {
    tFormatter(day) {
      const month = day.date.getMonth() + 1;
      const date = day.date.getDate();

      if (month === 5) {
        if (date === 1) {
          day.topInfo = that.t('laborDay');
        } else if (date === 4) {
          day.topInfo = that.t('youthDay');
        } else if (date === 11) {
          day.topInfo = that.t('today');
        }
      }

      if (day.type === 'start') {
        day.bottomInfo = that.t('in');
      } else if (day.type === 'end') {
        day.bottomInfo = that.t('out');
      }

      return day;
    },
    onDisplay(type, showConfirm = true, options = {}) {
      this.type = type;
      this.showConfirm = showConfirm;

      Object.keys(DEFAULT_DATA).forEach((key) => {
        this[key] = options[key] || DEFAULT_DATA[key];
      });

      this.show = true;
      this.ifShow = true;
    },
    onClose() {
      this.show = false;
      setTimeout(() => {
        this.ifShow = false;
      }, 500);
    },
    formatDate(date) {
      date = new Date(date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(result) {
      console.log('[onConfirm] result: ', result);
      this.onClose();

      if (this.type === 'range') {
        const [start, end] = result;
        this.rangeValue = `${this.formatDate(start)} - ${this.formatDate(end)}`;
        this.onTip([start, end], ' - ');
      } else if (this.type === 'multiple') {
        this.multipleValue = this.t('selectCount', result.length);
        this.onTip(result);
      } else if (this.type === 'single') {
        this.singleValue = this.formatDate(result);
        this.onTip([result]);
      }
    },
    onTip(list, separator = ', ') {
      const formatTime = time => timeStampFormat(time.getTime(), 'yyyy-MM-dd');
      const str = list.map(time => formatTime(time)).join(separator);
      this.onGTip(str, 3000);
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep {
  .calendar {
    --calendar-height: 500px;
  }
}
</style>
