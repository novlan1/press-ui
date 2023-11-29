<template>
  <div class="press-owner">
    <!-- header -->
    <MatchHeader
      :title="title"
      @back="back"
    />

    <div class="press-owner__main">
      <div
        class="press-owner__recommend"
      >
        <PressList
          v-if="recommendList.length"
          v-model="recommendLoading"
          :finished="recommendMap.finished"
          :immediate-check="immediateCheck"
          :finished-text="finishedText"
          :finished-style="finishedStyle"
          :loading-style="loadingStyle"
          :loading-size="loadingSize"
          @load="loadMore"
        >
          <!-- 赛事 -->
          <div class="press-owner__recommend-list">
            <RecommendItem
              v-for="(item,index) in recommendList"
              :key="index"
              :recommend-info="item"
              @clickMatchButton="clickMatchButton(item, index)"
              @clickMatch="clickMatch(item, index)"
            />
          </div>
        </PressList>

        <slot
          v-else
          name="empty"
        >
          <PressEmpty
            type="hor"
            description="暂无数据"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import RecommendItem from '../press-hor-owner-index/recommend.vue';
import MatchHeader from '../press-hor-match-header/press-hor-match-header.vue';

import PressEmpty from '../press-empty/press-empty.vue';
import PressList from '../press-list/press-list.vue';


export default {
  name: 'PressHorOwnerTheme',
  options: {
    virtualHost: true,
  },
  components: {
    RecommendItem,
    MatchHeader,
    PressEmpty,
    PressList,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    recommendMap: {
      type: Object,
      default: () => ({}),
    },
    immediateCheck: {
      type: Boolean,
      default: false,
    },
    finishedText: {
      type: String,
      default: '没有更多了',
    },
    finishedStyle: {
      type: String,
      default: '',
    },
    loadingStyle: {
      type: String,
      default: '',
    },
    loadingSize: {
      type: String,
      default: '20px',
    },
  },
  emits: [
    'update:loading',
    'back',
    'loadMore',
    'clickMatchButton',
    'clickMatch',
  ],
  data() {
    return {
      tabIndex: 0,
      sidebarIndex: 0,
    };
  },
  computed: {
    recommendLoading: {
      get() {
        return this.recommendMap.loading;
      },
      set(val) {
        this.$emit('update:loading', 'recommendMap', val);
      },
    },
    recommendList() {
      return this.recommendMap.list || [];
    },
  },
  watch: {
  },
  mounted() {
    this.$nextTick(() => {
      if (this.sidebarIndex == 1) {
        setTimeout(() => {
          this.$refs.tabs.resize();
        }, 100);
      }
    });
  },
  methods: {
    back() {
      this.$emit('back');
    },
    loadMore() {
      this.$emit('loadMore', this.sidebarIndex, this.tabIndex);
    },
    updateLoading(key = 'rankMap', value) {
      this.$emit('update:loading', key, value);
    },
    clickMatchButton(matchInfo, matchIndex) {
      this.$emit('clickMatchButton', matchInfo, matchIndex, this.sidebarIndex, this.tabIndex);
    },
    clickMatch(matchInfo, matchIndex) {
      this.$emit('clickMatch', matchInfo, matchIndex, this.sidebarIndex, this.tabIndex);
    },
  },
};

</script>
<style lang="scss" scoped src="./css/index.scss"></style>
