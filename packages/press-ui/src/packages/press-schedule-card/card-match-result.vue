<template>
  <div
    class="press-sche-card-match"
    :class="isFail ? 'press-sche-card-match--gray' : ''"
  >
    <div class="press-sche-card-match__result">
      <div class="press-sche-card-match__result-icon" />
      <div class="press-sche-card-match__result-text">
        {{ title }}
      </div>
    </div>
    <div class="press-sche-card-match__result-tips">
      {{ desc }}
    </div>
  </div>
</template>
<script>

export default {
  name: 'PressScheduleCardMatchResult',
  props: {
    isFail: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
  },
  data() {
    return {

    };
  },

};
</script>
<style scoped lang="scss" src="./css/card-match-result.scss"></style>
