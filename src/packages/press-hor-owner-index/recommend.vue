<template>
  <div
    class="press-match"
    @click.stop="clickMatch"
  >
    <!-- 头像 -->
    <div class="press-match__pic">
      <img
        class="press-match__pic-inner"
        :src="recommendInfo.pic"
      >
    </div>
    <!-- 赛事名 -->
    <div class="press-match__name">
      {{ recommendInfo.name }}
    </div>
    <!-- 标签 -->
    <div class="press-match__tags">
      <div
        v-for="(item,index) in recommendInfo.tagList"
        :key="index"
        class="press-match__tag"
      >
        <p class="press-match__tag-name">
          {{ item }}
        </p>
      </div>
    </div>
    <div class="press-match__info">
      <!-- 赛事奖励 -->
      <div class="press-match__awards">
        <template v-if="recommendInfo.awardList && recommendInfo.awardList.length">
          <div
            v-for="(item,index) in recommendInfo.awardList"
            :key="index"
            class="press-match__award"
            @click="showAward(item,index)"
          >
            <div class="press-match__award-type">
              <p class="press-match__award-type-name">
                {{ item.type }}
              </p>
            </div>
            <img
              :src="item.img"
              alt="press-match__award-img"
            >
            <p class="press-match__award-name">
              {{ item.name }}
            </p>
          </div>
        </template>

        <img
          v-else
          :src="recommendInfo.defaultAwardImg || 'https://image-1251917893.file.myqcloud.com/Esports/hor-web/default-pic.png'"
          class="default-award"
        >
      </div>
      <!-- 赛事时间 -->
      <div class="press-match__meta">
        <div class="press-match__time">
          <p>报名截止时间</p>
          <p>{{ recommendInfo.joinEnd }}</p>
        </div>
        <div
          class="press-match__button"
          @click.stop="clickMatchButton"
        >
          详情
        </div>
      </div>
    </div>
    <!-- 右上角提示信息 -->
    <div class="press-match__tips">
      <div
        v-if="recommendInfo.distance"
        class="press-match__distance"
      >
        <div class="press-match__distance-icon" />
        <p>{{ recommendInfo.distance }}</p>
      </div>
      <div
        class="press-match__member"
      >
        <template
          v-if="recommendInfo.friends && recommendInfo.friends.length"
        >
          <img
            v-for="(item,index) in recommendInfo.friends"
            :key="index"
            :src="item"
          >
        </template>
        <!-- <p>{{ recommendInfo.joinedFriendsNum }}位好友已加入</p> -->

        <p v-if="recommendInfo.customTitle ">
          {{ recommendInfo.customTitle }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommendInfo: {
      type: Object,
      default: () => ({}),
      required: false,
    },
  },
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
<style lang="scss" scoped src="./css/recommend.scss"></style>
