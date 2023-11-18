<template>
  <div class="press-owner-rank">
    <div class="press-owner-rank__title">
      {{ rankTitle }}
    </div>
    <div class="press-owner-rank__main">
      <PressList
        v-if="rankList.length > 0"
        v-model="curLoading"
        :finished="rankMap.finished"
        :immediate-check="immediateCheck"
        :finished-text="finishedText"
        :finished-style="finishedStyle"
        :loading-style="loadingStyle"
        :loading-size="loadingSize"
        @load="onLoadMore"
      >
        <div class="press-owner-rank__list">
          <!-- 是自己高亮 press-owner-rank__item--highlight -->
          <div
            v-for="(item, index) in rankList"
            :key="index"
            :class="['press-owner-rank__item',
                     item.isMine ? 'press-owner-rank__item--highlight':''
            ]"
            @click.stop="clickRankItem(item, index)"
          >
            <div
              :class="['press-owner-rank__num',
                       `press-owner-rank__num--rank-${item.rank}`
              ]"
            >
              {{ item.rank }}
            </div>
            <div class="press-owner-rank__info">
              <img
                v-lazy="item.pic"
                class="press-owner-rank__info-img"
                size="22"
              >
              <div class="press-owner-rank__info-detail">
                <p class="press-owner-rank__info-name">
                  {{ item.name }}
                </p>
                <p class="press-owner-rank__info-fans">
                  粉丝：{{ item.fan }}
                </p>
              </div>
              <div class="press-owner-rank__info-lv">
                <p>Lv{{ item.lv }}</p>
              </div>
            </div>
            <div class="press-owner-rank__join">
              {{ rankNumPrefix }}{{ item.num }}
            </div>
            <!-- 已关注：press-owner-rank__focus--focused -->
            <div
              v-if="item.showButton"
              :class="['press-owner-rank__focus',
                       item.isFocused ? 'press-owner-rank__focus--focused':''
              ]"
              @click.stop="focus(item, index)"
            >
              {{ item.isFocused ? '已关注':'关注' }}
            </div>
            <div
              v-else
              class="press-owner-rank__focus-placeholder"
            />
          </div>
        </div>
      </PressList>

      <slot
        v-else
        name="empty"
      >
        <PressEmpty
          type="hor"
          :description="rankEmptyText"
        />
      </slot>
    </div>

    <div
      v-if="Object.keys(myRankInfo).length"
      class="press-owner-rank__item press-owner-rank__item--fixed"
    >
      <div class="press-owner-rank__num">
        {{ myRankInfo.myRankStr }}
      </div>
      <div class="press-owner-rank__info">
        <img
          v-lazy="myRankInfo.pic"
          class="press-owner-rank__info-img"
          size="22"
        >
        <div class="press-owner-rank__info-detail">
          <p class="press-owner-rank__info-name">
            {{ myRankInfo.name }}
          </p>
          <p class="press-owner-rank__info-fans">
            粉丝：{{ myRankInfo.fan }}
          </p>
        </div>
        <div class="press-owner-rank__info-lv">
          <p>Lv{{ myRankInfo.lv }}</p>
        </div>
      </div>
      <div class="press-owner-rank__join">
        <p>{{ rankNumPrefix }}{{ myRankInfo.num }}</p>
        <p
          v-if="myRankInfo.diffNumStr"
          class="press-owner-rank_join-desc"
        >
          {{ myRankInfo.diffNumStr }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import PressList from '../press-list/press-list.vue';
import PressEmpty from '../press-empty/press-empty.vue';


export default {
  components: {
    PressList,
    PressEmpty,
  },
  props: {
    rankMap: {
      type: Object,
      default: () => ({}),
    },
    myRankInfo: {
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
    rankTitle: {
      type: String,
      default: '主理人周榜',
    },
    rankNumPrefix: {
      type: String,
      default: '本周参赛人数：',
    },
    rankEmptyText: {
      type: String,
      default: '暂无主理人榜单',
    },
  },
  data() {
    return {
    };
  },
  computed: {
    rankList() {
      return this.rankMap.list || [];
    },
    curLoading: {
      get() {
        return this.rankMap.loading;
      },
      set(val) {
        this.$emit('update:loading', val);
      },
    },
  },
  methods: {
    onLoadMore() {
      this.$emit('loadMore');
    },
    focus(item, index) {
      this.$emit('focus', item, index);
    },
    clickRankItem(item, index) {
      this.$emit('clickRankItem', item, index);
    },
  },
};

</script>
<style lang="scss" scoped src="./css/rank.scss"></style>
