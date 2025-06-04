<template>
  <div class="press-cascader-index">
    <div
      v-if="showHeader"
      class="press-cascader__header"
    >
      <slot
        v-if="useTitleSlot"
        name="title"
      />
      <span
        v-else
        class="press-cascader__title"
      >
        {{ title }}
      </span>
      <PressIcon
        v-if="closeable"
        :name="closeIcon"
        class="press-cascader__close-icon"
        @click.native="onClose"
      />
    </div>

    <PressTabs
      ref="tabs"
      :active="activeTab"
      custom-class="press-cascader__tabs"
      wrap-class="press-cascader__tabs-wrap"
      tab-class="press-cascader__tab"
      :custom-style="innerTabsCustomStyle"
      :tab-style="innerTabCustomStyle"
      :wrap-style="innerTabsWrapCustomStyle"
      :color="activeColor"
      :border="false"
      :swipeable="swipeable"
      @click="onClickTab"
    >
      <PressTab
        v-for="(tab, tabIndex) in (tabs)"
        :key="tab.tabIndex"
        :title="tab.selected ? tab.selected[textKey] : placeholder"
        style="width: 100%;"
        :title-style="(!tab.selected ? 'color: #969799;font-weight:normal;' : '')"
      >
        <div class="press-cascader__options">
          <div
            v-for="(option, index) of (tab.options)"
            :key="'' + getUniqueKey(index, 'option')"
            :class="[`${getOptionsClass(option, tab)}`]"
            :style="'' + getOptionsStyle(option, tab)"
            @click="() => onSelect(tabIndex, option)"
          >
            <span>{{ option[textKey] }}</span>
            <PressIcon
              v-if="utils.isSelected(tab, valueKey, option)"
              name="success"
              size="18"
            />
          </div>
        </div>
      </PressTab>
    </PressTabs>
  </div>
</template>

<script>
import { style } from '../common/utils/style';
import { nextTick } from '../common/utils/system';
import PressIcon from '../press-icon/press-icon.vue';
import PressTab from '../press-tab/press-tab.vue';
import PressTabs from '../press-tabs/press-tabs.vue';

import utils from './computed';


let FieldName;
(function (FieldName) {
  FieldName.TEXT = 'text';
  FieldName.VALUE = 'value';
  FieldName.CHILDREN = 'children';
}(FieldName || (FieldName = {})));
const defaultFieldNames = {
  text: FieldName.TEXT,
  value: FieldName.VALUE,
  children: FieldName.CHILDREN,
};
export default {
  name: 'PressCascader',
  options: {
    styleIsolation: 'shared',
  },
  components: {
    PressIcon,
    PressTab,
    PressTabs,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    activeColor: {
      type: String,
      default: '#1989fa',
    },
    options: {
      type: Array,
      default: () => [],
    },
    swipeable: {
      type: Boolean,
      default: false,
    },
    closeable: {
      type: Boolean,
      default: true,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    closeIcon: {
      type: String,
      default: 'cross',
    },
    fieldNames: {
      type: Object,
      default: () => (defaultFieldNames),
    },
    useTitleSlot: Boolean,

    tabStyle: {
      type: [String, Object],
      default: '',
    },
    tabsStyle: {
      type: [String, Object],
      default: '',
    },
    tabsWrapStyle: {
      type: [String, Object],
      default: '',
    },
  },
  emits: [
    'change',
    'finish',
    'close',
    'click-tab',
  ],
  data() {
    return {
      tabs: [],
      activeTab: 0,
      textKey: FieldName.TEXT,
      valueKey: FieldName.VALUE,
      childrenKey: FieldName.CHILDREN,
      innerValue: '',

      utils,
    };
  },
  computed: {
    innerTabsCustomStyle() {
      return style(this.tabsStyle);
    },
    innerTabsWrapCustomStyle() {
      let result = {};
      // #ifdef MP-TOUTIAO
      result = {
        padding: '0 8px',
        height: '48px',
      };
      // #endif
      return style([
        result,
        this.tabsWrapStyle,
      ]);
    },
    innerTabCustomStyle() {
      let result = {};
      // #ifdef MP-TOUTIAO
      result = {
        flex: 'none',
        padding: '0 8px',
        color: '#323233',
        fontWeight: 600,
      };
      // #endif
      return style([
        result,
        this.tabStyle,
      ]);
    },
  },
  watch: {
    options: {
      handler() {
        this.updateTabs();
      },
      deep: true,
    },
    value: {
      handler(newVal) {
        this.updateValue(newVal);
      },
      deep: true,
      immediate: true,
    },
    fieldNames: {
      handler() {
        this.updateFieldNames();
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.updateTabs();
  },
  mounted() {
  },
  methods: {
    updateValue(val) {
      if (val !== undefined) {
        const values = this.tabs.map(tab => tab.selected && tab.selected[this.valueKey]);
        if (values.indexOf(val) > -1) {
          return;
        }
      }
      this.innerValue = val;
      this.updateTabs();
    },
    updateFieldNames() {
      const { text = 'text', value = 'value', children = 'children' } = this.fieldNames || defaultFieldNames;
      this.textKey = text;
      this.valueKey = value;
      this.childrenKey = children;
    },
    getSelectedOptionsByValue(options, value) {
      for (let i = 0; i < options.length; i++) {
        const option = options[i];
        if (option[this.valueKey] === value) {
          return [option];
        }
        if (option[this.childrenKey]) {
          const selectedOptions = this.getSelectedOptionsByValue(option[this.childrenKey], value);
          if (selectedOptions) {
            return [option, ...selectedOptions];
          }
        }
      }
    },
    updateTabs() {
      const { options } = this;
      const { innerValue } = this;
      if (!options.length) {
        return;
      }
      if (innerValue !== undefined) {
        const selectedOptions = this.getSelectedOptionsByValue(options, innerValue);
        if (selectedOptions) {
          let optionsCursor = options;
          const tabs = selectedOptions.map((option) => {
            const tab = {
              options: optionsCursor,
              selected: option,
            };
            const next = optionsCursor.find(item => item[this.valueKey] === option[this.valueKey]);
            if (next) {
              optionsCursor = next[this.childrenKey];
            }
            return tab;
          });
          if (optionsCursor) {
            tabs.push({
              options: optionsCursor,
              selected: null,
            });
          }
          this.tabs = tabs;
          nextTick(() => {
            this.activeTab = tabs.length - 1;
          });
          return;
        }
      }
      this.tabs = [
        {
          options,
          selected: null,
        },
      ];
      this.activeTab = 0;
    },
    onClose() {
      this.$emit('close');
    },
    onClickTab(detail) {
      const { index: tabIndex, title } = detail;
      this.$emit('click-tab', { title, tabIndex });
      this.activeTab = tabIndex;
    },
    // 选中
    onSelect(tabIndex, option) {
      if (option && option.disabled) {
        return;
      }
      const { valueKey, childrenKey } = this;
      let { tabs } = this;
      tabs[tabIndex].selected = option;
      if (tabs.length > tabIndex + 1) {
        tabs = tabs.slice(0, tabIndex + 1);
      }
      if (option[childrenKey]) {
        const nextTab = {
          options: option[childrenKey],
          selected: null,
        };
        if (tabs[tabIndex + 1]) {
          tabs[tabIndex + 1] = nextTab;
        } else {
          tabs.push(nextTab);
        }
        nextTick(() => {
          this.activeTab = tabIndex + 1;
        });
      }
      this.tabs = tabs;
      const selectedOptions = tabs.map(tab => tab.selected).filter(Boolean);
      const value = option[valueKey];
      const params = {
        value,
        tabIndex,
        selectedOptions,
      };
      this.innerValue = value;
      this.$emit('change', params);
      if (!option[childrenKey]) {
        this.$emit('finish', params);
      }
    },
    getOptionsClass(option, tab) {
      return `${option.className || ''} ${utils.optionClass(tab, this.valueKey, option)}`;
    },
    getOptionsStyle(option, tab) {
      const { valueKey, activeColor } = this;
      return `${utils.optionStyle({ tab, valueKey, option, activeColor })}`;
    },
    getUniqueKey(a, b) {
      return `${a}-${b}`;
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
