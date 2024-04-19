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
      :ref="FUNCTIONAL_ID_MAP.POPUP_CELL"
      mode="functional"
    />
    <PressPicker
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
import PressCell from 'src/packages/press-cell/press-cell.vue';
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
    PressCell,
  },
  data() {
    const componentConfig = {
      ...local,
    };
    return {
      sectionStyle: 'margin: 0;background: #f7f8fa;',
      headerStyle: 'background: #f7f8fa;',
      FUNCTIONAL_ID_MAP,
      mode: '',

      componentConfig,
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
