<template>
  <div class="press-award">
    <div class="press-award__mask" />
    <div class="press-award__main">
      <div class="press-award__titles">
        <div class="press-award__title">
          {{ title }}
        </div>
        <div class="press-award__sub-title">
          {{ subTitle }}
        </div>
      </div>
      <div class="press-award__awards">
        <div
          class="press-award__list"
          :class="awardList.length > 8 ? 'press-award__list--more' : ''"
        >
          <div
            v-for="(item,index) in awardList"
            :key="index"
            class="press-award__item"
          >
            <div class="press-award__image">
              <img
                v-if="item.goodscfg && item.goodscfg.goodsicon"
                :src="item.goodscfg.goodsicon"
              >
            </div>
            <div class="press-award__name">
              {{ item.displayName }}
            </div>
          </div>
        </div>
      </div>
      <div class="press-award__buttons">
        <div
          class="press-award__button--cancel"
          @click.stop="close"
        >
          {{ cancelText }}
        </div>
        <div
          class="press-award__button--confirm"
          @click.stop="exchange"
        >
          {{ confirmText }}
        </div>
      </div>
      <div class="press-award__desc">
        {{ desc }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PressAwardPopupHor',
  options: {
    virtualHost: true,
  },
  components: {
  },
  props: {
    title: {
      type: String,
      default: '恭喜获得',
    },
    subTitle: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: '立即兑换',
    },
    cancelText: {
      type: String,
      default: '关闭',
    },
    desc: {
      type: String,
      default: '本次仅发放游戏礼包（其他奖励请联系办赛方），已发放到「我的奖品」，请在有效期内兑换',
    },
    awardList: {
      type: Array,
      default: () => ([]),
    },
  },
  emits: ['close', 'exchange'],
  data() {
    return {
    };
  },
  mounted() {

  },
  methods: {
    close(...args) {
      this.$emit('close', ...args);
    },
    exchange(...args) {
      this.$emit('exchange', ...args);
    },
  },
};
</script>

<style lang="scss" scoped src="./css/hor.scss"></style>
