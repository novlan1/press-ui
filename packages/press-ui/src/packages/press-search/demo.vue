<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <press-search
        :value="value"
        :placeholder="t('placeholder')"
        @change="onChange"
      />
    </demo-block>

    <demo-block :title="t('listenToEvents')">
      <press-search
        :value="value"
        :placeholder="t('placeholder')"
        show-action
        @search="onSearch"
        @cancel="onCancel"
        @change="onChange"
      />
    </demo-block>

    <demo-block :title="t('inputAlign')">
      <press-search
        :value="value"
        :placeholder="t('placeholder')"
        input-align="center"
        @search="onSearch"
        @cancel="onCancel"
        @change="onChange"
      />
    </demo-block>

    <demo-block :title="t('disabled')">
      <press-search
        :value="value"
        disabled
        :placeholder="t('placeholder')"
        @change="onChange"
      />
    </demo-block>

    <demo-block :title="t('background')">
      <press-search
        :value="value"
        shape="round"
        background="#4fc08d"
        :placeholder="t('placeholder')"
        @change="onChange"
      />
    </demo-block>

    <demo-block :title="t('customButton')">
      <press-search
        :value="value"
        :label="t('label')"
        use-action-slot
        :placeholder="t('placeholder')"
        @change="onChange"
      >
        <template #action>
          <div
            @click="onClick"
          >
            {{ t('search') }}
          </div>
        </template>
      </press-search>
    </demo-block>
  </div>
</template>
<script>
import PressSearch from 'press-ui/press-search/press-search.vue';

export default {
  i18n: {
    'zh-CN': {
      label: '地址',
      disabled: '禁用搜索框',
      inputAlign: '搜索框内容对齐',
      background: '自定义背景色',
      placeholder: '请输入搜索关键词',
      customButton: '自定义按钮',
      listenToEvents: '事件监听',
    },
    'en-US': {
      label: 'Address',
      disabled: 'Disabled',
      inputAlign: 'Input Align',
      background: 'Custom Background Color',
      placeholder: 'Placeholder',
      customButton: 'Custom Action Button',
      listenToEvents: 'Listen to Events',
    },
  },

  components: {
    PressSearch,
  },
  data() {
    return {
      value: '',
    };
  },
  methods: {
    onChange(val) {
      if (typeof val === 'string') {
        this.onGTip(`${val}`);
      }
    },
    onCancel() {
      this.onGTip('cancel');
    },
    onSearch() {
      this.onGTip('search');
    },
    onClick() {
      this.onGTip('click');
    },
  },
};
</script>
<style scoped lang="scss">
</style>
