<template>
  <div class="demo-wrap demo-pull-refresh">
    <PressTabs
      :active="active"
      @change="onChangeTab"
    >
      <PressTab :title="t('basicUsage')">
        <PressPullRefresh
          v-model="isLoading"
          @refresh="onRefresh"
          @change="onChange"
        >
          <p class="demo-button">
            {{ tips }}
          </p>
        </PressPullRefresh>
      </PressTab>
      <PressTab :title="t('successTip')">
        <PressPullRefresh
          v-model="isLoading"
          :success-text="t('success')"
          @refresh="onRefresh(false)"
        >
          <p class="demo-button">
            {{ tips }}
          </p>
        </PressPullRefresh>
      </PressTab>
      <PressTab :title="t('customTips')">
        <PressPullRefresh
          v-model="isLoading"
          head-height="80"
          @refresh="onRefresh(true)"
        >
          <template #pulling="{ distance }">
            <img
              class="doge"
              src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/7/own_mike_9ebf38f1fc4354df84.png"
              :style="{ transform: `scale(${distance / 80})` }"
            >
          </template>
          <template #loosing>
            <img
              src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/7/own_mike_9ebf38f1fc4354df84.png"
              class="doge"
            >
          </template>
          <template #loading>
            <img
              src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/7/own_mike_aecbd81ffaca64b6f4.jpg"
              class="doge"
            >
          </template>
          <p class="demo-button">
            {{ tips }}
          </p>
        </PressPullRefresh>
      </PressTab>
    </PressTabs>
  </div>
</template>
<script>
import PressPullRefresh from 'press-ui/press-pull-refresh/press-pull-refresh.vue';
import PressTab from 'press-ui/press-tab/press-tab';
import PressTabs from 'press-ui/press-tabs/press-tabs';


export default {
  i18n: {
    'zh-CN': {
      try: '下拉试试',
      text: '刷新次数',
      success: '刷新成功',
      successTip: '成功提示',
      customTips: '自定义提示',
    },
    'en-US': {
      try: 'Try it down',
      text: 'Refresh Count',
      success: 'Refresh success',
      successTip: 'Success Tip',
      customTips: 'Custom Tips',
    },
  },
  components: {
    PressPullRefresh,
    PressTab,
    PressTabs,
  },
  data() {
    return {
      count: 0,
      isLoading: false,
      active: 0,
    };
  },
  computed: {
    tips() {
      if (this.count) {
        return `${this.t('text')}: ${this.count}`;
      }

      return this.t('try');
    },
  },

  methods: {
    onRefresh() {
      setTimeout(() => {
        this.onGTip('刷新成功');
        this.isLoading = false;
        this.count += 1;
      }, 1000);
    },
    onChange(value) {
      console.log('[onChange]', value);
    },
    onChangeTab(value) {
      console.log('[onChangeTab]', value);
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  // 防止 tab 上方也能滑动，漏出白色背景
  overflow: hidden;
}
.demo-pull-refresh ::v-deep .press-pull-refresh {
  height: calc(100vh - 50px);
}
.demo-button {
  margin: 0;
  padding: 16px 0 0 16px;
}
.doge {
  width: 140px;
  height: 72px;
  // margin-top: 8px;
  border-radius: 4px;
  margin: 8px auto;
}
</style>
