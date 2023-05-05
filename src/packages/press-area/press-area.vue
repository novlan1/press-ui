<template>
  <press-picker
    ref="pressPicker"
    class="press-area__picker"
    active-class="active-class"
    toolbar-class="toolbar-class"
    column-class="column-class"
    :show-toolbar="showToolbar"
    value-key="name"
    :title="title"
    :loading="loading"
    :columns="computedColumns"
    :item-height="itemHeight"
    :visible-item-count="visibleItemCount"
    :cancel-button-text="cancelButtonText"
    :confirm-button-text="confirmButtonText"
    @change="onChange"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>
<script>
import PressPicker from '../press-picker-plus/press-picker-plus.vue';
import { pickerProps } from '../press-picker-plus/shared';
import { requestAnimationFrame } from '../common/utils/system';
import computed from './computed';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';

const EMPTY_CODE = '000000';


export default {
  options: {
    ...defaultOptions,
  },
  components: {
    PressPicker,
  },
  classes: ['active-class', 'toolbar-class', 'column-class'],
  props: {
    ...pickerProps,
    showToolbar: {
      type: Boolean,
      default: true,
    },
    value: {
      type: String,
      default: '',
    },
    areaList: {
      type: Object,
      default: () => ({}),
    },
    columnsNum: {
      type: Number,
      default: 3,
    },
    columnsPlaceholder: {
      type: Array,
      default: () => [],
    },
    ...defaultProps,
  },
  data() {
    return {
      columns: [{ values: [] }, { values: [] }, { values: [] }],
      typeToColumnsPlaceholder: {},
      code: this.value,
    };
  },
  computed: {
    computedColumns() {
      const { columns, columnsNum } = this;
      return computed.displayColumns(columns, columnsNum);
    },
  },
  watch: {
    value: {
      handler(value) {
        this.code = value;
        this.setValues();
      },
    },
    areaList: {
      handler() {
        this.setValues();
      },
    },
    columnsPlaceholder: {
      handler(val) {
        this.typeToColumnsPlaceholder = {
          province: val[0] || '',
          city: val[1] || '',
          county: val[2] || '',
        };
      },
    },
  },
  mounted() {
    requestAnimationFrame(() => {
      this.setValues();
    });
  },
  methods: {
    getPicker() {
      if (this.picker == null) {
        this.picker = this.$refs.pressPicker;
        // this.picker = this.selectComponent('.press-area__picker');
      }
      return this.picker;
    },
    onCancel(event) {
      this.emit('cancel', event.detail);
    },
    onConfirm(event) {
      const { index } = event.detail;
      let { value } = event.detail;
      value = this.parseValues(value);
      this.emit('confirm', { value, index });
    },
    emit(type, detail) {
      detail.values = detail.value;
      delete detail.value;
      this.$emit(type, detail);
    },
    parseValues(values) {
      const { columnsPlaceholder } = this;

      return values.map((value, index) => {
        if (
          value && (!value.code || value.name === columnsPlaceholder[index])
        ) {
          return {
            ...value,
            code: '',
            name: '',
          };
        }

        return value;
      });
    },
    onChange(event) {
      const { index, value } = event;
      this.code = value[index].code;
      const picker = this.getPicker();

      this.setValues()?.then(() => {
        this.$emit('change', {
          // picker,
          values: this.parseValues(picker.getValues()),
          index,
        });
      });
    },
    getConfig(type) {
      const { areaList } = this;
      return (areaList && areaList[`${type}_list`]) || {};
    },
    getList(type, code) {
      if (type !== 'province' && !code) {
        return [];
      }
      const { typeToColumnsPlaceholder } = this;
      const list = this.getConfig(type);
      let result = Object.keys(list).map(code => ({
        code,
        name: list[code],
      }));
      if (code != null) {
        // oversea code
        if (code[0] === '9' && type === 'city') {
          code = '9';
        }
        result = result.filter(item => item.code.indexOf(code) === 0);
      }
      if (typeToColumnsPlaceholder[type] && result.length) {
        // set columns placeholder
        const codeFill = type === 'province'
          ? ''
          : type === 'city'
            ? EMPTY_CODE.slice(2, 4)
            : EMPTY_CODE.slice(4, 6);
        result.unshift({
          code: `${code}${codeFill}`,
          name: typeToColumnsPlaceholder[type],
        });
      }
      return result;
    },
    getIndex(type, code) {
      let compareNum = type === 'province' ? 2 : type === 'city' ? 4 : 6;
      const list = this.getList(type, code.slice(0, compareNum - 2));
      // oversea code
      if (code[0] === '9' && type === 'province') {
        compareNum = 1;
      }
      code = code.slice(0, compareNum);
      for (let i = 0; i < list.length; i++) {
        if (list[i].code.slice(0, compareNum) === code) {
          return i;
        }
      }
      return 0;
    },
    setValues() {
      const picker = this.getPicker();
      if (!picker) {
        return;
      }
      let code = this.code || this.getDefaultCode();
      const provinceList = this.getList('province');
      const cityList = this.getList('city', code.slice(0, 2));
      const stack = [];
      const indexes = [];
      const { columnsNum } = this;
      if (columnsNum >= 1) {
        stack.push(picker.setColumnValues(0, provinceList, false));
        indexes.push(this.getIndex('province', code));
      }
      if (columnsNum >= 2) {
        stack.push(picker.setColumnValues(1, cityList, false));
        indexes.push(this.getIndex('city', code));
        if (cityList.length && code.slice(2, 4) === '00') {
          [{ code }] = cityList;
        }
      }
      if (columnsNum === 3) {
        stack.push(picker.setColumnValues(2, this.getList('county', code.slice(0, 4)), false));
        indexes.push(this.getIndex('county', code));
      }
      return Promise.all(stack)
        .catch(() => { })
        .then(() => picker.setIndexes(indexes))
        .catch(() => { });
    },
    getDefaultCode() {
      const { columnsPlaceholder } = this;
      if (columnsPlaceholder.length) {
        return EMPTY_CODE;
      }
      const countyCodes = Object.keys(this.getConfig('county'));
      if (countyCodes[0]) {
        return countyCodes[0];
      }
      const cityCodes = Object.keys(this.getConfig('city'));
      if (cityCodes[0]) {
        return cityCodes[0];
      }
      return '';
    },
    getValues() {
      const picker = this.getPicker();
      if (!picker) {
        return [];
      }
      return this.parseValues(picker.getValues().filter(value => !!value));
    },
    getDetail() {
      const values = this.getValues();
      const area = {
        code: '',
        country: '',
        province: '',
        city: '',
        county: '',
      };
      if (!values.length) {
        return area;
      }
      const names = values.map(item => item.name);
      area.code = values[values.length - 1].code;
      if (area.code[0] === '9') {
        area.country = names[1] || '';
        area.province = names[2] || '';
      } else {
        area.province = names[0] || '';
        area.city = names[1] || '';
        area.county = names[2] || '';
      }
      return area;
    },
    reset(code) {
      this.code = code || '';
      return this.setValues();
    },
  },
};
</script>
<style platform="mp-weixin">
</style>
