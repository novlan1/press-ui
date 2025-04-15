<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <PressCodeInput
        v-model="value"
        @change="change"
        @finish="finish"
      />
    </demo-block>

    <demo-block :title="t('mode')">
      <PressCodeInput
        v-model="valueMode"
        mode="line"
      />
    </demo-block>

    <demo-block :title="t('maxLength')">
      <PressCodeInput
        v-model="valueMaxLength"
        :max-length="4"
      />
    </demo-block>

    <demo-block :title="t('space')">
      <PressCodeInput
        v-model="valueSpace"
        :space="0"
        :max-length="4"
      />
    </demo-block>

    <demo-block :title="t('hairline')">
      <PressCodeInput
        v-model="valueHairline"
        hairline
        :max-length="4"
      />

      <!-- <PressCodeInput
        v-model="valueHairline2"
        mode="line"
        hairline
      /> -->
    </demo-block>

    <demo-block :title="t('style')">
      <PressCodeInput
        v-model="valueStyle"
        color="#f56c6c"
        border-color="#f56c6c"
        :max-length="4"
      />
    </demo-block>

    <demo-block :title="t('dot')">
      <PressCodeInput
        v-model="valueDot"
        dot
        :max-length="4"
      />
    </demo-block>

    <demo-block :title="t('autoFocus')">
      <PressCodeInput
        v-model="valueFocus"
        focus
        :max-length="4"
      />
    </demo-block>
  </div>
</template>
<script>
import PressCodeInput from 'press-ui/press-code-input/press-code-input.vue';

export default {
  i18n: {
    'zh-CN': {
      mode: '模式',
      maxLength: '自定义长度',
      space: '自定义间距',
      hairline: '细边框',
      style: '自定义样式',
      dot: '隐藏输入内容',
      autoFocus: '自动获取焦点',
    },
    'en-US': {
      mode: 'Mode',
      maxLength: 'Max Length',
      space: 'Space',
      hairline: 'Hairline',
      style: 'Custom Style',
      dot: 'Dot',
      autoFocus: 'Auto Focus',
    },
  },
  components: {
    PressCodeInput,
  },
  data() {
    return {
      value: '',
      valueMode: '',
      valueSpace: '',
      valueMaxLength: '',
      valueHairline: '',
      valueHairline2: '',
      valueStyle: '',
      valueDot: '',
      valueFocus: '',
    };
  },
  methods: {
    change(e) {
      console.log(`内容改变，当前值为：${e}`);
    },
    finish(e) {
      console.log(`输入结束，当前值为：${e}`);
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  padding-bottom: 30px;
}
</style>
