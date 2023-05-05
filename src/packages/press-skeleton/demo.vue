<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
      :section-style="sectionStyle"
    >
      <press-skeleton
        title
        :row="3"
      />
    </demo-block>

    <demo-block
      :title="t('showAvatar')"
      :section-style="sectionStyle"
    >
      <press-skeleton
        title
        avatar
        :row="3"
      />
    </demo-block>

    <demo-block
      :title="t('showChildren')"
      :section-style="sectionStyle"
    >
      <div class="demo-switch-wrap">
        <press-switch
          size="24px"
          :checked="!loading"
          @change="onChange"
        />
      </div>
      <press-skeleton
        title
        avatar
        :row="3"
        :loading="loading"
      >
        <div class="demo-preview">
          <img
            class="demo-preview-img"
            src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-ui-avatar-transparent-2.png"
          >
          <div class="demo-content">
            <div class="demo-content-h3">
              {{ t('title') }}
            </div>
            <div class="demo-content-p">
              {{ t('desc') }}
            </div>
          </div>
        </div>
      </press-skeleton>
    </demo-block>
  </div>
</template>
<script>
import PressSkeleton from 'src/packages/press-skeleton/press-skeleton.vue';
import PressSwitch from 'src/packages/press-switch/press-switch.vue';

export default {
  i18n: {
    'zh-CN': {
      showAvatar: '显示头像',
      showChildren: '显示子组件',
      title: '关于 Press UI',
      desc:
        'Press UI 是基于 uni-app 的易用、灵活的组件库，也可用于普通 H5 项目。',
    },
    'en-US': {
      showAvatar: 'Show Avatar',
      showChildren: 'Show Children',
      title: 'About Press UI',
      desc: 'Press UI is an easy-to-use and flexible component library based on uni-app, which can also be used in ordinary H5 projects.',
    },
  },

  components: {
    PressSkeleton,
    PressSwitch,
  },
  data() {
    return {
      loading: true,
      sectionStyle: 'margin: 0;',
    };
  },
  methods: {
    onChange(val) {
      this.loading = !val;
    },
  },
};
</script>
<style scoped lang="scss">
@import "src/packages/base/mixin.scss";

.demo-switch-wrap {
  margin: 0 16px 8px;
}

.demo-wrap ::v-deep .demo-preview {
  display: flex;
  padding: 0 16px;

  .demo-preview-img {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    margin-right: 16px;
  }

  .demo-content {
    padding-top: 6px;

    .demo-content-h3 {
      margin: 0;
      font-size: 18px;
      line-height: 20px;
    }

    .demo-content-p {
      margin: 13px 0 0;
      font-size: 14px;
      line-height: 25px;
    }
  }
}
</style>
