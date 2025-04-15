<template>
  <div class="demo-wrap">
    <!-- #ifndef H5 -->
    <PressNotify
      id="press-notify"
    />
    <!-- #endif -->

    <PressCard
      :is-shadow="false"
      is-full
    >
      <span class="uni-h6">
        仅保留 empty 图标，其他图标请使用 press-icon-plus。
      </span>
    </PressCard>
    <demo-block title="图标">
      <div class="icon-content">
        <div
          v-for="(item,index) in pressIconList"
          :key="index"
          class="icon-item"
          @click="switchActive(index,item)"
        >
          <PressIcon
            :type="item.name"
            :color="activeIndex === index ? '#007aff' : '#5e6d82'"
            size="30"
          />
          <span
            :style="{color: activeIndex === index ? '#007aff' : '#5e6d82'}"
            class="uni-mt-5 uni-subtitle"
          >
            {{ checked ? item.unicode: item.name }}
          </span>
        </div>
      </div>
    </demo-block>

    <demo-block title="icon-music">
      <div class="icon-content flex-end">
        <div
          class="icon-item"
          @click.stop="onCopyIconMusic()"
        >
          <PressIconMusic />
        </div>

        <div
          class="icon-item"
          @click.stop="() => onCopyIconMusic(['color', 'rgb(94, 109, 130)'])"
        >
          <PressIconMusic
            color="rgb(94, 109, 130)"
          />
        </div>

        <div
          class="icon-item"
          @click.stop="onCopyIconMusic(['number', '5'])"
        >
          <PressIconMusic :number="5" />
        </div>

        <div
          class="icon-item"
          @click.stop="onCopyIconMusic(['width', '60px'], ['height', '60px'])"
        >
          <PressIconMusic
            width="60px"
            height="60px"
          />
        </div>
      </div>
    </demo-block>
  </div>
</template>

<script>
import IconMap from 'src/utils/icon/icon.json';
import PressCard from 'press-ui/press-card/press-card.vue';
import PressIcon from 'press-ui/press-icon/press-icon.vue';
import PressIconMusic from 'press-ui/press-icon/press-icon-music.vue';
import PressNotify from 'press-ui/press-notify/press-notify.vue';
import { CLIPBOARD_MIXIN } from 'src/packages/press-icon-plus/demo-helper/clipboard-mixin';


export default {
  i18n: {
    'zh-CN': {
      copied: '复制成功',
    },
    'en-US': {
      copied: 'Copied',
    },
  },
  components: {
    PressCard,
    PressIconMusic,
    PressIcon,
    PressNotify,
  },
  mixins: [CLIPBOARD_MIXIN],
  data() {
    const pressIconList = Object.keys(IconMap).map(key => ({
      name: key,
      unicode: IconMap[key].unicode,
    }));
    return {
      pressIconList,
      activeIndex: -1,
      checked: false,
    };
  },
  mounted() {
  },
  methods: {
    switchActive(index, item) {
      // this.activeIndex = index;
      const tag = `<press-icon name="${item.name}" />`;
      this.copyIconTag(tag);
    },
    onCopyIconMusic(...args) {
      const propsStr = args.map((item) => {
        const { 0: name, 1: value } = item;
        return `${name}="${value}"`;
      }).join(' ');

      const tag = `<press-icon-music ${propsStr}/>`;
      this.copyIconTag(tag);
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-content {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  // justify-content: center;
  &.flex-end {
    align-items: flex-end;
  }

  .icon-item {
    /* #ifndef APP-NVUE */
    display: flex;
    box-sizing: border-box;
    width: calc(100% / 5);
    /* #endif */
    /* #ifdef APP-NVUE */
    width: 187rpx;
    /* #endif */
    align-items: center;
    padding: 10px;
    text-align: center;
    flex-direction: column;
  }
}
</style>
