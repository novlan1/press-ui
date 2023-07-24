<template>
  <!-- 分页滚动条 -->
  <div
    class="press-pagination"
    :class="{'press-pagination--safe' : safeAreaInsetBottom}"
  >
    <view
      v-if="zones.length > 1"
      class="press-pagination__wrap"
    >
      <scroll-view
        id="zoneBox"
        :class="['press-scrollbar', 'press-scrollbar--active']"
        scroll-y="true"
        scroll-with-animation
        :enable-flex="true"
        :scroll-top="scrollTop"
        @scroll="scroll"
      >
        <view
          v-for="(item,index) in zones"
          :id="'seq-' + item"
          :key="index"
          class="press-scrollbar__scale"
          :class="currSelItem === item ? 'press-scrollbar__scale--selected' : ''"
          @click="handleSelect(item,index)"
        >
          <text>{{ item }}</text>
        </view>
      </scroll-view>
      <PressPopover
        :show="selectedEvent"
        placement="left"
        :custom-style="tipStyle"
      >
        {{ pageTip }}
      </PressPopover>
    </view>
  </div>
</template>

<script>
import PressPopover from '../press-popover/press-popover';

let popOverTimer = null;

export default {
  components: {
    PressPopover,
  },
  props: {
    total: {
      type: Number,
      default: 0,
    },
    current: {
      type: Number,
      default: 0,
    },
    expand: {
      type: Boolean,
      default: false,
    },
    tipTemplate: {
      type: String,
      default: '第{{0}}页',
    },
    autoScroll: {
      type: Number,
      default: 1,
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true,
    },
  },
  options: {
    virtualHost: true,
  },
  data() {
    return {
      currSelItem: 0, // 当前选中索引
      scrollToView: '',
      tipOffset: 0, // popover Y轴 offset
      selectedEvent: false, // popover提示
      zonesBox: {},
      scrollTop: 0,
      old: {
        scrollTop: 0,
      },
    };
  },
  computed: {
    zones() {
      return Array.from({ length: this.total }).map((_, index) => index + 1);
    },
    tipStyle() {
      return `top: ${this.tipOffset}px;bottom: unset;right: 50px;width: max-content;left: auto;transform: translateY(-50%);line-height: 16px;`;
    },
    pageTip() {
      return this.tipTemplate.replace('{{0}}', this.currSelItem);
    },
  },
  watch: {
    current: {
      handler(value) {
        const index = this.zones.findIndex(elem => elem === value);
        this.currSelItem = index > -1 ? this.zones[index] : this.zones[0];
        this.$nextTick(() => {
          this.scrollTo();
        });
      },
      immediate: true,
    },
    total: {
      handler() {
        this.$nextTick(() => {
          this.getScrollBarSize();
        });
      },
    },
  },
  mounted() {
    this.selectedEvent = false;
    this.getScrollBarSize();
  },
  destroyed() {
    this.selectedEvent = false;
    if (popOverTimer) {
      clearTimeout(popOverTimer);
      popOverTimer = null;
    }
  },
  updated() {
    this.$nextTick().then(() => {
      this.updatePopoverTipPosition();
    });
  },
  methods: {
    getScrollBarSize() {
      const item = uni.createSelectorQuery().in(this);
      item.select('.press-scrollbar')
        .boundingClientRect((res) => {
          if (res) {
            this.zonesBox = { top: res.top, bottom: res.bottom, height: res.height };
          }
        })
        .exec();
    },
    updatePopoverTipPosition() {
      const item = uni.createSelectorQuery().in(this);
      item.select(`#seq-${this.currSelItem}`)
        .boundingClientRect((res) => {
          if (res) {
            this.tipOffset = res.top - this.zonesBox.top + res.height / 2;
          }
        })
        .exec();
    },
    scroll(e) {
      this.old.scrollTop = e.detail.scrollTop;
      this.updatePopoverTipPosition();
    },
    scrollTo() {
      const { autoScroll } = this;
      this.scrollToView = `seq-${this.currSelItem}`;
      const item = this.createSelectorQuery().select(`#seq-${this.currSelItem}`);
      const list = this.createSelectorQuery().select('#zoneBox');
      this.scrollTop = this.old.scrollTop;

      list
        .fields({
          scrollOffset: true,
          size: true,
        }, (box) => {
          item.boundingClientRect((data) => {
            const { top, bottom, height = 0 } = this.zonesBox;
            if (height > 0) {
              if (data.top - top < autoScroll * data.height) {
                this.scrollTop = Math.max(1, (this.currSelItem - 1 - autoScroll) * data.height);
              } else if (bottom - data.bottom < autoScroll * data.height) {
                // scrollTop + box.height = current * item.height
                this.scrollTop = Math.min(
                  (this.currSelItem + autoScroll) * data.height - height,
                  box.scrollHeight - height,
                );
              }
              this.updatePopoverTipPosition();
            }
          }).exec();
        }).exec();
    },
    handleSelect(item) {
      // 清理上一次定时器
      if (popOverTimer) {
        clearTimeout(popOverTimer);
        popOverTimer = null;
      }

      this.selectedEvent = true;

      // 发送换页
      if (this.currSelItem !== item) {
        this.currSelItem = item;
        this.$emit('change', item);
      }
      this.scrollTo();
      popOverTimer = setTimeout(() => {
        this.selectedEvent = false;
      }, 500);
    },
  },
};

</script>
<style lang="scss" scoped src="./css/index.scss"></style>
