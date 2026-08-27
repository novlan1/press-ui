<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <PressSteps
        :steps="steps"
        :active="active"
      />

      <PressButton
        type="e-sport-primary"
        custom-style="margin: 8px 0 8px 0;"
        @click="onNextStep"
      >
        {{ t('nextStep') }}
      </PressButton>
    </demo-block>

    <demo-block :title="t('customStyle')">
      <PressSteps
        :steps="steps"
        :active="active"
        active-icon="success"
        active-color="#38f"
      />
    </demo-block>

    <demo-block :title="t('customIcon')">
      <PressSteps
        :steps="stepsCustom"
        :active="active"
      />
    </demo-block>

    <demo-block :title="t('title3')">
      <PressSteps
        :steps="steps"
        :active="active"
        direction="vertical"
        active-color="#ee0a24"
      />
    </demo-block>
  </div>
</template>
<script>
import PressButton from 'press-ui/press-button/press-button.vue';
import PressSteps from 'press-ui/press-steps/press-steps.vue';


export default {
  i18n: {
    'zh-CN': {
      nextStep: '下一步',
      step1: '买家下单',
      step2: '商家接单',
      step3: '买家提货',
      step4: '交易完成',
      title2: '描述信息',
      title3: '竖向步骤条',
      status1: '【城市】物流状态1',
      status2: '【城市】物流状态',
      status3: '快件已发货',
      customStyle: '自定义样式',
      customIcon: '自定义图标',
    },
    'en-US': {
      nextStep: 'Next Step',
      step1: 'Step1',
      step2: 'Step2',
      step3: 'Step3',
      step4: 'Step4',
      title2: 'Description',
      title3: 'Vertical Steps',
      status1: '【City】Status1',
      status2: '【City】Status2',
      status3: '【City】Status3',
      customStyle: 'Custom Style',
      customIcon: 'Custom Icon',
    },
  },

  components: {
    PressSteps,
    PressButton,
  },
  data() {
    return {
      steps: [
        {
          text: this.t('step1'),
          desc: this.t('title2'),
        },
        {
          text: this.t('step2'),
          desc: this.t('title2'),
        },
        {
          text: this.t('step3'),
          desc: this.t('title2'),
        },
        {
          text: this.t('step4'),
          desc: this.t('title2'),
        },
      ],
      stepsCustom: [
        {
          text: this.t('step1'),
          desc: this.t('title2'),
          inactiveIcon: 'location-o',
          activeIcon: 'success',
        },
        {
          text: this.t('step2'),
          desc: this.t('title2'),
          inactiveIcon: 'like-o',
          activeIcon: 'plus',
        },
        {
          text: this.t('step3'),
          desc: this.t('title2'),
          inactiveIcon: 'star-o',
          activeIcon: 'cross',
        },
        {
          text: this.t('step4'),
          desc: this.t('title2'),
          inactiveIcon: 'phone-o',
          activeIcon: 'fail',
        },
      ],
      active: 1,
    };
  },
  methods: {
    onNextStep() {
      if (this.active === this.steps.length - 1) {
        this.active = 0;
        return;
      }
      this.active += 1;
    },
  },
};
</script>
<style scoped lang="scss">
</style>
