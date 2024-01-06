<template>
  <div :class="[getActClass('task-item')]">
    <div :class="[getActClass('task-name')]">
      {{ taskItem.name }}
    </div>
    <div :class="[getActClass('task-box')]">
      <div :class="[getActClass('task-award-img')]">
        <img
          v-for="(item, index) in taskItem.awards"
          :key="index"
          v-lazy="item.image"
          @click.stop="clickTaskAward(item, index)"
        >
      </div>

      <div
        v-if="taskItem.buttonText"
        :class="{
          'press__btn--primary': taskItem.buttonPrimary,
          'press__btn--secondary': taskItem.buttonSecondary,
          'press__btn--text': taskItem.buttonPlain,
        }"
        @click.stop="clickTaskButton"
      >
        {{ taskItem.buttonText }}
      </div>
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
    taskItem: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: [
    'clickTaskAward',
    'clickTaskButton',
  ],
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    clickTaskAward(awardItem, awardIndex) {
      this.$emit('clickTaskAward', awardItem, awardIndex, this.taskItem);
    },
    clickTaskButton() {
      this.$emit('clickTaskButton', this.taskItem);
    },
    getActClass(...args) {
      return getActClass(false, args);
    },
  },
};
</script>

<style lang="scss" scoped src="./css/task-item.scss"></style>
