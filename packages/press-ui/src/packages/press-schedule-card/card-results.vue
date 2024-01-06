<template>
  <div
    class="press-sche-card__results"
  >
    <div v-if="resultType === RESULT_TYPE_MAP.PENDING">
      <div class="press-sche-card__pending" />
      <div class="press-sche-card__pending-text">
        {{ pendingText }}
      </div>
    </div>

    <div
      v-else
      class="press-sche-card__success"
    >
      <CardTitle>
        恭喜
        <img
          mode="heightFix"
          class="press-sche-card__success-cup"
          src="https://image-1251917893.file.myqcloud.com/tip-project/apex/apex--winner-cup.png"
          alt=""
          srcset=""
        >
        晋级
      </CardTitle>
    </div>
  </div>
</template>
<script>
import { RESULT_TYPE_MAP } from './config';
import CardTitle from './card-title.vue';


export default {
  name: 'PressScheduleCardResults',
  components: {
    CardTitle,
  },
  props: {
    resultType: {
      type: String,
      default: '',
    },
    pendingText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      RESULT_TYPE_MAP,
    };
  },
};
</script>
<style scoped lang="scss" src="./css/card-results.scss"></style>
