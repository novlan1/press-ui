<template>
  <div class="demo-wrap demo-wrap--gray">
    <demo-block
      :title="t('basicUsage')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <PressCircle
        :value="value"
        :text="`${value}%`"
      />
    </demo-block>

    <demo-block
      :title="t('customStyle')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <div class="demo-part">
        <PressCircle
          :value="value"
          :stroke-width="6"
          :text="t('customWidth')"
        />
      </div>

      <div class="demo-part">
        <PressCircle
          :value="value"
          :stroke-width="6"
          layer-color="#eeeeee"
          color="#ee0a24"
          :text="t('customColor')"
        />
      </div>

      <div class="demo-part">
        <PressCircle
          :value="value"
          :stroke-width="6"
          :color="gradientColor"
          :text="t('gradient')"
        />
      </div>

      <div class="demo-part">
        <PressCircle
          :value="value"
          :stroke-width="6"
          color="#07c160"
          :clockwise="false"
          :text="t('counterClockwise')"
        />
      </div>

      <div class="demo-part">
        <PressCircle
          :value="value"
          :size="120"
          :text="t('customSize')"
        />
      </div>

      <div>
        <PressButton
          type="e-sport-primary"
          custom-style="margin-right:8px;"
          @click="onChangeCircleValue('plus')"
        >
          {{ t('add') }}
        </PressButton>
        <PressButton
          type="e-sport-primary"
          @click="onChangeCircleValue('minus')"
        >
          {{ t('decrease') }}
        </PressButton>
      </div>
    </demo-block>
  </div>
</template>
<script>
import PressButton from 'press-ui/press-button/press-button.vue';
import PressCircle from 'press-ui/press-circle/press-circle.vue';


export default {
  i18n: {
    'zh-CN': {
      gradient: '渐变色',
      customSize: '大小定制',
      customStyle: '样式定制',
      customColor: '颜色定制',
      customWidth: '宽度定制',
      counterClockwise: '逆时针',
    },
    'en-US': {
      gradient: 'Gradient',
      customSize: 'Size',
      customStyle: 'Custom Style',
      customColor: 'Color',
      customWidth: 'Width',
      counterClockwise: 'Direction',
    },
  },

  components: {
    PressCircle,
    PressButton,
  },
  data() {
    return {
      value: 20,
      headerStyle: 'background: #f7f8fa;',
      sectionStyle: 'background: #f7f8fa;margin: 0;padding: 0 12px;',
      gradientColor: {
        '0%': '#3fecff',
        '100%': '#6149f6',
      },
    };
  },
  methods: {
    onChangeCircleValue(type) {
      const STEP = 20;

      if (type === 'plus') {
        if (this.value >= 100) return;
        this.value += STEP;
      } else if (type === 'minus') {
        if (this.value <= 0) return;
        this.value -= STEP;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.demo-part {
  margin: 0 12px 12px 0;
  display: inline-block;
}
</style>
