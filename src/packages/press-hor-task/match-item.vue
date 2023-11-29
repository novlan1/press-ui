<template>
  <div
    :class="[getActClass('match-item')]"
    @click.stop="clickMatch"
  >
    <div
      v-if="matchItem.label"
      :class="[getActClass('match-label')]"
    >
      {{ matchItem.label }}
    </div>

    <div :class="[getActClass('match-meta')]">
      <img
        v-lazy="matchItem.image"
        :class="[getActClass('match-image')]"
      >
      <div :class="[getActClass('match-name')]">
        {{ matchItem.name }}
      </div>
    </div>
    <div :class="[getActClass('match-awards')]">
      <img
        v-for="(item,index) in matchItem.awards"
        :key="index"
        v-lazy="item.image"
        @click.stop="clickMatchAward(item, index)"
      >
    </div>
  </div>
</template>
<script>
import { getActClass } from './utils';


export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
  components: {

  },
  props: {
    matchItem: {
      type: Object,
      desc: '赛事信息',
      default: () => ({}),
    },
  },
  emits: [
    'clickMatch',
    'clickMatchAward',
  ],
  data() {
    return {

    };
  },
  mounted() {

  },
  methods: {
    clickMatch() {
      this.$emit('clickMatch', this.matchItem);
    },
    clickMatchAward(awardItem, awardIndex) {
      this.$emit('clickMatchAward', awardItem, awardIndex, this.matchItem);
    },
    getActClass(...args) {
      return getActClass(false, args);
    },
  },
};
</script>

<style lang="scss" scoped src="./css/match-item.scss"></style>
