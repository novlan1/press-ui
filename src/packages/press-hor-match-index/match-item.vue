<template>
  <!-- 推荐赛事 -->
  <div
    v-treport="matchInfo.reportData"
    class="press-match"
    @click.stop="clickMatch"
  >
    <div class="press-match__left">
      <div class="press-match__name">
        <p class="press-match__name__desc">
          {{ matchInfo.matchName }}
        </p>
        <div
          v-if="matchInfo.tag"
          class="press-match__award__tag"
        >
          <p>{{ matchInfo.tag }}</p>
        </div>
      </div>
      <div class="press-match__awards">
        <template v-if="matchInfo.awardList && matchInfo.awardList.length">
          <div
            v-for="(item,index) in matchInfo.awardList"
            :key="index"
            class="press-match__award"
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
              @click.stop="clickPrize(item, index)"
            >
            <p class="press-match__award__name">
              {{ item.name }}
            </p>
          </div>
        </template>

        <img
          v-else
          :src="matchInfo.defaultAwardImg || 'https://image-1251917893.file.myqcloud.com/Esports/hor/home/default-reward.png'"
          class="default-award"
          @click.stop="clickPrize"
        >
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
        v-treport="matchInfo.buttonReportData"
        class="press-match__btn"
        :class="{'press-match__btn--sign': matchInfo.isNotStart || matchInfo.btnPrimary,
                 'press-match__btn--end': matchInfo.isEnd || matchInfo.btnSecondary || matchInfo.isIng,
        }"
        @click.stop="clickMatchButton"
      >
        {{ matchInfo.btnTxt }}
      </div>
    </div>

    <div
      v-if="matchInfo.labelText"
      :class="{
        'press-match__signed__tag': matchInfo.labelPrimary,
        'press-match__tag': matchInfo.labelSecondary,
      }"
    >
      {{ matchInfo.labelText }}
    </div>
    <!-- <div
      v-else-if="matchInfo.tag"
      class="press-match__tag"
    >
      {{ matchInfo.tag }}
    </div> -->
  </div>
</template>

<script>
import { getMatchItemMixin } from './match-item-mixin';


export default {
  mixins: [getMatchItemMixin()],
};

</script>
<style lang="scss" scoped src="./css/match-item.scss"></style>
