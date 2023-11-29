<template>
  <div :class="[getActClass('personal-box')]">
    <!-- @click.stop="onClickDetail" -->
    <div
      v-if="!showTotalEmpty"
      :class="[getActClass('personal-avatar-box')]"
    >
      <template v-if="personalInfo.head">
        <div
          :class="[getActClass('personal-avatar', {
            'personal-avatar--invite': isInviteJoin
          })]"
        >
          <img v-lazy="personalInfo.base64Head || personalInfo.head">
        </div>
        <div
          v-if="false"
          :class="[getActClass('personal-label-ready')]"
        >
          已准备
        </div>
        <div
          v-if="false"
          :class="[getActClass('personal-label-enter')]"
        >
          已进游戏
        </div>
        <div
          v-if="personalInfo.is_cap"
          :class="[getActClass('personal-status-leader', {
            'personal-status-leader--invite': isInviteJoin
          })]"
        />
        <div
          v-if="gradePic && !isInviteJoin"
          :class="[getActClass('personal-rank-img')]"
        >
          <img :src="gradePic">
          <!-- <img src="https://image-1251917893.file.myqcloud.com/tip-project/apex/apex--rank-trumpcard-icon.png"> -->
          <!-- <img src="https://image-1251917893.file.myqcloud.com/tip-project/apex/apex--rank-stardiamond-icon.png"> -->
          <!-- <img src="https://image-1251917893.file.myqcloud.com/tip-project/apex/apex--rank-silver-icon.png"> -->
        </div>
      </template>
      <div
        v-else-if="showAdd"
        :class="[getActClass('personal-add')]"
        @click.stop="onInviteMember"
      >
        <div :class="[getActClass('icon-people'), 'icon-people', 'iconfont']" />
      </div>
      <div
        v-else
        :class="[getActClass('personal-empty', {
          'personal-empty--invite': isInviteJoin
        })]"
      >
        <div :class="[getActClass('icon-people'), 'icon-people', 'iconfont']" />
      </div>
    </div>
    <div
      v-else
      :class="[getActClass('personal-avatar-box')]"
    >
      <!-- 完全空白，无任何icon的占位 -->
    </div>
    <!-- 个人信息卡片 -->
    <div
      v-if="showDetailCard"
      :class="[getActClass('personal-msg-card')]"
    >
      <p :class="[getActClass('personal-msg-name')]">
        {{ personalInfo.nick }}
      </p>
      <div :class="[getActClass('personal-msg-box')]">
        <img
          v-if="gradePic"
          :class="[getActClass('personal-member-rank')]"
          :src="gradePic"
          alt="段位图标"
        >
        <p :class="[getActClass('personal-member-name')]">
          {{ gradeCnName }}
        </p>
      </div>
      <div :class="[getActClass('personal-more-msg')]">
        <p>
          <span>评分</span>
          <em>{{ seazonScore }}</em>
        </p>
        <p>
          <span>淘汰/被淘汰</span>
          <em>
            {{ kdv }}
          </em>
        </p>
      </div>
    </div>

    <div :class="[getActClass('personal-rank')]">
      <div
        v-if="personalInfo.uid"
        :class="[getActClass('personal-rank-name')]"
      >
        {{ personalInfo.nick }}
      </div>
      <div
        v-else-if="!showTotalEmpty && hasEmptyText"
        :class="[getActClass('personal-rank-name')]"
      >
        {{ emptyText }}
      </div>
    </div>
  </div>
</template>

<script>
import { getActClass } from './utils';


export default {
  name: 'PressPersonInfo',
  components: {
  },
  options: {
    virtualHost: true,
  },
  props: {
    personalInfo: {
      type: Object,
      default: () => ({
        uid: '',
        nick: '',
        head: '',
        game_info: {
          gradePic: '',
          gradeCnName: '',
        },
      }),
    },
    leaderUid: {
      type: String,
      default: '',
    },
    showAdd: {
      type: Boolean,
      default: false,
    },
    showTotalEmpty: {
      type: Boolean,
      default: false,
    },
    hasEmptyText: {
      type: Boolean,
      default: true,
    },
    showDetailUID: {
      type: String,
      default: '',
    },
    isInviteJoin: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'onClickDetail',
    'onInviteMember',
  ],
  data() {
    return {
    };
  },
  computed: {
    showDetailCard() {
      return this.showDetailUID && this.showDetailUID == this.personalInfo.uid;
    },
    gradePic() {
      if (this.personalInfo?.game_info?.base64GradePic) {
        return this.personalInfo.game_info.base64GradePic;
      }
      return this.personalInfo?.game_info?.gradePic || '';
    },
    gradeCnName() {
      return this.personalInfo?.game_info?.gradeCnName || '暂无段位';
    },
    seazonScore() {
      return this.personalInfo.game_info?.seazonScore || 0;
    },
    kdv() {
      if (this.personalInfo.game_info?.kdv) {
        return parseFloat(this.personalInfo.game_info?.kdv).toFixed(2);
      }
      return '0.00';
    },
    emptyText() {
      if (this.showAdd) {
        return  '邀请好友';
      }
      return '等你加入';
    },
  },
  mounted() {
  },
  methods: {
    getActClass,
    onClickDetail() {
      if (this.showDetailCard) { // 如果当前卡片已经展开，则关闭
        this.$emit('onClickDetail', '');
      } else {
        this.$emit('onClickDetail', this.personalInfo.uid);
      }
    },
    onInviteMember() {
      this.$emit('onInviteMember');
    },
  },
};

</script>

<style lang="scss" scoped src="./css/person-info.scss"></style>
