<template>
  <div class="demo-wrap">
    <demo-block
      v-for="(demo) of demoList"
      :key="demo.key"
      :title="demo.title"
    >
      <div
        v-for="(item,index) of list"
        :key="index"
        class="demo-part"
      >
        <press-tag
          :type="item.type"
          :plain="demo.plain || false"
          :round="demo.round || false"
          :mark="demo.mark || false"
        >
          {{ t('tag') }}
        </press-tag>
      </div>
    </demo-block>

    <demo-block
      :title="t('customColor')"
    >
      <div class="demo-part">
        <press-tag color="#f2826a">
          {{ t('tag') }}
        </press-tag>
      </div>
      <div class="demo-part">
        <press-tag color="#7232dd">
          {{ t('tag') }}
        </press-tag>
      </div>
      <div class="demo-part">
        <press-tag
          color="#7232dd"
          plain
        >
          {{ t('tag') }}
        </press-tag>
      </div>
      <div class="demo-part">
        <press-tag
          color="#ffe1e1"
          text-color="#ad0000"
        >
          {{ t('tag') }}
        </press-tag>
      </div>
    </demo-block>

    <demo-block
      :title="t('customSize')"
    >
      <div class="demo-part">
        <press-tag type="danger">
          {{ t('tag') }}
        </press-tag>
      </div>
      <div class="demo-part">
        <press-tag
          type="danger"
          size="medium"
        >
          {{ t('tag') }}
        </press-tag>
      </div>
      <div class="demo-part">
        <press-tag
          type="danger"
          size="large"
        >
          {{ t('tag') }}
        </press-tag>
      </div>
    </demo-block>

    <demo-block
      :title="t('closeable')"
    >
      <div
        v-if="show.primary"
        class="demo-part"
      >
        <press-tag
          type="primary"
          closeable
          @close="onClose('primary')"
        >
          {{ t('tag') }}
        </press-tag>
      </div>
      <div class="demo-part">
        <press-tag
          v-if="show.success"
          type="success"
          closeable
          @close="onClose('success')"
        >
          {{ t('tag') }}
        </press-tag>
      </div>
    </demo-block>
  </div>
</template>
<script>

export default {
  i18n: {
    'zh-CN': {
      type: '类型',
      mark: '标记样式',
      plain: '空心样式',
      round: '圆角样式',
      tagStyle: '样式风格',
      closeable: '可关闭标签',
      smallSize: '小号标签',
      largeSize: '大号标签',
      mediumSize: '中号标签',
      customSize: '标签大小',
      customColor: '自定义颜色',
      customBgColor: '背景颜色',
      customTextColor: '文字颜色',
      customPlainColor: '空心颜色',
    },
    'en-US': {
      mark: 'Mark style',
      plain: 'Plain style',
      round: 'Round style',
      tagStyle: 'Tag Style',
      closeable: 'Closeable',
      smallSize: 'Small Size',
      largeSize: 'Large Size',
      mediumSize: 'Medium Size',
      customColor: 'Custom Color',
      customSize: 'Custom Size',
      customBgColor: 'Background Color',
      customTextColor: 'Text Color',
      customPlainColor: 'Plain Color',
    },
  },

  data() {
    return {
      list: [
        {
          type: 'primary',
        },
        {
          type: 'success',
        },
        {
          type: 'danger',
        },
        {
          type: 'warning',
        },
      ],
      demoList: [
        {
          key: 'basic',
          title: this.t('basicUsage'),
        },
        {
          key: 'plain',
          title: this.t('plain'),
          plain: true,
        },
        {
          key: 'round',
          title: this.t('round'),
          round: true,
        },
        {
          key: 'mark',
          title: this.t('mark'),
          mark: true,
        },
      ],
      show: {
        primary: true,
        success: true,
      },
    };
  },
  methods: {
    onClose(type) {
      console.log('type', type);
      this.show[type] = false;
    },
  },
};
</script>
<style scoped lang="scss">
.demo-part {
  margin-right: 12px;
  display: inline-block;
}
</style>
