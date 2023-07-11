<template>
  <div class="demo-wrap demo-wrap--gray demo-wrap--flex">
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
        finished-text="没有更多了"
        @load="load"
        @scroll="scroll"
      >
        <div :style="wrapStyle">
          <div :style="hiddenUpPartStyle" />
          <div
            v-for="item of showingData"
            :key="item.value"
            class="list-item"
          >
            {{ item.label }}
          </div>
        </div>
      </PressList>
    </div>

    <PressPopupCell
      :id="FUNCTIONAL_ID_MAP.POPUP_CELL"
      mode="functional"
    />
    <PressPicker
      :id="FUNCTIONAL_ID_MAP.PICKER"
      mode="functional"
    />
  </div>
</template>
<script>
import PressList from 'src/packages/press-list/press-list.vue';
import PressPopupCell from 'src/packages/press-popup-cell/press-popup-cell.vue';
import PressPicker from 'src/packages/press-picker/press-picker.vue';

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
      console.log('[scroll]', event, scrollerHeight);
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

.list-item {
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
