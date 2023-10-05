<template>
  <div
    class="press-card-steps"
    :class="
      stepList.length <= 3
        ? 'press-card-steps--center'
        : ''
    "
  >
    <div
      v-for="(item, index) in stepList"
      :key="index"
      class="press-card-steps__item"
    >
      <div class="press-card-steps__box">
        <div
          class="press-card-steps__name"
          :class="
            item.isCurrent
              ? 'press-card-steps__name--active'
              : ''
          "
          @click.stop="onClick(item, index)"
        >
          <!-- 第{{ index + 1 }}局 -->
          {{ item.title }}
        </div>
        <div
          v-if="!item.playing"
          class="press-card-steps__time"
          :class="
            item.isCurrent
              ? 'press-card-steps__time--active'
              : ''
          "
        >
          {{ item.time }}
        </div>
        <div
          v-else
          class="press-card-steps__time--playing"
        >
          · 进行中
        </div>
      </div>
      <!--线 -->
      <div class="press-card-steps__line" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PressScheduleCardSteps',
  components: {},
  props: {
    stepList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // tabIndex: 1,
    };
  },
  methods: {
    onClick(item, index) {
      this.$emit('click', item, index);
    },
  },
};
</script>

<style lang="scss" src="./css/card-steps.scss" scoped></style>
