<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
      :section-style="sectionStyle"
    >
      <press-empty :description="t('description')" />
    </demo-block>

    <demo-block
      :title="t('imageType')"
      :section-style="sectionStyle"
    >
      <press-tabs>
        <press-tab
          v-for="(item, index) of imgTypeList"
          :key="index"
          :title="item.title"
        >
          <press-empty
            :image="item.name"
            :description="t('description')"
          />
        </press-tab>
      </press-tabs>
    </demo-block>

    <demo-block
      :title="t('customImage')"
      :section-style="sectionStyle"
    >
      <press-empty
        custom-class="custom-image"
        image="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fcustom-empty-image.png"
        image-custom-style="width:90px;height:90px"
        :description="t('description')"
      />
    </demo-block>

    <demo-block
      :title="t('bottomContent')"
      :section-style="sectionStyle"
    >
      <press-empty :description="t('description')">
        <press-button
          round
          type="danger"
          custom-class="bottom-button"
        >
          {{ t('button') }}
        </press-button>
      </press-empty>
    </demo-block>

    <demo-block
      title="E-SPORT"
      :section-style="sectionStyle"
    >
      <press-empty
        type="e-sport"
        :description="t('description')"
      />
    </demo-block>
  </div>
</template>
<script>
import PressTabs from 'src/packages/press-tabs/press-tabs.vue';
import PressTab from 'src/packages/press-tab/press-tab.vue';


export default {
  i18n: {
    'zh-CN': {
      error: '通用错误',
      search: '搜索提示',
      network: '网络错误',
      imageType: '图片类型',
      description: '描述文字',
      customImage: '自定义图片',
      bottomContent: '底部内容',
    },
    'en-US': {
      error: 'Error',
      search: 'Search',
      network: 'Network',
      imageType: 'Image Type',
      description: 'Description',
      customImage: 'Custom Image',
      bottomContent: 'Bottom Content',
    },
  },

  components: {
    PressTabs,
    PressTab,
  },
  data() {
    return {
      sectionStyle: '',
      imgTypeList: [
        {
          name: 'error',
          title: this.t('error'),
        },
        {
          name: 'network',
          title: this.t('network'),
        },
        {
          name: 'search',
          title: this.t('search'),
        },
      ],
    };
  },
  methods: {

  },
};
</script>
<style lang="scss">
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
