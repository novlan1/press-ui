<!-- eslint-disable vue/no-v-for-template-key -->
<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
      header-style="background: #f7f8fa;"
    >
      <PressTabs
        :active="active"
        @change="onChange"
        @input="onInput"
      >
        <PressTab
          v-for="(item,index) of tabs4"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </PressTab>
      </PressTabs>
    </demo-block>

    <demo-block
      :title="t('matchByName')"
      header-style="background: #f7f8fa;"
    >
      <PressTabs
        :active="activeName"
      >
        <PressTab
          v-for="(item, index) of tabsWithName"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
          :name="item.name"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </PressTab>
      </PressTabs>
    </demo-block>

    <demo-block
      :title="t('title6')"
      header-style="background: #f7f8fa;"
    >
      <PressTabs
        sticky
      >
        <PressTab
          v-for="(item,index) of tabs4"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </PressTab>
      </PressTabs>
    </demo-block>

    <demo-block
      :title="t('title2')"
      header-style="background: #f7f8fa;"
    >
      <PressTabs
        @scroll="onScroll"
      >
        <PressTab
          v-for="(item,index) of tabs7"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </PressTab>
      </PressTabs>
    </demo-block>

    <demo-block
      :title="t('title3')"
      header-style="background: #f7f8fa;"
    >
      <PressTabs
        @disabled="onClickDisabled"
      >
        <PressTab
          v-for="(item,index) of tabsDisabled"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
          :dot="item.dot"
          :disabled="!!item.disabled"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </PressTab>
      </PressTabs>
    </demo-block>

    <demo-block
      :title="t('title4')"
      header-style="background: #f7f8fa;"
    >
      <PressTabs
        type="card"
      >
        <PressTab
          v-for="(item,index) of tabs4"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </PressTab>
      </PressTabs>
    </demo-block>

    <demo-block
      :title="t('title5')"
      header-style="background: #f7f8fa;"
    >
      <PressTabs
        @click="onClick"
      >
        <PressTab
          v-for="(item,index) of tabs2"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </PressTab>
      </PressTabs>
    </demo-block>

    <demo-block
      :title="t('title8')"
      header-style="background: #f7f8fa;"
    >
      <PressTabs
        animated
      >
        <PressTab
          v-for="(item,index) of tabs4"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </PressTab>
      </PressTabs>
    </demo-block>

    <demo-block
      :title="t('title9')"
      header-style="background: #f7f8fa;"
    >
      <PressTabs
        swipeable
      >
        <PressTab
          v-for="(item,index) of tabs4"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </PressTab>
      </PressTabs>
    </demo-block>

    <demo-block
      :title="t('slot')"
      header-style="background: #f7f8fa;"
    >
      <PressTabs
        swipeable
        use-title-slot
      >
        <template #title-0>
          <span class="title">{{ t('tab') }}</span>
          <PressIcon name="like-o" />
        </template>
        <template #title-1>
          <span class="title">{{ t('tab') }} 1</span>
          <PressIcon name="friends-o" />
        </template>
        <template #title-2>
          <span class="title">{{ t('tab') }} 2</span>
        </template>
        <template #title-3>
          <span class="title">Custom Title</span>
        </template>

        <PressTab
          v-for="(item,index) of tabs4"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </PressTab>
      </PressTabs>

      <!-- #ifdef VUE2 || H5 -->
      <PressTabs
        swipeable
        use-title-slot
      >
        <!-- #ifdef VUE3 -->
        <template
          v-for="(item, index) of Array(4)"
          #[`title-${index}`]
          :key="index"
        >
          <!-- 为了兼容 Vue3，不能在 div 上加 key -->
          <div>
            <span class="title">{{ t('tab') }} {{ index }}</span>
            <PressIcon name="like-o" />
          </div>
        </template>
        <!-- #endif -->
        <!-- #ifdef VUE2 -->
        <div
          v-for="(item, index) of Array(4)"
          :key="index"
          :slot="`title-${index}`"
        >
          <span class="title">{{ t('tab') }} {{ index }}</span>
          <PressIcon name="like-o" />
        </div>
        <!-- #endif -->


        <PressTab
          v-for="(item,index) of tabs4"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </PressTab>
      </PressTabs>
      <!-- #endif -->
    </demo-block>

    <demo-block
      :title="t('lazyTab')"
      header-style="background: #f7f8fa;"
    >
      <PressTabs
        swipeable
      >
        <PressTab
          v-if="showLazyTab"
          key="tabA"
          :sort-index="0"
          :title="`${t('tab')} A`"
        >
          <div class="content">
            {{ t('content') }} A
          </div>
        </PressTab>

        <PressTab
          key="tabB"
          :sort-index="1"
          :title="`${t('tab')} B`"
        >
          <div class="content">
            {{ t('content') }} B
          </div>
        </PressTab>

        <PressTab
          key="tabC"
          :title="`${t('tab')} C`"
          :sort-index="2"
        >
          <div class="content">
            {{ t('content') }} C
          </div>
        </PressTab>
      </PressTabs>
    </demo-block>

    <demo-block
      :title="t('horTitle')"
      header-style="background: #f7f8fa;"
      section-style="background: #192841;color: #fff;margin: 0;padding: 10px 0;"
    >
      <PressTabs
        :active="active"
        mode="hor"
        @change="onChange"
        @input="onInput"
      >
        <PressTab
          v-for="(item,index) of tabs4"
          :key="index"
          dot
          :title="`${t('tab')} ${index+1}`"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </PressTab>
      </PressTabs>
    </demo-block>

    <demo-block
      title="E-SPORT"
    >
      <PressTabs
        :active="active"
        mode="e-sport"
        @change="onChange"
        @input="onInput"
      >
        <PressTab
          v-for="(item,index) of tabs4"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </PressTab>
      </PressTabs>
    </demo-block>
  </div>
</template>
<script>
import PressIcon from 'press-ui/press-icon/press-icon.vue';
import PressTab from 'press-ui/press-tab/press-tab.vue';
import PressTabs from 'press-ui/press-tabs/press-tabs.vue';


export default {
  i18n: {
    'zh-CN': {
      tab: '标签 ',
      title2: '标签栏滚动',
      title3: '禁用标签',
      title4: '样式风格',
      title5: '点击事件',
      title6: '粘性布局',
      title7: '自定义标签',
      title8: '切换动画',
      title9: '滑动切换',
      title10: '滚动导航',
      horTitle: 'HOR',
      disabled: ' 已被禁用',
      matchByName: '通过名称匹配',
      beforeChange: '异步切换',
      lazyTab: '延迟加载',
      slot: '插槽',
    },
    'en-US': {
      tab: 'Tab ',
      content: 'content of tab',
      title2: 'Swipe Tabs',
      title3: 'Disabled Tab',
      title4: 'Card Style',
      title5: 'Click Event',
      title6: 'Sticky',
      title7: 'Custom Tab',
      title8: 'Switch Animation',
      title9: 'Swipeable',
      title10: 'Scrollspy',
      horTitle: 'HOR',
      disabled: ' is disabled',
      matchByName: 'Match By Name',
      beforeChange: 'Before Change',
      lazyTab: 'LAZY TAB',
      slot: 'Slot',
    },
  },
  components: {
    PressTabs,
    PressTab,
    PressIcon,
  },
  data() {
    return {
      showLazyTab: false,
      active: 3,
      activeName: 'c',
      tabs2: [1, 2],
      tabs4: [1, 2, 3, 4],
      tabs7: [1, 2, 3, 4, 5, 6, 7],
      tabsDisabled: [{ dot: true }, {}, { disabled: true }, {}],
      tabsWithName: [
        { name: 'a' },
        { name: 'b' },
        { name: 'c' },
      ],
    };
  },
  mounted() {
    setTimeout(() => {
      this.tabs4 = [1, 2, 3];
      this.active = 2;

      setTimeout(() => {
        this.showLazyTab = true;
      }, 1000);
    }, 2000);
  },
  methods: {
    onChange(val) {
      console.log('[onChange] val: ', val);
    },
    onInput(val) {
      console.log('[onInput] val: ', val);
    },
    onClickDisabled(val) {
      console.log('[onClickDisabled] val: ', val);
    },
    onClick(val) {
      console.log('[onClick] val: ', val);
      const { index, name, title } = val;
      this.onGTip(`index: ${index}, name: ${name}, tile: ${title}`);
    },
    onScroll(val) {
      console.log('[onScroll] val: ', val);
    },
  },
};
</script>

<style scoped lang="scss">
.demo-wrap {
  // 不能为100%，否则page无法滚动
  height: auto;

  .content {
    padding: 20px;
  }
}
.title {
  margin-right: 4px;
}
</style>

<style lang="scss">
page {
  height: 100%;
  overflow: auto;
}
</style>

