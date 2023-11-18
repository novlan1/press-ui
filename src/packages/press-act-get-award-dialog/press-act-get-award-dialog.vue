<template>
  <div
    v-if="show"
    :class="[{
      'press-act--hidden-tip': hideTipStyle,
    }, 'press-act']"
  >
    <div
      v-if="waters && waters.length"
      :class="[getActClass('cover')]"
    >
      <div :class="[getActClass('full-page','full-page--portrait')]">
        <div
          :class="[getActClass('content','content--received')]"
        >
          <div
            v-for="item in waters"
            :key="item.goodsid"
            :class="[getActClass('center')]"
          >
            <div :class="[getActClass('center-item')]">
              <img :src="item.goodscfg.goodsicon">
              <div :class="[getActClass('base-info')]">
                <p :class="[getActClass('goods-name')]">
                  {{ item.goodscfg.goodsname }}
                </p>
                <p
                  v-if="item.goodscfg.extra && item.goodscfg.extra.benefit_tag"
                  :class="[getActClass('goods-desc')]"
                >
                  {{ item.goodscfg.extra.benefit_tag }}
                </p>
              </div>
            </div>
          </div>
          <div :class="[getActClass('button-wrap')]">
            <a
              :class="[getActClass('btn--sure','btn--medium-secondary')]"
              @click="closeDialog"
            >{{ propsData.cancelBtnText || '关闭' }}</a>
            <a
              :class="[getActClass('btn--cancel','btn--large-primary')]"
              @click.stop="onClickExchangeButton"
            >{{ propsData.exchangeButtonText || '查看奖励' }}</a>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="computedPropsData.receivedDialog"
      :class="[getActClass('cover')]"
    >
      <div :class="[getActClass('received-box')]">
        <p :class="[getActClass('received-title')]">
          {{
            computedPropsData.getStatus === 'received' ? '你已领取' : '恭喜获得'
          }}
        </p>
        <div :class="[getActClass('received-content')]">
          <div
            :class="[
              getActClass('received-name', {
                [getActClass('received-status')]:
                  computedPropsData.extraGiftName,
              })]"
          >
            <img
              :src="computedPropsData.giftImg"
              :class="[getActClass('received-img')]"
            >
            <div :class="[getActClass('tip-wrap')]">
              <p :class="[getActClass('tip-name')]">
                {{ computedPropsData.giftName
                }}{{ computedPropsData.giftDiscount }}
              </p>
              <p>
                请在有效期<span v-if="computedPropsData.giftExpiredDate">（{{
                  computedPropsData.giftExpiredDate }}）</span>内兑换并使用
              </p>
            </div>
          </div>
          <div :class="[getActClass('button-box')]">
            <a
              :class="[getActClass('btn--large-primary')]"
              @click.stop="onClickExchangeButton"
            >{{ propsData.exchangeButtonText || '立即兑换' }}</a>
            <a
              :class="[getActClass('btn--large-secondary')]"
              @click="closeDialog"
            >{{
              propsData.cancelBtnText || '确定'
            }}</a>
          </div>
          <p
            v-if="computedPropsData.extraGiftName"
            :class="[getActClass('stay-out')]"
          >
            待发放
          </p>
          <div v-if="computedPropsData.extraGiftName">
            {{ computedPropsData.extraGiftDesc || '用券后返' }}
            <span :class="[getActClass('height-line')]">{{
              `"${computedPropsData.extraGiftName}"`
            }}</span>
            ，先到先得
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      :class="[getActClass('cover')]"
    >
      <div :class="[getActClass('full-page','full-page--portrait')]">
        <div
          :class="[getActClass('content', {
            [getActClass('content--get')]:
              computedPropsData.getStatus === 'get',
            [getActClass('content--received')]:
              computedPropsData.getStatus === 'received',
          })]"
        >
          <div :class="[getActClass('center')]">
            <div :class="[getActClass('center-item')]">
              <img :src="computedPropsData.giftImg">
              <div :class="[getActClass('base-info')]">
                <p :class="[getActClass('goods-name')]">
                  {{ computedPropsData.giftName
                  }}{{ computedPropsData.giftDiscount }}
                </p>
                <p :class="[getActClass('goods-desc')]">
                  请在有效期<span v-if="computedPropsData.giftExpiredDate">
                    （{{ computedPropsData.giftExpiredDate }}）</span>内兑换并使用
                </p>
              </div>
            </div>
            <p
              v-if="computedPropsData.extraGiftName"
              :class="[getActClass('stay-out-new')]"
            >
              待发放
            </p>
            <div
              v-if="computedPropsData.extraGiftName"
              :class="[getActClass('tips')]"
            >
              {{ computedPropsData.extraGiftDesc || '用券后返'
              }}<span>{{ `"${computedPropsData.extraGiftName}"` }}</span>，先到先得
            </div>
          </div>
          <div :class="[getActClass('button-wrap')]">
            <a
              :class="[getActClass('btn--sure','btn--medium-secondary')]"
              @click="closeDialog"
            >{{ propsData.cancelBtnText || '关闭' }}</a>
            <a
              :class="[getActClass('btn--cancel','btn--large-primary')]"
              @click.stop="onClickExchangeButton"
            >{{ propsData.exchangeButtonText || '立即兑换' }}</a>
          </div>
          <div
            v-if="showSubscribe"
            :class="[getActClass('sub-wrap')]"
          >
            <input
              id="checkBox"
              :checked="willSubscribe"
              type="checkbox"
              :class="[getActClass('sub')]"
              @input="updateSubscribe"
            >
            <label for="checkBox">订阅该商户福利</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHideBaseStyleMixin } from '../mixins/act/hide-base-style';
import { getActClass } from './utils';


export default {
  name: 'PressActGetAwardDialog',
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
  mixins: [getHideBaseStyleMixin()],
  props: {
    show: {
      type: Boolean,
      default: false,
      required: false,
    },
    showSubscribe: {
      type: Boolean,
      default: false,
      required: false,
    },
    willSubscribe: {
      type: Boolean,
      default: false,
      required: false,
    },
    propsData: {
      type: Object,
      default: () => ({
        getStatus: 'received', // 可选get/received
        giftImg:
          'https://image-1251917893.file.myqcloud.com/2020/a20200414privilege_peacegame/gunAnddress/dress-2.png',
        giftName: '汉堡王皇堡套餐',
        giftDiscount: '立减十元券',
        giftExpiredDate: '2020-06-25',
        extraGiftImg:
          'https://igame-10037599.cos.ap-shanghai.myqcloud.com/71776940-0bda-df4f-e4d4-3c3738caec80',
        extraGiftName: '88元红包空投',
        receivedDialog: false,
      }),
    },
    water: {
      type: Object,
      default: () => ({}),
    },
    waters: {
      type: Array,
      default: () => [],
    },
    useTipClass: {
      type: Boolean,
      default: false,
    },
    hideTipStyle: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedPropsData() {
      if (this.water?.goodscfg) {
        const tempPropsData = {
          getStatus: 'get',
          giftImg: this.water.goodscfg.goodsicon,
          giftName: this.water.goodscfg.goodsname,
          giftDiscount: this.water.goodscfg.extra.benefit_tag,
          giftExpiredDate: this.water.overduetime,
        };
        return tempPropsData;
      }
      return this.propsData;
    },
  },
  mounted() {},
  methods: {
    closeDialog() {
      this.$emit('clickCloseButton');
      this.$emit('update:show', false);
    },
    onClickExchangeButton() {
      this.$emit('clickExchangeButton');
    },
    updateSubscribe(e) {
      this.$emit('update:willSubscribe', e.target.checked);
    },
    getActClass(...args) {
      return getActClass(this.useTipClass, args);
    },
  },
};
</script>
<style scoped lang="scss">
// body:not(.press-act-get-award-dialog--hidden) {
//   /* #ifdef H5 */
//   @import "./css/pvp.scss";
//   /* #endif */

//   /* #ifndef H5 */
//   @import "./css/smoba-vertical.scss";
//   /* #endif */
// }
</style>
<style scoped lang="scss" src="@TIP_STYLE_NAME"></style>
<style scoped lang="scss" src="./css/base.scss"></style>
