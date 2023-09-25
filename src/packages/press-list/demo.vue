<template>
  <div
    class="demo-wrap demo-wrap--gray demo-wrap--flex"
    :class="listLocal.vertical ? '' : 'demo-wrap--hor'"
  >
    <demo-block
      :title="t('basicUsage')"
      :section-style="sectionStyle"
      :header-style="headerStyle"
    >
      <press-cell
        :title="t('custom')"
        is-link
        @click="onShowBasicPopupCell"
      />
    </demo-block>

    <div class="demo-container">
      <PressList
        v-model="loading"
        :finished="finished"
        :immediate-check="immediateCheck"
        :vertical="listLocal.vertical"
        finished-text="没有更多了"
        @load="load"
        @scroll="scroll"
      >
        <div
          :style="wrapStyle"
          class="list__wrap"
        >
          <div :style="hiddenUpPartStyle" />
          <div
            v-for="item of showingData"
            :key="item.value"
            class="list__item"
          >
            {{ item.label }}
          </div>
        </div>
      </PressList>
    </div>

    <PressPopupCell
      :id="FUNCTIONAL_ID_MAP.POPUP_CELL"
      :ref="FUNCTIONAL_ID_MAP.POPUP_CELL"
      mode="functional"
    />
    <PressPicker
      :id="FUNCTIONAL_ID_MAP.PICKER"
      :ref="FUNCTIONAL_ID_MAP.PICKER"
      mode="functional"
    />
  </div>
</template>
<script>
import PressList from 'src/packages/press-list/press-list.vue';
import PressPopupCell from 'src/packages/press-popup-cell/press-popup-cell.vue';
import PressPicker from 'src/packages/press-picker/press-picker.vue';
import PressCell from 'src/packages/press-cell/press-cell.vue';

import {
  FUNCTIONAL_ID_MAP,
} from 'src/packages/press-popup-cell/demo-helper/helper';
import { showCustomPopup, local } from 'src/packages/press-list/demo-helper/custom';
import { virtualListMixin } from 'src/packages/press-list/demo-helper/virtual-list-mixin';


function fetchData({ length, delay, beforeLength }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: Array.from({ length }).map((_, i) => {
          let value = i + beforeLength + 1;
          if (value < 10) {
            value = `0${value}`;
          }
          return {
            label: value,
            value,
          };
        }),
      });
    }, delay || 0);
  });
}

export default {
  i18n: {
    'zh-CN': {
      custom: '自定义',
    },
    'en-US': {
      custom: 'Custom',
    },
  },
  components: {
    PressList,
    PressPopupCell,
    PressPicker,
    PressCell,
  },
  mixins: [virtualListMixin],
  data() {
    const listLocal = {
      ...local,
    };
    return {
      sectionStyle: 'margin: 0;background: #f7f8fa;',
      headerStyle: 'background: #f7f8fa;',

      loading: false,
      finished: false,
      immediateCheck: true,
      list: [],

      FUNCTIONAL_ID_MAP,

      listLocal,
    };
  },
  computed: {
  },
  watch: {
    listLocal: {
      handler(value) {
        if (!value.vertical) {
          this.useVirtualList = false;
        }
      },
      deep: true,
    },
  },
  mounted() {
    // this.loading = true;
    // this.onFetchData(true);
  },
  methods: {
    load() {
      // console.log('[load]');
      this.onFetchData();
    },
    scroll(event, scrollerHeight) {
      // console.log('[scroll]', event, scrollerHeight);
      this.updateCurrentIndex(event, scrollerHeight);
    },
    onFetchData(isRefresh) {
      const { total, pageSize, delay } = this.listLocal;

      fetchData({
        delay,
        length: pageSize,
        beforeLength: isRefresh ? 0 : this.list?.length || 0,
      }).then(({ data }) => {
        let list = isRefresh ? data : [
          ...this.list,
          ...data,
        ];
        if (list.length > total) {
          list = list.slice(0, total);
        }

        this.list = list;
        console.log('[current total]', list.length);
        this.loading = false;
        this.finished = this.list.length >= total;
      })
        .catch(() => {});
    },

    onShowBasicPopupCell() {
      showCustomPopup({
        context: this,
        callback: {
          changeTotal: this.changeTotal,
          changePageSize: this.changePageSize,
          changeDelay: this.changeDelay,
          changeDirection: this.changeDirection,
        },
      });
    },
    changePageSize(pageSize) {
      this.listLocal = {
        ...this.listLocal,
        pageSize,
      };
      this.generateData();
    },
    changeTotal(total) {
      this.listLocal = {
        ...this.listLocal,
        total,
      };
      this.generateData();
    },
    changeDelay(delay) {
      this.listLocal = {
        ...this.listLocal,
        delay,
      };
      this.generateData();
    },
    changeDirection(vertical) {
      this.listLocal = {
        ...this.listLocal,
        vertical,
      };
      this.generateData();
    },
    generateData() {
      this.loading = true;
      this.onFetchData(true);
    },
  },
};
</script>
<style scoped lang="scss">
.demo-container {
  flex: 1;
  overflow: auto;
  margin-top: 6px;
}

.demo-wrap--hor {
  .list__wrap {
    display: flex;
    height: 100%;
  }
  .list__item {
    min-width: 100px;
    border-right: 1px solid #f5f6fa;
    height: 100%;
  }
}

.list__item {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f5f6fa;
  background: #fff;
  font-size: 16px;
  box-sizing: border-box;
}
</style>
