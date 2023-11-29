<template>
  <PressPopup
    :is-show="innerShow"
    :show-title="getPropOrData('showTitle')"
    :close-icon="getPropOrData('closeIcon')"
    :arrow-icon="getPropOrData('arrowIcon')"
    :title="getPropOrData('title')"
    :button="getPropOrData('button')"
    :border-button="getPropOrData('borderButton')"
    :z-index="getPropOrData('zIndex')"
    :popup-class="getPropOrData('popupClass')"
    :close-on-click-overlay="getPropOrData('closeOnClickOverlay')"
    :custom-style="getPropOrData('customStyle')"
    :async-confirm="onAsyncConfirm"
    @confirm="confirm"
    @cancel="cancel"
  >
    <div
      v-for="(item, index) of computedCellList"
      :key="index"
      class="press-popup-cell__item"
      :class="{
        'press-popup-cell__item--switch': item.type === POPUP_CELL_TPE_MAP.SWITCH,
        'press-popup-cell__item--checkbox': item.type === POPUP_CELL_TPE_MAP.CHECKBOX,
        'press-popup-cell__item--button': item.type === POPUP_CELL_TPE_MAP.BUTTON,
      }"
      @click.stop="onClickCell(item, index)"
    >
      <div v-if="item.type === POPUP_CELL_TPE_MAP.BUTTON">
        {{ item.label }}
      </div>

      <template v-else>
        <div
          class="press-popup-cell__label"
        >
          <div class="press-popup-cell__title">
            {{ item.label }}
          </div>
          <div
            v-if="item.description && item.description.length"
            class="press-popup-cell__description-wrap"
          >
            <span
              v-for="(descItem, descIndex) of item.description"
              :key="descItem.uniqueKey"
            >
              <span
                :class="{
                  'press-popup-cell__description': true,
                  'press-popup-cell__description--light': descItem.light
                }"
                @click.stop="onClickDescription(descItem, descIndex, item)"
              >

                {{ descItem.content }}
              </span>
            </span>
          </div>
        </div>

        <div
          class="press-popup-cell__value"
        >
          <PressSwitch
            v-if="item.type === POPUP_CELL_TPE_MAP.SWITCH"
            custom-class="press-switch--e-sport"
            :open="item.open"
            :disabled="item.disabled || false"
            @change="(value) => onSwitchChange(value, index)"
          />

          <div
            v-else-if="item.type === POPUP_CELL_TPE_MAP.TAB"
            class="press-popup-cell__tabs"
          >
            <div
              v-for="(tabItem, tabIndex) in item.tabList"
              :key="tabItem.uniqueKey"
              class="press-popup-cell__tab"
              :class="{
                'press-popup-cell__tab--active': item.active === tabItem.value,
              }"
              @click.stop="onTabChange(item, index, tabItem, tabIndex)"
            >
              {{ tabItem.label }}
            </div>
          </div>

          <div
            v-else-if="item.type === POPUP_CELL_TPE_MAP.CHECKBOX"
            class="press-popup-cell__checkbox"
            :class="{
              'press-popup-cell__checkbox--checked': checkedIndexList.indexOf(index) > -1,
            }"
            @click.stop="onCheckboxChange(item, index)"
          />

          <template v-else>
            {{ item.value }}
            <div
              class="iconfont icon-back"
            />
          </template>
        </div>
      </template>
    </div>

    <div
      v-if="getPropOrData('tip')"
      class="press-popup-cell__tip"
    >
      {{ getPropOrData('tip') }}
    </div>

    <div
      v-if="getPropOrData('bottomButton')"
      class="press-popup-cell__bottom-button"
      @click.stop="onClickBottomButton"
    >
      {{ getPropOrData('bottomButton') }}
    </div>
  </PressPopup>
</template>

<script>
import PressPopup from '../press-popup/press-popup.vue';
import PressSwitch from '../press-switch/press-switch.vue';
import { PRESS_POPUP_CELL_PROPS } from './computed';
import { functionalMixin } from '../mixins/functional';

const POPUP_CELL_TPE_MAP = {
  SWITCH: 'switch',
  CHECKBOX: 'checkbox',
  BUTTON: 'button',
  TAB: 'tab',
  CELL: 'cell',
};

const popupCellProps = {
  ...PRESS_POPUP_CELL_PROPS,
  tip: {
    type: String,
    default: '',
  },
  cellList: {
    type: Array,
    default: () => [],
  },
};
let that;

export default {
  name: 'PressPopupCell',
  options: {
    virtualHost: true,
  },
  components: {
    PressPopup,
    PressSwitch,
  },
  mixins: [functionalMixin(popupCellProps)],
  props: {

  },
  emits: ['click', 'cancel', 'confirm'],
  data() {
    that = this;
    return {
      POPUP_CELL_TPE_MAP,
      checkedIndexList: [],
    };
  },
  computed: {
    computedCellList() {
      const cellList = this.getPropOrData('cellList') || [];
      return cellList.map((cell, cellIndex) => {
        if (typeof cell.description === 'string') {
          return {
            ...cell,
            description: [
              {
                light: false,
                content: cell.description,
                uniqueKey: `${cellIndex}-desc-0`,
              },
            ],
          };
        }
        return {
          ...cell,
          tabList: (cell.tabList || []).map((tab, tabIndex) => ({
            ...tab,
            uniqueKey: `${cellIndex}-tab-${tabIndex}`,
          })),
          description: (cell.description || []).map((desc, descIndex) => ({
            ...desc,
            uniqueKey: `${cellIndex}-desc-${descIndex}`,
          })),
        };
      });
    },
  },
  watch: {
    cellList: {
      handler() {
        this.getCheckedList();
      },
      immediate: true,
      deep: true,
    },
    functionModeData: {
      handler() {
        this.getCheckedList();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    getCheckedList() {
      that = this;
      const cellList = this.getPropOrData('cellList') || [];
      const checkedIndexList = cellList
        .map((item, index) => ({
          ...item,
          index,
        }))
        .filter(item => item.checked)
        .map(item => item.index);

      this.checkedIndexList = checkedIndexList;
    },
    emitClick({
      shouldEmitClick = true,
      item,
      index,
      options = {},
    }) {
      const { click } = item;
      const callbackParam = { item, index, context: this, ...options };
      if (typeof click === 'function') {
        click(callbackParam);
      }
      if (shouldEmitClick) {
        this.$emit('click', callbackParam);
      }
    },
    onTabChange(item, index, tabItem, tabIndex) {
      this.emitClick({
        item,
        index,
        options: {
          tabItem,
          tabIndex,
        },
      });
    },
    onClickDescription(descItem, descIndex) {
      this.emitClick({
        shouldEmitClick: false,
        item: descItem,
        index: descIndex,
        options: {},
      });
    },
    onCheckboxChange(item, index) {
      const checked = this.checkedIndexList.indexOf(index) > -1;
      this.emitClick({
        item,
        index,
        options: {
          value: !checked,
        },
      });
    },
    onSwitchChange(value, index) {
      this.emitClick({
        // 小程序下item.click丢失
        item: this.computedCellList[index],
        index,
        options: {
          value,
        },
      });
    },
    onClickCell(item, index) {
      const { click } = item;
      const { checkedIndexList } = this;
      const callbackParam = { item, index, context: this };
      if (item.type === POPUP_CELL_TPE_MAP.CHECKBOX) {
        const checked = checkedIndexList.indexOf(index) > -1;
        callbackParam.value = checked;
        if (checked) {
          this.checkedIndexList = checkedIndexList.filter(item => item !== index);
        } else {
          this.checkedIndexList = checkedIndexList.concat([index]).sort();
        }
      }
      if (typeof click === 'function') {
        click(callbackParam);
      }
      // 需在父组件关闭，可适应异步关闭情况
      this.$emit('click', callbackParam);
    },
    onClickBottomButton() {
      this.$emit('cancel', { context: this });
      this.promiseCallback('cancel');
    },
    confirm() {
      this.$emit('confirm', { context: this });
      this.promiseCallback('confirm', { checkedIndexList: this.checkedIndexList });
    },
    cancel() {
      this.$emit('cancel', { context: this });
      this.promiseCallback('cancel', { checkedIndexList: this.checkedIndexList });
    },
    onAsyncConfirm() {
      // 小程序中报错，this为undefined
      const asyncConfirm = that.getPropOrData('asyncConfirm');

      if (asyncConfirm) {
        return asyncConfirm({
          checkedIndexList: that.checkedIndexList,
          context: that,
        });
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../common/style/smoba/layout.scss";

.press-popup-cell {
  &__item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding: 0 0.64rem 0 0.32rem;
    padding: 0 0.32rem 0 0.32rem;
    height: 1.12rem;

    &--switch {
      height: 1.56rem;
    }

    &--checkbox {
      // height: 1.73rem;
      height: auto;

      .press-popup-cell__description-wrap {
        font-size: 0.24rem;
        margin-top: 0.08rem;
        line-height: 0.4rem;
        height: 0.4rem;
      }
    }
    &--button {
      justify-content: center;
      font-size: 0.32rem;
      font-weight: 400;
    }
  }

  &__label {
    font-size: $font-l;
    color: $color-black;
    display: flex;
    // align-items: center;
    align-items: flex-start;
    flex-direction: column;
    padding: 0.36rem 0;
  }

  &__title {
    line-height: 0.48rem;
    height: 0.48rem;
  }

  &__description-wrap {
    font-size: $font-xxs;
    color: $color-gray;
    line-height: 0.5rem;
  }

  &__description {
    &--light {
      color: #1181d7;
      margin: 0 0.04rem;
    }
  }

  &__value {
    font-size: $font-s;
    color: $color-gray;
    display: flex;
    align-items: center;
  }

  &__checkbox {
    width: 0.4rem;
    height: 0.4rem;
    background: url(https://image-1251917893.file.myqcloud.com/Esports/new/user/select-new.png)
      no-repeat;
    background-size: 100%;

    &--checked {
      background-image: url(https://image-1251917893.file.myqcloud.com/Esports/new/user/selected-new.png);
    }
  }

  &__tip {
    padding: 0.32rem 0;
    color: #bfc3e1;
    font-size: 0.24rem;
    text-align: center;
    position: relative;
    margin: 0 0.32rem;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 1px;
      background-color: #eef0f6;
      transform: scaleY(0.5);
      transform-origin: 0 0;
    }
  }

  &__tabs {
    display: flex;
    width: 2.76rem;
    padding-bottom: 0 !important;
    padding-top: 0 !important;
    height: 0.52rem;
    background: #dfe2ea;
    border-radius: 0.08rem;
  }

  &__tab {
    width: 1.36rem;
    font-size: 0.2rem;
    font-weight: 400;
    color: #09134e;
    border-radius: 0.04rem;
    height: 0.44rem;
    margin: 0.04rem;

    display: flex;
    align-items: center;
    justify-content: center;

    &--active {
      background: #fff;
    }
  }
  &__bottom-button {
    height: 0.88rem;
    line-height: 0.88rem;
    background: #eef0f6;
    border-radius: 0.08rem;
    font-weight: 400;
    font-size: 0.32rem;
    text-align: center;
    margin: 0.32rem 0.4rem 0.4rem;
  }
}

.icon-back {
  transform: rotate(180deg);
}
</style>
