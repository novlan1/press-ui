<template>
  <press-tabbar
    :active="active"
    @change="onChangeTabbar"
  >
    <press-tabbar-item>
      <img
        slot="icon"
        :src="tabbarMap.componentDefault"
        mode="aspectFit"
        style="width: 20px; height: 20px;"
      >
      <img
        slot="icon-active"
        :src="tabbarMap.componentActive"
        mode="aspectFit"
        style="width: 20px; height: 20px;"
      >
      组件
    </press-tabbar-item>
    <press-tabbar-item>
      <img
        slot="icon"
        :src="tabbarMap.mineDefault"
        mode="aspectFit"
        style="width: 20px; height: 20px;"
      >
      <img
        slot="icon-active"
        :src="tabbarMap.mineActive"
        mode="aspectFit"
        style="width: 20px; height: 20px;"
      >
      帮助
    </press-tabbar-item>
  </press-tabbar>
</template>
<script>
import PressTabbar from '../../packages/press-tabbar/press-tabbar.vue';
import PressTabbarItem from '../../packages/press-tabbar-item/press-tabbar-item.vue';


export default {
  components: {
    PressTabbar,
    PressTabbarItem,
  },
  props: {
    active: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // active: 0,
      tabbarMap: {
        componentActive: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_aede73416a7ac7c219.png',
        componentDefault: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_778695a56389b1bcb5.png',
        mineDefault: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_36d43d17e7ff46ae00.png',
        mineActive: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_0bcab918b51e5d4005.png',
      },
    };
  },
  methods: {
    onChangeTabbar(value) {
      // this.active = value;
      if (value === 1) {
        uni.navigateTo({
          url: '/pages/index/help',
        });
      } else if (value === 0) {
        uni.navigateTo({
          url: '/pages/index/index',
        });
      }
    },
  },
};
</script>
