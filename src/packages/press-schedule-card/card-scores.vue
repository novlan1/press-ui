<template>
  <div class="press-sche-card-join__score-list">
    <div
      v-for="(item, index) in scoreList"
      :key="index"
      class="press-sche-card-join__score-item"
    >
      <div class="press-sche-card-join__score-num">
        {{ item.score }}
      </div>
      <div
        class="press-sche-card-join__score-result"
      >
        <span class="press-sche-card-join__score-round">{{ item.title }}</span>
        <span
          class="press-sche-card-join__score-bg"
          :class="
            item.isWinner == 1
              ? 'press-sche-card-join__score-bg---green'
              : item.isWinner == 2
                ? 'press-sche-card-join__score-bg---pink'
                : 'press-sche-card-join__score-bg---gray'
          "
        >
          {{ item.isWinner == 1 ? "胜" : item.isWinner == 2 ? "败" : "-" }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'PressScheduleCardScores',
  props: {
    scoreList: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {

    };
  },
};
</script>
<style scoped lang="scss" src="./css/card-scores.scss"></style>
