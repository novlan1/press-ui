<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
    >
      <PressBarrage v-model="list">
        <div
          class="video"
          style="width: 100%; height: 150px; background: #f2f3f5;"
        />
      </PressBarrage>

      <PressButton
        type="primary"
        size="small"
        custom-style="margin-top: 10px;"
        @click="add"
      >
        弹幕
      </PressButton>
    </demo-block>

    <demo-block
      :title="t('videoBarrage')"
    >
      <PressBarrage
        ref="pressBarrage"
        v-model="videoList"
        :auto-play="false"
      >
        <div
          class="video"
          style="width: 100%; height: 150px; background: #f2f3f5;"
        />
      </PressBarrage>

      <div>
        <PressButton
          type="primary"
          size="small"
          :disabled="!isPlay"
          custom-style="margin-top: 10px;margin-right: 10px;"
          @click="videoAdd"
        >
          弹幕
        </PressButton>

        <PressButton
          type="default"
          size="small"
          custom-style="margin-top: 10px;"
          @click="toggle"
        >
          {{ isPlay ? t('pause') : t('play') }}
        </PressButton>
      </div>
    </demo-block>
  </div>
</template>
<script>
import { setAdapter } from 'press-ui/common/vue3/set';
import PressBarrage from 'press-ui/press-barrage/press-barrage.vue';
import PressButton from 'press-ui/press-button/press-button.vue';


export default {
  i18n: {
    'zh-CN': {
      barrage: '弹幕',
      play: '开始',
      pause: '暂停',
      videoBarrage: '模仿视频弹幕',
      lightweight: '轻量',
      customizable: '可定制的',
      mobile: '移动端',
      library: '组件库',
    },
    'en-US': {
      barrage: 'barrage',
      play: 'play',
      pause: 'pause',
      videoBarrage: 'Imitate video barrage',
      lightweight: 'Lightweight',
      customizable: 'Customizable',
      mobile: 'Mobile',
      library: 'Library',
    },
  },
  components: {
    PressBarrage,
    PressButton,
  },
  data() {
    const defaultList = [
      { id: 100, text: this.t('lightweight') },
      { id: 101, text: this.t('customizable') },
      { id: 102, text: this.t('mobile') },
      { id: 103, text: 'Vue' },
      { id: 104, text: this.t('library') },
      { id: 105, text: 'PressUI' },
      { id: 106, text: '666' },
    ];

    return {
      list: defaultList,
      videoList: [
        ...defaultList,
      ],
      isPlay: false,

    };
  },
  watch: {
    isPlay: {
      handler(val) {
        if (val) {
          this.$refs.pressBarrage?.play();
        } else {
          this.$refs.pressBarrage?.pause();
        }
      },
    },
  },
  methods: {
    add() {
      setAdapter(this, 'list', [
        ...this.list,
        {
          id: Math.random(),
          text: 'Barrage',
        },
      ]);
    },
    videoAdd() {
      setAdapter(this, 'videoList', [
        ...this.videoList,
        {
          id: Math.random(),
          text: 'Barrage',
        },
      ]);
    },
    toggle() {
      this.isPlay = !this.isPlay;
    },
  },
};
</script>
<style scoped lang="scss">
</style>
