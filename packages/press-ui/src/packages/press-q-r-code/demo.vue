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
import PressQRCode from 'press-ui/press-q-r-code/press-q-r-code.vue';
import DemoInput from 'press-ui/press-demo-input/press-demo-input.vue';


export default {
  components: {
    PressQRCode,
    DemoInput,
  },
  data() {
    return {
      autosize: { maxHeight: 600, minHeight: 50 },
      value: 'https://novlan1.github.io/press-ui/',
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
.demo-wrap {
  padding-top: 16px;
}

.barcode-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
</style>
