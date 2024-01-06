<template>
  <div class="demo-wrap">
    <demo-block
      title="AreaIndexBar"
    >
      <press-cell
        title="Show"
        is-link
        @click="onShowAreaIndexBar"
      />
    </demo-block>

    <PressAreaIndexBar
      v-if="showAreaIndexBar"
      :area-data="areaJson"
      :s-province="province"
      :s-city="city"
      :window-top="44"
      :show-index-list="showIndexList"
      @onUnLimit="handleReSelect"
      @onCancel="closeMatchArea"
      @onConfirm="handleSelectArea"
    />
  </div>
</template>
<script>
import PressCell from 'src/packages/press-cell/press-cell.vue';
import PressAreaIndexBar from 'src/packages/press-area-index-bar/press-area-index-bar.vue';
import { fetchData } from 'src/utils/index';


const AREA_DATA_URL_2 = 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/data/area.json';


export default {
  components: {
    PressCell,
    PressAreaIndexBar,
  },
  data() {
    let showIndexList = true;
    // #ifdef MP-QQ
    showIndexList = false;
    // #endif

    return {
      areaJson: [],
      province: '',
      city: '',
      // indexList: [],

      showAreaIndexBar: false,
      showIndexList,
    };
  },
  mounted() {
    this.getAreaData();
    // this.indexList =  this.getIndexList();
  },
  methods: {
    onShowAreaIndexBar() {
      this.showAreaIndexBar = true;
    },
    // getIndexList() {
    //   const indexList = [];
    //   const charCodeOfA = 'A'.charCodeAt(0);
    //   for (let i = 0; i < 26; i++) {
    //     indexList.push(String.fromCharCode(charCodeOfA + i));
    //   }
    //   console.log('[indexList]', indexList);
    //   return indexList;
    // },
    handleReSelect(type) {
      if (type === 'city') {
        this.city = '';
      } else {
        this.province = '';
        this.city = '';
      }
      this.$forceUpdate();
    },
    handleSelectArea(province, city) {
      if (!province) {
        this.city = '';
        this.province = '';
      } else {
        this.province = province;
        this.city = city;
      }
      this.showAreaIndexBar = false;
    },
    closeMatchArea() {
      this.showAreaIndexBar = false;
    },
    getAreaData() {
      fetchData(AREA_DATA_URL_2).then((data) => {
        this.areaJson = data;
      });
    },
  },
};
</script>
<style scoped lang="scss">
</style>
