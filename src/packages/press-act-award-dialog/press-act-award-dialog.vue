<template>
  <div
    v-if="show"
    :class="[getActClass('award'), {
      'press-act--hidden-tip': hideTipStyle,
    }, 'press-act']"
    style="z-index: 90"
    @click="closeDialog"
  >
    <div
      :class="[getActClass('main','main--big')]"
      @click.stop="doNothing"
    >
      <div
        :class="[getActClass('icon--close')]"
        @click="closeDialog"
      />
      <div
        :class="[getActClass('', {
          [getActClass('text--get')]: propsData.type == 'get',
          [getActClass('text--received')]: propsData.type == 'received',
          [getActClass('text--detail')]: propsData.type == 'detail',
        })]"
      >
        {{
          propsData.type == 'get'
            ? '恭喜获得'
            : propsData.type == 'received'
              ? '你已获得'
              : '奖励说明'
        }}
      </div>
      <div :class="[getActClass('content','content--goods')]">
        <div :class="[getActClass('left')]">
          <div :class="[getActClass('bg-get')]">
            <template v-if="!waterList || waterList.length === 0">
              <div
                v-if="water && water.status == 2"
                :class="[getActClass('label--used')]"
              />
              <div
                v-else-if="water && water.status == 6"
                :class="[getActClass('label--overtime')]"
              />
              <div
                v-else-if="
                  propsData.actList &&
                    propsData.actList.length &&
                    propsData.actList[0] &&
                    propsData.actList[0].acquireStatus == 3
                "
                :class="[getActClass('label--got')]"
              />

              <!-- 1、对每日任务类型，用活动数据 -->
              <template v-if="propsData.actList && propsData.actList.length">
                <div
                  v-for="(actInfo, aindex) in propsData.actList.slice(0, 1)"
                  :key="aindex"
                  :class="[getActClass('goods-box')]"
                >
                  <div :class="[getActClass('goods-img')]">
                    <!--label-online 线下
                  label-online 线上
                  label-normal 通用 -->
                    <div
                      :class="[getActClass('', {
                        [getActClass('label--online')]: actInfo.useWay == 1,
                        [getActClass('label--offline')]: actInfo.useWay == 2,
                        [getActClass('label--normal')]:
                          actInfo.useWay != 1 && actInfo.useWay != 2,
                      })]"
                    />
                    <img
                      :src="actInfo.pic"
                      @click.stop="previewImage(actInfo.pic)"
                    >
                  </div>
                  <div :class="[getActClass('goods-detail')]">
                    <div :class="[getActClass('goods-tag')]">
                      {{ actInfo.benefittag }}
                    </div>
                    <div :class="[getActClass('goods-name')]">
                      {{ actInfo.name }}
                    </div>
                    <div
                      v-if="propsData.type != 'detail'"
                      :class="[getActClass('goods-time')]"
                    >
                      {{ actInfo.giftBoxData.expireTime }}
                    </div>
                    <div
                      v-if="propsData.type == 'detail'"
                      :class="[getActClass('goods-task')]"
                    >
                      任务：{{ actInfo.des || ''
                      }}{{ actInfo.processDesc || '' }}
                    </div>
                  </div>
                </div>
              </template>
              <!-- 2、其他的弹窗，用water -->
              <template v-else-if="!!water">
                <div :class="[getActClass('goods-box')]">
                  <div :class="[getActClass('goods-img')]">
                    <img
                      :src="water.goodscfg.goodsicon"
                      @click.stop="previewImage(water.goodscfg.goodsicon)"
                    >
                  </div>
                  <div :class="[getActClass('goods-detail')]">
                    <div :class="[getActClass('goods-tag')]">
                      {{ water.benefitTag }}
                    </div>
                    <div :class="[getActClass('goods-name')]">
                      {{ water.goodscfg.goodsname }}
                    </div>
                    <div
                      v-if="propsData.type != 'detail'"
                      :class="[getActClass('goods-time')]"
                    >
                      兑换有效期至{{ water.displayOverduetime }}
                    </div>
                  </div>
                </div>
              </template>
              <div
                v-if="propsData.btnText && isShowMpButton"
                ref="dialogCopyDhmBtn"
                :data-clipboard-text="propsData.btnCopyText"
                :class="[getActClass('btn--normal-top', {
                  [getActClass('btn--normal-long')]: propsData.btnText.length > 6
                })]"
                @click.stop="clickButton($event)"
              >
                {{ propsData.btnText }}
              </div>
            </template>
            <!-- 多奖励平铺 -->
            <div
              v-else
              :class="[getActClass('goods-list-wrap')]"
            >
              <div :class="[getActClass('goods-list')]">
                <div
                  v-for="(waterItem, index) of waterList"
                  :key="index"
                  :class="[getActClass('goods-item', {
                    [getActClass('goods-item--current')]: waterItem.winningtime === water.winningtime,
                  })]"
                  @click.stop="onGoodItemClick(waterItem, index)"
                >
                  <div
                    v-if="waterItem && waterItem.status == 2"
                    :class="[getActClass('label--used')]"
                  />
                  <div
                    v-else-if="waterItem && waterItem.status == 6"
                    :class="[getActClass('label--overtime')]"
                  />
                  <div
                    v-else-if="
                      (waterItem && waterItem.status == 3) ||
                        (waterItem.actList &&
                          waterItem.actList.length &&
                          waterItem.actList[0] &&
                          waterItem.actList[0].acquireStatus == 3)
                    "
                    :class="[getActClass('label--got')]"
                  />
                  <div :class="[getActClass('goods-box')]">
                    <div :class="[getActClass('goods-img')]">
                      <img :src="waterItem.goodscfg.goodsicon">
                    </div>
                    <div :class="[getActClass('goods-detail')]">
                      <div :class="[getActClass('goods-tag')]">
                        {{ waterItem.benefitTag }}
                      </div>
                      <div :class="[getActClass('goods-name')]">
                        {{ waterItem.goodscfg.goodsname }}
                      </div>
                      <div
                        v-if="
                          propsData.type != 'detail' &&
                            waterItem.displayOverduetime
                        "
                        :class="[getActClass('goods-time')]"
                      >
                        兑换有效期至{{ waterItem.displayOverduetime }}
                      </div>
                    </div>
                    <div
                      v-if="waterItem.winningtime"
                      :class="[getActClass('btn--goods-detail')]"
                      @click.stop="gotoGoodsDetailDesc(waterItem, index)"
                    >
                      查看详情
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="!(waterList && waterList.length > 1)"
              :class="[getActClass('exchange-wrap')]"
            >
              <template v-if="water && water.displayCdKey">
                <div :class="[getActClass('exchange-title','exchange-title--no-border')]">
                  兑换码：
                </div>
                <div :class="[getActClass('exchange-code')]">
                  {{ water.displayCdKey }}
                </div>
              </template>
              <template v-if="!!water && !!water.recvWay">
                <div :class="[getActClass('exchange-title','exchange-title--top-border')]">
                  使用方式：
                  <div
                    v-if="
                      water.displayType == 2 &&
                        water.wechatCard &&
                        water.isBindWechat &&
                        (water.bindNick || water.wxNick)
                    "
                    :class="[getActClass('barcode-bg')]"
                  >
                    奖励{{ water.bindWechatExchange ? '将' : '' }}默认发放至
                    <span>
                      <span :class="[getActClass('name')]">{{
                        !!water.bindNick ? water.bindNick : water.wxNick
                      }}</span>
                      (微信)，<span
                        v-if="water.needBindWechat"
                        :class="[getActClass('link')]"
                        @click="onClickModfy"
                      >修改&gt;</span>
                    </span>
                  </div>
                  <div
                    v-if="water.vipNumber && water.displayType != 1"
                    :class="[getActClass('barcode-bg')]"
                  >
                    {{
                      water.cdkey && water.cdkey.length
                        ? '奖励已发放至'
                        : '奖励默认发放至'
                    }}
                    <span>
                      <span :class="[getActClass('name')]">{{
                        water.showVipNumber || water.showMonifyMobile
                      }}</span>
                      (手机)，<span
                        :class="[getActClass('link')]"
                        @click="onClickModfy"
                      >修改&gt;</span>
                    </span>
                  </div>
                </div>
                <div :class="[getActClass('des-discount')]">
                  <div
                    v-if="
                      (water.displayType == 3 || water.displayType == 4) &&
                        water.cdkey
                    "
                    :class="[getActClass('barcode-bg')]"
                  >
                    <div :class="[getActClass('left')]">
                      <!-- 需要改成竖版条形码 -->
                      <!-- #ifdef H5 -->
                      <PressBarcodeWeb
                        :value="water.cdkey"
                        :height="0.7 * 50"
                        :width="1"
                        :font-size="0.3 * 50"
                        style="transform: rotate(-90deg) translateX(-1.5rem)"
                        format="CODE128"
                      />
                      <!-- #endif -->
                      <!-- #ifndef H5 -->
                      <PressBarcodeMP
                        :value="water.cdkey"
                        :height="0.7 * 50"
                        :width="1"
                        :font-size="0.3 * 50"
                        style="transform: rotate(-90deg) translateX(-1.5rem)"
                        format="CODE128"
                      />
                      <!-- #endif -->

                      <PressBarcode
                        :value="water.cdkey"
                        :height="0.7 * 50"
                        :width="1"
                        :font-size="0.3 * 50"
                        style="transform: rotate(-90deg) translateX(-1.5rem)"
                        format="CODE128"
                      />
                    </div>
                    <div :class="[getActClass('right')]">
                      <!-- #ifdef H5 -->
                      <PressQRCodeWeb :value="water.cdkey" />
                      <!-- #endif -->
                      <!-- #ifndef H5 -->
                      <PressQRCodeMp :value="water.cdkey" />
                      <!-- #endif -->
                    </div>
                  </div>
                  <div
                    style="white-space: pre-wrap; margin-bottom: 0.1rem"
                    v-html="water.recvWay"
                  />
                  <div
                    v-if="water.couponPic"
                    style="
                      white-space: pre-wrap;
                      text-align: center;
                      display: flex;
                      justify-content: center;
                    "
                    v-html="water.couponPic"
                  />
                </div>
              </template>
              <!-- 核销活动 start -->
              <template v-if="extraAct">
                <div :class="[getActClass('exchange-title')]">
                  {{ propsData.extraGiftDesc || '用券返' }}：
                </div>
                <div :class="[getActClass('wx-box','wx-box--cdk')]">
                  <div :class="[getActClass('label')]" />
                  <div :class="[getActClass('wz-detail-wrap')]">
                    <div :class="[getActClass('wz-detail')]">
                      <div :class="[getActClass('wz-limit')]">
                        {{ propsData.limitDate }}
                      </div>
                      <div :class="[getActClass('wz-act-container')]">
                        <div :class="[getActClass('wz-info-box')]">
                          <div :class="[getActClass('wz-image-box')]">
                            <img
                              :src="extraAct.img"
                              :class="[getActClass('wz-image')]"
                              alt=""
                            >
                          </div>
                          <div :class="[getActClass('wz-info-detail')]">
                            <div :class="[getActClass('wz-detail-title')]">
                              {{ extraAct.title }}
                            </div>
                            <div :class="[getActClass('wz-detail-desc')]">
                              {{ extraAct.desc }}
                            </div>
                          </div>
                        </div>
                        <div
                          :class="[getActClass('view-button')]"
                          @click.stop="onClickExtraActBtn(extraAct.link)"
                        >
                          查看活动
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <!-- 核销活动 end -->
              <!-- S 其他：如宝箱 -->
              <template v-else-if="propsData.extraGiftName">
                <div :class="[getActClass('exchange-title')]">
                  {{ propsData.extraGiftDesc || '用券返' }}：
                </div>
                <div
                  v-if="propsData.giftList && propsData.giftList.length > 0"
                  :class="[getActClass('wx-box','wx-box--cdk')]"
                >
                  <div :class="[getActClass('label')]" />
                  <div :class="[getActClass('wz-detail-wrap')]">
                    <div :class="[getActClass('wz-img')]">
                      <img v-lazy="propsData.extraGiftImg">
                    </div>
                    <div :class="[getActClass('wz-detail')]">
                      <div :class="[getActClass('wz-limit')]">
                        {{ propsData.limitDate }}
                      </div>
                      <div :class="[getActClass('wz-tips')]">
                        有机会从宝箱中抽出以下奖励：
                      </div>
                      <div :class="[getActClass('wz-props')]">
                        <div
                          v-for="(gitem, gindex) in propsData.giftList"
                          :key="gindex"
                          :class="[getActClass('item-props')]"
                          @click.stop="showGiftTip(gindex)"
                        >
                          <VanPopover
                            :key="gitem.giftid"
                            :value="showPopoverIndex == gindex"
                            theme="dark"
                            placement="top"
                            trigger="click"
                          >
                            <p :class="[getActClass('gift-popup')]">
                              {{ gitem.giftname }}
                            </p>
                            <template #reference>
                              <img
                                v-lazy="gitem.giftpic"
                                @click.stop="showGiftTip(gindex)"
                              >
                            </template>
                          </VanPopover>
                        </div>
                      </div>
                      <div :class="[getActClass('wz-limit')]">
                        宝箱会发放到‘我的-物品’，请前往抽取奖励哦！
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-else
                  :class="[getActClass('wx-box')]"
                >
                  <div :class="[getActClass('label')]" />
                  <div :class="[getActClass('wz-time')]">
                    {{ propsData.limitDate }}
                  </div>
                  <div :class="[getActClass('wz-detail-wrap')]">
                    <div :class="[getActClass('wz-img')]">
                      <img v-lazy="propsData.extraGiftImg">
                    </div>
                    <div :class="[getActClass('wz-detail')]">
                      <div :class="[getActClass('wz-limit')]">
                        {{ propsData.extraGiftName }}
                      </div>
                      <div :class="[getActClass('wz-tips')]">
                        请在【我的物品】中查看
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <!-- E 其他：如宝箱 -->
              <template v-if="!!water && !!water.useLimit">
                <div :class="[getActClass('exchange-title','exchange-title--top-border')]">
                  使用限制：
                </div>
                <div :class="[getActClass('des-discount')]">
                  {{ water.useLimit }}
                </div>
              </template>
              <template
                v-if="
                  !!water && !!water.goodscfg && !!water.goodscfg.goodsdetail
                "
              >
                <div :class="[getActClass('exchange-title','exchange-title--top-border')]">
                  其他说明：
                </div>
                <div
                  :class="[getActClass('des-discount')]"
                  style="white-space: pre-wrap"
                  v-html="water.goodscfg.goodsdetail"
                />
              </template>
              <template v-if="!!water && !!water.specialStatement">
                <div :class="[getActClass('exchange-title','exchange-title--top-border')]">
                  特别说明：
                </div>
                <div
                  :class="[getActClass('des-discount')]"
                  style="white-space: pre-wrap"
                  v-html="water.specialStatement"
                />
              </template>
            </div>
          </div>
          <div
            v-if="propsData.btnText && isShowMpButton"
            ref="dialogCopyDhmBtn"
            :data-clipboard-text="propsData.btnCopyText"
            :class="[
              getActClass('btn--normal', {
                [getActClass('btn--normal-long')]: propsData.btnText.length > 6
              })
            ]"
            @click.stop="clickButton($event)"
          >
            {{ propsData.btnText }}
          </div>
        </div>
        <div :class="[getActClass('right')]">
          <div :class="[getActClass('flag-bg')]">
            <img
              v-lazy="propsData.shopIcon"
              style="background: white"
            >
          </div>
          <div :class="[getActClass('flag-name')]">
            {{ propsData.shopName }}
          </div>
          <div
            :class="[getActClass('flag-address')]"
            @click.stop="onClickUsedShop"
          >
            {{ propsData.brandacttitle }}
          </div>
          <div
            :class="[getActClass('btn-more')]"
            @click.stop="onClickEnterButton"
          >
            更多福利
          </div>
          <div
            :class="[getActClass('radio-group')]"
            @click.stop="onClickSubButton"
          >
            <div
              :class="[getActClass('radio'), {
                act: issubscribe
              }
              ]"
            />
            {{ subBtnText }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { imagePreview } from '../press-image-preview';
import Popover from '../press-popover-plus/press-popover-plus.vue';
// #ifdef H5
import PressQRCodeWeb from 'vue-qrcode';
import PressBarcodeWeb from 'vue-barcode';
// #endif
// #ifndef H5
import PressQRCodeMp from '../press-q-r-code/press-q-r-code.vue';
import PressBarcodeMP from '../press-barcode/press-barcode';
// #endif
import { getActClass } from './utils';


export default {
  name: 'PressActAwardDialog',
  options: {
    styleIsolation: 'shared',
  },
  components: {
    // #ifdef H5
    PressQRCodeWeb,
    PressBarcodeWeb,
    // #endif

    // #ifndef H5
    PressQRCodeMp,
    PressBarcodeMP,
    // #endif

    VanPopover: Popover,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      required: false,
    },
    issubscribe: {
      type: Boolean,
      default: false,
      required: false,
    },
    subBtnText: {
      type: String,
      default: '',
      required: false,
    },
    isShowMpButton: {
      type: Boolean,
      default: true,
      required: false,
    },
    propsData: {
      type: Object,
      default: () => ({
        brandName: '融创文旅',
        brandicon:
          'https://igame-10037599.cos.ap-shanghai.myqcloud.com/380e4ce1-e731-c8be-eb5e-636f1763446b',
        shopName: '融创文旅',
        shopIcon:
          'https://igame-10037599.cos.ap-shanghai.myqcloud.com/380e4ce1-e731-c8be-eb5e-636f1763446b',
        issubscribe: 1,
        canJump: false,
        brandacttitle: '融创文旅俱乐部小程序可用',
        merchantid: 'tip6008014c934rUu',
        giftImg:
          'https://igame-10037599.cos.ap-shanghai.myqcloud.com/488fca4b-c7ee-e104-ed0d-d2d54917e09d',
        giftName: '免费领取',
        benefitTag: '价值128元免费游玩门票',
        extraGiftImg:
          'http://igame-10037599.image.myqcloud.com/57fe61e7-a117-4449-9067-5324d22134ae',
        extraGiftName: '现金红包',
        limitDate: '2021.09.30前到店兑换上述物品后',
        giftList: [
          {
            giftname: '大乔-猫狗日记永久*1',
            giftpic:
              'https://igame-10037599.cos.ap-shanghai.myqcloud.com/1c560177-7b32-8f59-20ae-0e0e145056cb',
            giftdetail: '大乔-猫狗日记永久*1',
          },
          {
            giftname: '荣耀水晶*1',
            giftpic:
              'https://igame-10037599.cos.ap-shanghai.myqcloud.com/c0923faa-5d5f-b3ca-b38c-bdcc0cdc07b8',
            giftdetail: '荣耀水晶*1',
          },
          {
            giftname: '舞动绿茵7日',
            giftpic:
              'https://igame-10037599.cos.ap-shanghai.myqcloud.com/5945192e-ca4d-4f08-f762-39b8e59fd448',
            giftdetail: '舞动绿茵7日',
          },
          {
            giftname: '圣诞狂欢7日',
            giftpic:
              'https://igame-10037599.cos.ap-shanghai.myqcloud.com/4fed2250-e101-cc7b-945b-12517399349c',
            giftdetail: '圣诞狂欢7日',
          },
          {
            giftname: '大喇叭*1',
            giftpic:
              'https://igame-10037599.cos.ap-shanghai.myqcloud.com/42969be4-d21e-635c-b14b-05cf1b73314d',
            giftdetail: '大喇叭*1',
          },
        ],
        expireTime: '兑换有效期至 2021.09.30',
        actList: [
          {
            pic: 'https://igame-10037599.cos.ap-shanghai.myqcloud.com/488fca4b-c7ee-e104-ed0d-d2d54917e09d',
            name: '免费领取',
            pic2: 'http://igame-10037599.image.myqcloud.com/57fe61e7-a117-4449-9067-5324d22134ae',
            name2: '现金红包',
            benefittag: '价值128元免费游玩门票',
            useWayText: '线上',
            displayAcquireStatus: '去使用',
            displayButtonText: '去使用',
            displayButtonTextStyle: 'secondary',
            reportModule: 'gift_detail',
            giftBoxData: {
              expireTime: '兑换有效期至 2021.09.30',
            },
          },
        ],
        type: 'received',
        btnText: '兑换到账',
      }),
    },
    water: {
      type: Object,
      default: () => ({
        goodscfg: {
          goodsname: '免费领取',
          goodsdetail:
            '&lt;p&gt;1、本券为王者人生用户专享，仅限本人使用，不可转赠或转卖。&lt;br/&gt;2、本券仅可使用一次，以下文旅城任选且仅可选择一个文旅城使用。&lt;br/&gt;3、于融创文旅城票口，出示融创文旅俱乐部会员码核销兑换，即获得该文旅城所包含指定四项票设备游玩门票一张。&lt;br/&gt;4、项目体验时会有身高、体重、年龄、陪同等要求，具体内容请各位游客以园区公示牌及实际开放为准。&lt;br/&gt;5、限当天使用有效，项目可游玩一次，门票不退不改，不挂失、不兑换现金。&lt;br/&gt;6、有效期限：自领取之日，至9月30日内有效（7.10-8.22暑期期间周末不可使用）&lt;/p&gt;&lt;p&gt;7、本券不可用于联营游乐设备。&lt;/p&gt;&lt;p&gt;8、本券使用以当日设备实际开放情况为准。&lt;br/&gt;9、使用时需要到当地融创文旅城售票口出显会员码进行兑换。&lt;br/&gt;适用范围：&lt;br/&gt;重庆融创文旅城&lt;br/&gt;成都融创文旅城&lt;br/&gt;无锡融创文旅城&lt;br/&gt;广州融创文旅城&lt;br/&gt;合肥融创文旅城&lt;br/&gt;南昌融创文旅城&lt;br/&gt;哈尔滨融创文旅城&lt;br/&gt;青岛融创东方影都&lt;/p&gt;',
          goodsicon:
            'https://igame-10037599.cos.ap-shanghai.myqcloud.com/488fca4b-c7ee-e104-ed0d-d2d54917e09d',
          recvway:
            '奖励将会发放到你填写的手机名下的融创会员账户，若你不是会员，将用此手机号为你注册',
        },
        gid: 331,
        status: 4,
        srcname: '商家活动',
      }),
    },
    waterList: {
      type: Array,
      default: () => [],
    },
    useTipClass: {
      type: Boolean,
      default: true,
    },
    hideTipStyle: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showPopoverIndex: -1,
    };
  },
  computed: {
    extraAct() {
      return this.propsData.extraAct || this.water.extraAct || null;
    },
  },
  watch: {},
  methods: {
    clickButton(event) {
      this.$emit('clickButton', event);
    },
    closeDialog() {
      this.$emit('update:show', false);
      this.$emit('clickCloseButton');
    },
    onClickEnterButton() {
      this.$emit('clickEnter');
    },
    onClickSubButton() {
      this.$emit('clickSub');
    },
    previewImage(url) {
      if (!url) {
        return;
      }
      imagePreview({
        images: [url],
        closeable: true,
        showIndex: false,
        zIndex: 100,
      });
    },
    showGiftTip(index) {
      this.showPopoverIndex = index;
      setTimeout(() => {
        this.showPopoverIndex = -1;
      }, 2000);
    },
    onClickModfy() {
      this.$emit('clickModfy');
    },
    // onClickBtn() {
    //   this.$emit('clickBtn');
    // },
    onClickUsedShop() {
      this.$emit('clickUsedShop');
    },
    doNothing() {},
    onClickExtraActBtn(url) {
      this.$emit('clickExtraAct', url);
    },
    onGoodItemClick(waterItem, index) {
      this.$emit('clickGoodItem', waterItem, index);
    },
    gotoGoodsDetailDesc(waterItem, index) {
      this.$emit('gotoGoodsDetailDesc', waterItem, index);
    },
    getActClass(...args) {
      return getActClass(this.useTipClass, args);
    },
  },
};
</script>

<style scoped lang="scss">
// body:not(.press-act-award-dialog--hidden) {
//   @import "./css/pvp.scss";
// }
</style>
<style scoped lang="scss" src="@TIP_STYLE_NAME"></style>
<style scoped lang="scss" src="./css/base.scss"></style>

<style scoped lang="scss">
.gift-tip-popup,
.press__gift-popup {
  color: #fcfcfc;
  font-size: 0.18rem;
  padding: 0.1rem;

  // 暂时用下面的方法保证宽度不太小
  // text-align: center;
  // min-width: 80px;
  // max-width: 200px;
  white-space: nowrap;
}
</style>
