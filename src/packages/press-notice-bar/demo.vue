<template>
  <div class="demo-wrap demo-wrap--gap">
    <demo-block
      :title="t('basicUsage')"
      :section-style="sectionStyle"
    >
      <press-notice-bar
        scrollable
        left-icon="volume-o"
        :text="t('text')"
      />
    </demo-block>

    <demo-block
      :title="t('scrollable')"
      :section-style="sectionStyle"
    >
      <!-- 文字较短时，通过设置 scrollable 属性开启滚动播放 -->
      <press-notice-bar
        scrollable
        :text="t('shortText')"
      />

      <!-- 文字较长时，通过禁用 scrollable 属性关闭滚动播放 -->
      <press-notice-bar
        :scrollable="false"
        :text="t('text')"
      />
    </demo-block>

    <demo-block
      :title="t('wrapable')"
      :section-style="sectionStyle"
    >
      <press-notice-bar
        wrapable
        :scrollable="false"
        :text="t('text')"
      />
    </demo-block>

    <demo-block
      :title="t('mode')"
      :section-style="sectionStyle"
    >
      <!-- closeable 模式，在右侧显示关闭按钮 -->
      <press-notice-bar
        mode="closeable"
        :text="t('shortText')"
      />

      <!-- link 模式，在右侧显示链接箭头 -->
      <press-notice-bar
        mode="link"
        :text="t('shortText')"
      />
    </demo-block>

    <demo-block
      :title="t('customStyle')"
      :section-style="sectionStyle"
    >
      <press-notice-bar
        color="#1989fa"
        background="#ecf9ff"
        left-icon="info-o"
        :text="t('shortText')"
      />
    </demo-block>

    <demo-block
      :title="t('customSpeed')"
      :section-style="sectionStyle"
    >
      <press-notice-bar
        :text="t('shortText')"
        :speed="100"
        scrollable
        left-icon="//img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
      />
    </demo-block>
  </div>
</template>
<script>

export default {
  i18n: {
    'zh-CN': {
      text: '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。',
      mode: '通知栏模式',
      content: '内容',
      wrapable: '多行展示',
      shortText: '技术是开发它的人的共同灵魂。',
      scrollable: '滚动播放',
      customStyle: '自定义样式',
      verticalScroll: '垂直滚动',
      customSpeed: '自定义滚动速率',
    },
    'en-US': {
      text: 'Technology is the common soul of the people who developed it.',
      mode: 'Mode',
      content: 'Content',
      wrapable: 'Wrapable',
      shortText: 'Some short text.',
      customStyle: 'Custom Style',
      scrollable: 'Scrollable',
      verticalScroll: 'Vertical Scroll',
      customSpeed: 'Speed',
    },
  },

  data() {
    return {
      sectionStyle: 'margin:0;',
    };
  },
  methods: {

  },
};
</script>
<style scoped lang="scss">
</style>
