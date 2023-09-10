<template>
  <div
    :class="[
      'press-schedule-tree',
      mapClass,
      customClass
    ]"
  >
    <!-- 左侧遮罩 -->
    <div class="press-schedule-tree-tab-mask" />

    <!-- 赛程阶段tab -->
    <div
      class="press-schedule-tree-tabs"
      :style="{width: `${tabWidth}%`, transform: `translate3d(${tabScrollNum}px, 0, 0)`}"
      @mousedown="start"
      @touchstart="start"
      @mousemove="move"
      @touchmove="move"
      @mouseup="end"
      @touchend="end"
    >
      <template v-if="showRoundTab">
        <div
          v-for="(round, roundIndex) in fakeRoundList"
          :key="round.uniqueKey"
          class="press-schedule-tree-tab"
          :style="{width: `${tabScrollWidth}px`}"
          :class="[
            `press-schedule-tree-tab--scroll-${roundIndex - scrollTime}`,
            isAdmin ? 'press-schedule-tree-tab--clickable' : ''
          ]"
        >
          <p
            class="press-schedule-tree-tab-title"
            @click.stop="clickRoundTab(roundIndex)"
          >
            {{ getRoundName(roundIndex) || '' }}
          </p>
          <p
            class="press-schedule-tree-tab-desc"
            @click.stop="clickRoundTab(roundIndex)"
          >
            {{ getBoType(roundIndex) || '' }}
          </p>
          <div
            v-if="isAdmin"
            class="press-schedule-tree-tab-desc-icon iconfont icon-back"
            @click.stop="clickRoundTab(roundIndex)"
          />
          <div class="press-schedule-tree-tab-icon" />
        </div>
      </template>

      <div
        v-if="showChampion && showRoundTab"
        class="press-schedule-tree-tab"
        :class="[`press-schedule-tree-tab--scroll-${column - scrollTime}`]"
      >
        <p class="press-schedule-tree-tab-title">
          {{ innerChampionRoundName }}
        </p>
        <div class="press-schedule-tree-tab-icon" />
      </div>
    </div>

    <!-- 赛程树 -->
    <scroll-view
      v-if="fakeRoundList.length"
      :id="REF_MAP.TREE_ID"
      :ref="REF_MAP.TREE_REF"
      scroll-y="true"
      scroll-x="true"
      enable-flex="true"
      enhanced="true"
      :class="['press-schedule-tree-main']"
      :style="{ width: `${tabWidth}%`, transform: `translate3d(${scheduleScrollNum}px,0,0)` }"
      @touchstart="start"
      @mousedown="start"
      @touchmove="move"
      @mousemove="move"
      @touchend="end"
      @mouseup="end"
      @scroll="onScroll"
    >
      <div
        class="press-schedule-tree-layout"
        :class="{
          'press-schedule-tree-layout--shadow': shadow,
          'press-schedule-tree-layout--err-tip': topRowWithErrTip,
        }"
      >
        <div
          v-for="(colItem, colIndex) in fakeRoundList"
          :key="colItem.uniqueKey2"
          :ref="`scheItem${colIndex}`"
          :style="{height: getColumnStyle(scrollList[colIndex]).height,
                   overflow: getColumnStyle(scrollList[colIndex]).overflow
          }"
          class="press-schedule-tree-column"
          :class="[
            `press-schedule-tree-column--scroll-${scrollList[colIndex]}`,
            {
              'press-schedule-tree-column--shadow': shadow && colIndex % 2 === 1,
            }
          ]"
        >
          <div
            v-for="(schePair, schePairIndex) in schePairList[colIndex]"
            :id="`scheRef-${colIndex}-${schePairIndex}`"
            :key="schePair.uniqueKey"
            :ref="`scheRef-${colIndex}-${schePairIndex}`"
            class="press-schedule-tree-pair"
            :class="hasMyTeam(colIndex, schePairIndex) ? MY_TEAM_SCHE_PAIR_CLASS : ''"
          >
            <TwoTeamWrap
              :is-admin="isAdmin"
              :my-team-id="myTeamId"
              :col="colIndex"
              :is-preview="isPreview"
              :sche-group-info="scheList[colIndex]
                && scheList[colIndex][schePairIndex]
                && scheList[colIndex][schePairIndex].upScheGroup"
              :schedule-info="scheList[colIndex] && scheList[colIndex][schePairIndex]"
              :selected-team-id="selectedTeamId"
              :selected-sch-id="selectedSchId"
              @clickSche="(schId, scheGroup) => clickSche(schId, scheGroup, colIndex, schePairIndex)"
              @clickVideoIcon="(schId, scheGroup) => clickVideoIcon(schId, scheGroup, colIndex, schePairIndex)"
            />
            <TwoTeamWrap
              v-if="scheList[colIndex][schePairIndex]
                && scheList[colIndex][schePairIndex].battleList
                && scheList[colIndex][schePairIndex].battleList[1]"
              :is-admin="isAdmin"
              :is-preview="isPreview"
              :col="colIndex"
              :my-team-id="myTeamId"
              :sche-group-info="scheList[colIndex]
                && scheList[colIndex][schePairIndex]
                && scheList[colIndex][schePairIndex].downScheGroup"
              :schedule-info="scheList[colIndex] && scheList[colIndex][schePairIndex]"
              :is-up-two-team="false"
              :selected-team-id="selectedTeamId"
              :selected-sch-id="selectedSchId"
              @clickSche="(schId, scheGroup) => clickSche(schId, scheGroup, colIndex, schePairIndex)"
              @clickVideoIcon="(schId, scheGroup) => clickVideoIcon(schId, scheGroup, colIndex, schePairIndex)"
            />

            <!-- 右侧线框 -->
            <div
              v-if="!shadow"
              class="press-schedule-tree-pair-border"
              :class="{
                'press-schedule-tree-pair-border--parallel':
                  scrollList[colIndex + 1] === scrollList[colIndex]
              }"
            />
            <!-- <div
              class="press-schedule-tree-pair-border"
            /> -->
          </div>
        </div>

        <div
          v-if="showChampion"
          class="press-schedule-tree-column press-schedule-tree-column__champion"
          :class="[`press-schedule-tree-column--scroll-${scrollList[scrollList.length - 1] + 1}`]"
          :style="{
            height: getColumnStyle(scrollList[scrollList.length - 1] + 1).height,
            overflow: getColumnStyle(scrollList[scrollList.length - 1] + 1).overflow
          }"
        >
          <div class="press-schedule-tree-pair">
            <div>
              <!-- 冠军队伍 -->
              <div>
                <div
                  class="press-schedule-team-one--up press-schedule-team-one"
                  :class="{'press-schedule-team-one--active':
                             myTeamId == champTeamInfo.teamid
                             || (selectedTeamId && selectedTeamId == champTeamInfo.teamid),
                           'press-schedule-team-one--lose':
                             [i18nMap.emptyTeam, i18nMap.pending].includes(champTeamInfo.teamname)
                  }"
                  @click.stop="jump2Finals"
                >
                  <img
                    v-if="champTeamInfo.teamavatar"
                    :key="champTeamInfo.teamavatar"
                    v-lazy="champTeamInfo.teamavatar"
                    size="50"
                    class="press-schedule-team-avatar"
                  >
                  <p class="press-schedule-team-name">
                    {{ innerChampionName }}
                  </p>
                  <p
                    v-if="champTeamInfo.teamname !== i18nMap.pending"
                    class="press-schedule-team-score"
                  >
                    {{ champTeamInfo.score }}
                  </p>
                  <div
                    :class="{
                      'press-schedule-team-tag': true,
                      'press-schedule-team-tag--first': winnerName === i18nMap.champion,
                      'press-schedule-team-tag--second': winnerName === i18nMap.thirdPlace,
                    }"
                  >
                    {{ innerChampionTag }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import TwoTeamWrap from './press-schedule-team.vue';
import { endTouch, REF_MAP, scrollToH5, backToTop } from './touch-helper';
import { scrollRelative, getScrollStartY, initScrollBounce, scrollBounce } from './drag-helper';
import { t } from '../locale';

const MY_TEAM_SCHE_PAIR_CLASS = 'press-schedule-tree-pair--mine';
const DIRECTION_MAP = {
  HORIZONTAL: 'HORIZONTAL',
  VERTICAL: 'VERTICAL',
};

const SPECIAL_AVATAR_MAP = {
  PENDING: 'https://image-1251917893.file.myqcloud.com/Esports/new/user/dd.png',
  BYE: 'https://image-1251917893.file.myqcloud.com/Esports/new/user/team-logo.png',
  QUIT: 'https://image-1251917893.file.myqcloud.com/Esports/new/user/team-logo.png',
};


let movingDirection = '';
let isMoving = false;
const scrollInfo = {
  endX: 0,
  endY: 0,
};


function getFormattedResumePosition(resumePosition, column) {
  if (typeof resumePosition === 'string') {
    if (resumePosition === 'left') {
      return 0;
    }
    if (resumePosition === 'right') {
      if (column - 1 < 0) {
        return 0;
      }
      return column - 1;
    }
  }
  return resumePosition || 0;
}


export default {
  name: 'PressScheduleTree',
  components: {
    TwoTeamWrap,
  },
  props: {
    mapClass: {
      type: String,
      default: '',
    },
    customClass: {
      type: String,
      default: '',
    },
    scheList: {
      type: Array,
      default: () => ([]),
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isPreview: {
      type: Number,
      default: 0,
    },
    myTeamId: {
      type: String,
      default: '',
    },
    selectedSchId: {
      type: String,
      default: '',
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    autoBackToTop: {
      type: Boolean,
      default: true,
    },
    resumePosition: {
      type: [String, Number],
      default: 'right',
    },
    showRoundTab: {
      type: Boolean,
      default: true,
    },
    maxColumns: {
      type: Number,
      default: 3,
    },
    tabScrollWidth: {
      type: String,
      default: '164',
    },
    scheduleScrollWidth: {
      type: String,
      default: '164',
    },
    showChampion: {
      type: Boolean,
      default: true,
    },
    championRoundName: {
      type: String,
      default: '',
    },
    championName: {
      type: String,
      default: '',
    },
    championTag: {
      type: String,
      default: '',
    },
    canClickFinalSche: {
      type: Boolean,
      default: false,
    },
    specialAvatarMap: {
      type: Object,
      default: () => (SPECIAL_AVATAR_MAP),
    },

    /* 废弃 */
    winnerName: {
      type: String,
      default: t('scheduleTree.champion'),
    },
    // 当前页面page，影响进程标题显示
    page: {
      type: Number,
      default: 0,
    },
    totalPage: {
      type: Number,
      default: 0,
    },
    automaticGrouping: {
      type: Boolean,
      default: false,
    },
    /* 废弃 */
  },
  data() {
    return {
      startX: 0,
      scrollTime: 0,

      touchStartTime: 0,
      pageWidth: '',
      // tabScrollWidth: 164, // '3.28',
      // scheduleScrollWidth: 164, // '3.28',
      tabScrollNum: '0',
      scheduleScrollNum: '0',

      selectedTeamId: '',
      scheItemStyle: {},

      REF_MAP,
      MY_TEAM_SCHE_PAIR_CLASS,

      i18nMap: {
        pending: t('scheduleTree.pending'),
        champion: t('scheduleTree.champion'),
        thirdPlace: t('scheduleTree.thirdPlace'),
        emptyTeam: t('scheduleTree.emptyTeam'),
      },
    };
  },
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
  computed: {
    topRowWithErrTip() {
      // 错误码待指定
      let anyAbnormalMatch = false;
      const { scheList } = this;
      anyAbnormalMatch = !scheList.every((elem) => {
        const status = elem.every((item) => {
          const {
            upScheGroup: { abnormalErr: upScheAbnormal } = {},
          } = item;
          return !upScheAbnormal;
        });
        // true : 无顶号异常
        return status;
      });
      return anyAbnormalMatch;
    },
    roundList() {
      const { scheList } = this;
      return scheList.map(item => item?.[0]?.roundInfo || {});
    },
    /**
     * 形如
     * [
     *   [{}, {}, {}, {}],
     *   [{}, {}],
     *   [{}],
     *   [{}],
     * ]
     *
     * 或者双败赛
     * [
     *   [{}, {}, {}, {}],
     *   [{}, {}],
     *   [{}, {}],
     *   [{}],
     *   [{}],
     *   [{}],
     *   [{}],
     * ]
     *
     * 上面每个对象对应的是赛程组对，有可能为2个或1个赛程组，也就是4个或2个队伍
     */
    schePairList() {
      const { scheList } = this;
      const lenList = scheList?.map(item => item.length)?.map((item, roundIdx) => Array.from(
        { length: item },
        (_, v) => ({
          uniqueKey: `${roundIdx}-${v}-teamLenInnerItem`,
        }),
      ));
      return lenList;
    },
    /**
     * 赛程组个数列表，每个赛程组两个队伍
     *
     * 形如 [8, 4, 2, 1]
     *
     * 或者双败赛
     * [8, 4, 4, 2, 2, 1, 1]
     */
    scheGroupList() {
      const { scheList } = this;
      const temp = scheList.map((sche) => {
        const sum = sche.reduce((acc, item) => acc + item.battleList?.length, 0);
        return sum;
      });
      return temp;
    },
    /**
     * 赛程树滚动列表
     *
     * 形如：
     *  [0, 1, 2, 3]
     *  [-1, 0, 1, 2]
     *  [-2, -1, 0, 1]
     *  [-3, -2, -1, 0]
     *
     * 或者双败赛
     *  [0, 1, 1, 2, 2, 3, 3]
     *  [-1, 0, 0, 1, 1, 2, 2]
     *  [-2, -1, 0, 1, 1, 2, 2]
     *
     *  // ...
     *
     *  [-6, -5, -5, -4, -4, -3, 0]
     */
    scrollList() {
      const { scheGroupList, scrollTime } = this;
      const res = [0 - scrollTime];

      for (let i = 1;i < scheGroupList.length;i++) {
        const last = res[res.length - 1];
        let cur;
        if (scheGroupList[i] === scheGroupList[i - 1]) {
          cur = last;
        } else {
          cur = last + 1;
        }
        if (scrollTime === i && cur < 0) {
          cur = 0;
        }
        res.push(cur);
      }

      return res;
    },
    /**
     * 形如：
     *  [{}, {}, {}, {}]
     *
     * 或者双败赛
     *  [{}, {}, {}, {}, {}, {}, {}]
     * 其长度为实际轮次的个数，不包括最后的冠军
     */
    fakeRoundList() {
      const { schePairList } = this;
      const res =  Array.from({ length: schePairList.length }, (_, v) => ({
        uniqueKey: `${v}-round`,
        uniqueKey2: `${v}-round-2`,
      }));
      return res;
    },
    /**
     * 计算宽度
     */
    tabWidth() {
      return this.screenNum * 100;
    },
    /**
     * 计算树状图共有几列
     *
     * 队伍总数:    2   4   8   16  32
     * column:     1   2   3   4   5
     * screenNum:  1   2   2   3   3
     */
    column() {
      const { schePairList, showChampion } = this;
      return showChampion ? schePairList.length : schePairList.length - 1;
    },
    /**
     * 计算树状图共占几屏
     */
    screenNum() {
      return Math.ceil((this.column + 1) / 2);
    },
    /**
     * 比 fakeRoundList 少最后一列
     */
    // colList() {
    //   const { column } = this;
    //   return Array.from({ length: column - 1 }, (_, v) => ({
    //     uniqueKey: `${v}-colItem`,
    //   }));
    // },
    teamTotal() {
      if (!this.scheList.length) {
        return 0;
      }
      const res = 2 * this.scheList[0].reduce((acc, item) => {
        acc += item.battleList.length;
        return acc;
      }, 0);
      return res;
    },
    // 冠军队伍信息
    champTeamInfo() {
      const { scheList } = this;
      const scheInfo = scheList?.[scheList.length - 1]?.[0] || {};

      const status = scheInfo?.battleList?.[0]?.realStatus;
      const defaultInfo = {
        teamavatar: this.specialAvatarMap.PENDING,
        teamname: t('scheduleTree.pending'),
        score: 0,
      };

      // TODO: 状态码去掉
      if (status == 400) {
        return defaultInfo;
      }
      const team = (scheInfo?.battleList?.[0]?.teamList || []).find(item => !!item.isWinner);
      return team || defaultInfo;
    },
    innerChampionRoundName() {
      if (this.championRoundName) {
        return this.championRoundName;
      }
      return this.innerChampionTag;
    },
    innerChampionName() {
      if (this.championName) {
        return this.championName;
      }
      return this.haveNextPage ? t('scheduleTree.checkFinal') : this.champTeamInfo.teamname;
    },
    innerChampionTag() {
      if (this.championTag) {
        return this.championTag;
      }
      // 分组情况，显示组内XX
      // 单败+自动分页，冠军显示：..., 季军还是季军
      // 其它走原始逻辑
      if (this.haveNextPage) {
        return '...';
      }

      if (!this.automaticGrouping && (this.page !== this.totalPage - 1) && this.totalPage > 1) {
        return t('scheduleTree.groupedChampion', this.winnerName === this.i18nMap.champion);
      }

      return this.winnerName;
    },
    /* 废弃 */
    pagination() {
      const { page, totalPage } = this;
      return { page, totalPage };
    },
    // 单败自动分页
    haveNextPage() {
      const { winnerName, automaticGrouping, page, totalPage, i18nMap } = this;
      const autoGrouped = winnerName !== i18nMap.thirdPlace
        && automaticGrouping
        && page !== totalPage - 1
        && totalPage > 1;
      return autoGrouped;
    },
    /* 废弃 */
  },
  watch: {
    column: {
      handler(value) {
        const formattedResumePosition = getFormattedResumePosition(this.resumePosition, value);
        if (this.scrollTime > value - 1) {
          this.setScrollParams(formattedResumePosition);
        }
      },
    },
    /* 废弃 */
    pagination: {
      handler(value, oldVal) {
        const { page, totalPage } = value;
        const { page: oldPage } = oldVal;
        if (totalPage > 1 && page !== oldPage) {
          backToTop(this);
          // 翻页后重置页面位置, 不同页面的树状图长度可能不一
          this.setScrollParams(0);
        }
      },
      deep: true,
    },
    /* 废弃 */
  },
  created() {
  },
  mounted() {
    this.locateMyTeam();
    // #ifdef H5
    window?.addEventListener('mouseup', this.unwatchMouseUp);
    // #endif
  },
  updated() {
  },
  destroyed() {
    // #ifdef H5
    window?.removeEventListener('mouseup', this.unwatchMouseUp);
    // #endif
  },
  methods: {
    getColumnStyle(scrollTime) {
      const { maxColumns } = this;

      if (scrollTime > maxColumns - 1) {
        return { height: 0, overflow: 'hidden' };
      }
      if (scrollTime == maxColumns - 1) {
        return { height: 'calc(100% - 174px)', overflow: 'unset' };
      }
      if (scrollTime == 1) {
        return { height: 'calc(100% - 58px)', overflow: 'unset' };
      }
      if (scrollTime < 0) {
        return { height: 0, overflow: 'hidden' };
      }
      return { height: 'auto', overflow: 'unset' };
    },
    jump2Finals() {
      if (this.canClickFinalSche || this.haveNextPage) {
        this.$emit('clickFinalSche');
      }
    },
    hasMyTeam(aIndex, bIndex) {
      if (aIndex > 0) return;

      const sche = this.scheList?.[aIndex]?.[bIndex] || {};
      const teamIdList = sche?.battleList?.map(battle => battle?.teamList?.map(team => team.teamid))
        .flat()
        .filter(item => !!item);
      if (teamIdList.includes(this.myTeamId)) {
        return true;
      }
    },
    clickRoundTab(index) {
      if (!this.isAdmin) return;
      const round = this.roundList[index] || {};
      this.$emit('clickRoundTab', round?.round_type || '', round);
    },
    locateMyTeam() {
      if (!this.myTeamId || this.teamTotal <= 8) {
        return;
      }
      // #ifndef H5
      this.createSelectorQuery?.()
        ?.select?.(`#${REF_MAP.TREE_ID}`)
        ?.node?.()
        ?.exec?.((res) => {
          const scrollView = res[0]?.node;
          if (!scrollView) return;
          scrollView.scrollIntoView(`.${MY_TEAM_SCHE_PAIR_CLASS}`);
        });
      // #endif

      // #ifdef H5
      const node =  document?.querySelectorAll?.(`.${MY_TEAM_SCHE_PAIR_CLASS}`)[0];
      if (!node) return;
      scrollToH5(node.offsetTop, {
        animation: false,
      });
      // #endif
    },
    getBoType(index) {
      return `BO${this.roundList[index]?.bo_type || ''}`;
    },
    getRoundName(index) {
      return this.roundList[index]?.round_name || '';
    },
    // 触发按下事件
    start(e) {
      isMoving = true;
      movingDirection = '';

      // 如果touches存在就说明是移动端
      // 否则为pc端直接获取事件源对象
      const touch = e.touches?.[0] || e;
      this.startX = touch?.clientX;
      this.startY = touch?.clientY;
      this.touchStartTime = Date.now();
      this.$emit('scheduleOnClick');

      getScrollStartY();
    },
    // 触发移动事件，通过x轴移动的距离判断是左滑又滑
    move(e) {
      if (!isMoving) return;

      const touch = e.touches?.[0] || e;
      const moveEndX = touch?.clientX;
      scrollInfo.endX = moveEndX - this.startX;
      scrollInfo.endY = touch?.clientY - this.startY;

      movingDirection = DIRECTION_MAP.HORIZONTAL;
      const VERTICAL_SCROLL_Y = 120;
      if (Math.abs(scrollInfo.endY) > Math.abs(scrollInfo.endX) || Math.abs(scrollInfo.endY) > VERTICAL_SCROLL_Y) {
        movingDirection = DIRECTION_MAP.VERTICAL;

        // #ifdef H5
        initScrollBounce(scrollInfo);
        scrollRelative(-scrollInfo.endY, false);
        // #endif
      }
    },
    // 触摸移动结束事件
    end() {
      isMoving = false;
      if (movingDirection === DIRECTION_MAP.VERTICAL) {
        movingDirection = '';

        // #ifdef H5
        scrollBounce();
        // #endif
        return;
      }

      if (endTouch({
        endX: scrollInfo.endX,
        context: this,
        autoBackToTop: this.autoBackToTop,
        setScrollParams: this.setScrollParams,
        scrollTime: this.scrollTime,
        column: this.column,
      })) {
        scrollInfo.endX = 0;
        this.$emit('scroll', this.scrollTime, this.column + 1);
        return;
      }

      scrollInfo.endX = 0;
    },
    onScroll() {
    },
    clickSche(schId, scheGroup, colIndex, schePairIndex) {
      this.resetSelect();
      const schePair = this.scheList?.[colIndex]?.[schePairIndex] || {};
      this.$emit('clickSche', schId, scheGroup, schePair);
    },
    clickVideoIcon(schId, scheGroup, colIndex, schePairIndex) {
      const schePair = this.scheList?.[colIndex]?.[schePairIndex] || {};
      this.$emit('clickVideoIcon', schId, scheGroup, schePair);
    },
    resetSelect() {
      this.selectedTeamId = '';
    },
    setScrollParams(newScrollTime) {
      const { tabScrollWidth, scheduleScrollWidth } = this;
      // tab滑动
      this.tabScrollNum = -(newScrollTime) * tabScrollWidth;

      // 赛程滑动
      this.scheduleScrollNum = -(newScrollTime) * scheduleScrollWidth;

      // 滑动的次数/当前列数
      this.scrollTime = newScrollTime;
    },
    setScrollTime(newScrollTime) {
      this.setScrollParams(newScrollTime);
    },
    unwatchMouseUp() {
      isMoving = false;
    },
  },
};

</script>
<style lang="scss" src="./css/tree.scss"></style>
<style lang="scss" scoped src="./css/team-one.scss"></style>
