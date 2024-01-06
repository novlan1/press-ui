<template>
  <PressHorDialog
    title="全部奖励说明"
    popup-with="9.6"
    @close="close"
  >
    <div :class="[getActClass('award-explain')]">
      <div
        v-for="(item,index) in awardList"
        :id="`award${index}`"
        :key="index"
        :class="[getActClass('awards')]"
      >
        <div :class="[getActClass('rank')]">
          {{ item.title }}
        </div>
        <div
          v-for="(award, award_index) in item.subItems"
          :key="award_index"
          :class="[getActClass('award')]"
        >
          <div
            v-if="award.pic"
            :class="[getActClass('image')]"
          >
            <img v-lazy="award.pic">
          </div>
          <div :class="[getActClass('meta')]">
            <div :class="[getActClass('name')]">
              {{ award.name }}
              <div
                v-if="award.label"
                :class="[getActClass('label')]"
              >
                {{ award.label }}
              </div>
            </div>
            <div
              v-if="award.description"
              :class="[getActClass('description')]"
            >
              {{ award.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </PressHorDialog>
</template>
<script>
import PressHorDialog from '../press-hor-dialog/press-hor-dialog';
import { getActClass } from './utils';


export default {
  name: 'PressHorAwardExplain',
  components: {
    PressHorDialog,
  },
  props: {
    awardList: {
      type: Array,
      desc: '奖励信息',
      default: () => ([]),
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
  computed: {
  },
  mounted() {
  },
  methods: {
    close(...args) {
      this.$emit('close', ...args);
    },
    scrollTo(index) {
      const element = document.getElementById(`award${index}`);
      element?.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
    },
    getActClass(...args) {
      return getActClass(false, args);
    },
  },
};

</script>
<style lang="scss" scoped src="./css/index.scss"></style>
