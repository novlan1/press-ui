<template>
  <div class="demo-wrap">
    <press-notice-bar text="向下滑动即可展示组件。" />
    <scroll-view
      scroll-y
      enhanced
      class="demo-scroll-view"
      scroll-with-animation
      :scroll-top="newScrollTop"
      @scroll="onScroll"
    >
      <div class="demo-inner">
        <press-cell
          v-for="(item) of Object.keys(valueMap)"
          :key="item"
          :title="t(item)"
          clickable
          @click="valueMap[item] = !valueMap[item]"
        >
          <template #right-icon>
            <PressCheckbox
              :value="valueMap[item]"
              shape="square"
              @change="e => onChange(e, item)"
            />
          </template>
        </press-cell>
      </div>
    </scroll-view>

    <PressBackTop
      :scroll-top="scrollTop"
      :scroll-to-top="scrollToTop"
      :mode="backTopProps.mode"
      :top="backTopProps.top"
      :icon="backTopProps.icon"
      :icon-style="backTopProps.iconStyle"
      :custom-style="backTopProps.customStyle"
      :text="backTopProps.text"
    />
  </div>
</template>
<script>
import PressBackTop from 'press-ui/press-back-top/press-back-top.vue';
import PressCheckbox from 'press-ui/press-checkbox/press-checkbox.vue';
import PressNoticeBar from 'press-ui/press-notice-bar/press-notice-bar';

let that;
export default {
  i18n: {
    'zh-CN': {
      square: '显示方形',
      icon: '自定义图标',
      distance: '自定义距离',
      style: '自定义样式',
      text: '是否显示文本',
    },
    'en-US': {
      square: 'Square',
      icon: 'Custom Icon',
      distance: 'Custom Distance',
      style: 'Custom Style',
      text: 'Custom Text',
    },
  },
  components: {
    PressBackTop,
    PressCheckbox,
    PressNoticeBar,
  },
  data() {
    that = this;

    return {
      scrollTop: 0,
      newScrollTop: 0,
      valueMap: {
        square: false,
        icon: false,
        distance: false,
        style: false,
        text: false,
      },
    };
  },
  computed: {
    backTopProps() {
      const { square, icon, distance, style, text } = this.valueMap;
      return {
        mode: square ? 'square' : 'circle',
        icon: icon ? 'arrow-up' : 'back-top',
        top: distance ? 10 : 100,
        iconStyle: style ? 'color: #fff' : '',
        customStyle: style ? 'background-color: #2979ff' : '',
        text: text ? '顶部' : '',
      };
    },
  },
  methods: {
    onChange(value, key) {
      this.valueMap[key] = value;
    },
    onScroll(e) {
      this.scrollTop = e.target.scrollTop;
      console.log('[scrollTop]', this.scrollTop);
    },
    scrollToTop() {
      that.newScrollTop = that.scrollTop;
      setTimeout(() => {
        that.newScrollTop = 0;
      });
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  font-size: 15px;
}

.demo-scroll-view {
  height: 100%;
}
.demo-inner {
  height: calc(100% + 300px);
  padding: 10px 0px;

  // ::v-deep {
  //   /* #ifdef MP-QQ */
  //   press-checkbox,
  //   /* #endif */
  //   .press-checkbox {
  //     margin-bottom: 12px;
  //   }
  // }
}
</style>
