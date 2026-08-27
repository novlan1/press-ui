<template>
  <div class="demo-wrap">
    <div class="demo-inner">
      <demo-block :title="t('basicUsage')">
        <press-cell
          :title="t('toggle')"
          is-link
          @click="onToggle"
        />
      </demo-block>

      <PressTeleport
        to="body"
        :disabled="disabled"
      >
        <div class="demo-text">
          {{ disabled ? '不使用 Teleport， 阴影部分在页面': '使用 Teleport，阴影部分在 body 下' }}
        </div>
      </PressTeleport>
    </div>
  </div>
</template>
<script>
import PressTeleport from 'press-ui/press-teleport/press-teleport.vue';


export default {
  i18n: {
    'zh-CN': {
      toggle: '切换',
    },
    'en-US': {
      toggle: 'Toggle',
    },
  },
  components: {
    PressTeleport,
  },
  data() {
    return {
      disabled: false,
    };
  },
  methods: {
    onToggle() {
      this.disabled = !this.disabled;
    },
  },
};
</script>
<style scoped lang="scss">
.demo-inner {
  position: relative;
  height: 300px;
}
.demo-text {
  width: 100%;
  position: absolute;
  bottom: 0;
  top: 200px;
  z-index: 5000;
  padding: 10px;

  background: rgba(0, 0, 0, 0.1);
  color: #5baae7;
  font-size: 16px;
}
</style>
