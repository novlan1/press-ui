<template>
  <div class="wrap">
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
  </div>
</template>
<script>

let that;

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
      datehourType: '选择年月日小时',
      monthDayType: '选择月日',
      yearMonthType: '选择年月',
      optionFilter: '选项过滤器',
      sortColumns: '自定义列排序',
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
      datehourType: 'Choose DateHour',
      monthDayType: 'Choose Month-Day',
      yearMonthType: 'Choose Year-Month',
      optionFilter: 'Option Filter',
      sortColumns: 'Columns Order',
    },
  },
  data() {
    return {
      minHour: 10,
      maxHour: 20,
      minDate: new Date().getTime(),
      maxDate: new Date(2099, 10, 1).getTime(),
      currentDate: new Date().getTime(),
      currentTime: '12:00',

      filter(type, options) {
        if (type === 'minute') {
          return options.filter(option => option % 5 === 0);
        }
        return options;
      },


    };
  },
  onLoad() {
    that = this;
    // #ifdef MP-QQ
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'],
    });
    // #endif
  },
  methods: {
    formatter(type, val) {
      const year = that.t('year');
      const month = that.t('month');
      const day = that.t('day');
      const hour = that.t('hour');
      const minute = that.t('minute');

      console.log('type', type, val);
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
      console.log('onInput.event', event);
      this.currentDate = event;
    },
    onInputTime(event) {
      console.log('onInputTime.event', event);
      this.currentTime = event;
    },
  },
};
</script>

<style scoped lang="scss">
// .wrap {
//   padding: 20px;
// }
</style>

