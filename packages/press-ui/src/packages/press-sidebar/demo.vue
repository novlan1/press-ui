<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <PressSidebar :active-key="activeKey">
        <PressSidebarItem :title="t('title')" />
        <PressSidebarItem :title="t('title')" />
        <PressSidebarItem :title="t('title')" />
      </PressSidebar>
    </demo-block>

    <demo-block :title="t('showBadge')">
      <PressSidebar :active-key="activeKey">
        <PressSidebarItem
          :title="t('title')"
          dot
        />
        <PressSidebarItem
          :title="t('title')"
          badge="5"
        />
        <PressSidebarItem
          :title="t('title')"
          badge="99+"
        />
      </PressSidebar>
    </demo-block>

    <demo-block :title="t('disabled')">
      <PressSidebar :active-key="activeKey">
        <PressSidebarItem :title="t('title')" />
        <PressSidebarItem
          :title="t('title')"
          disabled
        />
        <PressSidebarItem :title="t('title')" />
      </PressSidebar>
    </demo-block>

    <demo-block :title="t('changeEvent')">
      <PressSidebar
        :active-key="activeKey"
        @change="onChange"
      >
        <PressSidebarItem :title="`${t('title')} 1`" />
        <PressSidebarItem
          :title="`${t('title')} 2`"
        />
        <PressSidebarItem :title="`${t('title')} 3`" />
      </PressSidebar>
    </demo-block>

    <!-- #ifndef H5 -->
    <PressToast id="press-toast" />
    <!-- #endif -->
  </div>
</template>
<script>
import PressSidebar from 'press-ui/press-sidebar/press-sidebar.vue';
import PressSidebarItem from 'press-ui/press-sidebar-item/press-sidebar-item.vue';
import PressToast from 'press-ui/press-toast/press-toast.vue';


export default {
  i18n: {
    'zh-CN': {
      title: '标签名',
      showBadge: '徽标提示',
      disabled: '禁用选项',
      changeEvent: '监听切换事件',
      selectTip: '你切换到了',
    },
    'en-US': {
      showBadge: 'Show Badge',
      disabled: 'Disabled',
      changeEvent: 'Change Event',
      selectTip: 'You select ',
    },
  },

  components: {
    PressSidebar,
    PressSidebarItem,
    PressToast,
  },
  data() {
    return {
      activeKey: 0,
    };
  },
  methods: {
    onChange(val) {
      console.log('[onChange] val: ', val);
      this.onGTip(`${this.t('selectTip')}${val + 1}`);
    },
  },
};
</script>
<style scoped lang="scss">
</style>
