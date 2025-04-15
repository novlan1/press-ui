<template>
  <div
    v-if="!title && !body"
  >
    <slot
      name="content-0"
    />
    <slot
      name="content-1"
    /><slot
      name="content-2"
    /><slot
      name="content-3"
    /><slot
      name="content-4"
    /><slot
      name="content-5"
    /><slot
      name="content-6"
    />
  </div>
  <div v-else>
    <div>
      <div
        v-if="title"
        :class="[`${classPrefix}__title--${modeType}`]"
      >
        {{ title }}
      </div>
      <template v-else>
        <slot
          name="content-0"
        />
        <slot
          name="content-1"
        /><slot
          name="content-2"
        /><slot
          name="content-3"
        /><slot
          name="content-4"
        /><slot
          name="content-5"
        /><slot
          name="content-6"
        />
      </template>

      <div
        v-if="body"
        :class="[`${classPrefix}__body--${modeType}`]"
      >
        {{ body }}
      </div>
      <template v-else>
        <slot
          name="content-0"
        />
        <slot
          name="content-1"
        /><slot
          name="content-2"
        /><slot
          name="content-3"
        /><slot
          name="content-4"
        /><slot
          name="content-5"
        /><slot
          name="content-6"
        />
      </template>
    </div>
    <div :class="[`${classPrefix}__footer ${classPrefix}__footer--${modeType}`]">
      <PressButton
        v-if="current < steps.length - 1"
        :type="skipButton.type"
        :size="skipButton.size"
        :custom-class="skipButton.class"
        @click="() => clickButton(skipButton.iType)"
      >
        {{ skipButton.content }}
      </PressButton>

      <PressButton
        v-else
        :type="backButton.type"
        :size="backButton.size"
        :custom-class="backButton.class"
        @click="() => clickButton(backButton.iType)"
      >
        {{ backButton.content }}
      </PressButton>

      <PressButton
        v-if="current < steps.length - 1"
        :type="nextButton.type"
        :size="nextButton.size"
        :custom-class="nextButton.class"
        @click="() => clickButton(nextButton.iType)"
      >
        {{ nextButton.content }}
      </PressButton>

      <PressButton
        v-else
        :type="finishButton.type"
        :size="finishButton.size"
        :custom-class="finishButton.class"
        @click="() => clickButton(finishButton.iType)"
      >
        {{ finishButton.content }}
      </PressButton>
    </div>
  </div>
</template>
<script>
import PressButton from '../press-button/press-button.vue';

export default {
  components: {
    PressButton,
  },
  options: {
    styleIsolation: 'shared',
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    body: {
      type: String,
      default: '',
    },
    classPrefix: {
      type: String,
      default: '',
    },
    steps: {
      type: Array,
      default: () => ([]),
    },
    skipButton: {
      type: Object,
      default: () => ({}),
    },
    backButton: {
      type: Object,
      default: () => ({}),
    },
    nextButton: {
      type: Object,
      default: () => ({}),
    },
    finishButton: {
      type: Object,
      default: () => ({}),
    },
    current: {
      type: Number,
      default: -1,
    },
    modeType: {
      type: String,
      default: '',
    },
  },
  methods: {
    clickButton(...args) {
      this.$emit('clickButton', ...args);
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
