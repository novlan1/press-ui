<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <!-- #ifdef H5 -->
  <PressTeleportWeb
    :to="to"
    :where="where"
    :disabled="disabled"
  >
    <template #default>
      <slot />
    </template>
  </PressTeleportWeb>
  <!-- #endif -->

  <!-- #ifdef MP-WEIXIN -->
  <root-portal :enable="!disabled">
    <template #default>
      <slot />
    </template>
  </root-portal>
  <!-- #endif -->

  <!-- #ifdef MP-QQ -->
  <div class="press-teleport">
    <slot />
  </div>
  <!-- #endif -->
</template>
<script>
// #ifdef H5
import PressTeleportWeb from './press-teleport-web.vue';
// #endif


export default {
  name: 'PressTeleport',
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
  components: {
    // #ifdef H5
    PressTeleportWeb,
    // #endif
  },
  props: {
    to: {
      type: String,
      default: 'body',
    },
    where: {
      type: String,
      default: 'after',
    },
    disabled: Boolean,
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  },
};

</script>
<style scoped lang="scss">
</style>
