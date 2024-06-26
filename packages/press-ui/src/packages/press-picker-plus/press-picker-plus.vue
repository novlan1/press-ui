<template>
  <div class="press-picker-index">
    <div
      class="press-picker"
      :class="customClass"
    >
      <ToolBar
        v-if="toolbarPosition === 'top'"
        :title="title"
        :show-toolbar="showToolbar"
        :cancel-button-text="cancelButtonText"
        :confirm-button-text="confirmButtonText"
        :custom-class="toolbarClass"
        @emit="emit"
      />

      <div
        v-if="loading"
        class="press-picker__loading"
      >
        <loading color="#1989fa" />
      </div>

      <div
        class="press-picker__columns"
        :style="columnStyle"
        @touchmove.stop.prevent="noop"
      >
        <picker-column
          v-for="(item,index) in computedColumns"
          ref="pickerColumn"
          :key="index"
          class="press-picker__column"
          :data-index="index"
          :custom-class="columnClass"
          :value-key="valueKey"
          :initial-options="item.values"
          :default-index="item.defaultIndex || defaultIndex"
          :item-height="itemHeight"
          :visible-item-count="visibleItemCount"
          :active-class="activeClass"
          @change="value=>onChange(value, index)"
        />
        <div
          class="press-picker__mask"
          :style="maskStyle"
        />
        <div
          class="press-picker__frame press-hairline--top-bottom"
          :style="frameStyle"
        />
      </div>

      <ToolBar
        v-if="toolbarPosition === 'bottom'"
        :custom-class="toolbarClass"
      />
    </div>
  </div>
</template>
<script>
import PickerColumn from '../press-picker-column/press-picker-column.vue';
import Loading from '../press-loading-plus/press-loading-plus.vue';
import ToolBar from './toolbar.vue';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { PARENT_PICKER as PARENT } from '../common/constant/parent-map';
import { toProvideThis } from '../common/vue3/adapter';
import { pickerProps } from './shared';

import computed from './index';


export default {
  name: 'PressPickerPlus',
  options: {
    ...defaultOptions,
  },
  components: {
    PickerColumn,
    Loading,
    ToolBar,
  },
  ...toProvideThis(PARENT),


  props: {
    ...defaultProps,
    ...pickerProps,

    valueKey: {
      type: String,
      default: 'text',
    },
    toolbarPosition: {
      type: String,
      default: 'top',
    },
    defaultIndex: {
      type: Number,
      default: 0,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    activeClass: {
      type: String,
      default: '',
    },
    toolbarClass: {
      type: String,
      default: '',
    },
    columnClass: {
      type: String,
      default: '',
    },
  },
  emits: ['change', 'confirm', 'cancel'],
  data() {
    return {
      simple: true,
    };
  },
  computed: {
    columnStyle() {
      const { itemHeight, visibleItemCount } = this;
      return computed.columnsStyle({ itemHeight, visibleItemCount });
    },
    maskStyle() {
      const { itemHeight, visibleItemCount } = this;
      return computed.maskStyle({ itemHeight, visibleItemCount });
    },
    frameStyle() {
      const { itemHeight } = this;
      return computed.frameStyle({ itemHeight });
    },
    computedColumns() {
      const { columns } = this;
      return computed.columns(columns);
    },
  },
  watch: {
    columns: {
      handler(columns = []) {
        this.simple = columns.length && !columns[0].values;
        if (Array.isArray(this.children) && this.children.length) {
          this.setColumns().catch(() => { });
        }
      },
      immediate: true,
    },
  },
  beforeCreate() {
  },
  created() {
    this.children = [];
  },
  mounted() {
    if (Array.isArray(this.children) && this.children.length) {
      this.setColumns().catch(() => { });
    }
  },
  methods: {
    noop() { },
    setColumns() {
      const columns = this.simple ? [{ values: this.columns }] : this.columns;
      const stack = columns.map((column, index) => this.setColumnValues(index, column.values));
      return Promise.all(stack);
    },
    emit(event) {
      const { type } = event.currentTarget.dataset;
      if (this.simple) {
        this.$emit(type, {
          value: this.getColumnValue(0),
          index: this.getColumnIndex(0),
        });
      } else {
        this.$emit(type, {
          value: this.getValues(),
          index: this.getIndexes(),
        });
      }
    },
    onChange(event, index) {
      if (this.simple) {
        this.$emit('change', {
          value: this.getColumnValue(0),
          index: this.getColumnIndex(0),
        });
      } else {
        this.$emit('change', {
          value: this.getValues(),
          index,
        });
      }
    },
    getColumn(index) {
      return this.children[index];
    },
    getColumnValue(index) {
      const column = this.getColumn(index);
      return column && column.getValue();
    },
    setColumnValue(index, value) {
      const column = this.getColumn(index);
      if (column == null) {
        return Promise.reject(new Error('setColumnValue: 对应列不存在'));
      }
      return column.setValue(value);
    },
    getColumnIndex(columnIndex) {
      return (this.getColumn(columnIndex) || {}).currentIndex;
    },
    setColumnIndex(columnIndex, optionIndex) {
      const column = this.getColumn(columnIndex);
      if (column == null) {
        return Promise.reject(new Error('setColumnIndex: 对应列不存在'));
      }
      return column.setIndex(optionIndex);
    },
    getColumnValues(index) {
      return (this.children[index] || {}).options;
    },
    setColumnValues(index, options, needReset = true) {
      const column = this.children[index];
      if (column == null) {
        return Promise.reject(new Error('setColumnValues: 对应列不存在'));
      }
      const isSame = JSON.stringify(column.options) === JSON.stringify(options);
      if (isSame) {
        return Promise.resolve();
      }
      return column.set({ options }).then(() => {
        if (needReset) {
          column.setIndex(0);
        }
      });
    },
    getValues() {
      return this.children.map(child => child.getValue());
    },
    setValues(values) {
      const stack = values.map((value, index) => this.setColumnValue(index, value));
      return Promise.all(stack);
    },
    getIndexes() {
      return this.children.map(child => child.currentIndex);
    },
    setIndexes(indexes) {
      const stack = indexes.map((optionIndex, columnIndex) => this.setColumnIndex(columnIndex, optionIndex));
      return Promise.all(stack);
    },
  },
};
</script>
<style scoped lang="scss">
@import "../common/style/press/index.scss";
@import "../common/style/press/var.scss";

.press-picker {
  position: relative;
  overflow: hidden;
  -webkit-text-size-adjust: 100%; /* avoid iOS text size adjust */
  user-select: none;
  background-color: var(--picker-background-color, $picker-background-color);

  // 【修改点】将toolbar中的css移动到toolbar.vue中去
  &__columns {
    position: relative;
    display: flex;
  }

  /* #ifdef MP-ALIPAY */
  ::v-deep .press-picker-column-index,
  /* #endif */
  &__column {
    flex: 1 1;
    width: 0;
  }

  &__loading {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(
      --picker-loading-mask-color,
      $picker-loading-mask-color
    );
  }

  &__mask {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
        180deg,
        hsla(0, 0%, 100%, 0.9),
        hsla(0, 0%, 100%, 0.4)
      ),
      linear-gradient(0deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4));
    background-repeat: no-repeat;
    background-position: top, bottom;
    backface-visibility: hidden;
    pointer-events: none;
  }

  &__frame {
    position: absolute !important; // 【修改点】防止选项间细线消失
    top: 50%;
    right: $padding-md;
    left: $padding-md;
    z-index: 1;
    transform: translateY(-50%);
    pointer-events: none;
  }
}
</style>
