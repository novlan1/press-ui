<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
      :section-style="sectionStyle"
    >
      <PressTabbar
        :fixed="false"
        :active="active"
        :safe-area-inset-bottom="false"
        @change="onChange"
      >
        <PressTabbarItem
          icon="home-o"
          :style="itemStyle"
        >
          {{ t('tag') }}
        </PressTabbarItem>
        <PressTabbarItem
          icon="search"
          :style="itemStyle"
        >
          {{ t('tag') }}
        </PressTabbarItem>
        <PressTabbarItem
          icon="friends-o"
          :style="itemStyle"
        >
          {{ t('tag') }}
        </PressTabbarItem>
        <PressTabbarItem
          icon="setting-o"
          :style="itemStyle"
        >
          {{ t('tag') }}
        </PressTabbarItem>
      </PressTabbar>
    </demo-block>

    <demo-block
      :title="t('matchByName')"
      :section-style="sectionStyle"
    >
      <PressTabbar
        :active="activeName"
        :fixed="false"
        :safe-area-inset-bottom="false"
        @change="onChangeName"
      >
        <PressTabbarItem
          icon="home-o"
          name="home"
          :style="itemStyle"
        >
          {{ t('tag') }}
        </PressTabbarItem>
        <PressTabbarItem
          icon="search"
          name="search"
          :style="itemStyle"
        >
          {{ t('tag') }}
        </PressTabbarItem>
        <PressTabbarItem
          icon="friends-o"
          name="friends"
          :style="itemStyle"
        >
          {{ t('tag') }}
        </PressTabbarItem>
        <PressTabbarItem
          icon="setting-o"
          name="setting"
          :style="itemStyle"
        >
          {{ t('tag') }}
        </PressTabbarItem>
      </PressTabbar>
    </demo-block>

    <demo-block
      :title="t('badge')"
      :section-style="sectionStyle"
    >
      <PressTabbar
        :active="active"
        :fixed="false"
        :safe-area-inset-bottom="false"
        @change="onChange"
      >
        <PressTabbarItem
          icon="home-o"
          :style="itemStyle"
        >
          {{ t('tag') }}
        </PressTabbarItem>
        <PressTabbarItem
          icon="search"
          dot
          :style="itemStyle"
        >
          {{ t('tag') }}
        </PressTabbarItem>
        <PressTabbarItem
          icon="friends-o"
          info="5"
          :style="itemStyle"
        >
          {{ t('tag') }}
        </PressTabbarItem>
        <PressTabbarItem
          icon="setting-o"
          info="20"
          :style="itemStyle"
        >
          {{ t('tag') }}
        </PressTabbarItem>
      </PressTabbar>
    </demo-block>

    <demo-block
      :title="t('customIcon')"
      :section-style="sectionStyle"
    >
      <PressTabbar
        :fixed="false"
        :active="active"
        :safe-area-inset-bottom="false"
        @change="onChange"
      >
        <PressTabbarItem
          info="3"
          :style="itemStyle"
        >
          <template #icon>
            <img
              :src="icon.normal"
              mode="aspectFit"
              style="width: 23px; height: 18px;"
            >
          </template>

          <template #icon-active>
            <img
              :src="icon.active"
              mode="aspectFit"
              style="width: 23px; height: 18px;"
            >
          </template>
          {{ t('custom') }}
        </PressTabbarItem>
        <PressTabbarItem
          icon="search"
          :style="itemStyle"
        >
          {{ t('tag') }}
        </PressTabbarItem>
        <PressTabbarItem
          icon="setting-o"
          :style="itemStyle"
        >
          {{ t('tag') }}
        </PressTabbarItem>
      </PressTabbar>
    </demo-block>

    <demo-block
      :title="t('customColor')"
      :section-style="sectionStyle"
    >
      <PressTabbar
        :active="active"
        :fixed="false"
        active-color="#07c160"
        inactive-color="#000"
        :safe-area-inset-bottom="false"
        @change="onChange"
      >
        <PressTabbarItem
          icon="home-o"
          :style="itemStyle"
        >
          {{ t('tag') }}A
        </PressTabbarItem>
        <PressTabbarItem
          icon="search"
          :style="itemStyle"
        >
          {{ t('tag') }}B
        </PressTabbarItem>
        <PressTabbarItem
          icon="friends-o"
          :style="itemStyle"
        >
          {{ t('tag') }}C
        </PressTabbarItem>
        <PressTabbarItem
          icon="setting-o"
          :style="itemStyle"
        >
          {{ t('tag') }}D
        </PressTabbarItem>
      </PressTabbar>
    </demo-block>
  </div>
</template>
<script>
import PressTabbarItem from 'press-ui/press-tabbar-item/press-tabbar-item.vue';
import PressTabbar from 'press-ui/press-tabbar/press-tabbar.vue';


export default {
  i18n: {
    'zh-CN': {
      badge: '徽标提示',
      customIcon: '自定义图标',
      customColor: '自定义颜色',
      matchByName: '通过名称匹配',
      switchEvent: '监听切换事件',
      selectTip: '你切换到了',
    },
    'en-US': {
      badge: 'Show Badge',
      customIcon: 'Custom Icon',
      customColor: 'Custom Color',
      matchByName: 'Match by name',
      switchEvent: 'Change Event',
      selectTip: 'You select ',
    },
  },

  components: {
    PressTabbar,
    PressTabbarItem,
  },
  data() {
    return {
      active: 0,
      activeName: 'home',
      sectionStyle: 'margin: 0;',

      icon: {
        normal: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fuser-inactive.png',
        active: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fuser-active.png',
      },
    };
  },
  computed: {
    itemStyle() {
      let result = '';
      // #ifdef MP-TOUTIAO
      result = 'flex: 1';
      // #endif
      return result;
    },
  },
  methods: {
    onChange(val) {
      console.log('val', val);
      this.active = val;
    },
    onChangeName(val) {
      console.log('val', val);
      this.activeName = val;
    },
    clickItem() {
      console.log('[clickItem]');
    },
  },
};
</script>
<style scoped lang="scss">
</style>
