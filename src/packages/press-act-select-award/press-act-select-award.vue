<template>
  <div
    v-show="show"
    :class="[
      getActClass('cover'), {
        'press-act--hidden-tip': hideTipStyle,
      }, 'press-act']"
  >
    <div :class="[getActClass('dialog','dialog--select')]">
      <a
        :class="[getActClass('close')]"
        @click="closeDialog"
      />
      <p :class="[getActClass('title','title--select')]">
        选择奖励
      </p>

      <div :class="[getActClass('content')]">
        <div :class="[getActClass('award-list')]">
          <div
            v-for="(item, index) in list"
            :key="index"
            :class="[getActClass('award-item', {
              [getActClass('award-item--active')]: clickIndexFooter == index
            })]"
            @click="clickHandle(index)"
          >
            <div :class="[getActClass('left')]">
              <div :class="[getActClass('box')]">
                <img
                  :src="item.giftpic"
                  :class="[getActClass('image')]"
                >
              </div>
              <!-- 竖版显示样式，横版版隐藏 -->
              <div :class="[getActClass('info-wrap')]">
                <div :class="[getActClass('name')]">
                  {{ item.giftname }}
                </div>
                <div
                  v-if="item.leftGiftTips"
                  :class="[getActClass('tip')]"
                >
                  {{ item.leftGiftTips }}
                </div>
              </div>
            </div>
            <div :class="[getActClass('right')]">
              <div :class="[getActClass('select-button')]">
                radio
              </div>
            </div>
            <!-- 横版显示样式，竖版隐藏 -->
            <div :class="[getActClass('bottom')]">
              <div :class="[getActClass('name')]">
                {{ item.giftname }}
              </div>
              <div
                v-if="item.leftGiftTips"
                :class="[getActClass('tip')]"
              >
                {{ item.leftGiftTips }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :class="[getActClass('buttons')]">
        <a
          :class="[getActClass('btn--close')]"
          @click="closeDialog"
        >
          下次再选
        </a>
        <a
          v-if="clickIndexFooter < list.length
            && list[clickIndexFooter]
            && list[clickIndexFooter].leftGiftCount > 0"
          :class="[getActClass('btn','btn--maxlarge-primary')]"
          @click.stop="clickButton"
        >确认</a>
        <!-- 选中物品库存为 0 时，按钮置灰 -->
        <a
          v-else
          :class="[getActClass('btn','btn--maxlarge-primary','btn--disabled')]"
        >确认</a>
      </div>
    </div>
  </div>
</template>
<script>
import { getActClass } from './utils';


export default {
  name: 'PressActSelectAward',
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      required: false,
    },
    list: {
      type: Array,
      default() {
        return [];
      },
      required: true,
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
  emits: [
    'clickButton',
    'clickCloseButton',
    'update:show',
  ],
  data() {
    return {
      clickIndexFooter: 0,
    };
  },
  methods: {
    closeDialog() {
      this.$emit('update:show', false);
      this.$emit('clickCloseButton');
    },
    clickButton() {
      this.$emit('update:show', false);
      this.$emit('clickButton', this.list[this.clickIndexFooter]);
    },
    // 点击选中物品显示高亮边框和奖励名称, 第一个物品默认选中
    clickHandle(index) {
      if (this.clickIndexFooter === index) {
        this.clickIndexFooter = null;
      } else {
        this.clickIndexFooter = index;
      }
    },
    getActClass(...args) {
      return getActClass(this.useTipClass, args);
    },
  },
};
</script>

<style scoped lang="scss" src="@TIP_STYLE_NAME">
</style>
<style scoped lang="scss" src="./css/base.scss"></style>
