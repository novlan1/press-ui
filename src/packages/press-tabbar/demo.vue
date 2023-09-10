<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
      :section-style="sectionStyle"
    >
      <press-tabbar
        :fixed="false"
        :active="active"
        :safe-area-inset-bottom="false"
        @change="onChange"
      >
        <press-tabbar-item icon="home-o">
          {{ t('tag') }}
        </press-tabbar-item>
        <press-tabbar-item icon="search">
          {{ t('tag') }}
        </press-tabbar-item>
        <press-tabbar-item icon="friends-o">
          {{ t('tag') }}
        </press-tabbar-item>
        <press-tabbar-item icon="setting-o">
          {{ t('tag') }}
        </press-tabbar-item>
      </press-tabbar>
    </demo-block>

    <demo-block
      :title="t('matchByName')"
      :section-style="sectionStyle"
    >
      <press-tabbar
        :active="activeName"
        :fixed="false"
        :safe-area-inset-bottom="false"
        @change="onChangeName"
      >
        <press-tabbar-item
          icon="home-o"
          name="home"
        >
          {{ t('tag') }}
        </press-tabbar-item>
        <press-tabbar-item
          icon="search"
          name="search"
        >
          {{ t('tag') }}
        </press-tabbar-item>
        <press-tabbar-item
          icon="friends-o"
          name="friends"
        >
          {{ t('tag') }}
        </press-tabbar-item>
        <press-tabbar-item
          icon="setting-o"
          name="setting"
        >
          {{ t('tag') }}
        </press-tabbar-item>
      </press-tabbar>
    </demo-block>

    <demo-block
      :title="t('badge')"
      :section-style="sectionStyle"
    >
      <press-tabbar
        :active="active"
        :fixed="false"
        :safe-area-inset-bottom="false"
        @change="onChange"
      >
        <press-tabbar-item icon="home-o">
          {{ t('tag') }}
        </press-tabbar-item>
        <press-tabbar-item
          icon="search"
          dot
        >
          {{ t('tag') }}
        </press-tabbar-item>
        <press-tabbar-item
          icon="friends-o"
          info="5"
        >
          {{ t('tag') }}
        </press-tabbar-item>
        <press-tabbar-item
          icon="setting-o"
          info="20"
        >
          {{ t('tag') }}
        </press-tabbar-item>
      </press-tabbar>
    </demo-block>

    <demo-block
      :title="t('customIcon')"
      :section-style="sectionStyle"
    >
      <press-tabbar
        :fixed="false"
        :active="active"
        :safe-area-inset-bottom="false"
        @change="onChange"
      >
        <press-tabbar-item info="3">
          <img
            slot="icon"
            :src="icon.normal"
            mode="aspectFit"
            style="width: 23px; height: 18px;"
          >
          <img
            slot="icon-active"
            :src="icon.active"
            mode="aspectFit"
            style="width: 23px; height: 18px;"
          >
          {{ t('custom') }}
        </press-tabbar-item>
        <press-tabbar-item icon="search">
          {{ t('tag') }}
        </press-tabbar-item>
        <press-tabbar-item icon="setting-o">
          {{ t('tag') }}
        </press-tabbar-item>
      </press-tabbar>
    </demo-block>

    <demo-block
      :title="t('customColor')"
      :section-style="sectionStyle"
    >
      <press-tabbar
        :active="active"
        :fixed="false"
        active-color="#07c160"
        inactive-color="#000"
        :safe-area-inset-bottom="false"
        @change="onChange"
      >
        <press-tabbar-item icon="home-o">
          {{ t('tag') }}A
        </press-tabbar-item>
        <press-tabbar-item icon="search">
          {{ t('tag') }}B
        </press-tabbar-item>
        <press-tabbar-item icon="friends-o">
          {{ t('tag') }}C
        </press-tabbar-item>
        <press-tabbar-item icon="setting-o">
          {{ t('tag') }}D
        </press-tabbar-item>
      </press-tabbar>
    </demo-block>
  </div>
</template>
<script>
import PressTabbar from 'src/packages/press-tabbar/press-tabbar.vue';
import PressTabbarItem from 'src/packages/press-tabbar-item/press-tabbar-item.vue';


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
        normal: '//mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fuser-inactive.png',
        active: '//mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fuser-active.png',
      },
    };
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
  },
};
</script>
<style scoped lang="scss">
</style>
