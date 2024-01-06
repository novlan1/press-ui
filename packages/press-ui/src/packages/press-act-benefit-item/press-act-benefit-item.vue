<template>
  <div
    :class="[getActClass('benefit'), {
      'press-act--hidden-tip': hideTipStyle,
    }, 'press-act']"
  >
    <!-- 商家信息 -->
    <div
      v-if="mercInfo"
      v-treport="actshowcolumn.treport"
      :class="[getActClass('top')]"
      @click.stop="onClickMerc"
    >
      <img
        v-if="mercInfo.icon"
        :src="mercInfo.icon"
        :class="[getActClass('shop-icon')]"
      >
      <div :class="[getActClass('shop-name')]">
        {{ mercInfo.name }}
      </div>
      <div
        v-if="showDistance"
        :class="[getActClass('shop-desc')]"
      >
        {{ actshowcolumn.custom_info || '' }}
      </div>
    </div>
    <!-- 福利信息 -->
    <div
      v-for="(actshow, actshowIndex) in actshowcolumn.actshowlist"
      :key="actshow.merc_task_info.task_info.taskid"
      :class="[getActClass('main')]"
      @click.stop="onClickGiftDetail({ actshow, actshowIndex, index })"
    >
      <div
        v-treport="actshow.treport"
        :class="[getActClass('goods-img')]"
      >
        <img :src="actshow.merc_task_info.task_info.condition[0].gift.picurl">
      </div>
      <div :class="[getActClass('info')]">
        <div :class="[getActClass('goods-name')]">
          {{ actshow.merc_task_info.task_info.condition[0].gift.name }}
        </div>
        <div :class="[getActClass('goods-desc')]">
          {{ actshow.merc_task_info.task_info.condition[0].gift.benefittag }}
        </div>
        <div
          v-if="
            actshow.merc_task_info.task_info.condition[1] &&
              actshow.merc_task_info.task_info.condition[1].gift.name
          "
          :class="[getActClass('tip-line')]"
        >
          <div :class="[getActClass('tip-wrap')]">
            <div :class="[getActClass('tip')]">
              {{
                actshow.merc_task_info.task_info.condition[1].gift
                  .cyc_introduct || '用券后返'
              }}
              <em>{{
                actshow.merc_task_info.task_info.condition[1].gift.name
              }}</em>
            </div>
            <img
              v-if="actshow.merc_task_info.task_info.condition[1].gift.picurl"
              :src="actshow.merc_task_info.task_info.condition[1].gift.picurl"
            >
          </div>
        </div>
      </div>
      <div :class="[getActClass('buttons')]">
        <div
          v-if="actshow.merc_task_info.task_info.condition[0].desc"
          :class="[getActClass('process')]"
        >
          {{ actshow.merc_task_info.task_info.condition[0].desc }}
        </div>
        <div
          :class="[getActClass('', {
            [getActClass('benefit-btn')]: actshow.merc_task_info.acquire_status === 1,
            [getActClass('benefit-btn--use')]: actshow.merc_task_info.acquire_status === 3,
            [getActClass('benefit-btn--out')]: actshow.merc_task_info.acquire_status === 2,
          })]"
          @click.stop="onClickGetTaskReward({ actshow, actshowIndex, index })"
        >
          <template v-if="actshow.merc_task_info.acquire_status === 3">
            去使用
          </template>
          <template v-else-if="actshow.merc_task_info.acquire_status === 2">
            已领完
          </template>
          <template v-else>
            领取
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getActClass } from './utils';


// actshowcolumn 完全依照后端结构
// 仅需参考
export default {
  name: 'PressActBenefitItem',
  options: {
    styleIsolation: 'shared',
  },
  props: {
    index: {
      type: Number,
      default: -1,
    },
    actshowcolumn: {
      type: Object,
      default: () => ({
        treport: [],
        custom_info: '线上',
        brandinfo: {
          brandid: 'b1650877400',
          brandName: '胡十二铺',
          brandicon:
            'https://igame-10037599.cos.ap-shanghai.myqcloud.com/62c81775-5fff-d8b7-2d49-efe02a970d2a',
          mercNum: 2,
          brand_typeid: '1566963789',
        },
        actshowlist: [
          {
            treport: [],
            merchantid: 'tip626663ea3a3xKu',
            act_id: '1693469993',
            batch_id: '1693469987',
            brand_id: 'b1650877400',
            merc_task_info: {
              task_info: {
                merchantid: 'tip626663ea3a3xKu',
                taskid: 1693469987,
                condition: [
                  {
                    gift: {
                      name: '手机号（高校）不勾选',
                      picurl:
                        'https://igame-10037599.cos.ap-shanghai.myqcloud.com/f36e0416-0731-8beb-452a-c1b97a12947d.png',
                      giftid: 1693469920,
                      expiretime: 1696089599,
                      benefittag: '满20减10',
                      goods_list: [
                        {
                          goods_id: 1693469921,
                          goods_type: 26,
                          overduetime: 1696089599,
                          goodsname: '手机号（高校）不勾选',
                          benefit_tag: '满20减10',
                          goodsicon:
                            'https://igame-10037599.cos.ap-shanghai.myqcloud.com/f36e0416-0731-8beb-452a-c1b97a12947d.png',
                        },
                      ],
                    },
                  },
                  {
                    gift: {
                      name: '自选福利宝箱',
                      picurl:
                        'https://igame-10037599.cos.ap-shanghai.myqcloud.com/c391cb4c-02c8-23f8-7e22-e7d3ae660c09.png',
                      giftid: 1798734202,
                      is_bonus: 1,
                      expiretime: 1697385600,
                      goods_list: [
                        {
                          goods_id: 1798734200,
                          goods_type: 31,
                          overduetime: 1697385600,
                          goodsname: '自选福利宝箱',
                          goodsicon:
                            'https://igame-10037599.cos.ap-shanghai.myqcloud.com/efb4a797-da7c-1baf-be67-b3563b80f499.png',
                        },
                      ],
                    },
                  },
                ],
              },
              acquire_status: 1,
              brandactid: '1693469987',
            },
            act_cornermark:
              '{"type":"college","custom":{"is_phone_number":false,"giftTagOptions":[{"item_id":"college","item_name":"高校券"},{"item_id":"college_age","item_name":"高校年龄认证券"}]}}',
          },
        ],
        is_open_rmd: 1,
      }),
    },
    showDistance: {
      type: Boolean,
      default: true,
    },
    // 该组件没有引入 @TIP_STYLE_NAME,
    // 所以一定是外链，之前的类名需要保留
    useTipClass: {
      type: Boolean,
      default: true,
    },
    hideTipStyle: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    mercInfo() {
      const { brandinfo, mercinfo } = this.actshowcolumn;
      if (brandinfo) {
        return {
          icon: brandinfo.brandicon,
          name: brandinfo.brandName,
        };
      }
      if (mercinfo) {
        return {
          icon: mercinfo.merclogo,
          name: mercinfo.storename,
        };
      }
      return null;
    },
  },
  methods: {
    onClickGiftDetail(...args) {
      this.$emit('clickGiftDetail', ...args);
    },
    onClickGetTaskReward(...args) {
      this.$emit('clickGetTaskReward', ...args);
    },
    onClickMerc() {
      this.$emit('clickMerc');
    },
    getActClass(...args) {
      return getActClass(this.useTipClass, args);
    },
  },
};
</script>
<style scoped lang="scss">
// body:not(.press-act-benefit-item--hidden) {
//   @import "./css/pvp.scss";
// }
</style>
<style scoped lang="scss" src="./css/base.scss"></style>
