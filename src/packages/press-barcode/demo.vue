<template>
  <div class="demo-wrap demo-wrap--gray">
    <div class="barcode-wrap">
      <PressBarcode
        :value="value"
        :width="options.width"
        :height="options.height"
        :format="options.format"
        :font-size="options.fontSize"
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
import PressBarcode from 'press-ui/press-barcode/press-barcode.vue';
import DemoInput from 'press-ui/press-demo-input/press-demo-input.vue';


export default {
  components: {
    PressBarcode,
    DemoInput,
  },
  data() {
    return {
      autosize: { maxHeight: 600, minHeight: 50 },
      value: '123123123123',
      options: {
        width: 1,
        height: 50,
        fontSize: 12,
        format: 'CODE128',
      },
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
