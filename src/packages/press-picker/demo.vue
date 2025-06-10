<template>
  <div
    class="demo-wrap"
  >
    <demo-block :title="t('basicUsage')">
      <PressPicker
        :columns="columns"
        @change="onChange"
      />
    </demo-block>

    <demo-block :title="t('defaultIndex')">
      <PressPicker
        :columns="columns"
        :default-index="2"
        @change="onChange"
      />
    </demo-block>

    <demo-block :title="t('showToolbar')">
      <PressPicker
        show-toolbar
        :title="t('title')"
        :columns="columns"
        @change="onChange"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </demo-block>

    <demo-block :title="t('multipleColumns')">
      <PressPicker
        ref="picker"
        :columns="cColumns"
        @change="onChangePicker"
      />
    </demo-block>

    <demo-block :title="t('disableOption')">
      <PressPicker
        :columns="disabledColumns"
        @change="onChange"
      />
    </demo-block>

    <demo-block :title="t('loadingStatus')">
      <PressPicker
        :columns="disabledColumns"
        loading
        @change="onChange"
      />
    </demo-block>

    <demo-block
      :title="t('withPopup')"
    >
      <press-cell
        :title="t('check')"
        is-link
        @click="onShowPopupPlus"
      />
    </demo-block>


    <PressPickerPopup
      :show="showPopupPlus"
      :columns="momentumColumns"
      :use-momentum="true"
      @change="onChange"
      @cancel="showPopupPlus = false"
      @confirm="confirmPopupPlus"
    />
  </div>
</template>
<script>
import PressPickerPopup from 'press-ui/press-picker-popup/press-picker-popup.vue';
import PressPicker from 'press-ui/press-picker/press-picker.vue';


const dateColumns = {
  'zh-CN': [
    {
      values: ['周一', '周二', '周三', '周四', '周五'],
      defaultIndex: 2,
    },
    {
      values: ['上午', '下午', '晚上'],
      defaultIndex: 1,
    },
  ],
  'en-US': [
    {
      values: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      defaultIndex: 2,
    },
    {
      values: ['Morning', 'Afternoon', 'Evening'],
      defaultIndex: 1,
    },
  ],
};

const cascadeColumns = {
  'zh-CN': [
    {
      text: '浙江',
      children: [
        {
          text: '杭州',
          children: [{ text: '西湖区' }, { text: '余杭区' }],
        },
        {
          text: '温州',
          children: [{ text: '鹿城区' }, { text: '瓯海区' }],
        },
      ],
    },
    {
      text: '福建',
      children: [
        {
          text: '福州',
          children: [{ text: '鼓楼区' }, { text: '台江区' }],
        },
        {
          text: '厦门',
          children: [{ text: '思明区' }, { text: '海沧区' }],
        },
      ],
    },
  ],
  'en-US': [
    {
      text: 'Zhejiang',
      children: [
        {
          text: 'Hangzhou',
          children: [{ text: 'Xihu' }, { text: 'Yuhang' }],
        },
        {
          text: 'Wenzhou',
          children: [{ text: 'Lucheng' }, { text: 'Ouhai' }],
        },
      ],
    },
    {
      text: 'Fujian',
      children: [
        {
          text: 'Fuzhou',
          children: [{ text: 'Gulou' }, { text: 'Taijiang' }],
        },
        {
          text: 'Xiamen',
          children: [{ text: 'Siming' }, { text: 'Haicang' }],
        },
      ],
    },
  ],
};

const tagHtml = `
<div style="position: relative;width: 100%;height: 100%;display:flex; align-items:center;justify-content: center;">杭州
 <span style="position: absolute; top: 0; left: calc(50% + 19px);color: #fff;font-size: 10px;background: rgba(83, 0, 195, 0.75);width: 26px; height: 13px;line-height: 13px;">常用</span>
</div>
`;

export default {
  i18n: {
    'zh-CN': {
      city: '城市',
      cascade: '级联选择',
      withPopup: '搭配弹出层使用',
      chooseCity: '选择城市',
      showToolbar: '展示顶部栏',
      dateColumns: dateColumns['zh-CN'],
      defaultIndex: '默认选中项',
      disableOption: '禁用选项',
      cascadeColumns: cascadeColumns['zh-CN'],
      multipleColumns: '多列联动',
      setColumnValues: '动态设置选项',
      textColumns: [
        '杭州',
        '宁波',
        '温州',
        '绍兴',
        '湖州',
        '嘉兴',
        '金华',
        '衢州',
      ],
      disabledColumns: [
        { text: '杭州', disabled: true },
        { text: '宁波' },
        { text: '温州' },
      ],
      column3: {
        浙江: [
          {
            html: tagHtml,
            text: '杭州',
          },
          '宁波', '温州', '嘉兴', '湖州',
        ],
        福建: ['福州', '厦门', '莆田', '三明', '泉州'],
      },
      toastContent: (value, index) => `当前值：${value}, 当前索引：${index}`,
    },
    'en-US': {
      city: 'City',
      cascade: 'Cascade',
      withPopup: 'With Popup',
      chooseCity: 'Choose City',
      showToolbar: 'Show Toolbar',
      dateColumns: dateColumns['en-US'],
      defaultIndex: 'Default Index',
      disableOption: 'Disable Option',
      cascadeColumns: cascadeColumns['en-US'],
      multipleColumns: 'Multiple Columns',
      setColumnValues: 'Set Column Values',
      textColumns: ['Delaware', 'Florida', 'Georqia', 'Indiana', 'Maine'],
      disabledColumns: [
        { text: 'Delaware', disabled: true },
        { text: 'Florida' },
        { text: 'Georqia' },
      ],
      column3: {
        Group1: ['Delaware', 'Florida', 'Georqia', 'Indiana', 'Maine'],
        Group2: ['Alabama', 'Kansas', 'Louisiana', 'Texas'],
      },
      toastContent: (value, index) => `Value: ${value}, Index：${index}`,
    },
  },
  components: {
    PressPicker,
    PressPickerPopup,
  },
  data() {
    return {
      showPopupPlus: false,
      momentumColumns: Array.from({ length: 500 }).map((item, index) => `Momentum ${index + 1}`),
    };
  },
  computed: {
    columns() {
      return this.t('textColumns');
    },
    disabledColumns() {
      return this.t('disabledColumns');
    },
    cColumns() {
      const citys = this.t('column3');
      return [
        {
          values: Object.keys(citys),
          className: 'column1',
        },
        {
          values: Object.values(citys)[0],
          className: 'column2',
          defaultIndex: 2,
        },
      ];
    },
  },
  methods: {
    onChangePicker(val) {
      const cities = this.t('column3');
      const { value } = val;
      this.$refs.picker.setColumnValues(1, cities[value[0]]);
      const values = this.$refs.picker.getValues();
      const indexes = this.$refs.picker.getIndexes();
      this.onTip({
        value: values.map(item => item.text || item),
        index: indexes,
      });
    },
    onChange(val) {
      console.log('onChange.val', val);
      this.onTip(val);
    },
    onCancel(val) {
      console.log('onCancel.val', val);
      this.onTip(val, '[cancel] ');
    },
    onConfirm(val) {
      console.log('onConfirm.val', val);
      this.onTip(val, '[confirm] ');
    },
    onTip(val, prefix = '') {
      const { value, index } = val;
      const title = `${prefix}value: ${value.text || value}, index: ${index}`;
      this.onGTip(title);
    },
    onShowPopupPlus() {
      this.showPopupPlus = true;
    },
    confirmPopupPlus(...args) {
      console.log('[confirmPopupPlus]', ...args);
      this.showPopupPlus = false;
    },
  },
};
</script>

<style scoped lang="scss">
</style>

