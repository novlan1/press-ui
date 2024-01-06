<template>
  <div
    class="press-schedule-item"
    :class="{'press-schedule-item--selected': selected}"
    @click.stop="clickScheItem"
  >
    <div
      v-if="scheInfo.finalsLabel"
      class="press-schedule-item-label"
    >
      {{ scheInfo.finalsLabel || '' }}
    </div>
    <div class="press-schedule-item-layout">
      <template v-if="true">
        <div
          v-if="isPreview == PREVIEW_STATE_MAP.PREVIEW"
          class="press-schedule-team--preview"
        >
          <div class="press-schedule-team-avatar-wrap" />
          <div
            v-if="leftTeam.teamid === SPECIAL_TEAM_ID_MAP.PREVIEW_EMPTY"
            class="press-schedule-team-name press-schedule-team-name--empty"
          >
            {{ scheInfo.emptyTeam || '' }}
          </div>
          <div
            v-else
            class="press-schedule-team-name"
          />
        </div>
        <!-- 预赛程E -->

        <div
          v-else
          :class="{'press-schedule-team--abstain': scheInfo.isLeftTeamQuit}"
        >
          <div class="press-schedule-team-avatar-wrap">
            <div
              v-if="leftTeam.isWinner && scheInfo.finalsChampion"
              class="press-schedule-team-tag-winner"
            >
              {{ scheInfo.finalsChampion || '' }}
            </div>

            <div
              v-if="leftTeam.teamid == myTeamId"
              class="press-schedule-team-tag-mine"
            >
              {{ scheInfo.me || '' }}
            </div>
            <img
              v-if="leftTeam.teamavatar"
              v-lazy="leftTeam.teamavatar"
              class="press-schedule-team-avatar"
              size="50"
            >
          </div>
          <div class="press-schedule-team-name">
            {{ leftTeam.teamname || '' }}
          </div>
        </div>
      </template>


      <!-- middle part -->
      <div
        :class="scheInfo.finals ? 'press-schedule-center--finals':''"
        class="press-schedule-center"
      >
        <!-- the status desc part -->
        <div
          v-if="scheInfo.scheStateDesc"
          class="press-schedule-state"
        >
          {{ scheInfo.scheStateDesc || '' }}
          <div
            v-if="scheInfo.playingDesc"
            class="press-schedule-state-icon"
          >
            {{ scheInfo.playingDesc || '' }}<div class="iconfont icon-live" />
          </div>
        </div>

        <!-- the VS or score -->
        <template v-if="true">
          <div
            v-if="scheInfo.showVS"
            class="press-schedule-score"
          >
            <div class="press-schedule-score-vs">
              VS
            </div>
          </div>

          <div
            v-else
            class="press-schedule-score"
          >
            <div class="press-schedule-score-num">
              {{ leftTeam.score || 0 }}
            </div>
            <div
              :class="{ 'press-schedule-score-colon--shift': scheInfo.isScoreColonShift }"
              class="press-schedule-score-colon"
            />
            <div class="press-schedule-score-num">
              {{ rightTeam.score || 0 }}
            </div>
          </div>
        </template>

        <!-- the btn -->
        <div
          v-if="scheInfo.middleButtonTitle"
          :class="scheInfo.middleButtonClass"
          @click.stop="onClickMiddleBtn"
        >
          {{ scheInfo.middleButtonTitle || '' }}
        </div>
      </div>


      <!-- the avatar teamname of right team -->
      <template v-if="true">
        <!-- 预赛程S -->
        <div
          v-if="isPreview == PREVIEW_STATE_MAP.PREVIEW"
          class="press-schedule-team--preview"
        >
          <div class="press-schedule-team-avatar-wrap" />
          <div
            v-if="rightTeam.teamid === SPECIAL_TEAM_ID_MAP.PREVIEW_EMPTY"
            class="press-schedule-team-name press-schedule-team-name--empty"
          >
            {{ scheInfo.emptyTeam || '' }}
          </div>
          <div
            v-else
            class="press-schedule-team-name"
          />
        </div>
        <!-- 预赛程E -->

        <div
          v-else
          :class="{'press-schedule-team--abstain': scheInfo.isRightTeamQuit}"
        >
          <div class="press-schedule-team-avatar-wrap">
            <div
              v-if="rightTeam.isWinner && scheInfo.finalsChampion"
              class="press-schedule-team-tag-winner"
            >
              {{ scheInfo.finalsChampion || '' }}
            </div>

            <div
              v-if="rightTeam.teamid == myTeamId"
              class="press-schedule-team-tag-mine"
            >
              {{ scheInfo.me || '' }}
            </div>
            <img
              v-if="rightTeam.teamavatar"
              v-lazy="rightTeam.teamavatar"
              class="press-schedule-team-avatar"
              size="50"
            >
          </div>
          <div class="press-schedule-team-name">
            {{ rightTeam.teamname || '' }}
          </div>
        </div>
      </template>
    </div>
    <div
      v-if="scheInfo.latestReadyTimeDesc"
      class="press-schedule-bottom"
    >
      {{ scheInfo.latestReadyTimeDesc || '' }}
    </div>
  </div>
</template>
<script>
import {
  MIDDLE_BUTTON_STATUS_MAP,
} from './config';
import  { SPECIAL_TEAM_ID_MAP, PREVIEW_STATE_MAP } from '../press-schedule-tree/config';


export default {
  name: 'PressScheduleItem',
  options: {
    virtualHost: true,
  },
  props: {
    // 赛程信息
    scheInfo: {
      type: Object,
      default: () => ({}),
    },
    // 是否选中
    selected: {
      type: Boolean,
      default: false,
    },
    // 是否是管理员
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isPreview: {
      type: Number,
      default: 0,
    },
    scheSubStatusMap: {
      type: Object,
      default: () => ({}),
    },
    myTeamId: {
      type: String,
      default: '',
    },
    // 是否可以展示订阅button，qq环境下不可以
    canShowOrderButton: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['clickScheItem', 'clickScheItemButton'],
  data() {
    return {
      SPECIAL_TEAM_ID_MAP,
      PREVIEW_STATE_MAP,
    };
  },
  computed: {
    // isLeftTeamQuit() {
    //   return this.leftTeam.specState === 'QUIT_RIGHT';
    // },
    // isRightTeamQuit() {
    //   return this.rightTeam.specState === 'QUIT_RIGHT';
    // },
    // isOneTeamLunKong() {
    //   const { scheGroup } = this;
    //   const { specState } = scheGroup?.nodeItem || {};
    //   return specState === 'LUN_KONG';
    // },
    // isOneTeamDaiDing() {
    //   const { scheGroup } = this;
    //   const { specState } = scheGroup?.nodeItem || {};
    //   return specState === 'DAI_DING';
    // },
    realScheStatus() {
      return this.scheGroup.realStatus;
    },
    // latestReadyTimeDesc() {
    //   const {
    //     latest_ready_time: latestReadyTime,
    //   } = this.scheInfo.roundInfo || {};
    //   if (!latestReadyTime) return '';
    //   return timeStampFormat(latestReadyTime, 'M/d hh:mm 截止上场');
    // },
    // readyInfoDesc() {
    //   const {
    //     scheInfo,
    //     scheGroup,
    //   } = this;
    //   return getReadyInfoDesc({
    //     scheGroup,
    //     roundInfo: scheInfo.roundInfo || {},
    //   });
    // },
    // curStartBattleType() {
    //   const {
    //     start_battle_type: startBattleType,
    //   } = this.scheInfo.roundInfo || {};
    //   return startBattleType;
    // },
    // startBattleTypeDesc() {
    //   const { scheInfo } = this;

    //   return getStartBattleTypeDesc(scheInfo.roundInfo);
    // },
    // // 其中一个队伍轮空
    // haveEmptyTeam() {
    //   const { leftTeam, rightTeam } = this;
    //   return leftTeam.teamname === '轮空' || rightTeam.teamname === '轮空';
    // },
    // // 其中一个是待定队伍
    // haveNotEnsureTeam() {
    //   const { leftTeam, rightTeam } = this;
    //   return leftTeam.teamname === '待定' || rightTeam.teamname === '待定';
    // },
    // 最近的battle
    // curBattle() {
    //   const battleList = this?.scheGroup?.nodeItem?.battle_list || [];
    //   if (!battleList.length) {
    //     return;
    //   }
    //   return  battleList[battleList.length - 1];
    // },
    // 最新的battleId
    // latestBattleId() {
    //   if (!this.curBattle) {
    //     return;
    //   }
    //   return this.curBattle.battleid;
    // },
    // 是否是我本人的赛程
    // iamInThisSchedule() {
    //   return this.leftTeam.teamid === this.myTeamId
    //       || this.rightTeam.teamid === this.myTeamId ;
    // },
    scheGroup() {
      return this.scheInfo?.battleList?.[0] || {};
    },
    leftTeam() {
      return this.scheGroup?.teamList?.[0] || {};
    },
    rightTeam() {
      return this.scheGroup?.teamList?.[1] || {};
    },
  },
  mounted() {

  },
  methods: {
    /**
     * 赛前点击：选手进入备战房，非选手进入直播间-预告页面，可订阅比赛
     * 赛中点击：选手进入备战房、非选手进入直播间
     * 赛后点击：进入直播间-回顾页面
     */
    clickScheItem() {
      const { scheInfo, scheGroup, isPreview  } = this;
      if (isPreview) {
        return;
      }

      if (scheInfo.isOneTeamLunKong || scheInfo.isOneTeamDaiDing) {
        return;
      }

      // if (this.isAdmin) {
      this.$emit('clickScheItem', scheGroup.schid, scheGroup, scheInfo);
      // } else {
      //   onClickScheAndJump.call(this);
      // }
    },
    onClickMiddleBtn() {
      const { scheGroup, scheInfo, isPreview } = this;
      if (isPreview) {
        return;
      }

      this.$emit('clickScheItemButton', {
        middleButtonStatus: scheInfo.middleButtonStatus,
        middleButtonStatusMap: MIDDLE_BUTTON_STATUS_MAP,
        scheGroup,
        schePair: this.scheInfo,
        schId: scheGroup.schid,
      });
    },
  },
};

</script>
<style lang="scss" scoped src="./css/item.scss"></style>
