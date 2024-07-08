<template>
  <div class="press-area">
    <PressPopup
      :popup-title="title"
      :close-icon="true"
      :arrow-icon="false"
      button="确定"
      @onCancel="onCancel"
      @confirm="confirm"
    >
      <div class="press-area__top-bar">
        <div class="press-area__addresses">
          <div
            :class="province ? 'press-area__address--selected' :'press-area__address--unselected'"
            @click.stop="handleReSelect"
          >
            {{ province || '请选择' }}
          </div>
          <div
            v-if="province !== ''"
            class="press-area__address--unselected"
          >
            {{ city || '请选择' }}
          </div>
        </div>

        <div class="press-area__address-limit">
          <div
            v-if="!province"
            @click.stop="handleUnLimit('province')"
          >
            不限省份
          </div>
          <div
            v-else
            @click.stop="handleUnLimit('city')"
          >
            不限城市
          </div>
        </div>
      </div>

      <!-- <scroll-view
        class="tip-match-popup-content"
        scroll-y="true"
      > -->
      <PressIndexBar
        v-if="isShow"
        key="province"
        ref="pressIndexBar"
        :index-list="innerIndexList"
        :sticky-offset-top="stickyOffsetTop"
        highlight-color="#1181D7"
        :sticky="false"
        :window-top="windowTop"
        :z-index="10"
      >
        <div
          v-for="(item, index) in areaData"
          :key="index"
        >
          <press-index-anchor
            :index="item.key"
          />
          <div
            v-for="val in item.value"
            :key="val.p_id"
            class="press-area__area-item"
            @click="handleProvince(val)"
          >
            <div class="press-area__area-name">
              {{ val.name }}
            </div>
          </div>
        </div>
      </PressIndexBar>

      <PressIndexBar
        v-else
        key="city"
        :index-list="innerIndexList"
        :sticky-offset-top="stickyOffsetTop"
        highlight-color="#1181D7"
        :sticky="false"
        :window-top="windowTop"
        :z-index="10"
      >
        <div
          v-for="(item, index) in cityList"
          :key="index"
        >
          <press-index-anchor
            :index="item.key"
          />
          <div
            v-for="val in item.value"
            :key="val.id"
            class="press-area__area-item"
            @click="handleCity(val)"
          >
            <div class="press-area__area-name">
              {{ val.name }}
            </div>
          </div>
        </div>
      </PressIndexBar>
      <!-- </scroll-view> -->
    </PressPopup>
  </div>
</template>

<script>
import PressPopup from '../press-popup/press-popup.vue';
import PressIndexAnchor  from '../press-index-anchor/press-index-anchor.vue';
import PressIndexBar from '../press-index-bar/press-index-bar.vue';


export default {
  name: 'PressAreaIndexBar',
  options: {
    styleIsolation: 'shared',
  },
  components: {
    PressPopup,
    PressIndexAnchor,
    PressIndexBar,
  },
  props: {
    title: {
      type: String,
      default: '选择赛事所在区域',
    },
    areaData: {
      type: Array,
      default: () => [],
    },
    // indexList: {
    //   type: Array,
    //   default: () => [],
    // },
    sProvince: {
      type: String,
      default: '',
    },
    sCity: {
      type: String,
      default: '',
    },
    windowTop: {
      type: Number,
      default: 0,
    },
    showIndexList: {
      type: Boolean,
      default: true,
    },
  },
  emits: [
    'onCancel',
    'onConfirm',
    'onUnLimit',
  ],
  data() {
    return {
      cityList: [],
      isShow: true,
      province: '',
      city: '',
      stickyOffsetTop: 0,
    };
  },
  computed: {
    innerIndexList() {
      if (!this.showIndexList) {
        return [];
      }
      if (this.isShow) {
        return this.areaData.map(item => item.key);
      }
      return this.cityList.map(item => item.key);
    },
  },
  watch: {
    sCity(val) {
      this.city = val;
    },
    sProvince(val) {
      this.province = val;
    },
  },
  mounted() {
    this.city = this.sCity;
    this.province = this.sProvince;
    setTimeout(() => {
      this.$refs.pressIndexBar.updateData();
      this.$refs.pressIndexBar.setAnchorsRect().then((res) => {
        this.stickyOffsetTop = res[0]?.top || 0;
      });
    }, 400);
  },
  methods: {
    handleProvince(val) {
      this.isShow = false;
      this.city = '';
      this.province = val.name;
      this.cityList = val.city;
    },
    handleCity(val) {
      this.city = val.name;
    },
    handleReSelect() {
      this.isShow = true;
      this.province = '';
      this.city = '';
    },
    handleUnLimit(type) {
      this.city = '';
      this.$emit('onUnLimit', type);
    },
    onCancel() {
      this.$emit('onCancel');
    },
    confirm() {
      this.$emit('onConfirm', this.province, this.city);
    },
  },
};
</script>

<style lang="scss" scoped src="./css/index.scss"></style>
