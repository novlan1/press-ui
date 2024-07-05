<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
      :section-style="sectionStyle"
    >
      <press-tree-select
        :items="items"
        :main-active-index="mainActiveIndex"
        :active-id="activeId"
        @click-nav="onClickNav"
        @click-item="onClickItem"
      />
    </demo-block>
  </div>
</template>
<script>
import PressTreeSelect from 'press-ui/press-tree-select/press-tree-select.vue';


const zhCNData = [
  {
    text: '浙江',
    children: [
      {
        text: '杭州',
        id: 1,
      },
      {
        text: '温州',
        id: 2,
      },
      {
        text: '宁波',
        id: 3,
        disabled: true,
      },
      {
        text: '义乌',
        id: 4,
      },
    ],
  },
  {
    text: '江苏',
    children: [
      {
        text: '南京',
        id: 5,
      },
      {
        text: '无锡',
        id: 6,
      },
      {
        text: '徐州',
        id: 7,
      },
      {
        text: '苏州',
        id: 8,
      },
    ],
  },
  {
    text: '福建',
    disabled: true,
    children: [
      {
        text: '泉州',
        id: 9,
      },
      {
        text: '厦门',
        id: 10,
      },
    ],
  },
];

const enUSData = [
  {
    text: 'Group 1',
    children: [
      {
        text: 'Delaware',
        id: 1,
      },
      {
        text: 'Florida',
        id: 2,
      },
      {
        text: 'Georqia',
        id: 3,
        disabled: true,
      },
      {
        text: 'Indiana',
        id: 4,
      },
    ],
  },
  {
    text: 'Group 2',
    children: [
      {
        text: 'Alabama',
        id: 5,
      },
      {
        text: 'Kansas',
        id: 6,
      },
      {
        text: 'Louisiana',
        id: 7,
      },
      {
        text: 'Texas',
        id: 8,
      },
    ],
  },
  {
    text: 'Group 3',
    disabled: true,
    children: [
      {
        text: 'Alabama',
        id: 9,
      },
      {
        text: 'Kansas',
        id: 10,
      },
    ],
  },
];


export default {
  i18n: {
    'zh-CN': {
      showBadge: '徽标提示',
      radioMode: '单选模式',
      multipleMode: '多选模式',
      customContent: '自定义内容',
      data: zhCNData,
      dataSimple: [{ text: '分组 1' }, { text: '分组 2' }],
    },
    'en-US': {
      showBadge: 'Show Badge',
      radioMode: 'Radio Mode',
      multipleMode: 'Multiple Mode',
      customContent: 'Custom Content',
      data: enUSData,
      dataSimple: [{ text: 'Group 1' }, { text: 'Group 2' }],
    },
  },

  components: {
    PressTreeSelect,
  },
  data() {
    return {
      mainActiveIndex: 1,
      activeId: null,
      sectionStyle: 'margin: 0;',
    };
  },
  computed: {
    items() {
      return this.t('data');
    },
  },
  methods: {
    onClickNav(index) {
      this.mainActiveIndex = index || 0;
    },

    onClickItem(detail) {
      console.log('[detail]', detail);
      const activeId = this.activeId === detail.id ? null : detail.id;
      this.activeId = activeId;
    },
  },
};
</script>
<style scoped lang="scss">
</style>
