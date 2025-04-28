<template>
  <div class="demo-wrap">
    <demo-block :title="t('datetimeType')">
      <PressDatetimePicker
        type="datetime"
        :value="currentDate"
        :min-date="minDate"
        :max-date="maxDate"
        @input="onInput"
      />
    </demo-block>

    <demo-block
      :title="t('dateType')"
    >
      <PressDatetimePicker
        type="date"
        :value="currentDate"
        :min-date="minDate"
        :formatter="formatter"
        @input="onInput"
      />
    </demo-block>

    <demo-block :title="t('yearMonthType')">
      <PressDatetimePicker
        type="year-month"
        :value="currentDate"
        :min-date="minDate"
        @input="onInput"
      />
    </demo-block>

    <demo-block :title="t('timeType')">
      <PressDatetimePicker
        type="time"
        :value="currentTime"
        :min-hour="minHour"
        :max-hour="maxHour"
        @input="onInputTime"
      />
    </demo-block>

    <demo-block :title="t('optionFilter')">
      <PressDatetimePicker
        type="time"
        :value="currentTime"
        :filter="filter"
        @input="onInputTime"
      />
    </demo-block>

    <demo-block :title="t('yearMonth')">
      <PressDatetimePicker
        type="yearMonth-day-hour-minute"
        :value="currentDate"
        :min-date="minDate"
        :max-date="yearMonthMaxDate"
        :formatter="yearMonthFormatter"
        @input="onInput"
      />
    </demo-block>

    <demo-block
      :title="t('withPopupPlus')"
    >
      <PressCell
        :title="t('check')"
        is-link
        @click="onShowPopupPlus"
      />
    </demo-block>

    <demo-block
      :title="t('withPopup')"
    >
      <PressCell
        :title="t('functional')"
        is-link
        @click="onShowFunctionalPicker"
      />
    </demo-block>

    <PressDatetimePickerPopup
      :id="DATE_TIME_PICKER_ID"
      :ref="DATE_TIME_PICKER_ID"
      mode="functional"
    />

    <PressDatetimePickerPopupPlus
      :show="popupPlus.show"
      :datetime-picker="popupPlus.datetimePicker"
      :formatter="formatter"
      :filter="filter"
      :close-on-click-overlay="popupPlus.closeOnClickOverlay"
      @cancel="popupPlus.show = false"
      @confirm="onConfirm"
      @input="onInput"
    />
  </div>
</template>
<script>
import { timeStampFormat } from 'press-ui/common/format/time';
import { showFunctionalComponent } from 'press-ui/common/functional-component/index';
import PressCell from 'press-ui/press-cell/press-cell.vue';

import { getYearAndMonth } from 'press-ui/press-datetime-picker/helper';

import PressDatetimePickerPopupPlus from 'press-ui/press-datetime-picker/press-datetime-picker-popup-plus.vue';
import PressDatetimePickerPopup from 'press-ui/press-datetime-picker/press-datetime-picker-popup.vue';
import PressDatetimePicker from 'press-ui/press-datetime-picker/press-datetime-picker.vue';


let that;
const DATE_TIME_PICKER_ID = 'press-picker-functional';
const ONE_YEAR_MIL_SECONDS = 1000 * 60 * 60 * 24 * 365;


const getDayDesc = (val, day, innerValue) => {
  const curDate = new Date(innerValue);
  const selectedYear = curDate.getFullYear();
  const selectedMonth = curDate.getMonth() + 1;

  // ios 对时间 a.b.c 的时间处理不兼容 导致 undefined 问题
  const selected = `${selectedYear}/${selectedMonth}/${val}`;
  const selectedTime = new Date(selected);

  const selectedDay = selectedTime.getDay();
  const selectedDate = selectedTime.getDate();

  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nowDate = now.getDate();

  const isToday = selectedYear === nowYear && selectedMonth === nowMonth && selectedDate === nowDate;
  if (isToday) {
    return '今日';
  }

  const map = {
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六',
    0: '周日',
  };

  return `${val}${day} ${map[selectedDay]}`;
};


export default {
  i18n: {
    'zh-CN': {
      day: '日',
      year: '年',
      month: '月',
      hour: '时',
      minute: '分',
      timeType: '选择时间',
      dateType: '选择年月日',
      datetimeType: '选择完整时间',
      dateHourType: '选择年月日小时',
      monthDayType: '选择月日',
      yearMonthType: '选择年月',
      optionFilter: '选项过滤器',
      yearMonth: '年月合并',
      sortColumns: '自定义列排序',
      withPopup: '结合Popup',
      withPopupPlus: '结合 PopupPlus',
      functional: '函数式调用',
    },
    'en-US': {
      day: ' Day',
      year: ' Year',
      month: ' Month',
      hour: 'Hour',
      minute: 'Minute',
      timeType: 'Choose Time',
      dateType: 'Choose Date',
      datetimeType: 'Choose DateTime',
      dateHourType: 'Choose DateHour',
      monthDayType: 'Choose Month-Day',
      yearMonthType: 'Choose Year-Month',
      optionFilter: 'Option Filter',
      yearMonth: 'Year With Month',
      sortColumns: 'Columns Order',
      withPopup: 'With Popup',
      withPopupPlus: 'With PopupPlus',
      functional: 'Functional Mode',
    },
  },
  components: {
    PressDatetimePicker,
    PressDatetimePickerPopup,
    PressCell,
    PressDatetimePickerPopupPlus,
  },
  data() {
    that = this;
    const minDate = new Date().getTime();
    const maxDate = new Date(2036, 10, 1).getTime();
    const yearMonthMaxDate = new Date(2036, 10, 1).getTime();

    return {
      minHour: 10,
      maxHour: 20,
      minDate,
      maxDate,
      yearMonthMaxDate,
      currentDate: new Date().getTime(),
      currentTime: '12:00',

      filter(type, options) {
        if (type === 'minute') {
          return options.filter(option => option % 5 === 0);
        }
        return options;
      },
      DATE_TIME_PICKER_ID,
      datetimePicker: {
        value: new Date().getTime(),
        minDate: new Date().getTime() - ONE_YEAR_MIL_SECONDS,
        maxDate: new Date().getTime() + ONE_YEAR_MIL_SECONDS,
        input(event) {
          that.onInput(event);
        },
      },
      popupPlus: {
        show: false,
        closeOnClickOverlay: true,
        datetimePicker: {
          showToolbar: true,
          minDate,
          maxDate,
          title: '选择时间',
        },
      },
    };
  },
  methods: {
    formatter(type, val) {
      const year = that.t('year');
      const month = that.t('month');
      const day = that.t('day');
      const hour = that.t('hour');
      const minute = that.t('minute');

      if (type === 'year') {
        return `${val}${year}`;
      } if (type === 'month') {
        return `${val}${month}`;
      } if (type === 'day') {
        return `${val}${day}`;
      } if (type === 'hour') {
        return `${val}${hour}`;
      } if (type === 'minute') {
        return `${val}${minute}`;
      }
    },
    yearMonthFormatter(type, val, innerValue) {
      const yearDesc = that.t('year');
      const monthDesc = that.t('month');
      const dayDesc = that.t('day');
      const hourDesc = that.t('hour');
      const minuteDesc = that.t('minute');

      const { year, month } = getYearAndMonth(val);


      if (type === 'yearMonth') {
        return `${`${year}`.slice(2, 4)}${yearDesc}${month}${monthDesc}`;
      }

      if (type === 'day') {
        return getDayDesc(val, dayDesc, innerValue);
      }
      if (type === 'hour') {
        return `${val}${hourDesc}`;
      }
      if (type === 'minute') {
        return `${val}${minuteDesc}`;
      }
    },
    onInput(event) {
      this.currentDate = event;
      this.onTip(`${timeStampFormat(event, 'yyyy-MM-dd hh:mm')}`);
    },
    onInputTime(event) {
      this.currentTime = event;
      this.onTip(event);
    },
    onShowFunctionalPicker() {
      let inputValue = '';
      showFunctionalComponent.call(this, {
        context: this,
        selector: `#${DATE_TIME_PICKER_ID}`,
        title: this.t('timeType'),
        button: this.t('confirm'),
        horizontal: false,
        closeIcon: false,
        arrowIcon: false,
        borderButton: false,
        customStyle: '',
        datetimePicker: {
          value: new Date().getTime(),
          minDate: new Date().getTime() - ONE_YEAR_MIL_SECONDS,
          maxDate: new Date().getTime() + ONE_YEAR_MIL_SECONDS,
          input(event) {
            that.onInput(event);
            inputValue = event;
            console.log('inputValue', inputValue);
          },
        },
      }).then((resp = {}) => {
        const { context } = resp;
        console.log('inputValue', inputValue);
        this.onTip('confirm');
        context.innerShow = false;
      })
        .catch((err = {}) => {
          const { context } = err;
          this.onTip('cancel');
          context.innerShow = false;
        });
    },
    confirm() {

    },
    cancel() {

    },
    onTip(title) {
      this.onGTip(`${title}`, 1500);
    },
    onShowPopupPlus() {
      this.popupPlus.show = true;
    },
    onConfirm(value) {
      this.popupPlus.show = false;
      console.log('[confirm]', value);
      this.onInput(value);
    },
  },
};
</script>

<style scoped lang="scss">
</style>

