<template>
  <div class="demo-wrap demo-wrap--gray">
    <demo-block
      :title="t('basicUsage')"
      :section-style="backgroundStyle"
      :header-style="backgroundStyle"
      :custom-style="backgroundStyle"
    >
      <PressPagination
        :current="currentPage1"
        mode="multi"
        :total-items="24"
        :items-per-page="5"
        :prev-text="t('prevText')"
        :next-text="t('nextText')"
        @change="(value) => currentPage1 = value"
      />
    </demo-block>

    <demo-block
      :title="t('title2')"
      :section-style="backgroundStyle"
      :header-style="backgroundStyle"
      :custom-style="backgroundStyle"
    >
      <PressPagination
        :current="currentPage2"
        :total="12"
        :prev-text="t('prevText')"
        :next-text="t('nextText')"
        mode="simple"
        size="small"
        @change="(value) => currentPage2 = value"
      />
    </demo-block>

    <demo-block
      :title="t('title3')"
      :section-style="backgroundStyle"
      :header-style="backgroundStyle"
      :custom-style="backgroundStyle"
    >
      <PressPagination
        mode="multi"
        :current="currentPage3"
        force-ellipses
        :total-items="125"
        :show-page-size="3"
        :prev-text="t('prevText')"
        :next-text="t('nextText')"
        @change="(value) => currentPage3 = value"
      />
    </demo-block>

    <!-- #ifdef H5 -->
    <demo-block
      :title="t('title4')"
      :section-style="backgroundStyle"
      :header-style="backgroundStyle"
      :custom-style="backgroundStyle"
    >
      <PressPagination
        mode="multi"
        :current="currentPage4"
        :total-items="125"
        :show-page-size="5"
        @change="(value) => currentPage4 = value"
      >
        <template #prev-text>
          <PressIcon name="arrow-left" />
        </template>
        <template #next-text>
          <PressIcon name="arrow" />
        </template>
        <template #page="{ text }">
          {{ text }}
        </template>
      </PressPagination>
    </demo-block>
    <!-- #endif -->

    <demo-block
      title="E-Sport"
      :section-style="sectionStyle"
      :header-style="backgroundStyle"
      :custom-style="backgroundStyle"
    >
      <PressCell
        :title="t('custom')"
        is-link
        @click="onShowBasicPopupCell"
      />
    </demo-block>

    <PressPopupCell
      :id="FUNCTIONAL_ID_MAP.POPUP_CELL"
      :ref="FUNCTIONAL_ID_MAP.POPUP_CELL"
      mode="functional"
    />
    <PressPickerPlus
      :id="FUNCTIONAL_ID_MAP.PICKER"
      :ref="FUNCTIONAL_ID_MAP.PICKER"
      mode="functional"
    />

    <PressPagination
      :total="componentConfig.pageTotal"
      :current="componentConfig.current"
      :expand="componentConfig.expand"
      :mode="mode"
      @change="onChange"
    />
  </div>
</template>
<script>
import PressCell from 'press-ui/press-cell/press-cell.vue';
import PressIcon from 'press-ui/press-icon/press-icon.vue';
import PressPagination from 'press-ui/press-pagination/press-pagination.vue';
import PressPickerPlus from 'press-ui/press-picker-plus/press-picker-plus.vue';

import PressPopupCell from 'press-ui/press-popup-cell/press-popup-cell.vue';

import { showCustomPopup, local } from 'src/packages/press-pagination/demo-helper/custom';
import {
  FUNCTIONAL_ID_MAP,
} from 'src/packages/press-popup-cell/demo-helper/helper';


export default {
  i18n: {
    'zh-CN': {
      title2: '简单模式',
      title3: '显示省略号',
      title4: '自定义按钮',
      prevText: '上一页',
      nextText: '下一页',
    },
    'en-US': {
      title2: 'Simple Mode',
      title3: 'Show ellipses',
      title4: 'Custom Button',
      prevText: 'Prev',
      nextText: 'Next',
    },
  },
  components: {
    PressPagination,
    PressPopupCell,
    PressPickerPlus,
    PressCell,
    PressIcon,
  },
  data() {
    const componentConfig = {
      ...local,
    };
    return {
      sectionStyle: 'margin: 0;background: #f7f8fa;',
      backgroundStyle: 'background: #f7f8fa;',
      FUNCTIONAL_ID_MAP,
      mode: '',

      componentConfig,

      currentPage1: 1,
      currentPage2: 1,
      currentPage3: 1,
      currentPage4: 1,
    };
  },
  methods: {
    onShowBasicPopupCell() {
      const {
        pageTotal,
        current,
      } = this.componentConfig;
      showCustomPopup({
        context: this,
        callback: {
          changePageTotal: this.changePageTotal,
          changeCurrent: this.changeCurrent,
          changeHor: this.changeHor,
        },
        pageTotal,
        current,
        isHor: this.mode === 'hor',
      });
    },
    changeExpand(expand) {
      this.componentConfig = {
        ...this.componentConfig,
        expand,
      };
    },
    changePageTotal(pageTotal) {
      this.componentConfig = {
        ...this.componentConfig,
        pageTotal,
      };
      if (this.componentConfig.current > pageTotal) {
        this.componentConfig.current = pageTotal;
      }
    },
    changeCurrent(current) {
      this.componentConfig = {
        ...this.componentConfig,
        current,
      };
    },
    changeHor(isHor) {
      this.mode = isHor ? 'hor' : '';
    },
    onChange(value) {
      console.log('[onChange]', value);
      this.componentConfig.current = value;
    },
  },
};
</script>
<style scoped lang="scss">
</style>
