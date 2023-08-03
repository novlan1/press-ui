<template>
  <!-- 推荐赛事 -->
  <div
    class="press-match"
    @click.stop="clickMatch"
  >
    <div class="press-match__left">
      <div class="press-match__name">
        {{ matchInfo.matchName }}
      </div>
      <div class="press-match__awards">
        <div
          v-for="(item,index) in matchInfo.awardList"
          :key="index"
          class="press-match__award"
          @click.stop="onShowPopover(item,index)"
        >
          <div class="press-match__award__type">
            <p class="press-match__award__type__name">
              {{ item.type }}
            </p>
          </div>
          <img
            :src="item.img"
            alt="award-img"
            class="press-match__award__img"
          >
          <p class="press-match__award__name">
            {{ item.name }}
          </p>
        </div>

        <!-- 奖励详情浮层 -->
        <div
          v-if="showPopover"
          :class="['press-match__popover',`press-match__popover-${awardIndex}`]"
        >
          <p>{{ popoverTitle }}</p>
          <p>{{ popoverContent }}</p>
          <div
            class="press-match__popover__close"
            @click.stop="closePopover"
          />
        </div>
      </div>
    </div>
    <div class="press-match__right">
      <img
        :src="matchInfo.brandImg"
        alt="brandImg"
        class="press-match__right__img"
      >
      <!-- 注意有空格 -->
      <div class="press-match__time">
        {{ matchInfo.matchDesc }}
      </div>
      <!-- 默认未开始，已结束--end，进行中--ing -->
      <div
        class="press-match__btn"
        :class="{'press-match__btn--sign': matchInfo.isNotStart,
                 'press-match__btn--end': matchInfo.isEnd,
                 'press-match__btn--ing': matchInfo.isIng}"
        @click.stop="clickMatchButton"
      >
        {{ matchInfo.btnTxt }}
      </div>
    </div>
    <!-- 定位 -->
    <div
      v-if="matchInfo.matchLoc"
      class="press-match__loc"
    >
      <p class="press-match__loc__name">
        {{ matchInfo.matchLoc }}
      </p>
    </div>
    <!-- --apply--报名有奖，--join--参赛有奖 -->
    <div
      v-else
      :class="{'press-match__tag--apply': matchInfo.showApplyTag,
               'press-match__tag--join': matchInfo.showJoinTag}"
    />
  </div>
</template>

<script>
export default {
  props: {
    matchInfo: {
      type: Object,
      default: () => ({}),
      required: false,
    },
  },
  data() {
    return {
      awardIndex: '-1',
      popoverTitle: '',
      popoverContent: '',
      showPopover: false,
    };
  },
  methods: {
    onShowPopover(item, index) {
      this.awardIndex = index;
      this.showPopover = true;
      this.popoverTitle = item.popover?.title || item.name;
      this.popoverContent = item.popover?.content || item.name;
    },

    closePopover() {
      this.showPopover = false;
    },
    clickMatchButton() {
      this.$emit('clickMatchButton', this.matchInfo);
    },
    clickMatch() {
      this.$emit('clickMatch', this.matchInfo);
    },
  },
};

</script>
<style lang="scss" scoped src="./css/match-item.scss"></style>
