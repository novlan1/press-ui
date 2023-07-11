<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
      :section-style="sectionStyle"
    >
      <press-grid>
        <press-grid-item
          icon="photo-o"
          :text="t('text')"
        />
        <press-grid-item
          icon="photo-o"
          :text="t('text')"
        />
        <press-grid-item
          icon="photo-o"
          :text="t('text')"
        />
        <press-grid-item
          icon="photo-o"
          :text="t('text')"
        />
      </press-grid>
    </demo-block>

    <demo-block
      :title="t('columnNum')"
      :section-style="sectionStyle"
    >
      <press-grid :column-num="3">
        <press-grid-item
          v-for="(item,index) of 6"
          :key="index"
          icon="photo-o"
          :text="t('text')"
        />
      </press-grid>
    </demo-block>

    <demo-block
      :title="t('customContent')"
      :section-style="sectionStyle"
    >
      <press-grid
        :column-num="3"
        :border="false"
      >
        <press-grid-item
          v-for="(item,index) of 3"
          :key="index"
          use-slot
        >
          <img
            style="width: 100%; height: 90px;"
            :src="imageList[index]"
          >
        </press-grid-item>
      </press-grid>
    </demo-block>

    <demo-block
      :title="t('square')"
      :section-style="sectionStyle"
    >
      <press-grid square>
        <press-grid-item
          v-for="(item,index) of 8"
          :key="index"
          icon="photo-o"
          :text="t('text')"
        />
      </press-grid>
    </demo-block>

    <demo-block
      :title="t('gutter')"
      :section-style="sectionStyle"
    >
      <press-grid :gutter="10">
        <press-grid-item
          v-for="(item,index) of 8"
          :key="index"
          icon="photo-o"
          :text="t('text')"
        />
      </press-grid>
    </demo-block>

    <demo-block
      :title="t('horizontal')"
      :section-style="sectionStyle"
    >
      <press-grid
        direction="horizontal"
        :column-num="2"
      >
        <press-grid-item
          icon="photo-o"
          :text="t('text')"
        />
        <press-grid-item
          icon="photo-o"
          :text="t('text')"
        />
        <press-grid-item
          icon="photo-o"
          :text="t('text')"
        />
      </press-grid>
    </demo-block>

    <demo-block
      :title="t('pageRoute')"
      :section-style="sectionStyle"
    >
      <press-grid
        clickable
        :column-num="2"
      >
        <press-grid-item
          icon="home-o"
          link-type="navigateTo"
          url="/pages/index/index"
          :text="`Navigate ${t('jump')}`"
        />
        <press-grid-item
          icon="search"
          link-type="reLaunch"
          url="/pages/index/index"
          :text="`ReLaunch ${t('jump')}`"
        />
      </press-grid>
    </demo-block>

    <demo-block
      :title="t('showBadge')"
      :section-style="sectionStyle"
    >
      <press-grid :column-num="2">
        <press-grid-item
          icon="home-o"
          :text="t('text')"
          dot
        />
        <press-grid-item
          icon="search"
          :text="t('text')"
          badge="99+"
        />
      </press-grid>
    </demo-block>
  </div>
</template>
<script>
import PressGrid from 'src/packages/press-grid/press-grid.vue';
import PressGridItem from 'src/packages/press-grid-item/press-grid-item.vue';


export default {
  i18n: {
    'zh-CN': {
      text: '文字',
      route: '页面导航',
      gutter: '格子间距',
      square: '正方形格子',
      columnNum: '自定义列数',
      customContent: '自定义内容',
      pageRoute: 'Page 跳转',
      vueRoute: '路由跳转',
      showBadge: '徽标提示',
      horizontal: '内容横排',
      jump: '跳转',
    },
    'en-US': {
      text: 'Text',
      route: 'Route',
      gutter: 'Gutter',
      square: 'Square',
      columnNum: 'Column Num',
      customContent: 'Custom Content',
      pageRoute: 'Page',
      vueRoute: 'Vue Router',
      showBadge: 'Show Badge',
      horizontal: 'Horizontal',
      jump: 'Jump',
    },
  },

  components: {
    PressGrid,
    PressGridItem,
  },
  data() {
    return {
      sectionStyle: 'margin: 0;',
      imageList: [
        'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_9f901ce42e18990883.jpeg',
        'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_8f25b9e2e75f6754ad.jpeg',
        'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_260c4142c7225b5f73.jpeg',
      ],

    };
  },
  methods: {

  },
};
</script>
<style scoped lang="scss">
</style>
