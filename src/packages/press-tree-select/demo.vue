<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('radioMode')"
      :section-style="sectionStyle"
    >
      <PressTreeSelect
        :items="items"
        :main-active-index="mainActiveIndex"
        :active-id="activeId"
        @click-nav="onClickNav"
        @click-item="onClickItem"
      />
    </demo-block>

    <demo-block
      :title="t('multipleMode')"
      :section-style="sectionStyle"
    >
      <PressTreeSelect
        :max="2"
        :items="items"
        :main-active-index="mainActiveIndexMulti"
        :active-id="activeIdMulti"
        @click-nav="onClickNavMulti"
        @click-item="onClickItemMulti"
      />
    </demo-block>

    <demo-block
      :title="t('customContent')"
      :section-style="sectionStyle"
    >
      <PressTreeSelect
        :items="t('dataSimple')"
        :main-active-index="mainActiveIndex"
        height="55vw"
        :active-id="activeId"
        @click-nav="onClickNav"
        @click-item="onClickItem"
      >
        <div
          slot="content"
          style="width: 100%;height: 100%"
        >
          <PressImage
            v-if="mainActiveIndex == 0"
            src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_9f901ce42e18990883.jpeg"
            width="100%"
            height="100%"
            transition-style="width: 100%;height: 100%;"
          />
          <PressImage
            v-else-if="mainActiveIndex == 1"
            src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_8f25b9e2e75f6754ad.jpeg"
            width="100%"
            height="100%"
            transition-style="width: 100%;height: 100%;"
          />
        </div>
      </PressTreeSelect>
    </demo-block>

    <demo-block
      :title="t('showBadge')"
      :section-style="sectionStyle"
    >
      <PressTreeSelect
        :items="badgeItems"
        :main-active-index="mainActiveIndex"
        :active-id="activeId"
        @click-nav="onClickNav"
        @click-item="onClickItem"
      />
    </demo-block>
  </div>
</template>
<script>
import PressImage from 'press-ui/press-image/press-image.vue';
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
    PressImage,
  },
  data() {
    return {
      mainActiveIndex: 1,
      mainActiveIndexMulti: 0,
      activeId: null,
      activeIdMulti: [],

      sectionStyle: 'margin: 0;',
    };
  },
  computed: {
    items() {
      return this.t('data');
    },
    badgeItems() {
      return this.items.slice(0, 2).map((item, index) => {
        if (index === 0) {
          return { ...item, dot: true };
        }
        if (index === 1) {
          return { ...item, badge: 5 };
        }

        return item;
      });
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
    onClickItemMulti(detail) {
      const { activeIdMulti } = this;
      const idx = activeIdMulti.indexOf(detail.id);
      if (idx > -1) {
        activeIdMulti.splice(idx, 1);
      } else {
        activeIdMulti.push(detail.id);
      }

      this.activeIdMulti = activeIdMulti;
    },
    onClickNavMulti(index) {
      this.mainActiveIndexMulti = index || 0;
    },
  },
};
</script>
<style scoped lang="scss">
</style>
