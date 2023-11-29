<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <press-cell
        title="展示"
        is-link
        @click="show = true"
      />
    </demo-block>

    <PressHorPopup
      v-if="show"
      title="标题"
      @close="close"
    >
      <div style="color: #fff; margin: 10px 20px;font-size: 12px;">
        不要过来堆X山
      </div>
    </PressHorPopup>
  </div>
</template>
<script>
import PressHorPopup from 'src/packages/press-hor-dialog/press-hor-dialog.vue';

export default {
  components: {
    PressHorPopup,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    close() {
      this.show = false;
    },
  },
};
</script>
<style scoped lang="scss">
</style>
