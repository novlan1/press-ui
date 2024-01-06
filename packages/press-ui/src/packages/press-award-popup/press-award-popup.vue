<template>
  <div>
    <div
      v-if="!isHor"
      class="press-award-box"
    >
      <div class="press-award-box__inner">
        <div class="press-award-box__close" />
        <div class="press-award-box__open" />
        <div class="press-award-box__images">
          <img
            v-for="(item,index) in 5"
            :key="item"
            :src="`https://image-1251917893.file.myqcloud.com/box/${index + 1}.png`"
            :class="['press-award-box__img',`img-${index + 1}`]"
          >
        </div>
      </div>
    </div>

    <PressAwardPopupHor
      v-if="isShowPopup && isHor"
      :award-list="awardList"
      :hor-title="horTitle"
      :hor-sub-title="horSubTitle"
      :hor-confirm-text="horConfirmText"
      :hor-cancel-text="horCancelText"
      :hor-desc="horDesc"
      @close="dimissDialog"
      @exchange="onExchange"
    />

    <PressPopup
      v-else-if="isShowPopup && !isHor"
      :is-show="isShowPopup"
      :is-showpopup-close="isShowpopupClose"
      :popup-title="innerTitle"
      @onCancel="dimissDialog"
    >
      <scroll-view
        scroll-y="true"
        class="press-award__wrap"
      >
        <p
          v-if="isGamePrize"
          class="press-award__tip"
        >
          仅展示游戏礼包，其他奖品已发放至<span
            class="press-award__tip__highlight"
            @click.stop="onGoAward"
          >【我的奖品】</span>，请自行兑换。
        </p>
        <PressAwardPopupList :props-check-list="awardList" />
      </scroll-view>

      <div
        v-if="isGamePrize"
        class="press-award__bottom"
      >
        <div class="press-award__roles">
          <p>发放到游戏邮箱：</p>
          <div
            class="press-award__role"
            @click.stop="onShowSwitchRoleDialog"
          >
            <p>{{ curRoleName }}</p>
            <div class="iconfont icon-change" />
          </div>
        </div>
        <div
          class="press-award__button"
          @click.stop="onExchange"
        >
          确认领取
        </div>
      </div>

      <div
        v-else
        class="press-award__bottom"
      >
        <PressButton
          type="e-sport-primary-bg-xl"
          @click.stop="onGoAward"
        >
          查看奖励
        </PressButton>
      </div>
    </PressPopup>

    <!-- 未获得奖励 -->
    <PressDialog
      v-if="tipTitle"
      :can-touch-remove="false"
      :show="isShowTipDialog"
      :title="tipTitle"
      :confirm-text="confirmText"
      :cancel-text="cancelText"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>
<script>
import PressPopup from '../press-popup/press-popup';
import PressDialog from '../press-dialog/press-dialog';
import PressButton from '../press-button/press-button';
import PressAwardPopupList from '../press-award-popup-list/press-award-popup-list';
import PressAwardPopupHor from './press-award-popup-hor';

const DEFAULT_VERT_TITLE = '恭喜获得游戏礼包';


export default {
  name: 'PressAwardPopup',
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
  components: {
    PressPopup,
    PressDialog,
    PressAwardPopupList,
    PressAwardPopupHor,
    PressButton,
  },
  props: {
    title: {
      type: String,
      default: DEFAULT_VERT_TITLE,
    },
    curRoleName: {
      type: String,
      default: '角色名',
    },
    awardList: {
      type: Array,
      default: () => [],
      required: false,
    },
    isGamePrize: {
      type: Boolean,
      default: true,
    },
    tipTitle: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: '',
    },
    isHor: {
      type: Boolean,
      default: false,
    },
    horTitle: {
      type: String,
      default: '恭喜获得',
    },
    horSubTitle: {
      type: String,
      default: '',
    },
    horConfirmText: {
      type: String,
      default: '立即兑换',
    },
    horCancelText: {
      type: String,
      default: '关闭',
    },
    horDesc: {
      type: String,
      default: '本次仅发放游戏礼包（其他奖励请联系办赛方），已发放到「我的奖品」，请在有效期内兑换',
    },
  },
  emits: ['dimissDialog', 'onShowSwitchRoleDialog', 'onExchange', 'onConfirm', 'onCancel', 'onGoAward'],
  data() {
    return {
      isShowpopupClose: true,
      // 是否显示中奖弹窗
      isShowPopup: false,
      // 是否显示未中奖弹窗
      isShowTipDialog: false,
    };
  },
  computed: {
    innerTitle() {
      const { title } = this;
      console.log('title', title, this.isGamePrize);
      if (title === DEFAULT_VERT_TITLE) {
        if (!this.isGamePrize) {
          return '恭喜获得';
        }
      }
      return title;
    },
  },
  mounted() {
    setTimeout(() => {
      // 已中奖或者有奖励
      if (this.awardList.length > 0) {
        this.isShowTipDialog = false;
        this.isShowPopup = true;
      } else { // 未中奖或者没有奖励
        this.isShowPopup = false;
        this.isShowTipDialog = true;
      }
    }, this.isHor ? 0 : 1200);
  },
  methods: {
    dimissDialog() {
      this.$emit('dimissDialog');
      this.isShowPopup = false;
    },
    onShowSwitchRoleDialog() {
      this.$emit('onShowSwitchRoleDialog');
    },
    onExchange() {
      this.$emit('onExchange');
    },
    onConfirm() {
      this.isShowTipDialog = false;
      this.$emit('onConfirm');
    },
    onCancel() {
      this.$emit('onCancel');
    },
    onGoAward() {
      this.$emit('onGoAward');
    },
  },
};

</script>
<style lang="scss" scoped src="./css/index.scss"></style>
