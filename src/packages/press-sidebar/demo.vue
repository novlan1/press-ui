<template>
  <div class="demo-wrap demo-wrap--gap">
    <demo-block :title="t('basicUsage')">
      <press-sidebar :active-key="activeKey">
        <press-sidebar-item :title="t('title')" />
        <press-sidebar-item :title="t('title')" />
        <press-sidebar-item :title="t('title')" />
      </press-sidebar>
    </demo-block>

    <demo-block :title="t('showBadge')">
      <press-sidebar :active-key="activeKey">
        <press-sidebar-item
          :title="t('title')"
          dot
        />
        <press-sidebar-item
          :title="t('title')"
          badge="5"
        />
        <press-sidebar-item
          :title="t('title')"
          badge="99+"
        />
      </press-sidebar>
    </demo-block>

    <demo-block :title="t('disabled')">
      <press-sidebar :active-key="activeKey">
        <press-sidebar-item :title="t('title')" />
        <press-sidebar-item
          :title="t('title')"
          disabled
        />
        <press-sidebar-item :title="t('title')" />
      </press-sidebar>
    </demo-block>

    <demo-block :title="t('changeEvent')">
      <press-sidebar
        :active-key="activeKey"
        @change="onChange"
      >
        <press-sidebar-item :title="`${t('title')} 1`" />
        <press-sidebar-item
          :title="`${t('title')} 2`"
        />
        <press-sidebar-item :title="`${t('title')} 3`" />
      </press-sidebar>
    </demo-block>

    <!-- #ifndef H5 -->
    <PressToast id="press-toast" />
    <!-- #endif -->
  </div>
</template>
<script>
import PressSidebar from 'src/packages/press-sidebar/press-sidebar.vue';
import PressSidebarItem from 'src/packages/press-sidebar-item/press-sidebar-item.vue';
import PressToast from 'src/packages/press-toast/press-toast.vue';


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
