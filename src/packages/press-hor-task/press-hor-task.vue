<template>
  <div :class="[getActClass('task')]">
    <!-- header -->
    <MatchHeader
      @back="goBack"
    >
      <template #right>
        <div :class="[getActClass('header-right')]">
          <div
            :class="[getActClass('header-btn')]"
            @click.stop="clickRule"
          >
            <div :class="[getActClass('header-rule')]" />
            规则
          </div>
        </div>
      </template>
    </MatchHeader>
    <div :class="[getActClass('content')]">
      <div :class="[getActClass('award-title')]" />
      <div :class="[getActClass('award-list')]">
        <div :class="[getActClass('task-list')]">
          <TaskItem
            v-for="(item, index) in taskList"
            :key="index"
            :task-item="item"
            @clickTaskAward="clickTaskAward"
            @clickTaskButton="clickTaskButton"
          />
        </div>
        <div :class="[getActClass('match-title')]" />
        <div :class="[getActClass('match-list')]">
          <MatchItem
            v-for="(item, index) in matchList"
            :key="index"
            :match-item="item"
            @clickMatch="clickMatch"
            @clickMatchAward="clickMatchAward"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MatchHeader from '../press-hor-match-header/press-hor-match-header.vue';
import TaskItem from './task-item.vue';
import MatchItem from './match-item.vue';
import { getActClass } from './utils';


export default {
  name: 'PressHorTask',
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
  components: {
    MatchHeader,
    TaskItem,
    MatchItem,
  },
  props: {
    taskList: {
      type: Array,
      desc: '赛事信息',
      default: () => ([]),
    },
    matchList: {
      type: Array,
      desc: '赛事信息',
      default: () => ([]),
    },
  },
  emits: [
    'back',
    'clickMatch',
    'clickMatchAward',
    'clickRule',
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
    goBack() {
      this.$emit('back');
    },
    clickRule() {
      this.$emit('clickRule');
    },
    clickTaskAward(awardItem, awardIndex, taskItem) {
      this.$emit('clickTaskAward', awardItem, awardIndex, taskItem);
    },
    clickTaskButton(taskItem) {
      this.$emit('clickTaskButton', taskItem);
    },
    clickMatch(matchItem) {
      this.$emit('clickMatch', matchItem);
    },
    clickMatchAward(awardItem, awardIndex, matchItem) {
      this.$emit('clickMatchAward', awardItem, awardIndex, matchItem);
    },
    getActClass(...args) {
      return getActClass(false, args);
    },
  },
};
</script>

<style lang="scss" scoped src="./css/index.scss"></style>
