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
import { getVirtualHostOptions } from '../common/component-handler/press-component';
import { functionalMixin } from '../mixins/functional';
import PressPopup from '../press-popup/press-popup.vue';
import PressSwitch from '../press-switch/press-switch.vue';

import { PRESS_POPUP_CELL_PROPS } from './computed';


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
    ...getVirtualHostOptions(true, false),
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

<style lang="scss" scoped src="./css/index.scss">
</style>
