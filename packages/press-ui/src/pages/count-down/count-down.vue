<template>
  <div class="demo-wrap">
    <template v-if="list.length">
      <press-cell
        v-for="(item, index) of list"
        :key="index"
        center
        :title="item.title"
        :value="item.value"
        :label="item.label"
        @click="clickCountDown(item)"
      />
    </template>

    <PressEmpty
      v-else
      description="暂无数据"
    />

    <PressFab
      :bottom-threshold="2"
      :init-y="initY"
      :init-x="initX"
      :pattern="fabIconStyles"
      @fabClick="fabClick"
    />
  </div>
</template>

<script>
import PressFab from '../../packages/press-fab/press-fab.vue';
import PressEmpty from '../../packages/press-empty/press-empty.vue';
import { routerPush } from '../../packages/common/utils/router';
import { getCountDownList } from './count-down-logic';


export default {
  components: {
    PressFab,
    PressEmpty,
  },
  data() {
    let initY = 12;
    // #ifdef H5
    initY = 65;
    // #endif

    return {
      list: getCountDownList(),
      fabIconStyles: {
        iconFontSize: 20,
      },
      initX: 12,
      initY,

    };
  },
  activated() {
    this.list = getCountDownList();
  },
  onShow() {
    this.list = getCountDownList();
  },
  methods: {
    fabClick() {
      routerPush.call(
        this,
        '/pages/count-down/new',
        '/pages/press/count-down/new',
      );
    },
    clickCountDown(item) {
      routerPush.call(
        this,
        `/pages/count-down/new?id=${item.id}`,
        `/pages/press/count-down/new?id=${item.id}`,
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.demo-wrap ::v-deep {
  .press-fab__plus {
    width: 38px;
    height: 38px;
    transform: rotate(45deg);
  }
  .press-fab-circle-icon {
    font-size: 20px;
  }
}
</style>
