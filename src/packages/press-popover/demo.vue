<template>
  <div class="demo-wrap">
    <demo-block
      v-for="(item,index) of list"
      :key="index"
      :title="item"
    >
      <press-button
        type="e-sport-primary"
        @click.stop="onShowPopover(item)"
      >
        {{ t('check') }}
      </press-button>
    </demo-block>

    <div class="demo-block-wrap">
      <div class="demo-block">
        <PressPopover
          :show="!!direction"
          :placement="direction"
          :custom-class="`demo-nav-popover demo-nav-popover--${direction}`"
        >
          <div
            v-for="(item,index) of dataList"
            :key="index"
            class="demo-nav-item"
          >
            {{ t('options', item) }}
          </div>
        </PressPopover>
      </div>
    </div>
  </div>
</template>
<script>
import PressPopover from 'src/packages/press-popover/press-popover.vue';


export default {
  i18n: {
    'zh-CN': {
      options: num => `选项${num}`,
    },
    'en-US': {
      options: num => `Options ${num}`,
    },
  },
  components: {
    PressPopover,
  },
  data() {
    return {
      list: ['top', 'bottom', 'left', 'right'],
      dataList: [1, 2, 3],
      direction: '',

    };
  },
  methods: {
    onShowPopover(direction) {
      this.direction = direction;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "src/packages/base/mixin.scss";
.demo-wrap {
  padding-bottom: 20px;
}

.demo-block-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-block {
  width: 50px;
  height: 50px;
  background: #eee;
  margin-top: 100px;
  position: relative;

  ::v-deep .demo-nav-popover {
    padding: 0;
    background: #09134e;
    left: auto;
    right: auto;
    bottom: auto;
    top: auto;

    &--top {
      bottom: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%);
    }

    &--bottom {
      top: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%);
    }

    &--left {
      right: calc(100% + 10px);
      top: 50%;
      transform: translateY(-50%);
    }

    &--right {
      left: calc(100% + 10px);
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.demo-nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  width: 70px;
  height: 40px;
}
</style>
