<template>
  <div class="press-calendar__header">
    <template v-if="showTitle">
      <!-- 【修改点】小程序用empty判断无效，改成v-if/else -->
      <div
        v-if="title"
        class="press-calendar__header-title"
      >
        {{ title }}
      </div>
      <div
        v-else
        class="press-calendar__header-title"
      >
        <slot name="title" />
      </div>
    </template>

    <div
      v-if="showSubtitle"
      class="press-calendar__header-subtitle"
      @click="onClickSubtitle"
    >
      {{ subtitle }}
    </div>

    <div class="press-calendar__weekdays">
      <div
        v-for="(item,index) in (weekdays)"
        :key="index"
        class="press-calendar__weekday"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import { SHARE_PROPS } from '../../share-props';
import { t } from '../../../locale';

export default {
  props: {
    title: SHARE_PROPS.title,
    subtitle: { type: String, default: '' },
    showTitle: SHARE_PROPS.showTitle,
    showSubtitle: SHARE_PROPS.showSubtitle,
    firstDayOfWeek: SHARE_PROPS.firstDayOfWeek,
  },
  data() {
    return {
      weekdays: [],
    };
  },
  watch: {
    firstDayOfWeek: {
      handler() {
        this.initWeekDay();
      },
    },
  },
  created() {
    this.initWeekDay();
  },
  methods: {
    initWeekDay() {
      const defaultWeeks = t('calendar.weekdays');
      const firstDayOfWeek = this.firstDayOfWeek || 0;
      this.weekdays = [
        ...defaultWeeks.slice(firstDayOfWeek, 7),
        ...defaultWeeks.slice(0, firstDayOfWeek),
      ];
    },
    onClickSubtitle(event) {
      this.$emit('click-subtitle', event);
    },
  },
};
</script>
<style platform="mp-weixin" lang="scss">
@import "../../../common/style/index.scss";
@import "../../../common/style/var.scss";

.press-calendar {
  &__header {
    flex-shrink: 0;
    box-shadow: var(--calendar-header-box-shadow, $calendar-header-box-shadow);
  }

  &__header-title,
  &__header-subtitle {
    text-align: center;
    height: var(--calendar-header-title-height, $calendar-header-title-height);
    font-weight: var(--font-weight-bold, $font-weight-bold);
    line-height: var(
      --calendar-header-title-height,
      $calendar-header-title-height
    );
  }

  // 【修改点】去掉empty样式
  // &__header-title:empty,
  // &__header-title + &__header-title {
  //   display: none;
  // }

  // &__header-title:empty + &__header-title {
  //   display: block !important;
  // }

  &__weekdays {
    display: flex;
  }

  &__weekday {
    flex: 1;
    text-align: center;
    font-size: var(--calendar-weekdays-font-size, $calendar-weekdays-font-size);
    line-height: var(--calendar-weekdays-height, $calendar-weekdays-height);
  }
}
</style>
