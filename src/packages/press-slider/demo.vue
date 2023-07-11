<template>
  <div class="demo-wrap demo-wrap--gap">
    <demo-block
      :title="t('basicUsage')"
      :section-style="sectionStyle"
    >
      <PressSlider
        :value="valueMap.basic"
        @change="onChange"
      />
    </demo-block>

    <demo-block
      :title="t('title2')"
      :section-style="sectionStyle"
    >
      <PressSlider
        :value="valueMap.range"
        range
        @change="onChange"
      />
    </demo-block>

    <demo-block
      :title="t('title3')"
      :section-style="sectionStyle"
    >
      <PressSlider
        :min="-50"
        :max="50"
        :value="valueMap.maxAndMin"
        @change="onChange"
      />
    </demo-block>

    <demo-block
      :title="t('title4')"
      :section-style="sectionStyle"
    >
      <PressSlider
        disabled
        :value="valueMap.basic"
        @change="onChange"
      />
    </demo-block>

    <demo-block
      :title="t('title5')"
      :section-style="sectionStyle"
    >
      <PressSlider
        :step="10"
        :value="valueMap.basic"
        @change="onChange"
      />
    </demo-block>

    <demo-block
      :title="t('customStyle')"
      :section-style="sectionStyle"
    >
      <PressSlider
        bar-height="4px"
        active-color="#ee0a24"
        :value="valueMap.customStyle"
        @change="onChange"
      />
    </demo-block>

    <demo-block
      :title="t('customButton')"
      :section-style="sectionStyle"
    >
      <PressSlider
        use-button-slot
        :value="dragValue"
        @change="onChange"
        @drag="onDrag"
      >
        <div
          slot="button"
          class="custom-button"
        >
          {{ dragValue }}
        </div>
      </PressSlider>
    </demo-block>

    <demo-block
      :title="t('vertical')"
      :section-style="sectionStyle"
    >
      <div style="height: 150px;">
        <press-slider
          value="50"
          vertical
          @change="onChange"
        />
        <press-slider
          :value="valueMap.range"
          range
          vertical
          style="margin-left: 100px;"
          @change="onChange"
        />
      </div>
    </demo-block>

    <!-- #ifndef H5 -->
    <PressToast id="press-toast" />
    <!-- #endif -->
  </div>
</template>
<script>
import PressSlider from 'src/packages/press-slider/press-slider.vue';
import PressToast from 'src/packages/press-toast/press-toast.vue';

export default {
  i18n: {
    'zh-CN': {
      title1: '基础用法',
      title2: '双滑块',
      title3: '指定选择范围',
      title4: '禁用',
      title5: '指定步长',
      customStyle: '自定义样式',
      customButton: '自定义按钮',
      text: '当前值：',
      vertical: '垂直方向',
    },
    'en-US': {
      title1: 'Basic Usage',
      title2: 'Dual thumb mode',
      title3: 'Range',
      title4: 'Disabled',
      title5: 'Step size',
      customStyle: 'Custom Style',
      customButton: 'Custom Button',
      text: 'Current value: ',
      vertical: 'Vertical',
    },
  },
  components: {
    PressSlider,
    PressToast,
  },
  data() {
    return {
      sectionStyle: 'margin: 12px 16px',
      valueMap: {
        basic: '50',
        range: [10, 50],
        maxAndMin: 50,
        customStyle: 50,
        customButton: 30,
      },
      dragValue: 50,
    };
  },
  methods: {
    onChange(val) {
      console.log('[onChange] val: ', val);
      this.onGTip(`${this.t('text')}${val.toString()}`);
    },
    onDrag(val) {
      console.log('[onDrag] val: ', val);
      this.onGTip(`drag: ${val}`);
      this.dragValue = val;
    },
  },
};
</script>
<style scoped lang="scss">
.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 100px;
}
</style>
