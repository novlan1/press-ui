<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
      :section-style="sectionStyle"
    >
      <press-count-down :time="time" />
    </demo-block>

    <demo-block
      :title="t('customFormat')"
      :section-style="sectionStyle"
    >
      <press-count-down
        :time="time"
        :format="t('formatWithDay')"
      />
    </demo-block>

    <demo-block
      :title="t('millisecond')"
      :section-style="sectionStyle"
    >
      <press-count-down
        :time="time"
        millisecond
        format="HH:mm:ss:SSS"
      />
    </demo-block>

    <demo-block
      :title="t('customStyle')"
      :section-style="sectionStyle"
    >
      <press-count-down
        use-slot
        :time="time"
        @change="onChange"
      >
        <span class="item">
          {{ timeData.hours }}
        </span>
        <span class="item">
          {{ timeData.minutes }}
        </span>
        <span class="item">
          {{ timeData.seconds }}
        </span>
      </press-count-down>
    </demo-block>

    <demo-block
      :title="t('manualControl')"
      :section-style="sectionStyle"
    >
      <press-count-down
        id="controlCountDown"
        ref="controlCountDown"
        millisecond
        :time="3000"
        :auto-start="false"
        format="ss:SSS"
        @finish="finished"
      />
    </demo-block>

    <press-grid
      clickable
      :column-num="3"
    >
      <press-grid-item
        :text="t('start')"
        icon="play-circle-o"
        @click="start"
      />
      <press-grid-item
        :text="t('pause')"
        icon="pause-circle-o"
        @click="pause"
      />
      <press-grid-item
        :text="t('reset')"
        icon="replay"
        @click="reset"
      />
    </press-grid>
  </div>
</template>
<script>
import PressCountDown from 'src/packages/press-count-down/press-count-down.vue';
import PressGrid from 'src/packages/press-grid/press-grid.vue';
import PressGridItem from 'src/packages/press-grid-item/press-grid-item.vue';
import { selectComponent } from 'src/packages/common/functional-component';


export default {
  i18n: {
    'zh-CN': {
      millisecond: '毫秒级渲染',
      customStyle: '自定义样式',
      customFormat: '自定义格式',
      manualControl: '手动控制',
      formatWithDay: 'DD 天 HH 时 mm 分 ss 秒',
      reset: '重置',
      pause: '暂停',
      start: '开始',
      finished: '倒计时结束',
    },
    'en-US': {
      millisecond: 'Millisecond',
      customStyle: 'Custom Style',
      customFormat: 'Custom Format',
      manualControl: 'Manual Control',
      formatWithDay: 'DD Day, HH:mm:ss',
      reset: 'Reset',
      pause: 'Pause',
      start: 'Start',
      finished: 'Finished',
    },
  },

  components: {
    PressCountDown,
    PressGrid,
    PressGridItem,
  },
  data() {
    return {
      time: 30 * 60 * 60 * 1000,
      timeData: {},
      sectionStyle: 'margin: 0 12px 20px;',
    };
  },
  methods: {
    onChange(val) {
      this.timeData = val;
    },
    start() {
      const countDown = selectComponent(this, '#controlCountDown');
      // #ifdef H5
      countDown.start();
      // #endif
      // #ifndef H5
      countDown.$vm.start();
      // #endif
    },

    pause() {
      const countDown = selectComponent(this, '#controlCountDown');
      // #ifdef H5
      countDown.pause();
      // #endif
      // #ifndef H5
      countDown.$vm.pause();
      // #endif
    },

    reset() {
      const countDown = selectComponent(this, '#controlCountDown');
      // #ifdef H5
      countDown.reset();
      // #endif
      // #ifndef H5
      countDown.$vm.reset();
      // #endif
    },
    finished() {

    },
  },
};
</script>
<style scoped lang="scss">
.item {
  display: inline-block;
  width: 22px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #1989fa;
  border-radius: 2px;
}
</style>
