<!-- 分页滚动条 -->
<template>
  <div
    class="press-pagination"
    :class="[customClass,
             {'press-pagination--safe' : safeAreaInsetBottom,},
             {'press-pagination--hor': mode === 'hor'}
    ]"
  >
    <div
      v-if="pageList.length > 1"
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
        <div
          v-for="(item, index) in pageList"
          :id="'seq-' + item"
          :key="index"
          class="press-scrollbar__scale"
          :class="[{
            'press-scrollbar__scale--selected': innerCurrent === item,
          }, `press-scrollbar__scale--total-${total}`]"
          @click="handleSelect(item,index)"
        >
          <span>{{ item }}</span>
        </div>
      </scroll-view>
      <PressPopoverPlus
        :show="selectedEvent"
        placement="left"
        :custom-style="tipStyle"
      >
        <p>{{ pageTip }}</p>
      </PressPopoverPlus>
    </div>
  </div>
</template>

<script>
import { getVirtualHostOptions } from '../common/component-handler/press-component';
import { getRect, getScrollHeight } from '../common/dom/rect';
import { nextTick } from '../common/utils/system';
import { isNotInUni } from '../common/utils/utils';

import { ScrollViewPureMixin } from '../mixins/pure/scroll-view';
import PressPopoverPlus from '../press-popover-plus/press-popover-plus.vue';

import { PAGINATION_E_SPORT_PROPS, PAGINATION_COMMON_PROPS } from './props';

let popOverTimer = null;


export default {
  name: 'PressPagination',
  options: {
    ...getVirtualHostOptions(true, false),
    styleIsolation: 'shared',
  },
  components: {
    PressPopoverPlus,
  },
  mixins: [ScrollViewPureMixin],
  props: {
    ...PAGINATION_E_SPORT_PROPS,
    ...PAGINATION_COMMON_PROPS,
  },
  emits: ['change'],
  data() {
    return {
      innerCurrent: 0, // 当前选中索引
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
    pageList() {
      return Array.from({ length: this.total }).map((_, index) => index + 1);
    },
    tipStyle() {
      return `top: ${this.tipOffset}px;bottom: unset;right: 50px;width: max-content;left: auto;transform: translateY(-50%);line-height: 16px;min-width: 42px;`;
    },
    pageTip() {
      return this.tipTemplate.replace('{{0}}', this.innerCurrent);
    },
  },
  watch: {
    current: {
      handler(value) {
        const index = this.pageList.findIndex(elem => elem === value);
        this.innerCurrent = index > -1 ? this.pageList[index] : this.pageList[0];

        nextTick(() => {
          this.scrollTo();
        });
      },
      immediate: true,
    },
    total: {
      handler() {
        nextTick(() => {
          this.getScrollBarSize();
        });
      },
    },
    mode: {
      handler() {
        nextTick(() => {
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
    this.onDestroyed();
  },
  unmounted() {
    this.onDestroyed();
  },
  updated() {
    nextTick(() => {
      this.updatePopoverTipPosition();
    });
  },
  methods: {
    onDestroyed() {
      this.selectedEvent = false;
      if (popOverTimer) {
        clearTimeout(popOverTimer);
        popOverTimer = null;
      }
    },
    getScrollBarSize() {
      getRect(this, '.press-scrollbar').then((res) => {
        if (res) {
          this.zonesBox = { top: res.top, bottom: res.bottom, height: res.height };
        }
      });
    },
    updatePopoverTipPosition() {
      getRect(this, `#seq-${this.innerCurrent}`).then((res) => {
        if (res) {
          this.tipOffset = res.top - this.zonesBox.top + res.height / 2;
        }
      });
    },
    scroll(e) {
      if (isNotInUni()) {
        this.old.scrollTop = e.target.scrollTop;
      } else {
        this.old.scrollTop = e.detail.scrollTop;
      }
      this.updatePopoverTipPosition();
    },
    scrollTo() {
      const { autoScroll } = this;
      this.scrollToView = `seq-${this.innerCurrent}`;
      this.scrollTop = this.old.scrollTop;

      Promise.all([
        getScrollHeight(this, '#zoneBox'),
        getRect(this, `#seq-${this.innerCurrent}`),
      ])
        .then(([box, data]) => {
          if (!data) return;

          const { top, bottom, height = 0 } = this.zonesBox;
          if (height > 0) {
            if (data.top - top < autoScroll * data.height) {
              // 顶部不足
              this.scrollTop = Math.max(1, (this.innerCurrent - 1 - autoScroll) * data.height);
            } else if (bottom - data.bottom < autoScroll * data.height) {
              // 底部不足
              // scrollTop + box.height = current * item.height
              const target = (this.innerCurrent + autoScroll) * data.height - height;
              // #ifdef MP-QQ
              // qq小程序上没有 box.scrollHeight
              this.scrollTop = target;
              // #endif

              // #ifndef MP-QQ
              this.scrollTop = Math.min(
                target,
                box.scrollHeight - height,
              );
            // #endif
            }
            this.updatePopoverTipPosition();
          }
        });
    },
    handleSelect(item) {
      // 清理上一次定时器
      if (popOverTimer) {
        clearTimeout(popOverTimer);
        popOverTimer = null;
      }

      this.selectedEvent = true;

      // 发送换页
      if (this.innerCurrent !== item) {
        this.innerCurrent = item;
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
<style lang="scss" scoped src="./css/hor.scss"></style>
