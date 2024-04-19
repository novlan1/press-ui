<template>
  <div class="demo-wrap">
    <demo-block :title="t('datetimeType')">
      <press-datetime-picker
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
      <press-datetime-picker
        type="date"
        :value="currentDate"
        :min-date="minDate"
        :formatter="formatter"
        @input="onInput"
      />
    </demo-block>

    <demo-block :title="t('yearMonthType')">
      <press-datetime-picker
        type="year-month"
        :value="currentDate"
        :min-date="minDate"
        @input="onInput"
      />
    </demo-block>

    <demo-block :title="t('timeType')">
      <press-datetime-picker
        type="time"
        :value="currentTime"
        :min-hour="minHour"
        :max-hour="maxHour"
        @input="onInputTime"
      />
    </demo-block>

    <demo-block :title="t('optionFilter')">
      <press-datetime-picker
        type="time"
        :value="currentTime"
        :filter="filter"
        @input="onInputTime"
      />
    </demo-block>

    <demo-block
      :title="t('withPopupPlus')"
    >
      <press-cell
        :title="t('check')"
        is-link
        @click="onShowPopupPlus"
      />
    </demo-block>

    <demo-block
      :title="t('withPopup')"
    >
      <press-cell
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
import PressDatetimePicker from 'src/packages/press-datetime-picker/press-datetime-picker.vue';
import PressCell from 'src/packages/press-cell/press-cell.vue';
import PressDatetimePickerPopup from 'src/packages/press-datetime-picker/press-datetime-picker-popup.vue';
import PressDatetimePickerPopupPlus from 'src/packages/press-datetime-picker/press-datetime-picker-popup-plus.vue';


import { timeStampFormat } from 'src/packages/common/format/time';
import { showFunctionalComponent } from 'src/packages/common/functional-component/index';


let that;
const DATE_TIME_PICKER_ID = 'press-picker-functional';
const ONE_YEAR_MIL_SECONDS = 1000 * 60 * 60 * 24 * 365;

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
    const maxDate = new Date(2099, 10, 1).getTime();

    return {
      minHour: 10,
      maxHour: 20,
      minDate,
      maxDate,
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

