<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
      header-style="background: #f7f8fa;"
    >
      <press-tabs
        :active="active"
        @change="onChange"
        @input="onInput"
      >
        <press-tab
          v-for="(item,index) of tabs4"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </press-tab>
      </press-tabs>
    </demo-block>

    <demo-block
      :title="t('matchByName')"
      header-style="background: #f7f8fa;"
    >
      <press-tabs
        :active="activeName"
      >
        <press-tab
          v-for="(item, index) of tabsWithName"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
          :name="item.name"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </press-tab>
      </press-tabs>
    </demo-block>

    <demo-block
      :title="t('title6')"
      header-style="background: #f7f8fa;"
    >
      <press-tabs
        sticky
      >
        <press-tab
          v-for="(item,index) of tabs4"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </press-tab>
      </press-tabs>
    </demo-block>

    <demo-block
      :title="t('title2')"
      header-style="background: #f7f8fa;"
    >
      <press-tabs
        @scroll="onScroll"
      >
        <press-tab
          v-for="(item,index) of tabs7"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </press-tab>
      </press-tabs>
    </demo-block>

    <demo-block
      :title="t('title3')"
      header-style="background: #f7f8fa;"
    >
      <press-tabs
        @disabled="onClickDisabled"
      >
        <press-tab
          v-for="(item,index) of tabsDisabled"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
          :dot="item.dot"
          :disabled="!!item.disabled"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </press-tab>
      </press-tabs>
    </demo-block>

    <demo-block
      :title="t('title4')"
      header-style="background: #f7f8fa;"
    >
      <press-tabs
        type="card"
      >
        <press-tab
          v-for="(item,index) of tabs4"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </press-tab>
      </press-tabs>
    </demo-block>

    <demo-block
      :title="t('title5')"
      header-style="background: #f7f8fa;"
    >
      <press-tabs
        @click="onClick"
      >
        <press-tab
          v-for="(item,index) of tabs2"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </press-tab>
      </press-tabs>
    </demo-block>

    <demo-block
      :title="t('title8')"
      header-style="background: #f7f8fa;"
    >
      <press-tabs
        animated
      >
        <press-tab
          v-for="(item,index) of tabs4"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </press-tab>
      </press-tabs>
    </demo-block>

    <demo-block
      :title="t('title9')"
      header-style="background: #f7f8fa;"
    >
      <press-tabs
        swipeable
      >
        <press-tab
          v-for="(item,index) of tabs4"
          :key="index"
          :title="`${t('tab')} ${index+1}`"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </press-tab>
      </press-tabs>
    </demo-block>

    <demo-block
      :title="t('lazyTab')"
      header-style="background: #f7f8fa;"
    >
      <press-tabs
        swipeable
      >
        <press-tab
          v-if="showLazyTab"
          key="tabA"
          :sort-index="0"
          :title="`${t('tab')} A`"
        >
          <div class="content">
            {{ t('content') }} A
          </div>
        </press-tab>

        <press-tab
          key="tabB"
          :sort-index="1"
          :title="`${t('tab')} B`"
        >
          <div class="content">
            {{ t('content') }} B
          </div>
        </press-tab>

        <press-tab
          key="tabC"
          :title="`${t('tab')} C`"
          :sort-index="2"
        >
          <div class="content">
            {{ t('content') }} C
          </div>
        </press-tab>
      </press-tabs>
    </demo-block>

    <demo-block
      :title="t('horTitle')"
      header-style="background: #f7f8fa;"
      section-style="background: #192841;color: #fff;margin: 0;padding: 10px 0;"
    >
      <press-tabs
        :active="active"
        mode="hor"
        @change="onChange"
        @input="onInput"
      >
        <press-tab
          v-for="(item,index) of tabs4"
          :key="index"
          dot
          :title="`${t('tab')} ${index+1}`"
        >
          <div class="content">
            {{ t('content') }} {{ index+1 }}
          </div>
        </press-tab>
      </press-tabs>
    </demo-block>
  </div>
</template>
<script>
import PressTabs from 'src/packages/press-tabs/press-tabs.vue';
import PressTab from 'src/packages/press-tab/press-tab.vue';


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
    },
  },
  components: {
    PressTabs,
    PressTab,
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
    this.$nextTick(() => {
      // this.$refs.pressTabs.resize();
    });

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
</style>

<style lang="scss">
page {
  height: 100%;
  overflow: auto;
}
</style>

