<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
    >
      <PressScheduleTab
        :current="currentTab"
        :list="tabList"
        @change="onChangeTab"
      />
    </demo-block>

    <demo-block
      title="多项"
    >
      <PressScheduleTab
        :current="currentTab3"
        :list="tabList3"
        @change="onChangeTab3"
      />
    </demo-block>
  </div>
</template>
<script>
import PressScheduleTab from 'press-ui/press-schedule-tab/press-schedule-tab.vue';


export default {
  components: {
    PressScheduleTab,
  },
  data() {
    return {
      currentTab: 1,
      currentTab3: 'B',
      tabList: [
        { name: '默认规则', key: 1 },
        { name: '自定义规则', key: 2 },
      ],
      tabList3: [
        { name: 'Tab A', key: 'A' },
        { name: 'Tab B', key: 'B' },
        { name: 'Tab C', key: 'C' },
        { name: 'Tab D', key: 'D' },
      ],
    };
  },
  methods: {
    onChangeTab(key) {
      this.currentTab = key;
    },
    onChangeTab3(key) {
      this.currentTab3 = key;
    },
  },
};
</script>
<style scoped lang="scss">
</style>
