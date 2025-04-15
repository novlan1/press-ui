<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
    >
      <PressText :text="t('basicText')" />
    </demo-block>

    <demo-block
      :title="t('theme')"
      section-style="display: flex;"
    >
      <PressText
        type="primary"
        :text="t('primary')"
      />
      <PressText
        type="error"
        :text="t('error')"
      />
      <PressText
        type="success"
        :text="t('success')"
      />
      <PressText
        type="warning"
        :text="t('warning')"
      />
      <PressText
        type="info"
        :text="t('info')"
      />
    </demo-block>

    <demo-block
      :title="t('phone')"
    >
      <PressText
        mode="phone"
        text="19012345678"
        call
      />

      <PressText
        mode="phone"
        text="19012345678"
        format="encrypt"
      />
    </demo-block>

    <demo-block
      :title="t('date')"
    >
      <PressText
        mode="date"
        text="1720633407953"
      />
    </demo-block>


    <demo-block
      :title="t('name')"
    >
      <PressText
        mode="name"
        :text="t('oneName')"
        format="encrypt"
      />
    </demo-block>

    <demo-block
      :title="t('link')"
    >
      <PressText
        mode="link"
        text="Go to Press UI docs"
        href="https://novlan1.github.io/press-ui/"
      />
    </demo-block>

    <demo-block
      :title="t('price')"
    >
      <PressText
        mode="price"
        text="728732.32"
      />
    </demo-block>

    <demo-block
      :title="t('icon')"
      section-style="display: flex;"
    >
      <PressText
        prefix-icon="like-o"
        icon-style="margin-right: 4px;"
        :text="t('snow')"
      />
      <PressText
        suffix-icon="arrow"
        :text="t('checkMore')"
      />
    </demo-block>

    <demo-block
      :title="t('ellipsis')"
    >
      <PressText
        :lines="2"
        :text="t('longText')"
      />
    </demo-block>

    <demo-block
      :title="t('openType')"
    >
      <PressText
        :text="t('shareWX')"
        open-type="share"
        type="success"
        @click="clickHandler"
      />
    </demo-block>
  </div>
</template>
<script>
import PressText from 'press-ui/press-text/press-text';

export default {
  i18n: {
    'zh-CN': {
      theme: '自定义主题',
      phone: '电话',
      date: '日期',
      name: '姓名',
      link: '超链接',
      price: '金额',
      icon: '前后图标',
      ellipsis: '超出隐藏',
      openType: '小程序开放能力',
      primary: '主色',
      error: '错误',
      success: '成功',
      warning: '警告',
      info: '信息',
      oneName: '花木兰',
      checkMore: '查看更多',
      snow: '2002年的第一场雪',
      shareWX: '分享小程序',
      basicText: '朝花夕拾',
    },
    'en-US': {
      theme: 'Theme',
      phone: 'Phone Mode',
      date: 'Date Mode',
      name: 'Name',
      link: 'Link',
      price: 'Price',
      icon: 'Icon',
      ellipsis: 'Ellipsis',
      openType: 'OpenType',
      primary: 'Primary',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'INfo',
      oneName: 'AoBaMa',
      checkMore: 'Check More',
      snow: 'The Snow',
      shareWX: 'Share To WeiXin',
      basicText: 'Seize The Day',
    },
  },
  components: {
    PressText,
  },
  data() {
    return {

    };
  },
  methods: {
    clickHandler() {
      // #ifndef MP
      this.onGTip('请在小程序内查看效果');
      // #endif
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  padding-bottom: 50px;

  ::v-deep .section-content {
    margin: 0 20px;
  }
}
/* #ifdef MP-QQ */
::v-deep press-text {
  flex: 1;
}
/* #endif */
</style>
