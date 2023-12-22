<template>
  <div class="demo-wrap">
    <demo-block
      v-for="(item,index) of transitionDemoList"
      :key="index"
      :title="item.title"
    >
      <press-cell
        v-for="(info) of item.list"
        :key="info"
        :title="info"
        is-link
        @click="onShowTransition(info)"
      />
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
import PressCell from 'src/packages/press-cell/press-cell.vue';
import PressTransition from 'src/packages/press-transition/press-transition.vue';

let timer = null;
const formatTransitionName = name => name.toLowerCase().replace(/\s+/, '-');

export default {
  components: {
    PressCell,
    PressTransition,
  },
  data() {
    const transitionDemoList = [
      {
        title: 'Fade',
        list: [
          'Fade',
          'Fade Up',
          'Fade Down',
          'Fade Left',
          'Fade Right',
        ],
      },
      {
        title: 'Slide',
        list: [
          'Slide Up',
          'Slide Down',
          'Slide Left',
          'Slide Right',
        ],
      },
      {
        title: 'Custom',
        list: [
          'Custom',
        ],
      },
    ];
    const transitionList = transitionDemoList.reduce((acc, item) => acc.concat(item.list), []);

    return {
      customStyle: '',
      curTransitionType: 'fade',
      transitionDemoList,
      options: transitionList.reduce((acc, item) => {
        const transitionName = formatTransitionName(item);
        acc[transitionName] = false;
        return acc;
      }, {}),
      showCustom: false,
    };
  },
  methods: {
    onShowTransition(type) {
      const name = formatTransitionName(type);
      this.curTransitionType = name;
      Object.keys(this.options).forEach((key) => {
        this.options[key] = false;
      });

      setTimeout(() => {
        this.options[name] = true;

        clearTimeout(timer);
        const time = name === 'custom' ? 2000 : 1000;
        timer = setTimeout(() => {
          this.options[name] = false;
        }, time);
      });
    },
  },
};
</script>

<style lang="scss">
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

