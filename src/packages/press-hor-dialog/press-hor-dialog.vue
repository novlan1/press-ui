<template>
  <div :class="[getActClass('hor-dialog')]">
    <div :class="[getActClass('mask')]" />
    <div
      :class="[getActClass('border')]"
      :style="{width: `${popupWith}rem`}"
    >
      <div :class="[getActClass('content')]">
        <div :class="[getActClass('header')]">
          <div :class="[getActClass('title')]">
            <p>{{ title }}</p>
          </div>
          <div
            v-if="isShowClose"
            :class="[getActClass('close')]"
            @click="close"
          />
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import { getActClass } from './utils';


export default {
  name: 'PressHorDialog',
  components: {
  },
  props: {
    popupWith: {
      type: String,
      default: '5.6',
    },
    title: {
      type: String,
      default: '',
    },
    isShowClose: {
      type: Boolean,
      default: true,
    },
  },
  options: {
    virtualHost: true,
  },
  emits: [
    'close',
  ],
  data() {
    return {
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    getActClass(...args) {
      return getActClass(false, args);
    },
  },
};

</script>
<style lang="scss" scoped src="./css/index.scss"></style>
