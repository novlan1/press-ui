<template>
  <div :class="[getActClass('left')]">
    <div :class="[getActClass('header')]">
      <div :class="[getActClass('head-helmet')]" />
      <div :class="[getActClass('head-title')]">
        和平大众赛
      </div>
      <div :class="[getActClass('des-text')]">
        确认资格后，选手才可参赛
      </div>
    </div>

    <div :class="[getActClass('main')]">
      <div :class="[getActClass('grouping')]">
        每组队伍数
        <div
          :class="[getActClass('select-box')]"
          @click.stop="onShowSelectTeam"
        >
          {{ numPerGroup }}支队伍
          <div :class="[getActClass('icon-guide'), 'icon-guide', 'iconfont']" />
          <div
            v-if="showSelectTeamList"
            :class="[getActClass('select')]"
          >
            <div
              v-for="(num, index) of toSelectNumList"
              :key="index"
              :class="[getActClass('option')]"
              @click.stop="selectNumPerGroup(num)"
            >
              {{ num }}支队伍
            </div>
          </div>
        </div>
      </div>

      <PressList
        v-model="groupListLoading"
        :finished="groupListMap.finished"
        :immediate-check="false"
        :vertical="false"
        finished-text=""
        @load="loadMore"
      >
        <div :class="[getActClass('team-group')]">
          <div
            v-for="(item, index) in groupList"
            :key="index"
            :class="[getActClass('team-item')]"
          >
            <div :class="[getActClass('item-top')]">
              <div :class="[getActClass('team-name')]">
                <template v-if="item.title">
                  {{ item.title }}
                </template>
                <template v-else>
                  第{{ item.groupSeq }}组
                </template>
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
          </div>
        </div>
      </PressList>
    </div>

    <div :class="[getActClass('footer')]">
      <div :class="[getActClass('btn-group')]">
        <div
          :class="[getActClass('primary-btn', {
            'disabled-btn': disabledButton
          })]"
          @click.stop="confirmAdjustGroup"
        >
          <!-- 添加disabled-btn置灰按钮 -->
          确认分组
          <div
            class="num"
          >
            {{ groupNum ? `共${groupNum}组` : '' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getActClass } from './utils';
import PressList from '../press-list/press-list';


export default {
  name: 'PressTeamGrouping',
  components: {
    PressList,
  },
  props: {
    numPerGroup: {
      type: Number,
      default: 1,
    },
    toSelectNumList: {
      type: Array,
      default: () => [1],
    },
    groupNum: {
      type: Number,
      default: 0,
    },
    groupListMap: {
      type: Object,
      default: () => ({}),
    },
    disabledButton: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'confirmAdjustGroup',
    'loadMore',
    'selectNumPerGroup',
    'update:loading',
  ],
  data() {
    return {
      showSelectTeamList: false,
    };
  },
  computed: {
    groupList() {
      return this.groupListMap.list || [];
    },
    groupListLoading: {
      get() {
        return this.groupListMap.loading;
      },
      set(val) {
        this.$emit('update:loading', 'groupListMap', val);
      },
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    getActClass,
    onShowSelectTeam() {
      this.showSelectTeamList = !this.showSelectTeamList;
    },
    selectNumPerGroup(num) {
      this.$emit('selectNumPerGroup', num);
      this.showSelectTeamList = false;
    },
    confirmAdjustGroup() {
      if (this.disabledButton) return;

      this.$emit('confirmAdjustGroup');
    },
    getTeamKey(a, b) {
      return `${a}-${b}`;
    },
    loadMore() {
      this.$emit('loadMore', 'groupListMap');
    },
  },
};
</script>

<style lang="scss" src="./css/team-grouping.scss" scoped></style>
