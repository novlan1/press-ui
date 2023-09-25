<template>
  <div class="demo-wrap demo-wrap--gap">
    <demo-block :title="t('basicUsage')">
      <press-area
        :area-list="areaList"
        @change="onChange"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </demo-block>

    <demo-block :title="t('title2')">
      <press-area
        :area-list="areaList"
        value="440304"
        @change="onChange"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </demo-block>

    <demo-block :title="t('title3')">
      <press-area
        :area-list="areaList"
        :columns-num="2"
        value="440304"
        @change="onChange"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </demo-block>

    <demo-block :title="t('title4')">
      <press-area
        :area-list="areaList"
        value="440304"
        :columns-placeholder="t('columnsPlaceholder')"
        @change="onChange"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </demo-block>

    <demo-block
      :title="t('withPopup')"
    >
      <press-cell
        :title="t('withPopup')"
        is-link
        @click="onShowAreaPopup"
      />
    </demo-block>

    <PressPopup
      :is-show="showPopup"
      :button="t('confirm')"
      :close-icon="true"
      :title="t('popupTitle')"
      @confirm="onConfirmPopup"
      @cancel="onCancelPopup"
    >
      <press-area
        ref="pressArea"
        :show-toolbar="false"
        :area-list="areaList"
        @change="onChange"
      />
    </PressPopup>
  </div>
</template>
<script>
import PressArea from 'src/packages/press-area/press-area.vue';
import PressCell from 'src/packages/press-cell/press-cell.vue';
import PressPopup from 'src/packages/press-popup/press-popup.vue';
import { isNotInUni } from 'src/packages/common/utils/utils';

const AREA_DATA_URL = 'https://tip-components-1251917893.cos.ap-guangzhou.myqcloud.com/rb/front-open-config__match__default__area_data.json';

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

function getAreaData() {
  return new Promise((resolve, reject) => {
    // #ifdef H5
    if (isNotInUni()) {
      fetch(AREA_DATA_URL).then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return {};
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });

      return;
    }
    // #endif
    uni.request({
      url: AREA_DATA_URL,
      data: {},
      method: 'GET',
      sslVerify: true,
      success: ({ data }) => {
        resolve(data);
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
}


export default {
  i18n: {
    'zh-CN': {
      title2: '选中省市区',
      title3: '配置显示列',
      title4: '配置列占位提示文字',
      columnsPlaceholder: ['请选择', '请选择', '请选择'],
      withPopup: '结合Popup',
      popupTitle: '选择地区',
      areaList: getAreaData,
    },
    'en-US': {
      title2: 'Initial Value',
      title3: 'Columns Number',
      title4: 'Columns Placeholder',
      columnsPlaceholder: ['Choose', 'Choose', 'Choose'],
      withPopup: 'With Popup',
      popupTitle: 'Select Area',
      areaList: () => Promise.resolve(AreaListEn),
    },
  },

  components: {
    PressArea,
    PressCell,
    PressPopup,
  },
  data() {
    return {
      areaList: {},
      showPopup: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
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
    onShowAreaPopup() {
      this.showPopup = true;
    },
    onConfirmPopup() {
      const values = this.$refs.pressArea?.getValues();
      const index = this.$refs.pressArea?.getIndexes();
      console.log('[onConfirmPopup] values index', values, index);

      this.showPopup = false;
    },
    onCancelPopup() {
      this.showPopup = false;
    },
  },
};
</script>
<style scoped lang="scss">
</style>
