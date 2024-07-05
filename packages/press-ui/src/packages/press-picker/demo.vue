<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
    >
      <press-cell
        :title="t('basicUsage')"
        is-link
        @click="onShowPicker('normal')"
      />
      <press-cell
        :title="t('topTip')"
        is-link
        @click="onShowPicker('tip')"
      />
      <press-cell
        :title="t('longList')"
        is-link
        @click="onShowPicker('long')"
      />
      <press-cell
        :title="t('horizontal')"
        is-link
        @click="onShowPicker('horizontal')"
      />
    </demo-block>

    <demo-block
      :title="t('functional')"
    >
      <press-cell
        :title="t('check')"
        is-link
        @click="onShowFunctionalPicker"
      />
    </demo-block>

    <press-picker
      v-if="curPicker.show"
      :title="curPicker.title"
      :show-back-arrow="curPicker.showBackArrow"
      :list="curPicker.selectList"
      :tip="curPicker.tip"
      :current="curPicker.selectItem"
      :horizontal="curPicker.horizontal"
      :virtual-list-threshold="30"
      @onClickConfirm="curPicker.onClickConfirm"
      @onRemove="curPicker.onRemove"
    />

    <press-picker
      :id="PRESS_PICKER_ID"
      :ref="PRESS_PICKER_ID"
      mode="functional"
    />
  </div>
</template>
<script>
import PressPicker from 'press-ui/press-picker/press-picker.vue';
import PressCell from 'press-ui/press-cell/press-cell.vue';
import { showFunctionalComponent } from 'press-ui/common/functional-component/index';


const PRESS_PICKER_ID = 'press-picker-functional';


export default {
  i18n: {
    'zh-CN': {
      topTip: '顶部提示',
      longList: '超长列表',
      functional: '函数式调用',
      horizontal: '横版',
      tipContent: '创建比赛后，可按比赛轮次精确设置。',
      addVirtualTeam: '添加虚拟队伍',
      addTeam: num => `添加${num}队`,
    },
    'en-US': {
      topTip: 'Top Tips',
      longList: 'Super Long List',
      functional: 'Functional Mode',
      horizontal: 'Horizontal',
      tipContent: 'Can be set precisely according to the round of the game',
      addVirtualTeam: 'Add Virtual Team',
      addTeam: num => `Add ${num} Teams`,
    },
  },
  options: {
    styleIsolation: 'shared',
  },
  components: {
    PressPicker,
    PressCell,
  },
  data() {
    const PICKER_BO_LIST = [
      { label: this.t('bo1'), value: 1 },
      { label: this.t('bo3'), value: 3 },
      { label: this.t('bo5'), value: 5 },
      { label: this.t('bo7'), value: 7 },
      { label: this.t('bo9'), value: 9 },
    ];
    const longList = Array.from({ length: 8000 }).map((item, index) => ({
      label: this.t('addTeam', index + 1),
      value: index + 1,
    }));

    const commonOptions = {
      onClickConfirm: (boItem) => {
        this.onSuccessTip(boItem);
        this.curPicker.show = false;

        if (this.pickerOption[this.curType]) {
          this.pickerOption[this.curType].selectItem = { value: boItem.value };
        }
      },
      onRemove: () => {
        this.onTip('cancel');
        this.curPicker.show = false;
      },
    };

    return {
      customStyle: 'padding:0;',
      PICKER_BO_LIST,
      pickerOption: {
        normal: {
          title: this.t('wayToWin'),
          tip: '',
          selectList: PICKER_BO_LIST,
          selectItem: { label: PICKER_BO_LIST[3].label, value: 7 },
          horizontal: false,
        },
        tip: {
          title: this.t('wayToWin'),
          tip: this.t('tipContent'),
          selectList: PICKER_BO_LIST,
          selectItem: { label: PICKER_BO_LIST[1].label, value: 3 },
          horizontal: false,
        },
        long: {
          title: this.t('addVirtualTeam'),
          tip: '',
          selectList: longList,
          selectItem: { value: 1 },
          horizontal: false,
        },
        horizontal: {
          title: this.t('wayToWin'),
          tip: '',
          selectList: PICKER_BO_LIST,
          selectItem: { label: PICKER_BO_LIST[3].label, value: 7 },
          horizontal: true,
        },
      },
      PRESS_PICKER_ID,
      pressPickerFunctionalData: {},
      curPicker: {
        ...commonOptions,
      },
      curType: '',
    };
  },
  computed: {
  },
  methods: {
    onShowPicker(type) {
      this.onGHideToast();
      this.curType = type;
      this.curPicker = {
        ...this.curPicker,
        ...this.pickerOption[type],
        show: true,
      };
    },
    onConfirm() {
    },
    onTip(title) {
      this.onGTip(title);
    },
    onSuccessTip(item) {
      const { label, value } = item;
      this.curPicker.show = false;
      this.onTip(`value: ${value}, label: ${label}`);
    },
    onShowFunctionalPicker() {
      const { PICKER_BO_LIST } = this;
      showFunctionalComponent.call(this, {
        context: this,
        selector: `#${PRESS_PICKER_ID}`,
        list: PICKER_BO_LIST,
        arrowIcon: true,
        current: { label: PICKER_BO_LIST[1].label, value: 3 },
        title: this.t('wayToWin'),
        tip: this.t('tipContent'),
      }).then(({ item }) => {
        this.onSuccessTip(item);
      })
        .catch(() => {
          this.onTip('cancel');
        });
    },
  },
};
</script>
