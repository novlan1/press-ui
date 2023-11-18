<template>
  <div class="demo-wrap demo-wrap--gray">
    <div class="barcode-wrap">
      <PressQRCode
        :value="value"
        :size="size"
      />
    </div>

    <DemoInput
      :autosize="autosize"
      :value="value"
      @confirm="onConfirmInput"
    />
  </div>
</template>
<script>
import PressQRCode from 'src/packages/press-q-r-code/press-q-r-code.vue';
import DemoInput from 'src/pages/components/demo-input/demo-input.vue';


export default {
  components: {
    PressQRCode,
    DemoInput,
  },
  data() {
    return {
      autosize: { maxHeight: 600, minHeight: 50 },
      value: 'https://h5.igame.qq.com/pmd-mobile.support.press-ui.press-ui/',
      size: 200,
    };
  },
  methods: {
    onConfirmInput(value) {
      this.value = value;
    },
  },
};
</script>
<style scoped lang="scss">
.barcode-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
