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
import { t } from '../locale';
import { SHARE_PROPS } from '../press-calendar/share-props';


export default {
  props: {
    title: SHARE_PROPS.title,
    subtitle: { type: String, default: '' },
    showTitle: SHARE_PROPS.showTitle,
    showSubtitle: SHARE_PROPS.showSubtitle,
    firstDayOfWeek: SHARE_PROPS.firstDayOfWeek,
  },
  emits: ['click-subtitle'],
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
<style scoped lang="scss" src="./css/index.scss">
</style>
