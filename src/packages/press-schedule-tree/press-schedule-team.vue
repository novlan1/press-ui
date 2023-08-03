<template>
  <div
    class="press-schedule-team"
  >
    <!-- 队伍 -->
    <div
      :class="{
        'press-schedule-team-main': true,
        'press-schedule-team-main--selected': selectedSchId && selectedSchId == scheGroupInfo.schid
      }"
      @click.stop="onClickSche"
    >
      <!-- 队伍 蓝方 -->
      <div
        :class="{'press-schedule-team-one--lose':
                   [i18nMap.emptyTeam, i18nMap.pending].includes(upTeamInfo.teamname)
                   || bottomTeamInfo.isWinner == 1
                   || upTeamInfo.scoreDesc === i18nMap.quitScore,
                 'press-schedule-team-one--active':
                   (selectedTeamId && selectedTeamId == upTeamInfo.teamid)
                   || upTeamInfo.teamid == myTeamId
        }"
        class="press-schedule-team-one--up press-schedule-team-one"
      >
        <!-- 头像 -->
        <div
          v-if="upTeamInfo.teamAvatarSkeleton"
          class="press-schedule-team-avatar-preview"
        />
        <img
          v-else-if="upTeamInfo.teamAvatar"
          v-lazy="upTeamInfo.teamAvatar"
          class="press-schedule-team-avatar"
        >

        <div
          v-if="upTeamInfo.teamNameSkeleton"
          class="press-schedule-team-name-preview"
        />
        <div
          v-else-if="upTeamInfo.teamNameDesc"
          class="press-schedule-team-name"
        >
          {{ upTeamInfo.teamNameDesc }}
        </div>

        <!-- 比分 -->
        <p
          v-if="upTeamInfo.scoreDesc"
          class="press-schedule-team-score"
        >
          {{ upTeamInfo.scoreDesc }}
        </p>
      </div>

      <!-- 队伍 红方 -->
      <div
        :class="{'press-schedule-team-one--lose':
                   [i18nMap.emptyTeam, i18nMap.pending].includes(bottomTeamInfo.teamname)
                   || upTeamInfo.isWinner == 1
                   || bottomTeamInfo.scoreDesc === i18nMap.quitScore,
                 'press-schedule-team-one--active':
                   (selectedTeamId && selectedTeamId == bottomTeamInfo.teamid)
                   || bottomTeamInfo.teamid == myTeamId
        }"
        class="press-schedule-team-one--down press-schedule-team-one"
      >
        <!-- 头像 -->
        <div
          v-if="bottomTeamInfo.teamAvatarSkeleton"
          class="press-schedule-team-avatar-preview"
        />
        <img
          v-else-if="bottomTeamInfo.teamAvatar"
          v-lazy="bottomTeamInfo.teamAvatar"
          class="press-schedule-team-avatar"
        >

        <div
          v-if="bottomTeamInfo.teamNameSkeleton"
          class="press-schedule-team-name-preview"
        />
        <div
          v-else-if="bottomTeamInfo.teamNameDesc"
          class="press-schedule-team-name"
        >
          {{ bottomTeamInfo.teamNameDesc }}
        </div>

        <!-- 比分 -->
        <p
          v-if="bottomTeamInfo.scoreDesc"
          class="press-schedule-team-score"
        >
          {{ bottomTeamInfo.scoreDesc }}
        </p>
      </div>
    </div>

    <!-- 赛事信息 -->
    <div
      class="press-schedule-team-tips"
    >
      <!-- 编号 -->
      <p
        v-if="scheGroupInfo.bracketIdDesc"
        class="press-schedule-team-tip press-schedule-team-tip--bg"
      >
        {{ scheGroupInfo.bracketIdDesc }}
      </p>
      <p
        v-if="scheGroupInfo.timeDesc"
        class="press-schedule-team-tip"
      >
        {{ scheGroupInfo.timeDesc }}
      </p>
      <p
        v-if="scheGroupInfo.statusDesc"
        class="press-schedule-team-tip"
        :class="{
          'press-schedule-team-tip--light': scheGroupInfo.isStatusHighList
        }"
      >
        {{ scheGroupInfo.statusDesc }}
      </p>
      <div
        v-if="scheGroupInfo.showLiveIcon"
        class="press-schedule-team-tip-icon press-schedule-team-tip-icon--green iconfont icon-live"
        @click.stop="onWatchBattle"
      />
      <div
        v-if="scheGroupInfo.showChannelsIcon"
        class="press-schedule-team-tip-icon iconfont icon-video-number"
      />
    </div>
  </div>
</template>
<script>
import { t } from '../locale';


export default {
  name: 'PressScheduleTeam',
  props: {
    scheGroupInfo: {
      type: Object,
      default: () => ({}),
    },
    selectedSchId: {
      type: String,
      default: '',
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
    // 没用到的参数，后面删掉
    selectedTeamId: {
      type: String,
      default: '',
    },
    // scheduleInfo: {
    //   type: Object,
    //   default: () => ({}),
    // },
    // 是否是上面的两支战队，默认是
    // isUpTwoTeam: {
    //   type: Boolean,
    //   default: true,
    // },
    // childId: {
    //   type: Number,
    //   default: 0,
    // },
  },
  data() {
    return {
      i18nMap: {
        pending: t('scheduleTree.pending'),
        emptyTeam: t('scheduleTree.emptyTeam'),
        quitScore: t('scheduleTree.quitScore'),
      },
    };
  },
  computed: {
    upTeamInfo() {
      return this.scheGroupInfo.upTeamInfo || {};
    },
    bottomTeamInfo() {
      return this.scheGroupInfo.downTeamInfo || {};
    },
  },
  mounted() {
  },
  methods: {
    onClickSche() {
      this.$emit('clickSche', this.scheGroupInfo.schid, this.scheGroupInfo);
      // if (this.isPreview) return;

      // const { scheGroupInfo } = this;
      // const { specState } = scheGroupInfo?.nodeItem || {};
      // const isLunKongOrDaiDing = ['LUN_KONG', 'DAI_DING'].indexOf(specState) > -1;


      // if (this.isAdmin) {
      //   if (isLunKongOrDaiDing) {
      //     onClickScheAndJump.call(this);
      //   } else {
      //   }
      // } else {
      //   // 弃权不能跳转
      //   if (this.bottomTeamInfo.score == '弃' || this.upTeamInfo.score === '弃') {
      //     return;
      //   }

      //   onClickScheAndJump.call(this);
      // }
    },
    onWatchBattle() {
      this.$emit('clickVideoIcon', this.scheGroupInfo.schid, this.scheGroupInfo);
      // if (this.isPreview) return;

      // // 有视频号，跳视频号
      // if (this.scheGroupInfo.isWeChatLiving) {
      //   openLiveAccount(this.scheGroupInfo.liveInfo?.finder_username);
      //   return;
      // }

      // this.$router.push({ path: `/room/${this.childId}/${this.scheGroupInfo.schid}/` });
    },
  },
};
</script>
<style lang="scss" scoped src="./css/team.scss"></style>
<style lang="scss" scoped src="./css/team-one.scss"></style>
