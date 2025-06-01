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
      <PressCellGroup>
        <PressCell
          :title="t('title')"
          clickable
          @click="onChange(!checkedMap.cell, 'cell')"
        >
          <template #right-icon>
            <PressSwitch
              size="22px"
              :checked="checkedMap.cell"
              @change="onChange(!checkedMap.cell, 'cell')"
            />
          </template>
        </PressCell>
      </PressCellGroup>
    </demo-block>

    <!-- #ifndef H5 -->
    <PressDialog
      id="press-dialog"
      ref="press-dialog"
    />
    <!-- #endif -->
  </div>
</template>
<script>
import PressCellGroup from 'press-ui/press-cell-group/press-cell-group.vue';
import PressCell from 'press-ui/press-cell/press-cell.vue';
import { showConfirmDialog } from 'press-ui/press-dialog';

import PressDialog from 'press-ui/press-dialog/press-dialog.vue';
import PressSwitch from 'press-ui/press-switch/press-switch.vue';


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
        showConfirmDialog({
          context: this,
          title: this.t('title'),
          message: this.t('message'),
        }).then(() => {
          this.checkedMap.async = value;
        })
          .catch(() => {});
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

