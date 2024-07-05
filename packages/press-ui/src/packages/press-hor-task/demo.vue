<template>
  <div class="demo-wrap">
    <PressHorTask
      :task-list="taskList"
      :match-list="matchList"
      @back="onBack"
      @clickRule="clickRule"
      @clickTaskAward="clickTaskAward"
      @clickTaskButton="clickTaskButton"
      @clickMatchAward="clickMatchAward"
      @clickMatch="clickMatch"
    />
  </div>
</template>
<script>
import PressHorTask from 'press-ui/press-hor-task/press-hor-task.vue';
import { routerBack } from 'src/utils/index';


const MOCK_AWARDS = Array.from({
  length: 10,
}).map(() => ({
  image: 'https://igame-10037599.cos.ap-shanghai.myqcloud.com/dd90f5ee-282c-bf96-f8de-c22de72ee7b1.jpg',
}));


const MOCK_TASK_LIST = [
  {
    name: '每日打卡签到',
    awards: MOCK_AWARDS,
    buttonText: '签到',
    buttonPrimary: true,
  }, {
    name: '每日打卡签到',
    awards: MOCK_AWARDS,
    buttonText: '去观赛',
    buttonSecondary: true,
  },
  {
    name: '每日打卡签到',
    awards: MOCK_AWARDS,
    buttonText: '已领取',
    buttonPlain: true,
  },
];

const MOCK_MATCH_LIST = [
  {
    label: '已报名',
    image: 'https://dummyimage.com/80x80',
    name: ' 赛事名称赛事名称',
    awards: MOCK_AWARDS.slice(0, 4),
  },
  {
    image: 'https://dummyimage.com/80x80',
    name: ' 赛事名称赛事名称',
    awards: MOCK_AWARDS.slice(0, 4),
  },
  {
    image: 'https://dummyimage.com/80x80',
    name: ' 赛事名称赛事名称',
    awards: MOCK_AWARDS.slice(0, 4),
  },
  {
    image: 'https://dummyimage.com/80x80',
    name: ' 赛事名称赛事名称',
    awards: MOCK_AWARDS.slice(0, 4),
  },
];


export default {
  components: {
    PressHorTask,
  },
  data() {
    return {
      taskList: MOCK_TASK_LIST,
      matchList: MOCK_MATCH_LIST,
    };
  },
  methods: {
    onBack() {
      routerBack.call(this);
    },
    clickRule() {
      console.log('[clickRule]');
      this.onGTip('[clickRule]');
    },
    clickTaskAward(awardItem, awardIndex, taskItem) {
      console.log('[clickTaskAward]', awardItem, awardIndex, taskItem);
      this.onGTip('[clickTaskAward]');
    },
    clickTaskButton(taskItem) {
      console.log('[clickTaskButton]', taskItem);
      this.onGTip('[clickTaskButton]');
    },
    clickMatch(matchItem) {
      console.log('[clickMatch]', matchItem);
      this.onGTip('[clickMatch]');
    },
    clickMatchAward(awardItem, awardIndex, matchItem) {
      console.log('[clickMatchAward]', awardItem, awardIndex, matchItem);
      this.onGTip('[clickMatchAward]');
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  background: url(https://image-1251917893.file.myqcloud.com/Esports/hor/bg.png)
    no-repeat;
  background-size: 100% 100%;
}
</style>
