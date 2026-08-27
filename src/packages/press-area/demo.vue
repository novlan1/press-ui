<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <PressArea
        :area-list="areaList"
        @change="onChange"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </demo-block>

    <demo-block :title="t('title2')">
      <PressArea
        :area-list="areaList"
        value="440304"
        @change="onChange"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </demo-block>

    <demo-block :title="t('title3')">
      <PressArea
        :area-list="areaList"
        :columns-num="2"
        value="440304"
        @change="onChange"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </demo-block>

    <demo-block :title="t('title4')">
      <PressArea
        :area-list="areaList"
        value="440304"
        :columns-placeholder="t('columnsPlaceholder')"
        @change="onChange"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </demo-block>

    <demo-block :title="t('parseData')">
      <PressArea
        :area-list="parseData(areaList)"
        value="070000"
        @change="onChange"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </demo-block>

    <demo-block
      :title="t('withPopup')"
    >
      <PressCell
        title="Normal"
        is-link
        :value="normalCellValue"
        @click="onShowAreaPopup('')"
      />

      <PressCell
        title="E-Sport"
        is-link
        :value="eSportCellValue"
        @click="onShowAreaPopup('e-sport')"
      />
    </demo-block>

    <PressAreaPopup
      :show="showPopup"
      :area-list="areaList"
      :value="selectArea"
      :type="areaType"
      @update:show="value => showPopup = value"
      @confirm="onConfirmArea"
      @cancel="onCancelPopup"
    />
  </div>
</template>
<script>
import { getAreaData } from 'press-ui/press-area/computed';
import { parseData } from 'press-ui/press-area/helper/parse';

import PressAreaPopup from 'press-ui/press-area/press-area-popup.vue';
import PressArea from 'press-ui/press-area/press-area.vue';
import PressCell from 'press-ui/press-cell/press-cell.vue';


const AreaListEn = {
  province_list: {
    110000: 'Beijing',
    330000: 'Zhejiang',
    810000: 'Hong Kong',
  },
  city_list: {
    110100: 'Beijing City',
    330100: 'Hangzhou',
    330200: 'Ningbo',
    330300: 'Wenzhou',
    330400: 'Jiaxin',
    331100: 'Lishui',
    810100: 'Hong Kong Island',
    810200: 'Kowloon',
    810300: 'New Territories',
  },
  county_list: {
    110101: 'Dongcheng',
    110102: 'Xicheng',
    110105: 'Chaoyang',
    110106: 'Fengtai',
    110108: 'Haidian',
    110111: 'Fangshan',
    110112: 'Tongzhou',
    110113: 'Shunyi',
    110114: 'Changping',
    110115: 'Daxing',
    330105: 'Gongshu',
    330106: 'Xihu',
    330108: 'Binjiang',
    330109: 'Xiaoshan',
    330110: 'Yuhang',
    330111: 'Fuyang',
    330127: 'Chunan',
    330182: 'Jiande',
    330185: 'Linan',
    330206: 'Beilun',
    330211: 'Zhenhai',
    330225: 'Xiangshan',
    330226: 'Ninghai',
    330281: 'Yuyao',
    330282: 'Cixi',
    330327: 'Cangnan',
    330328: 'Wencheng',
    330329: 'Shuntai',
    330381: 'Ruian',
    330382: 'Yueqing',
    330402: 'Nanhu',
    330421: 'Jiashan',
    330424: 'Haiyan',
    330481: 'Haining',
    330482: 'Pinghu',
    330483: 'Tongxiang',
    331102: 'Liandu District',
    331121: 'Qingtian County',
    331125: 'Yunhe County',
    331181: 'Longquan County',
    810101: 'Central',
    810102: 'Wan Chai',
    810202: 'Mong Kok',
    810203: 'Sham Shui Po',
    810204: 'Chuk Un',
    810205: 'Kwun Tong',
    810303: 'Sha Tin',
    810305: 'Yuen Long',
    810306: 'Tuen Mun',
    810307: 'Tsuen Wan',
    810309: 'Lantau Island',
  },
};


export default {
  i18n: {
    'zh-CN': {
      title2: '选中省市区',
      title3: '配置显示列',
      title4: '配置列占位提示文字',
      columnsPlaceholder: ['请选择', '请选择', '请选择'],
      withPopup: '搭配弹出层使用',
      popupTitle: '选择地区',
      parseData: '特殊处理数据',
      areaList: getAreaData,
    },
    'en-US': {
      title2: 'Initial Value',
      title3: 'Columns Number',
      title4: 'Columns Placeholder',
      columnsPlaceholder: ['Choose', 'Choose', 'Choose'],
      withPopup: 'With Popup',
      popupTitle: 'Select Area',
      parseData: 'Parse Data',
      areaList: () => Promise.resolve(AreaListEn),
    },
  },

  components: {
    PressArea,
    PressCell,
    // PressPopupPlus,
    PressAreaPopup,
  },
  data() {
    return {
      areaList: {},
      showPopup: false,
      selectArea: '',
      areaType: '',

      normalCellValue: '',
      eSportCellValue: '',
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    parseData,
    onConfirm(...args) {
      console.log('[onConfirm]: ', ...args);
    },
    onCancel(...args) {
      console.log('[onCancel]: ', ...args);
    },
    init() {
      this.t('areaList').then(data => [
        this.areaList = data,
      ]);
    },
    onChange(value) {
      console.log('[onChange] value: ', value);
      const { index, values } = value;
      const names = values.map(item => item?.name || '').join('-');

      this.onGTip(`${names}, index: ${index}`);
    },
    onShowAreaPopup(type) {
      this.showPopup = true;
      console.log('type', type);
      this.areaType = type || '';
    },
    onCancelPopup() {
    },
    onConfirmArea(values, index) {
      console.log('[onConfirmArea] values index', values, index);
      this.selectArea = values[values.length - 1]?.code;
      const names = values.map(item => item?.name || '').join('-');
      this.onGTip(`${this.selectArea}: ${names}`);
      if (this.areaType) {
        this.eSportCellValue = names;
      } else {
        this.normalCellValue = names;
      }
    },
  },
};
</script>
<style scoped lang="scss">
</style>
