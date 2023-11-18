<template>
  <div :class="[getActClass('left')]">
    <div :class="[getActClass('header')]">
      <div :class="[getActClass('head-helmet')]" />
      <div :class="[getActClass('head-title')]">
        和平大众赛
      </div>
      <!-- <div :class="[getActClass('head-ob')]">
        裁判观战
      </div> -->
    </div>
    <div :class="[getActClass('main')]">
      <press-tabs
        v-if="!isSearch"
        animated
        :class="[getActClass('match-tabs')]"
        :active="curStartRoundId"
        @change="changeTab"
      >
        <press-tab
          v-for="(tab, index) in innerRoundList"
          :key="index"
          :name="tab.value"
          :title="tab.label"
        />
      </press-tabs>

      <div
        v-if="isSearch"
        :class="[getActClass('search-wrap')]"
      >
        <div :class="[getActClass('search-input')]">
          <div :class="[getActClass('icon-search'), 'icon-search', 'iconfont']" />
          <input
            v-model="searchInput"
            placeholder="搜索"
            @input="onInput"
          >
        </div>
        <div
          :class="[getActClass('btn-cancel')]"
          @click.stop="onCancelSearch"
        >
          取消
        </div>
      </div>

      <PressList
        v-if="isSearch"
        v-model="searchLoading"
        :finished="searchTeamMapInGroup.finished"
        :immediate-check="false"
        :vertical="false"
        finished-text=""
        @load="loadMoreInSearch"
      >
        <div
          :class="[getActClass('team-group')]"
        >
          <div
            v-for="(team, index) in searchTeamMapInGroup.list"
            :key="index"
            :class="[getActClass('team-item')]"
          >
            <div
              :class="[getActClass('item-top', {
                'item-top--gray': team.finished,
              })]"
            >
              <div
                v-if="team.finished"
                :class="[getActClass('label-gray')]"
              >
                已结束
              </div>
              <div :class="[getActClass('team-name')]">
                {{ team.teamname }}
              </div>
              <div :class="[getActClass('team-desc')]">
              <!-- {{ team.teamLen }}支队伍 -->
              </div>
            </div>
            <div :class="[getActClass('item-bottom')]">
              <div :class="[getActClass('item-logos')]">
                <div
                  v-for="(member, memberIndex) in team.members"
                  :key="getTeamKey(memberIndex, 'member')"
                  :class="[getActClass('item-logo')]"
                >
                  <img v-lazy="member.head">
                </div>
              </div>
            </div>

          <!-- <div
            v-if="item.finished"
            :class="[getActClass('item-check')]"
          >
            查看成绩
            <div :class="[getActClass('icon-guide'), 'icon-guide', 'iconfont']" />
          </div>

          <div
            v-else-if="item.started"
            :class="[getActClass('item-status'), 'gray']"
          >
            第{{ item.groupSeq }}组已开赛
          </div>
          <div
            v-else
            :class="[getActClass('item-status')]"
            @click.stop="startGame(item)"
          >
            第{{ item.groupId }}组开赛
          </div> -->
          </div>
        </div>
      </PressList>

      <PressList
        v-else
        v-model="curGroupLoading"
        :finished="curGroupInfo.finished"
        :immediate-check="false"
        :vertical="false"
        finished-text=""
        @load="loadMore"
      >
        <div
          :class="[getActClass('team-group')]"
        >
          <div
            v-for="(item, index) in curGroupList"
            :key="index"
            :class="[getActClass('team-item')]"
          >
            <div
              :class="[getActClass('item-top', {
                'item-top--gray': item.finished,
              })]"
            >
              <div
                v-if="item.finished"
                :class="[getActClass('label-gray')]"
              >
                已结束
              </div>
              <div :class="[getActClass('team-name')]">
                第{{ item.groupSeq }}组
              </div>
              <div :class="[getActClass('team-desc')]">
                {{ item.teamLen }}支队伍
              </div>
            </div>
            <div :class="[getActClass('item-bottom')]">
              <div :class="[getActClass('item-logos')]">
                <div
                  v-for="(team, teamIndex) in item.teamList"
                  :key="getTeamKey(teamIndex, 'team')"
                  :class="[getActClass('item-logo')]"
                >
                  <img v-lazy="team.teamAvatar">
                </div>
              </div>
            </div>

            <div
              v-if="item.finished"
              :class="[getActClass('item-check')]"
            >
              查看成绩
              <div :class="[getActClass('icon-guide'), 'icon-guide', 'iconfont']" />
            </div>

            <div
              v-else-if="item.started"
              :class="[getActClass('item-status'), 'gray']"
            >
              第{{ item.groupSeq }}组已开赛
            </div>
            <div
              v-else-if="!disabledButton"
              :class="[getActClass('item-status')]"
              @click.stop="startGame(item)"
            >
              第{{ item.groupSeq }}组开赛
            </div>
          </div>
        </div>
      </PressList>
    </div>

    <div
      v-if="!isSearch"
      :class="[getActClass('footer')]"
    >
      <div
        :class="[getActClass('btn-search')]"
        @click.stop="onSearchTeam"
      >
        <div :class="[getActClass('icon-search'), 'icon-search', 'iconfont']" />
        搜索队伍
      </div>
      <!-- <div :class="[getActClass('btn-refresh')]">
        <div :class="[getActClass('icon-refresh'), 'icon-refresh', 'iconfont']" />
        重新分组
      </div> -->
      <div :class="[getActClass('btn-group')]">
        <div
          :class="[getActClass('primary-btn', {
            'disabled-btn': disabledButton || isCurRoundAllStarted
          })]"
          @click.stop="startAllGame"
        >
          <!-- 添加disabled-btn置灰按钮 -->
          第{{ NUMBER_CHI_MAP[curStartRoundId] }}局全部开赛
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NUMBER_CHI_MAP } from 't-comm/lib/base/number/number';
import PressTab from '../press-tab/press-tab';
import PressTabs from '../press-tabs/press-tabs';
import PressList from '../press-list/press-list';
import { getActClass } from './utils';


export default {
  name: 'PressConfirmStart',
  components: {
    PressTab,
    PressTabs,
    PressList,
  },
  props: {
    roundTotal: {
      type: Number,
      default: 1,
    },
    groupMap: {
      type: Object,
      default: () => ({}),
    },
    searchTeamMapInGroup: {
      type: Object,
      default: () => ({}),
    },
    curStartRoundId: {
      type: Number,
      default: 1,
    },
    disabledButton: {
      type: Boolean,
      default: false,
    },
    roundList: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      NUMBER_CHI_MAP,
      isSearch: false,
      searchInput: '',
    };
  },
  computed: {
    innerRoundList() {
      return Array.from({ length: this.roundTotal }).map((_, index) => ({
        label: `第${NUMBER_CHI_MAP[index + 1]}局`,
        value: index + 1,
      }));
    },
    roundMap() {
      return this.roundList.reduce((acc, item) => {
        acc[item.roundId] = item;
        return acc;
      }, {});
    },
    curGroupInfo() {
      return this.groupMap[this.curStartRoundId];
    },
    curGroupList() {
      return this.curGroupInfo?.list || [];
    },
    isCurRoundAllStarted() {
      const { roundMap, curStartRoundId } = this;
      return roundMap[curStartRoundId]?.started;
    },
    curGroupLoading: {
      get() {
        return this.curGroupInfo.loading;
      },
      set(val) {
        this.$emit('update:loading', 'groupMap', val);
      },
    },
    searchLoading: {
      get() {
        return this.searchTeamMapInGroup.loading;
      },
      set(val) {
        this.$emit('update:loading', 'searchTeamMapInGroup', val);
      },
    },
  },
  created() {

  },
  mounted() {

  },
  methods: {
    getActClass,
    changeTab(tab) {
      this.$emit('changeStartRoundId', tab.name);
    },
    getTeamKey(a, b) {
      return `${a}-${b}`;
    },
    startGame(item) {
      if (this.disabledButton) return;

      this.$emit('startGame', item);
    },
    startAllGame() {
      if (this.disabledButton || this.isCurRoundAllStarted) return;

      this.$emit('startAllGame');
    },
    onSearchTeam() {
      this.$emit('searchTeam');
      this.isSearch = true;
    },
    onCancelSearch() {
      this.isSearch = false;
    },
    onInput(e) {
      this.$emit('search', e.target.value);
    },
    loadMore() {
      this.$emit('loadMore', 'groupMap');
    },
    loadMoreInSearch() {
      this.$emit('loadMore', 'searchTeamMapInGroup');
    },
  },
};
</script>

<style lang="scss" src="./css/confirm-start.scss" scoped></style>

<style scoped lang="scss">
@import "../common/style/gp-match/mixin.scss";
.press__search-wrap {
  display: flex;
  align-items: center;
  margin: 0.36rem 0 0.18rem 0;

  .press__search-input {
    height: 0.6rem;
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 0.24rem;
    border: 0.02rem solid rgba(252, 252, 252, 0.3);
    background: linear-gradient(
      101deg,
      rgba(238, 239, 241, 0.7) 15.46%,
      rgba(252, 252, 252, 0.7) 86.92%
    );
    box-shadow: 0 0 0.2rem 0 rgba(83, 71, 134, 0.38);
    backdrop-filter: blur(0.04rem);
  }
  .press__icon-search {
    margin-right: 0.08rem;
    font-size: 0.28rem;
    color: #212124;
  }
  input {
    flex: 1;
    font-size: 0.24rem;
    color: #212124;
    &::placeholder {
      color: rgba(33, 33, 36, 0.4);
    }
  }

  .press__btn-cancel {
    padding: 0 0.08rem 0 0.32rem;
    font-size: 0.28rem;
    color: #212124;
  }
}
</style>
