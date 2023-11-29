<template>
  <div :class="[getActClass('left')]">
    <div
      v-if="!isSearch"
      :class="[getActClass('header')]"
    >
      <div :class="[getActClass('head-helmet')]" />
      <div :class="[getActClass('head-title')]">
        和平大众赛
      </div>
      <div :class="[getActClass('des-text')]">
        确认资格后，选手才可参赛
      </div>
    </div>

    <div
      v-if="isSearch"
      :class="[getActClass('search-wrap')]"
    >
      <div :class="[getActClass('search-input')]">
        <div :class="[getActClass('icon-search'),'icon-search', 'iconfont']" />
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

    <div
      v-if="teamList.length"
      :class="[getActClass('main')]"
    >
      <div :class="[getActClass('table-head')]">
        <div :class="[getActClass('table-name')]">
          战队名称
        </div>
        <div :class="[getActClass('table-num')]">
          人数
        </div>
        <div :class="[getActClass('table-full')]">
          满足参赛人数
        </div>
        <div :class="[getActClass('table-status')]">
          有参赛资格
        </div>
      </div>

      <div :class="[getActClass('table-main')]">
        <PressList
          v-model="teamLoading"
          :finished="curTeamMap.finished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="loadMore"
        >
          <div
            v-for="(item, index) in teamList"
            :key="index"
            :class="[getActClass('table-item')]"
          >
            <div
              :class="[getActClass('table-name')]"
              @click.stop="onShowTeamInfo(item, index)"
            >
              <img v-lazy="item.teamavatar">
              <div :class="[getActClass('table-team-name')]">
                {{ item.teamname }}
              </div>
              <div :class="[getActClass('icon-guide'), 'icon-guide', 'iconfont']" />
            </div>
            <div :class="[getActClass('table-num')]">
              {{ item.memnum }}
            </div>
            <div
              :class="[getActClass('table-full'), {
                'press__table-full--gray': !item.isPass
              }]"
            >
              {{ item.isPass ? '是' : '否' }}
            </div>

            <div
              :class="[getActClass('table-status')]"
              @click.stop="checkTeam(item, index)"
            >
              <div
                :class="[getActClass('checkbox', {
                  'checkbox--checked': item.checked,
                  'checkbox--disabled': item.disabled ||disabledButton,
                })]"
              />
            <!-- <div
              v-else-if="item.disabled"
              :class="[getActClass('checkbox','checkbox--disabled')]"
            />
            <div
              v-else
              :class="[getActClass('checkbox')]"
            /> -->
            </div>

            <PressTeamPopover
              v-if="showTeamMap[index]"
              :team="item"
              :reversed="index > 2 && index < teamList.length"
              @onClickOutside="onClickOutside"
            />
          </div>
        </PressList>
      </div>
    </div>

    <DataEmpty
      v-else
      text="没有队伍"
    />

    <div
      v-if="!isSearch"
      :class="[getActClass('footer')]"
    >
      <div
        :class="[getActClass('btn-search')]"
        @click.stop="onClickSearch"
      >
        <div
          :class="[getActClass('icon-search'), 'icon-search', 'iconfont']"
        />
        搜索队伍
      </div>

      <div :class="[getActClass('btn-group')]">
        <div
          :class="[getActClass('secondary-btn', {
            'disabled-btn': innerDisabledButton
          })]"
          @click.stop="toggleAllQualification"
        >
          {{ isAllConfirmed ? '全部取消' : '全部确认' }}
        </div>

        <!-- disabled-btn -->
        <div
          :class="[getActClass('primary-btn', {
            'disabled-btn': innerDisabledButton
          })]"
          @click.stop="doneConfirmSignUp"
        >
          确认资格
          <!-- {{ checkedTeamTotal }}/{{ teamTotal }} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PressTeamPopover from './team-popover';
import DataEmpty from './empty';
import { getActClass } from './utils';

import PressList from '../press-list/press-list';


export default {
  name: 'PressConfirmMember',
  components: {
    PressTeamPopover,
    DataEmpty,
    PressList,
  },
  props: {
    isSearch: { // 是否是搜索状态
      type: Boolean,
      default: false,
    },
    teamMap: {
      type: Object,
      default: () => ({}),
    },
    searchTeamMap: {
      type: Object,
      default: () => ({}),
    },
    teamTotal: {
      type: Number,
      default: 0,
    },
    checkedTeamTotal: {
      type: Number,
      default: 0,
    },
    isAllConfirmed: {
      type: Boolean,
      default: false,
    },
    disabledButton: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'checkTeam',
    'doneConfirmSignUp',
    'loadMore',
    'onCancelSearch',
    'onClickSearch',
    'search',
    'toggleAllQualification',
    'update:loading',
  ],
  data() {
    return {
      showPopover: false,
      searchInput: '',
      showTeamMap: {},
    };
  },
  computed: {
    curTeamMap() {
      if (this.isSearch) {
        return this.searchTeamMap;
      }
      return this.teamMap;
    },
    curTeamKey() {
      const key = this.isSearch ? 'searchTeamMap' : 'teamMap';
      return key;
    },
    teamList() {
      return this.curTeamMap.list || [];
    },
    innerDisabledButton() {
      return this.disabledButton || !this.teamList.length;
    },
    teamLoading: {
      get() {
        return this.curTeamMap.loading;
      },
      set(val) {
        const key = this.isSearch ? 'searchTeamMap' : 'teamMap';
        this.$emit('update:loading', key, val);
      },
    },
  },
  created() {

  },
  mounted() {

  },
  methods: {
    getActClass,
    onClickSearch() {
      this.$emit('onClickSearch', this.searchInput);
    },
    onCancelSearch() {
      this.$emit('onCancelSearch');
    },
    toggleAllQualification() {
      if (this.innerDisabledButton) return;

      this.$emit('toggleAllQualification');
    },
    doneConfirmSignUp() {
      if (this.innerDisabledButton) return;

      this.$emit('doneConfirmSignUp');
    },
    checkTeam(item, index) {
      if (this.disabledButton) return;
      if (item.disabled) return;

      this.$emit('checkTeam', item, index);
    },
    onInput(e) {
      this.$emit('search', e.target.value);
    },
    onShowTeamInfo(item, index) {
      Object.keys(this.showTeamMap).forEach((item) => {
        if (item != index) {
          this.$set(this.showTeamMap, item, false);
        }
      });
      this.$set(this.showTeamMap, index, !this.showTeamMap[index]);
    },
    onClickOutside() {
      Object.keys(this.showTeamMap).forEach((item) => {
        this.$set(this.showTeamMap, item, false);
      });
    },
    loadMore() {
      this.$emit('loadMore', this.curTeamKey);
    },
  },
};
</script>

<style lang="scss" src="./css/confirm-member.scss" scoped></style>
<style scoped>
.press__primary-btn {
  background-size: 100% 100%;
}
</style>
