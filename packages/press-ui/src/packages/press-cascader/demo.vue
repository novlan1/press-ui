<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <press-field
        :value="fieldValue.basic"
        :model-value="fieldValue.basic"
        is-link
        :readonly="isMp"
        :label="t('area')"
        :placeholder="t('selectArea')"
        @click="onClick('basic')"
        @click-input="onClick('basic')"
      />
      <press-popup-plus
        :show="show.basic"
        round
        position="bottom"
        @after-leave="afterLeave"
      >
        <press-cascader
          v-if="show.basic || leaving.basic"
          :value="cascaderValue.basic"
          :title="t('selectArea')"
          :options="t('options')"
          @close="onClose"
          @finish="onFinish"
        />
      </press-popup-plus>
    </demo-block>

    <demo-block :title="t('chinaAreaData')">
      <press-field
        :value="fieldValue.chinaArea"
        :model-value="fieldValue.chinaArea"
        is-link
        :readonly="isMp"
        :label="t('area')"
        :placeholder="t('selectArea')"
        @click="onClick('chinaArea')"
        @click-input="onClick('chinaArea')"
      />
      <press-popup-plus
        :show="show.chinaArea"
        round
        position="bottom"
        @after-leave="afterLeave"
      >
        <press-cascader
          v-if="show.chinaArea || leaving.chinaArea"
          :value="cascaderValue.chinaArea"
          :title="t('selectArea')"
          :options="chinaArea"
          @close="onClose"
          @finish="onFinish"
        />
      </press-popup-plus>
    </demo-block>

    <demo-block :title="t('customColor')">
      <press-field
        :value="fieldValue.customColor"
        :model-value="fieldValue.customColor"
        is-link
        :readonly="isMp"
        :label="t('area')"
        :placeholder="t('selectArea')"
        @click="onClick('customColor')"
        @click-input="onClick('customColor')"
      />
      <press-popup-plus
        :show="show.customColor"
        round
        position="bottom"
        @after-leave="afterLeave"
      >
        <press-cascader
          v-if="show.customColor || leaving.customColor"
          :value="cascaderValue.customColor"
          :title="t('selectArea')"
          :options="t('options')"
          active-color="#ee0a24"
          @close="onClose"
          @finish="onFinish"
        />
      </press-popup-plus>
    </demo-block>

    <demo-block :title="t('asyncOptions')">
      <press-field
        :value="fieldValue.asyncOptions"
        :model-value="fieldValue.asyncOptions"
        is-link
        :readonly="isMp"
        :label="t('area')"
        :placeholder="t('selectArea')"
        @click="onClick('asyncOptions')"
        @click-input="onClick('asyncOptions')"
      />
      <press-popup-plus
        :show="show.asyncOptions"
        round
        position="bottom"
        @after-leave="afterLeave"
      >
        <press-cascader
          v-if="show.asyncOptions || leaving.asyncOptions"
          :value="cascaderValue.asyncOptions"
          :title="t('selectArea')"
          :options="asyncStateOptions"
          @close="onClose"
          @finish="onFinish"
          @change="loadDynamicOptions"
        />
      </press-popup-plus>
    </demo-block>

    <demo-block :title="t('customFieldNames')">
      <press-field
        :value="fieldValue.customFieldNames"
        :model-value="fieldValue.customFieldNames"
        is-link
        :readonly="isMp"
        :label="t('area')"
        :placeholder="t('selectArea')"
        @click="onClick('customFieldNames')"
        @click-input="onClick('customFieldNames')"
      />
      <press-popup-plus
        :show="show.customFieldNames"
        round
        position="bottom"
        @after-leave="afterLeave"
      >
        <press-cascader
          v-if="show.customFieldNames || leaving.customFieldNames"
          :value="cascaderValue.customFieldNames"
          :title="t('selectArea')"
          :field-names="fieldNames"
          :options="customFieldOptions"
          @close="onClose"
          @finish="onFinish"
          @change="loadDynamicOptions"
        />
      </press-popup-plus>
    </demo-block>
  </div>
</template>
<script>
import PressCascader from 'press-ui/press-cascader/press-cascader';
import PressField from 'press-ui/press-field/press-field';
import PressPopupPlus from 'press-ui/press-popup-plus/press-popup-plus';

import enUSOptions from 'src/packages/press-cascader/demo-helper/area-en-US.js';
import zhCNOptions from 'src/packages/press-cascader/demo-helper/area-zh-CN.js';

import { deepClone } from 'press-ui/common/utils/object';
import { fetchCascaderAreaData } from 'press-ui/press-cascader/helper';
import { hideKeyboard } from 'press-ui/common/pure/hide-keyboard';


const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [{ text: '杭州市', value: '330100' }],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [{ text: '南京市', value: '320100' }],
  },
];

function getCustomFieldOptions(options) {
  const newOptions = deepClone(options);
  const adjustFieldName = (item) => {
    if ('text' in item) {
      item.name = item.text;
      delete item.text;
    }
    if ('value' in item) {
      item.code = item.value;
      delete item.value;
    }
    if ('children' in item) {
      item.items = item.children;
      delete item.children;
      item.items.forEach(adjustFieldName);
    }
  };
  newOptions.forEach(adjustFieldName);
  return newOptions;
}
export default {
  i18n: {
    'zh-CN': {
      area: '地区',
      options: zhCNOptions,
      selectArea: '请选择地区',
      customColor: '自定义颜色',
      asyncOptions: '异步加载选项',
      asyncOptions1: [
        {
          text: '浙江省',
          value: '330000',
          children: [],
        },
      ],
      asyncOptions2: [
        { text: '杭州市', value: '330100' },
        { text: '宁波市', value: '330200' },
      ],
      currentLevel: level => `当前为第 ${level} 级`,
      chinaAreaData: '中国省市区数据',
      customContent: '自定义选项上方内容',
      customFieldNames: '自定义字段名',
    },
    'en-US': {
      area: 'Area',
      options: enUSOptions,
      selectArea: 'Select Area',
      customColor: 'Custom Color',
      asyncOptions: 'Async Options',
      asyncOptions1: [
        {
          text: 'Zhejiang',
          value: '330000',
          children: [],
        },
      ],
      asyncOptions2: [
        { text: 'Hangzhou', value: '330100' },
        { text: 'Ningbo', value: '330200' },
      ],
      currentLevel: level => `Current level is ${level}`,
      chinaAreaData: 'China Area Data',
      customContent: 'Custom Content',
      customFieldNames: 'Custom Field Names',
    },
  },
  components: {
    PressCascader,
    PressField,
    PressPopupPlus,
  },
  data() {
    return {
      show: {
        basic: false,
        customColor: false,
        asyncOptions: false,
        customFieldNames: false,
        chinaArea: false,
      },
      // 防止 popup-plus 动画消失不正确
      leaving: {
        basic: false,
        customColor: false,
        asyncOptions: false,
        customFieldNames: false,
        chinaArea: false,
      },
      options,
      fieldValue: {
        basic: '',
        customColor: '',
        asyncOptions: '',
        customFieldNames: '',
        chinaArea: '',
      },
      cascaderValue: {
        basic: '',
        customColor: '',
        asyncOptions: '',
        customFieldNames: '',
        chinaArea: '',
      },
      curDemo: '',
      asyncStateOptions: this.t('asyncOptions1'),
      fieldNames: {
        text: 'name',
        value: 'code',
        children: 'items',
      },
      chinaArea: [],
    };
  },
  computed: {
    isMp() {
      let mp = false;
      // #ifdef MP
      mp = true;
      // #endif
      return mp;
    },
    customFieldOptions() {
      const res =  getCustomFieldOptions(this.t('options'));
      return res;
    },
  },
  mounted() {
    this.getChinaArea();
  },
  methods: {
    onClick(key) {
      hideKeyboard();
      this.curDemo = key;

      this.show[key] = true;
      this.leaving[this.curDemo] = true;
      // this.$refs.cascader.$refs.tabs.resize();
    },
    onClose() {
      this.show[this.curDemo] = false;
    },
    onFinish(detail) {
      console.log('[onFinish] detail: ', detail);
      const { selectedOptions, value } = detail;
      const fieldValue = selectedOptions
        .map(option => option.text || option.name)
        .join('/');
      this.fieldValue[this.curDemo] = fieldValue;
      this.cascaderValue[this.curDemo] = value;

      this.onClose();
    },
    loadDynamicOptions(detail) {
      const { value } = detail;
      if (value === '330000') {
        setTimeout(() => {
          // #ifdef VUE2
          this.$set(this.asyncStateOptions[0], 'children', this.t('asyncOptions2'));
          // #endif
          // #ifdef VUE3
          this.asyncStateOptions[0].children = this.t('asyncOptions2');
          // #endif
        }, 500);
      }
    },
    afterLeave() {
      this.leaving[this.curDemo] = false;
    },
    getChinaArea() {
      fetchCascaderAreaData().then((res) => {
        this.chinaArea = res;
      });
    },
  },
};
</script>
<style scoped lang="scss">
</style>
