<template>
  <div class="press-owner-rank">
    <PressList
      v-if="followList.length > 0"
      v-model="curLoading"
      :finished="followMap.finished"
      :immediate-check="immediateCheck"
      :finished-text="finishedText"
      :finished-style="finishedStyle"
      :loading-style="loadingStyle"
      :loading-size="loadingSize"
      @load="loadMore"
    >
      <div class="press-owner-rank-focus">
        <div
          v-for="(item, index) in followList"
          :key="index"
          class="press-match"
          @click.stop="clickRankItem(item, index)"
        >
          <div class="press-owner-rank__info">
            <img
              :src="item.pic"
              class="press-owner-rank__info-img"
              size="22"
            >
            <div class="press-owner-rank__info-detail">
              <p class="press-owner-rank__info-name">
                {{ item.name }}
              </p>
              <div class="press-owner-rank__info-fans">
                <span v-if="curRankTab === 1">粉丝：{{ item.fan }}</span>

                <div
                  v-if="curRankTab === 2"
                  class="press-match__member"
                >
                  <img
                    v-for="(fItem, fIdx) in friendList(item.friends)"
                    :key="fIdx"
                    :src="fItem.pic"
                  >
                  <span
                    v-if="curRankTab === 2 && item.followLength"
                    class="press-owner-rank__info-friend-focus"
                  >
                    {{ item.followLength }}位好友已关注
                  </span>
                </div>

                <span
                  v-if="item.canJoinGameNum > 0"
                  class="press-owner-rank__info-game"
                  :class="{'press-owner-rank__info-friend': curRankTab === 2 }"
                  @click.stop="clickRankGames(item, index)"
                >
                  <span class="press-owner-rank__info-color">{{ item.canJoinGameNum }}场</span>比赛可参加>
                </span>
              </div>
            </div>

            <div class="press-owner-rank__info-lv">
              <p>Lv{{ item.lv }}</p>
            </div>
          </div>
          <div class="press-match__status">
            <!-- <div
              v-if="curRankTab === 1"
              class="press-owner-rank__focus-plain press-owner-rank-plain--focused"
              @click.stop="focus(item, index)"
            >
              已关注
            </div> -->
            <!-- class="press-match__button" -->
            <div
              :class="['press-owner-rank__focus',
                       item.isFocused ? 'press-owner-rank__focus--focused':''
              ]"
              @click.stop="focus(item, index)"
            >
              {{ item.isFocused ? '已关注':'关注' }}
            </div>
          </div>
        </div>
      </div>
    </PressList>
    <slot
      v-else
      name="empty"
    >
      <PressEmpty
        type="hor"
        :description="curRankTab === 1 ? '暂无我关注的主理人' : '暂无好友关注的主理人'"
      />
    </slot>
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
    curRankTab: {
      type: Number,
      default: 1,
    },
    followMap: {
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
    'clickRankItem',
    'focus',
    'loadMore',
  ],
  data() {
    return {};
  },
  computed: {
    followList() {
      return this.followMap.list || [];
    },
    curLoading: {
      get() {
        return this.followMap.loading;
      },
      set(val) {
        this.$emit('update:loading', val);
      },
    },
  },
  methods: {
    friendList(item) {
      if (item && item.length > 3) {
        return item.slice(0, 3);
      }
      return item;
    },
    loadMore() {
      this.$emit('loadMore');
    },
    focus(item, index) {
      this.$emit('focus', item, index);
    },
    clickRankItem(item, index) {
      this.$emit('clickRankItem', item, index);
    },
    clickRankGames(item, index) {
      this.$emit('clickRankGames', item, index);
    },
  },
};

</script>
<style lang="scss" scoped src="./css/follow.scss"></style>
