<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <PressCountTo
        :start-value="30"
        :end-value="500"
        @end="onEnd"
      />
    </demo-block>

    <demo-block :title="t('customStyle')">
      <PressCountTo
        :end-value="3000"
        color="#909399"
        :font-size="30"
        :bold="true"
      />
    </demo-block>

    <demo-block :title="t('duration')">
      <PressCountTo
        :start-value="30"
        :end-value="500"
        :duration="5000"
        @end="onEnd"
      />
    </demo-block>

    <demo-block :title="t('animation')">
      <PressCountTo
        :start-value="30"
        :end-value="500"
        :use-easing="false"
      />
    </demo-block>

    <demo-block :title="t('countdown')">
      <PressCountTo
        :start-value="500"
        :end-value="0"
      />
    </demo-block>


    <demo-block :title="t('decimals')">
      <PressCountTo
        :start-value="30"
        :end-value="500"
        :decimals="2"
        :decimal="1"
      />
    </demo-block>

    <demo-block :title="t('separator')">
      <PressCountTo
        :end-value="5000"
        separator=","
      />
    </demo-block>

    <demo-block :title="t('slot')">
      <PressCountTo
        :end-value="5000"
        :use-slot="true"
        @change="onChange"
      >
        <span style="color: red;">{{ slotValue }}</span>
      </PressCountTo>
    </demo-block>

    <demo-block :title="t('control')">
      <PressCountTo
        ref="pressCountToRef"
        :end-value="5000"
        :autoplay="autoplay"
        @end="onEnd"
      />
    </demo-block>

    <PressGrid
      clickable
      :column-num="3"
    >
      <PressGridItem
        :text="t('start')"
        icon="play-circle-o"
        @click="start"
      />
      <PressGridItem
        :text="t('pause')"
        icon="pause-circle-o"
        @click="pause"
      />
      <PressGridItem
        :text="t('resume')"
        icon="replay"
        @click="resume"
      />
    </PressGrid>
  </div>
</template>
<script>
import PressCountTo from 'press-ui/press-count-to/press-count-to.vue';
import PressGridItem from 'press-ui/press-grid-item/press-grid-item.vue';
import PressGrid from 'press-ui/press-grid/press-grid.vue';


export default {
  i18n: {
    'zh-CN': {
      customStyle: '自定义样式',
      decimals: '小数位',
      separator: '千分位分隔符',
      duration: '自定义持续时间',
      animation: '禁用缓慢动画',
      control: '自定义控制',
      resume: '继续',
      pause: '暂停',
      start: '开始',
      countdown: '倒计时',
      slot: '插槽',
    },
    'en-US': {
      customStyle: 'Custom Style',
      decimals: 'Decimal',
      separator: 'Separator',
      duration: 'Duration',
      animation: 'Animation',
      control: 'Control',
      resume: 'Resume',
      pause: 'Pause',
      start: 'Start',
      countdown: 'Countdown',
      slot: 'Slot',
    },
  },
  components: {
    PressCountTo,
    PressGrid,
    PressGridItem,
  },
  data() {
    return {
      customStyle: 'margin-right: 16px;',
      autoplay: false,
      slotValue: '',
    };
  },
  methods: {
    start() {
      this.$refs.pressCountToRef.start();
    },
    pause() {
      this.$refs.pressCountToRef.stop();
    },
    resume() {
      this.$refs.pressCountToRef.resume();
    },
    onEnd() {
      this.onGTip('[end]');
    },
    onChange(value) {
      this.slotValue = value;
    },
  },
};
</script>
<style scoped lang="scss">
</style>
