<template>
  <div>
    <demo-block
      :title="t('basicUsage')"
    >
      <PressButton
        type="e-sport-primary"
        :custom-style="`${customStyle};padding:0;`"
        @click="onShowPicker('normal')"
      >
        {{ t('check') }}
      </PressButton>
    </demo-block>

    <demo-block
      :title="t('topTip')"
    >
      <PressButton
        type="e-sport-primary"
        :custom-style="`${customStyle};padding:0;`"
        @click="onShowPicker('tip')"
      >
        {{ t('check') }}
      </PressButton>
    </demo-block>

    <demo-block
      :title="t('longList')"
    >
      <PressButton
        type="e-sport-primary"
        :custom-style="`${customStyle};padding:0;`"
        @click="onShowPicker('long')"
      >
        {{ t('check') }}
      </PressButton>
    </demo-block>

    <press-picker
      v-if="pickerOption.normal.show"
      :title="pickerOption.normal.title"
      :show-back-arrow="pickerOption.normal.showBackArrow"
      :select-list="pickerOption.normal.selectList"
      :tip="pickerOption.normal.tip"
      :select-item="pickerOption.normal.selectItem"
      @onClickConfirm="pickerOption.normal.onClickConfirm"
      @onRemove="pickerOption.normal.onRemove"
    />
    <press-picker
      v-if="pickerOption.tip.show"
      :title="pickerOption.tip.title"
      :show-back-arrow="pickerOption.tip.showBackArrow"
      :select-list="pickerOption.tip.selectList"
      :tip="pickerOption.tip.tip"
      :select-item="pickerOption.tip.selectItem"
      @onClickConfirm="pickerOption.tip.onClickConfirm"
      @onRemove="pickerOption.tip.onRemove"
    />
    <press-picker
      v-if="pickerOption.long.show"
      :title="pickerOption.long.title"
      :show-back-arrow="pickerOption.long.showBackArrow"
      :select-list="pickerOption.long.selectList"
      :tip="pickerOption.long.tip"
      :select-item="pickerOption.long.selectItem"
      @onClickConfirm="pickerOption.long.onClickConfirm"
      @onRemove="pickerOption.long.onRemove"
    />
  </div>
</template>
<script>


export default {
  i18n: {
    'zh-CN': {
      topTip: '顶部提示',
      longList: '超长列表',
      banSet: 'Ban位设置',
      tipContent: '创建比赛后，可按比赛轮次精确设置。',
      addVirtualTeam: '添加虚拟队伍',
      addTeam: num => `添加${num}队`,
    },
    'en-US': {
      topTip: 'Top Tips',
      longList: 'Super Long List',
      banSet: 'Ban Set',
      tipContent: 'Can be set precisely according to the round of the game',
      addVirtualTeam: 'Add Virtual Team',
      addTeam: num => `Add ${num} Teams`,
    },
  },
  data() {
    const pickerBoList = [
      { label: this.t('bo1'), value: 1 },
      { label: this.t('bo3'), value: 3 },
      { label: this.t('bo5'), value: 5 },
      { label: this.t('bo7'), value: 7 },
    ];
    const boStrList = [
      '',
      this.t('bo1'),
      '',
      this.t('bo3'),
      '',
      this.t('bo5'),
      '',
      this.t('bo7'),
    ];
    const bpList = [
      { label: this.t('ban0'), value: 1 },
      { label: this.t('ban2'), value: 3 },
      { label: this.t('ban3'), value: 4 },
      { label: this.t('ban4'), value: 0 },
    ];
    const longList = Array.from({ length: 800 }).map((item, index) => ({
      label: this.t('addTeam', index + 1),
      value: index + 1,
    }));


    return {
      customStyle: '',
      pickerOption: {
        normal: {
          show: false,
          title: this.t('wayToWin'),
          tip: '',
          showBackArrow: false,
          selectList: pickerBoList,
          selectItem: { label: boStrList[7], value: 7 },
          onClickConfirm: (boItem) => {
            console.log('boItem', boItem);
            this.pickerOption.normal.show = false;
          },
          onRemove: () => {
            this.pickerOption.normal.show = false;
          },
        },
        tip: {
          show: false,
          title: this.t('banSet'),
          tip: this.t('tipContent'),
          showBackArrow: false,
          selectList: bpList,
          selectItem: { label: bpList[0].label, value: 1 },
          onClickConfirm: (boItem) => {
            console.log('boItem', boItem);
            this.pickerOption.tip.show = false;
          },
          onRemove: () => {
            this.pickerOption.tip.show = false;
          },
        },
        long: {
          show: false,
          title: this.t('addVirtualTeam'),
          tip: '',
          showBackArrow: false,
          selectList: longList,
          selectItem: { label: longList[0].label, value: 1 },
          onClickConfirm: (boItem) => {
            console.log('boItem', boItem);
            this.pickerOption.long.show = false;
          },
          onRemove: () => {
            this.pickerOption.long.show = false;
          },
        },
      },
      selectBoOptions: {

      },
    };
  },
  methods: {
    onShowPicker(type) {
      console.log('onShowPicker.type', type);
      if (this.pickerOption[type]) {
        this.pickerOption[type].show = true;
      }
    },
    onConfirm(...args) {
      console.log('onConfirm.args', args);
      this.pickerOption[args[1]].show = false;
    },
    onChange(...args) {
      console.log('onChange.args', args);
    },
  },
};
</script>
