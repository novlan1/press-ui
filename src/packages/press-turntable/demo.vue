<template>
  <div class="demo-wrap">
    <PressTurnTable
      :list="list"
      :prize-index="prizeIndex"
      :number="3"
      @start="onStart"
      @end="onEnd"
    />
  </div>
</template>
<script>
import PressTurnTable from 'src/packages/press-turntable/press-turntable.vue';

const PRIZE_LIST = [
  {
    img: 'https://igame-10037599.cos.ap-shanghai.myqcloud.com/22587980-4eec-3b79-b0df-78a211583fd5',
    name: '1元',
  },
  {
    img: 'https://igame-10037599.cos.ap-shanghai.myqcloud.com/22587980-4eec-3b79-b0df-78a211583fd5',
    name: '5元',
  },
  {
    img: 'https://igame-10037599.cos.ap-shanghai.myqcloud.com/22587980-4eec-3b79-b0df-78a211583fd5',
    name: '10元',
  },
  {
    img: 'https://igame-10037599.cos.ap-shanghai.myqcloud.com/22587980-4eec-3b79-b0df-78a211583fd5',
    name: '50元',
  },
  {
    img: 'https://igame-10037599.cos.ap-shanghai.myqcloud.com/22587980-4eec-3b79-b0df-78a211583fd5',
    name: '100元',
  },
  {
    img: 'https://igame-10037599.cos.ap-shanghai.myqcloud.com/22587980-4eec-3b79-b0df-78a211583fd5',
    name: '500元',
  },
];


export default {
  components: {
    PressTurnTable,
  },
  data() {
    return {
      prizeIndex: 1,
      list: PRIZE_LIST,
    };
  },
  methods: {
    onStart() {
      console.log('start');
    },
    onEnd() {
      this.prizeIndex = Math.floor(Math.random() * this.list.length);
      console.log('end', this.prizeIndex);
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
