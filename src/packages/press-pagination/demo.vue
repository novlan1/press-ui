<template>
  <div class="demo-wrap demo-wrap--gray">
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

    <PressPopupCell
      :id="FUNCTIONAL_ID_MAP.POPUP_CELL"
      mode="functional"
    />
    <PressPicker
      :id="FUNCTIONAL_ID_MAP.PICKER"
      mode="functional"
    />

    <PressPagination
      :total="componentConfig.pageTotal"
      :current="componentConfig.current + 1"
      :expand="componentConfig.expand"
      @change="onChange"
    />
  </div>
</template>
<script>
import PressPagination from 'src/packages/press-pagination/press-pagination.vue';
import {
  FUNCTIONAL_ID_MAP,
} from 'src/packages/press-popup-cell/demo-helper/helper';
import PressPopupCell from 'src/packages/press-popup-cell/press-popup-cell.vue';
import PressPicker from 'src/packages/press-picker/press-picker.vue';
import { showCustomPopup, local } from 'src/packages/press-pagination/demo-helper/custom';


export default {
  components: {
    PressPagination,
    PressPopupCell,
    PressPicker,
  },
  data() {
    const componentConfig = {
      ...local,
    };
    return {
      sectionStyle: 'margin: 0;background: #f7f8fa;',
      headerStyle: 'background: #f7f8fa;',
      FUNCTIONAL_ID_MAP,

      componentConfig,
    };
  },
  methods: {
    onShowBasicPopupCell() {
      showCustomPopup({
        context: this,
        callback: {
          changePageTotal: this.changePageTotal,
          changeCurrent: this.changeCurrent,
          changeExpand: this.changeExpand,
        },
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
    },
    changeCurrent(current) {
      this.componentConfig = {
        ...this.componentConfig,
        current,
      };
    },
    onChange(value) {
      console.log('[onChange]', value);
    },
  },
};
</script>
<style scoped lang="scss">
</style>
