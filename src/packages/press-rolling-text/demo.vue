<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
    >
      <PressRollingText
        ref="rollingText"
        :start-num="0"
        :target-num="123"
        :auto-start="false"
      />
      <div class="button-wrap">
        <PressButton
          type="primary"
          size="small"
          @click="startRoll('rollingText')"
        >
          {{ t('rollDown') }}
        </PressButton>
      </div>
    </demo-block>

    <demo-block :title="t('direction')">
      <PressRollingText
        ref="rollingText2"
        :start-num="0"
        :target-num="432"
        direction="up"
        :auto-start="false"
      />
      <div class="button-wrap">
        <PressButton
          type="primary"
          size="small"
          @click="startRoll('rollingText2')"
        >
          {{ t('rollUp') }}
        </PressButton>
      </div>
    </demo-block>

    <demo-block :title="t('stopOrder')">
      <PressRollingText
        ref="rollingText3"
        :start-num="0"
        :target-num="54321"
        :auto-start="false"
        stop-order="rtl"
      />
      <div class="button-wrap">
        <PressButton
          type="primary"
          size="small"
          @click="startRoll('rollingText3')"
        >
          {{ t('stopFrom') }}
        </PressButton>
      </div>
    </demo-block>

    <demo-block :title="t('noNumberType')">
      <PressRollingText
        ref="rollingText4"
        :text-list="textList"
        :auto-start="false"
        :duration="1"
      />
      <div class="button-wrap">
        <PressButton
          type="primary"
          size="small"
          @click="startRoll('rollingText4')"
        >
          {{ t('start') }}
        </PressButton>
      </div>
    </demo-block>

    <demo-block :title="t('customStyle')">
      <PressRollingText
        ref="rollingText5"
        custom-class="my-rolling-text"
        :height="54"
        :start-num="12345"
        :target-num="54321"
      />
    </demo-block>

    <demo-block :title="t('manualControl')">
      <PressRollingText
        ref="rollingText6"
        :height="54"
        custom-class="my-rolling-text"
        :start-num="0"
        :target-num="54321"
        :auto-start="false"
      />
    </demo-block>

    <PressGrid
      clickable
      custom-class="grid-wrap"
      :column-num="2"
    >
      <PressGridItem
        :text="t('start')"
        icon="play-circle-o"
        @click="start"
      />
      <PressGridItem
        :text="t('reset')"
        icon="replay"
        @click="reset"
      />
    </PressGrid>
  </div>
</template>
<script>
import PressButton from 'press-ui/press-button/press-button.vue';
import PressGridItem from 'press-ui/press-grid-item/press-grid-item.vue';
import PressGrid from 'press-ui/press-grid/press-grid.vue';
import PressRollingText from 'press-ui/press-rolling-text/press-rolling-text.vue';


const textList = [
  'aaaaa',
  'bbbbb',
  'ccccc',
  'ddddd',
  'eeeee',
  'fffff',
  'ggggg',
];


export default {
  i18n: {
    'zh-CN': {
      direction: '设置翻滚方向',
      stopOrder: '设置各数位停止顺序',
      rollDown: '向下翻滚',
      rollUp: '向上翻滚',
      stopFrom: '从个位停止',
      manualControl: '手动控制',
      customStyle: '自定义样式',
      noNumberType: '翻转非数字内容',
      start: '开始',
      reset: '重置',
    },
    'en-US': {
      direction: 'Set Rolling Direction',
      stopOrder: 'Set Stop Order',
      rollDown: 'Roll Down',
      rollUp: 'Roll Up',
      stopFrom: 'Right Side Stop First',
      manualControl: 'Manual Control',
      customStyle: 'Custom Style',
      noNumberType: 'Roll Non-numeric Text',
      start: 'Start',
      reset: 'Reset',
    },
  },
  components: {
    PressRollingText,
    PressButton,
    PressGrid,
    PressGridItem,
  },
  data() {
    return {
      textList,
    };
  },
  methods: {
    startRoll(ref) {
      this.$refs[ref].reset();
      setTimeout(() => {
        this.$refs[ref].start();
      });
    },
    start() {
      this.$refs.rollingText6.start();
    },
    reset() {
      this.$refs.rollingText6.reset();
    },
  },
};
</script>
<style scoped lang="scss">
.button-wrap {
  margin: 10px 0;
}
.grid-wrap {
  margin-top: 10px;
}
</style>
<style lang="scss">
.my-rolling-text {
  --press-rolling-text-background: #07c160;
  --press-rolling-text-color: white;
  --press-rolling-text-font-size: 24px;
  --press-rolling-text-gap: 6px;
  --press-rolling-text-item-border-radius: 5px;
  --press-rolling-text-item-width: 40px;
}
</style>
