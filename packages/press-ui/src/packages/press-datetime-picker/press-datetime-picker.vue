<template>
  <div class="press-datetime-picker-index">
    <press-picker
      ref="pressPicker"
      class="press-datetime-picker"
      :active-class="activeClass"
      :toolbar-class="toolbarClass"
      :column-class="columnClass"
      :title="title"
      :columns="columns"
      :item-height="itemHeight"
      :show-toolbar="showToolbar"
      :visible-item-count="visibleItemCount"
      :confirm-button-text="confirmButtonText"
      :cancel-button-text="cancelButtonText"
      :use-momentum="useMomentum"
      :swipe-duration="swipeDuration"
      @change="onChange"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import PressPicker from '../press-picker-plus/press-picker-plus.vue';
import { isDef } from '../common/utils/validator';
import { pickerProps } from '../press-picker-plus/shared';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { forceUpdate, nextTick } from '../common/vue3/adapter';
import { defaultFormatter, YEAR_AND_MONTH_AND_DATE, YEAR_AND_MONTH, getYearAndMonth } from './helper';


const currentYear = new Date().getFullYear();
function isValidDate(date) {
  return isDef(date) && !isNaN(new Date(date).getTime());
}
function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function padZero(val) {
  return `00${val}`.slice(-2);
}
function times(n, iteratee) {
  let index = 0;
  const result = Array(n < 0 ? 0 : n);

  while (index < n) {
    result[index] = iteratee(index);
    index += 1;
  }
  return result;
}
function getTrueValue(formattedValue) {
  if (formattedValue === undefined) {
    formattedValue = '1';
  }
  while (isNaN(parseInt(formattedValue, 10))) {
    formattedValue = formattedValue.slice(1);
  }
  return parseInt(formattedValue, 10);
}
function getMonthEndDay(year, month) {
  return 32 - new Date(year, month - 1, 32).getDate();
}


export default {
  name: 'PressDatetimePicker',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressPicker,
  },
  props: Object.assign(Object.assign({}, pickerProps), {
    ...defaultProps,
    value: {
      type: null,
    },
    filter: {
      type: [Function, null],
      default: null,
    },
    type: {
      type: String,
      default: 'datetime',
    },
    showToolbar: {
      type: Boolean,
      default: true,
    },
    formatter: {
      type: [Function, null],
      default: defaultFormatter,
    },
    minDate: {
      type: Number,
      default: new Date(currentYear - 10, 0, 1).getTime(),
    },
    maxDate: {
      type: Number,
      default: new Date(currentYear + 10, 11, 31).getTime(),
    },
    minHour: {
      type: Number,
      default: 0,
    },
    maxHour: {
      type: Number,
      default: 23,
    },
    minMinute: {
      type: Number,
      default: 0,
    },
    maxMinute: {
      type: Number,
      default: 59,
    },
    immediateCheck: {
      type: Boolean,
      default: false,
    },
    activeClass: {
      type: String,
      default: '',
    },
    toolbarClass: {
      type: String,
      default: '',
    },
    columnClass: {
      type: String,
      default: '',
    },
    useMomentum: {
      type: Boolean,
      default: false,
    },
    swipeDuration: {
      type: [Number, String],
      default: 1000,
    },
  }),
  emits: ['input', 'input', 'cancel', 'confirm', 'input', 'change'],
  data() {
    return {
      innerValue: Date.now(),
      columns: [],
    };
  },
  watch: {
    value: {
      handler() {
        this.updateValue();
      },
    },
    type: {
      handler() {
        this.updateValue();
      },
    },
    minDate: {
      handler() {
        this.updateValue();
      },
    },
    maxDate: {
      handler() {
        this.updateValue();
      },
    },
    minHour: {
      handler() {
        this.updateValue();
      },
    },
    maxHour: {
      handler() {
        this.updateValue();
      },
    },
    minMinute: {
      handler() {
        this.updateValue();
      },
    },
    maxMinute: {
      handler() {
        this.updateValue();
      },
    },
  },
  mounted() {
    const innerValue = this.correctValue(this.value);
    this.updateColumnValue(innerValue).then(() => {
      if (this.immediateCheck) {
        this.onChange();
      } else {
        this.$emit('input', innerValue);
      }
    });
  },
  methods: {
    setData(data) {
      Object.keys(data).forEach((key) => {
        this[key] = data[key];
      });
    },
    set(data) {
      this.setData(data);
      forceUpdate(this);

      // eslint-disable-next-line vue/valid-next-tick
      return new Promise(resolve => nextTick(resolve));
    },
    updateValue() {
      const val = this.correctValue(this.value);
      const isEqual = val === this.innerValue;
      this.updateColumnValue(val).then(() => {
        if (!isEqual) {
          this.$emit('input', val);
        }
      });
    },
    getPicker() {
      if (this.picker == null) {
        this.picker = this.$refs.pressPicker;
        const { picker } = this;
        const { setColumnValues } = picker;
        picker.setColumnValues = (...args) => setColumnValues.apply(picker, [...args, false]);
      }
      return this.picker;
    },
    updateColumns() {
      const formatter = this.formatter || defaultFormatter;
      const results = this.getOriginColumns().map(column => ({
        values: column.values.map(value => formatter(column.type, value, this.innerValue)),
      }));
      return this.set({ columns: results });
    },
    getOriginColumns() {
      const { filter, innerValue } = this;
      const results = this.getRanges().map(({ type, range }) => {
        let values = times(range[1] - range[0] + 1, (index) => {
          const value = range[0] + index;
          return (type === 'year' || type === YEAR_AND_MONTH) ? `${value}` : padZero(value);
        });
        if (filter) {
          values = filter(type, values, innerValue);
        }
        return { type, values };
      });
      return results;
    },
    getRanges() {
      if (this.type === 'time') {
        return [
          {
            type: 'hour',
            range: [this.minHour, this.maxHour],
          },
          {
            type: 'minute',
            range: [this.minMinute, this.maxMinute],
          },
        ];
      }
      const { maxYear, maxDate, maxMonth, maxHour, maxMinute, maxYearMonth } = this.getBoundary('max', this.innerValue);
      const { minYear, minDate, minMonth, minHour, minMinute, minYearMonth } = this.getBoundary('min', this.innerValue);
      const result = [
        {
          type: 'year',
          range: [minYear, maxYear],
        },
        {
          type: 'month',
          range: [minMonth, maxMonth],
        },
        {
          type: 'day',
          range: [minDate, maxDate],
        },
        {
          type: 'hour',
          range: [minHour, maxHour],
        },
        {
          type: 'minute',
          range: [minMinute, maxMinute],
        },
      ];
      if (this.type === 'date') result.splice(3, 2);
      if (this.type === 'year-month') result.splice(2, 3);

      if (this.type === YEAR_AND_MONTH_AND_DATE) {
        const tResult =  [
          {
            type: YEAR_AND_MONTH,
            range: [minYearMonth, maxYearMonth],
          },
          {
            type: 'day',
            range: [minDate, maxDate],
          },
          {
            type: 'hour',
            range: [minHour, maxHour],
          },
          {
            type: 'minute',
            range: [minMinute, maxMinute],
          },
        ];

        return tResult;
      }

      return result;
    },
    correctValue(value) {
      // validate value
      const isDateType = this.type !== 'time';
      if (isDateType && !isValidDate(value)) {
        value = this.minDate;
      } else if (!isDateType && !value) {
        const { minHour } = this;
        value = `${padZero(minHour)}:00`;
      }

      // time type
      if (!isDateType) {
        let [hour, minute] = value.split(':');
        hour = padZero(range(hour, this.minHour, this.maxHour));
        minute = padZero(range(minute, this.minMinute, this.maxMinute));
        return `${hour}:${minute}`;
      }

      // date type
      value = Math.max(value, this.minDate);
      value = Math.min(value, this.maxDate);
      return value;
    },
    getBoundary(type, innerValue) {
      const value = new Date(innerValue);
      const boundary = new Date(this[`${type}Date`]);
      const year = boundary.getFullYear();
      let month = 1;
      let date = 1;
      let hour = 0;
      let minute = 0;

      if (type === 'max') {
        month = 12;
        date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
        hour = 23;
        minute = 59;
      }

      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1;
        if (value.getMonth() + 1 === month) {
          date = boundary.getDate();
          if (value.getDate() === date) {
            hour = boundary.getHours();
            if (value.getHours() === hour) {
              minute = boundary.getMinutes();
            }
          }
        }
      }

      const yearMonth = year * 12 + month;

      return {
        [`${type}Year`]: year,
        [`${type}Month`]: month,
        [`${type}Date`]: date,
        [`${type}Hour`]: hour,
        [`${type}Minute`]: minute,
        [`${type}YearMonth`]: yearMonth,
      };
    },
    onCancel() {
      this.$emit('cancel');
    },
    onConfirm() {
      this.$emit('confirm', this.innerValue);
    },
    onChange() {
      let value;
      const picker = this.getPicker();
      const originColumns = this.getOriginColumns();

      if (this.type === 'time') {
        const indexes = picker.getIndexes();
        value = `${+originColumns[0].values[indexes[0]]}:${+originColumns[1]
          .values[indexes[1]]}`;
      } else {
        const indexes = picker.getIndexes();
        const values = indexes.map((value, index) => originColumns[index].values[value]);

        let year = getTrueValue(values[0]);
        let month = getTrueValue(values[1]);
        const maxDate = getMonthEndDay(year, month);

        let date = getTrueValue(values[2]);
        if (this.type === 'year-month') {
          date = 1;
        }


        date = date > maxDate ? maxDate : date;
        let hour = 0;
        let minute = 0;
        if (this.type === 'datetime') {
          hour = getTrueValue(values[3]);
          minute = getTrueValue(values[4]);
        }


        if (this.type === YEAR_AND_MONTH_AND_DATE) {
          const info = getYearAndMonth(values[0]);
          year = info.year;
          month = info.month;
          date = getTrueValue(values[1]);
          hour = getTrueValue(values[2]);
          minute = getTrueValue(values[3]);
        }

        value = new Date(year, month - 1, date, hour, minute);
      }

      value = this.correctValue(value);

      this.updateColumnValue(value).then(() => {
        this.$emit('input', value);
        this.$emit('change', picker);
      });
    },
    updateColumnValue(value) {
      let values = [];
      const { type, innerValue } = this;
      const formatter = this.formatter || defaultFormatter;
      const picker = this.getPicker();

      if (type === 'time') {
        const pair = value.split(':');
        values = [formatter('hour', pair[0], innerValue), formatter('minute', pair[1])];
      } else {
        const date = new Date(value);
        values = [
          formatter('year', `${date.getFullYear()}`, innerValue),
          formatter('month', padZero(date.getMonth() + 1), innerValue),
        ];

        if (type === 'date') {
          values.push(formatter('day', padZero(date.getDate()), innerValue));
        }

        if (type === 'datetime') {
          values.push(
            formatter('day', padZero(date.getDate()), innerValue),
            formatter('hour', padZero(date.getHours()), innerValue),
            formatter('minute', padZero(date.getMinutes()), innerValue),
          );
        }

        if (type === YEAR_AND_MONTH_AND_DATE) {
          values = [
            formatter(YEAR_AND_MONTH, date.getFullYear() * 12 + date.getMonth() + 1, innerValue),
            formatter('day', padZero(date.getDate()), innerValue),
            formatter('hour', padZero(date.getHours()), innerValue),
            formatter('minute', padZero(date.getMinutes()), innerValue),
          ];
        }
      }

      return this.set({ innerValue: value })
        .then(() => this.updateColumns())
        .then(() => picker.setValues(values));
    },
  },
};

</script>
<style scoped lang="scss">
</style>
