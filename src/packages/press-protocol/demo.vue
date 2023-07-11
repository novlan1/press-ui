<template>
  <div class="demo-wrap">
    <PressProtocol
      :list="list"
      @click="onClickProtocol"
    />
  </div>
</template>
<script>
import PressProtocol from 'src/packages/press-protocol/press-protocol.vue';
import { getMockProtocol } from 'src/packages/press-protocol/demo-helper/data';

export default {
  components: {
    PressProtocol,
  },
  data() {
    return {
      list: getMockProtocol(),
    };
  },
  methods: {
    onClickProtocol(item) {
      this.onGTip(`[Click] ${item.link}`);
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  display: flex;
}

press-protocol {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
