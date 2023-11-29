<template>
  <div
    class="press-match"
    :class="{
      'press-match__status--end': matchInfo.isEnd,
      'press-match--left': leftLine
    }"
    @click.stop="clickMatch"
  >
    <!-- 头像 -->
    <img
      :src="matchInfo.pic"
      class="press-match__pic"
    >

    <div class="press-match__info">
      <!-- 赛事名 -->
      <div class="press-match__name">
        {{ matchInfo.name }}
      </div>
      <div class="press-match__desc">
        <!-- 地址 -->
        <div
          v-if="matchInfo.distance"
          class="press-match__distance"
        >
          <div class="press-match__distance-icon" />
          <p class="press-match__distance-name">
            {{ matchInfo.distance }}
          </p>
        </div>
        <!-- 标签 -->
        <div
          v-for="(item,index) in matchInfo.tagList"
          :key="index"
          class="press-match__tag"
        >
          <p class="press-match__tag-name">
            {{ item }}
          </p>
        </div>
      </div>
      <!-- 赛事时间 -->
      <div class="press-match__time">
        {{ matchInfo.matchTime }}
      </div>
    </div>

    <div
      :class="['press-match__status',
               matchInfo.isPending ? 'press-match__status--pending':'',
               matchInfo.isPlaying ? 'press-match__status--playing':''
      ]"
    >
      <p class="press-match__status-name">
        {{ matchInfo.matchStatusDesc }}
      </p>
      <div
        v-if="matchInfo.buttonText"
        class="press-match__button"
        @click.stop="clickMatchButton"
      >
        {{ matchInfo.buttonText }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    matchInfo: {
      type: Object,
      default: () => ({}),
    },
    leftLine: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'clickMatch',
    'clickMatchButton',
  ],
  data() {
    return {
    };
  },
  methods: {
    clickMatchButton() {
      this.$emit('clickMatchButton', this.matchInfo);
    },
    clickMatch() {
      this.$emit('clickMatch', this.matchInfo);
    },
  },
};

</script>
<style lang="scss" scoped src="./css/match.scss"></style>
