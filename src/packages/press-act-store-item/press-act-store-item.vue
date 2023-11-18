<template>
  <li
    v-treport="propsData.treport"
    :class="[
      getActClass('store'), {
        'press-act--hidden-tip': hideTipStyle,
      }, 'press-act']"
    @click="onClickItem"
  >
    <p :class="[getActClass('img')]">
      <img
        v-if="propsData.logo"
        v-lazy="propsData.logo"
      >
    </p>
    <div :class="[getActClass('detail')]">
      <div>
        <h3 :class="[getActClass('name')]">
          {{ propsData.name }}
        </h3>
        <span
          :class="[
            getPrivilegeStyle(propsData.privgrade),
            getActClass('icon--primary')
          ]"
        />
        <span
          v-if="propsData.distance"
          :class="[getActClass('distance', 'distance--primary')]"
        >
          {{ propsData.distance }}
        </span>
      </div>
      <p :class="[getActClass('addr')]">
        <span
          :class="[
            getPrivilegeStyle(propsData.privgrade),
            getActClass('icon--secondary'),
          ]"
        />
        <i
          v-if="propsData.distance"
          :class="[getActClass('icon--addr')]"
        />
        <span
          v-if="propsData.distance"
          :class="[getActClass('distance', 'distance--secondary')]"
        >
          {{ propsData.distance }}
        </span>
        <span
          :class="[getActClass('address')]"
        >{{
          propsData.address
        }}</span>
      </p>
    </div>
    <span
      v-if="propsData.status"
      :class="[getActClass('icon-state'), getStateStyle(propsData.state)]"
    >{{ propsData.status }}</span>
  </li>
</template>
<script>
import { getActClass } from './utils';


export default {
  name: 'PressActStoreItem',
  options: {
    styleIsolation: 'shared',
  },
  props: {
    propsData: {
      type: Object,
      default: () => ({}),
    },
    useTipClass: {
      type: Boolean,
      default: false,
    },
    hideTipStyle: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getPrivilegeStyle(privilege) {
      if (privilege) {
        switch (privilege) {
          case 1:
            return this.getActClass('icon--jp');
          case 2:
            return this.getActClass('icon--yp');
          default:
            return '';
        }
      }
      return '';
    },
    getStateStyle(state) {
      switch (state) {
        case 'instore':
          return this.getActClass('icon--instore');
        case 'eventbeen':
          return this.getActClass('icon--eventbeen');
        case 'lately':
          return this.getActClass('icon--lately');
        default:
          return '';
      }
    },
    onClickItem() {
      this.$emit('clickItem');
    },
    getActClass(...args) {
      return getActClass(this.useTipClass, args);
    },
  },
};
</script>

<style scoped lang="scss">
// body:not(.press-act-store-item--hidden) {
//   @import "./css/pvp-vertical.scss";
// }
</style>
<style scoped lang="scss" src="@TIP_STYLE_NAME"></style>
<style scoped lang="scss" src="./css/base.scss"></style>
