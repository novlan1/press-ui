<template>
  <div class="press-card-nav">
    <div class="press-card-nav__left">
      <div class="press-card-nav__name">
        {{ nick }}
      </div>
      <div
        class="press-card-nav__info"
      >
        <span>{{ deviceStr }}</span> | <span v-if="showRoleId">ID:{{ roleId }}</span>
      </div>
    </div>
    <div class="press-card-nav__right">
      <div
        v-if="showExchange"
        class="press-card-nav__exchange-wrap"
        @click="onExchange"
      >
        <i class="card-iconfont icon-exchange" />
        <div class="press-card-nav__exchange">
          切换
        </div>
      </div>

      <div
        v-else-if="showRightTitle"
        class="press-card-nav__intro"
      >
        {{ rightTitle }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PressScheduleCardTopNav',
  components: {},
  props: {
    nick: {
      type: String,
      default: '',
    },
    deviceStr: {
      type: String,
      default: '',
    },
    showRoleId: {
      type: Boolean,
      default: true,
    },
    roleId: {
      type: String,
      default: '',
    },
    showExchange: {
      type: Boolean,
      default: false,
    },
    showRightTitle: {
      type: Boolean,
      default: false,
    },
    rightTitle: {
      type: String,
      default: '',
    },
  },
  emits: [
    'exchange',
  ],
  data() {
    return {

    };
  },
  methods: {
    onExchange() {
      this.$emit('exchange');
    },
  },
};
</script>

<style lang="scss" src="./css/card-top-nav.scss" scoped></style>
