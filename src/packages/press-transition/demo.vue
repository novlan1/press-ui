<template>
  <div class="wrap">
    <demo-block
      v-for="(item,index) of transitionList"
      :key="index"
      :title="item"
    >
      <PressButton
        type="e-sport-primary"
        :custom-style="`${customStyle};padding:0;`"
        @click="onShowTransition(item)"
      >
        {{ item }}
      </PressButton>
    </demo-block>

    <press-transition
      v-if="curTransitionType !== 'custom'"
      :name="curTransitionType"
      :show="options[curTransitionType] || false"
      :duration="300"
      custom-class="block"
    />

    <press-transition
      v-else
      :show="options.custom || false"
      :duration="{ enter: 1000, leave: 1000 }"
      custom-class="block"
      name=""
      enter-class="press-enter-class"
      enter-active-class="press-enter-active-class"
      leave-active-class="press-leave-active-class"
      leave-to-class="press-leave-to-class"
    />
  </div>
</template>
<script>

let timer = null;


export default {
  data() {
    const transitionList = [
      'fade',
      'fade-up',
      'fade-down',
      'fade-left',
      'fade-right',
      'slide-up',
      'slide-down',
      'slide-left',
      'slide-right',
      'custom',
    ];

    return {
      customStyle: '',
      curTransitionType: 'fade',
      transitionList,
      options: transitionList.reduce((acc, item) => {
        acc[item] = false;
        return acc;
      }, {}),
      showCustom: false,
    };
  },
  onLoad() {
    // #ifdef MP-QQ
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'],
    });
    // #endif
  },
  methods: {
    onShowTransition(type) {
      this.options[type] = true;
      this.curTransitionType = type;
      clearTimeout(timer);
      const time = type === 'custom' ? 2000 : 1000;
      timer = setTimeout(() => {
        this.options[type] = false;
      }, time);
    },
  },
};
</script>

<style lang="scss">
.wrap {
  padding-bottom: 20px;
  background: #fff;
}
.block {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin: -50px 0 0 -50px;
  background-color: #1989fa;
}

.press-enter-active-class,
.press-leave-active-class {
  transition-property: background-color, transform;
}

.press-enter-class,
.press-leave-to-class {
  background-color: red;
  transform: rotate(-360deg) translate3d(-100%, -100%, 0);
}
</style>

