<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <PressSwitch
        :checked="checkedMap.basic"
        @change="value=>onChange(value, 'basic')"
      />
    </demo-block>

    <demo-block :title="t('disabled')">
      <PressSwitch
        :checked="checkedMap.basic"
        disabled
        @click="onClick"
        @change="value=>onChange(value, 'basic')"
      />
    </demo-block>

    <demo-block :title="t('loadingStatus')">
      <PressSwitch
        :checked="checkedMap.basic"
        loading
        @change="value=>onChange(value, 'basic')"
      />
    </demo-block>

    <demo-block :title="t('customSize')">
      <PressSwitch
        :checked="checkedMap.size"
        size="24px"
        @change="value=>onChange(value, 'size')"
      />
    </demo-block>

    <demo-block :title="t('customColor')">
      <PressSwitch
        :checked="checkedMap.color"
        active-color="#07c160"
        inactive-color="#ee0a24"
        @change="value=>onChange(value, 'color')"
      />
    </demo-block>


    <demo-block :title="t('asyncControl')">
      <PressSwitch
        :checked="checkedMap.async"
        @change="value=>onChange(value, 'async')"
      />
    </demo-block>

    <demo-block title="E-SPORT">
      <PressSwitch
        custom-class="press-switch--e-sport"
        :open="isOpen"
        @onSwitchChange="onSwitchChange"
      />
    </demo-block>

    <demo-block :title="t('withCell')">
      <press-cell-group>
        <press-cell
          :title="t('title')"
          clickable
          @click="onChange(!checkedMap.cell, 'cell')"
        >
          <template #right-icon>
            <press-switch
              size="22px"
              :checked="checkedMap.cell"
              @change="onChange(!checkedMap.cell, 'cell')"
            />
          </template>
        </press-cell>
      </press-cell-group>
    </demo-block>

    <!-- #ifndef H5 -->
    <PressDialog
      id="tip-match-comm-tips-dialog"
      ref="tip-match-comm-tips-dialog"
    />
    <!-- #endif -->
  </div>
</template>
<script>
import PressSwitch from 'src/packages/press-switch/press-switch.vue';
import PressDialog from 'src/packages/press-dialog/press-dialog.vue';
import PressDialogHandler from 'src/packages/press-dialog';
import PressCell from 'src/packages/press-cell/press-cell.vue';
import PressCellGroup from 'src/packages/press-cell-group/press-cell-group.vue';


export default {
  i18n: {
    'zh-CN': {
      title: '标题',
      confirm: '提醒',
      message: '是否切换开关？',
      withCell: '搭配单元格使用',
      customSize: '自定义大小',
      customColor: '自定义颜色',
      asyncControl: '异步控制',
    },
    'en-US': {
      title: 'Title',
      confirm: 'Confirm',
      message: 'Are you sure to toggle switch?',
      withCell: 'Inside a Cell',
      customSize: 'Custom Size',
      customColor: 'Custom Color',
      asyncControl: 'Async Control',
    },
  },

  components: {
    PressSwitch,
    PressDialog,
    PressCell,
    PressCellGroup,
  },
  data() {
    return {
      isOpen: true,
      checkedMap: {
        basic: true,
        color: true,
        size: true,
        async: true,
        cell: true,
      },
    };
  },
  methods: {
    onSwitchChange() {
      this.isOpen = !this.isOpen;
    },
    onChange(value, type) {
      console.log('[value]', value, type);

      if (type === 'async') {
        PressDialogHandler.show({
          context: this,
          title: this.t('title'),
          content: this.t('message'),
          confirmText: this.t('confirm'),
          cancelText: this.t('cancel'),
        }).then(() => {
          this.checkedMap.async = value;
        });
        return;
      }
      this.checkedMap[type] = value;
    },
    onClick() {
      this.onGTip('[click]');
    },
  },
};
</script>

<style scoped lang="scss">
</style>

