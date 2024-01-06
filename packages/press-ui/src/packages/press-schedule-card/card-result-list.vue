<template>
  <div
    class="press-sche-card__result-list"
    :class="
      false
        ? ''
        : 'press-sche-card__result-list-active'
    "
  >
    <div
      v-for="(item, index) in resultList"
      :key="index"
      class="press-sche-card__result-item"
    >
      <div class="press-sche-card__result-name">
        {{ item.name }}
      </div>
      <div class="press-sche-card__result-num-wrap">
        <div class="press-sche-card__result-num">
          {{ item.num }}
        </div>
        <!-- <div
          v-if="!isShowMatchSteps"
          :class="
            item.isWinner == 1
              ? 'press-sche-card-join__score-result'
              : item.isWinner == 2
                ? 'press-sche-card-join__score-bg---pink'
                : 'press-sche-card-join__score-bg---gray'
          "
        >
          {{ item.isWinner == 1 ? "胜" : item.isWinner == 2 ? "败" : "-" }}
        </div> -->
      </div>
    </div>
    <!-- <div v-if="isWaitingResult"></div> -->
    <!-- <div v-else>
    <div class="press-sche-card__result-item">
      <div class="press-sche-card__result-name">第一局积分排名</div>
      <div class="press-sche-card__result-num">15</div>
    </div>
    <div class="press-sche-card__result-item">
      <div class="press-sche-card__result-name">第二局积分排名</div>
      <div class="press-sche-card__result-num">22</div>
    </div>
    <div class="press-sche-card__result-item">
      <div class="press-sche-card__result-name">第三局积分排名</div>
      <div class="press-sche-card__result-num">27</div>
    </div>
  </div> -->
  </div>
</template>
<script>
export default {
  props: {
    resultList: {
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
<style scoped lang="scss" src="./css/card-result-list.scss"></style>
