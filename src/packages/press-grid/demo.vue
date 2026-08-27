<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
      :section-style="sectionStyle"
    >
      <PressGrid>
        <PressGridItem
          icon="photo-o"
          :text="t('text')"
        />
        <PressGridItem
          icon="photo-o"
          :text="t('text')"
        />
        <PressGridItem
          icon="photo-o"
          :text="t('text')"
        />
        <PressGridItem
          icon="photo-o"
          :text="t('text')"
        />
      </PressGrid>
    </demo-block>

    <demo-block
      :title="t('columnNum')"
      :section-style="sectionStyle"
    >
      <PressGrid :column-num="3">
        <PressGridItem
          v-for="(item,index) of 6"
          :key="index"
          icon="photo-o"
          :text="t('text')"
        />
      </PressGrid>
    </demo-block>

    <demo-block
      :title="t('customContent')"
      :section-style="sectionStyle"
    >
      <PressGrid
        :column-num="3"
        :border="false"
      >
        <PressGridItem
          v-for="(item,index) of 3"
          :key="index"
          use-slot
        >
          <img
            style="width: 100%; height: 90px;"
            :src="imageList[index]"
          >
        </PressGridItem>
      </PressGrid>
    </demo-block>

    <demo-block
      :title="t('square')"
      :section-style="sectionStyle"
    >
      <PressGrid square>
        <PressGridItem
          v-for="(item,index) of 8"
          :key="index"
          icon="photo-o"
          :text="t('text')"
        />
      </PressGrid>
    </demo-block>

    <demo-block
      :title="t('gutter')"
      :section-style="sectionStyle"
    >
      <PressGrid :gutter="10">
        <PressGridItem
          v-for="(item,index) of 8"
          :key="index"
          icon="photo-o"
          :text="t('text')"
        />
      </PressGrid>
    </demo-block>

    <demo-block
      :title="t('horizontal')"
      :section-style="sectionStyle"
    >
      <PressGrid
        direction="horizontal"
        :column-num="2"
      >
        <PressGridItem
          icon="photo-o"
          :text="t('text')"
        />
        <PressGridItem
          icon="photo-o"
          :text="t('text')"
        />
        <PressGridItem
          icon="photo-o"
          :text="t('text')"
        />
      </PressGrid>
    </demo-block>

    <demo-block
      :title="t('pageRoute')"
      :section-style="sectionStyle"
    >
      <PressGrid
        clickable
        :column-num="2"
      >
        <PressGridItem
          icon="home-o"
          link-type="navigateTo"
          url="/pages/press/schedule-tree/schedule-tree"
          :text="`Navigate ${t('jump')}`"
        />
        <PressGridItem
          icon="search"
          link-type="reLaunch"
          url="/pages/press/schedule-tree/schedule-tree"
          :text="`ReLaunch ${t('jump')}`"
        />
      </PressGrid>
    </demo-block>

    <demo-block
      :title="t('showBadge')"
      :section-style="sectionStyle"
    >
      <PressGrid :column-num="2">
        <PressGridItem
          icon="home-o"
          :text="t('text')"
          dot
        />
        <PressGridItem
          icon="search"
          :text="t('text')"
          badge="99+"
        />
      </PressGrid>
    </demo-block>
  </div>
</template>
<script>
import PressGridItem from 'press-ui/press-grid-item/press-grid-item.vue';
import PressGrid from 'press-ui/press-grid/press-grid.vue';


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
