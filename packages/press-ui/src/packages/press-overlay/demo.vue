<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <PressCell
        :title="t('check')"
        is-link
        @click="onClickShow('normal')"
      />
    </demo-block>

    <demo-block :title="t('embeddedContent')">
      <PressCell
        :title="t('check')"
        is-link
        @click="onClickShow('content')"
      />
    </demo-block>

    <PressOverlay
      :show="options.normal"
      @click="onClickHide('normal')"
    />

    <PressOverlay
      :show="options.content"
      @click="onClickHide('content')"
    >
      <div class="wrapper">
        <div
          class="block"
          catch:tap="noop"
        />
      </div>
    </PressOverlay>
  </div>
</template>
<script>
import PressCell from 'press-ui/press-cell/press-cell.vue';
import PressOverlay from 'press-ui/press-overlay/press-overlay.vue';


export default {
  i18n: {
    'zh-CN': {
      embeddedContent: '嵌入内容',
    },
    'en-US': {
      embeddedContent: 'Embedded',
    },
  },
  components: {
    PressCell,
    PressOverlay,
  },
  data() {
    return {
      options: {
        normal: false,
        content: false,
      },
    };
  },
  methods: {
    onClickShow(type) {
      this.options[type] = true;
    },
    onClickHide(type) {
      this.options[type] = false;
    },
    noop() {},
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>

