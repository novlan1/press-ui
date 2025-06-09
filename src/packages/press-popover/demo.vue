<template>
  <div class="demo-wrap demo-wrap--gray">
    <!-- #ifdef H5 -->
    <PressCell
      :title="t('useGetContainer')"
      clickable
      @click="() => useGetContainer = !useGetContainer"
    >
      <template #right-icon>
        <PressSwitch
          size="22px"
          :checked="useGetContainer"
          @change="() => useGetContainer = !useGetContainer"
        />
      </template>
    </PressCell>
    <!-- #endif -->

    <demo-block
      :title="t('basicUsage')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <PressPopover
        v-model="show.lightTheme"
        trigger="click"
        :actions="t('actions')"
        placement="bottom-start"
        custom-style="margin-left: 16px;"
        :get-container="getContainer"
        @select="onSelect"
        @open="onOpen"
        @opened="onOpened"
        @close="onClose"
        @closed="onClosed"
      >
        <template #reference>
          <PressButton
            type="primary"
            @click="show.lightTheme = !show.lightTheme"
          >
            {{ t('lightTheme') }}
          </PressButton>
        </template>
      </PressPopover>

      <PressPopover
        v-model="show.darkTheme"
        trigger="click"
        theme="dark"
        :actions="t('actions')"
        :get-container="getContainer"
        placement="bottom-start"
        custom-style="z-index: 1;margin-left: 16px;"
        @select="onSelect"
      >
        <template #reference>
          <PressButton
            type="primary"
            @click="show.darkTheme = !show.darkTheme"
          >
            {{ t('darkTheme') }}
          </PressButton>
        </template>
      </PressPopover>
    </demo-block>

    <demo-block
      :title="t('placement')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <PressCell
        is-link
        :title="t('choosePlacement')"
        @click="showPicker = true;"
      />

      <PressPopup
        :show="showPicker"
        round
        position="bottom"
        get-container="body"
        :close-on-click-overlay="true"
        @close="showPicker = false"
      >
        <div class="demo-popover-box">
          <PressPopover
            v-model="show.placement"
            theme="dark"
            trigger="click"
            :z-index="1000"
            :get-container="getContainer"
            :actions="t('shortActions')"
            :placement="currentPlacement"
            @select="onSelect"
          >
            <template #reference>
              <div class="demo-popover-refer" />
            </template>
          </PressPopover>
        </div>
        <PressPicker
          :columns="placements"
          @change="onPickerChange"
        />
      </PressPopup>
    </demo-block>

    <demo-block
      :title="t('actionOptions')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <PressPopover
        v-model="show.showIcon"
        trigger="click"
        :actions="t('actionsWithIcon')"
        :get-container="getContainer"
        placement="bottom-start"
        custom-style="z-index: 2;margin-left: 16px;"
        :z-index="1000"
        @select="onSelect"
      >
        <template #reference>
          <PressButton
            type="primary"
            @click="show.showIcon = !show.showIcon"
          >
            {{ t('showIcon') }}
          </PressButton>
        </template>
      </PressPopover>

      <PressPopover
        v-model="show.disableAction"
        trigger="click"
        :get-container="getContainer"
        :actions="t('actionsDisabled')"
        custom-style="z-index: 2;margin-left: 16px;"
        @select="onSelect"
      >
        <template #reference>
          <PressButton
            type="primary"
            @click="show.disableAction = !show.disableAction"
          >
            {{ t('disableAction') }}
          </PressButton>
        </template>
      </PressPopover>
    </demo-block>

    <demo-block
      :title="t('customContent')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <PressPopover
        v-model="show.customContent"
        trigger="click"
        placement="bottom-start"
        :get-container="getContainer"
        custom-style="z-index: 1;margin-left: 16px;"
        @select="onSelect"
      >
        <template #default>
          <!-- <press-grid
            square
            clickable
            :border="false"
            :column-num="3"
            custom-style="width: 240px;"
          >
            <press-grid-item
              v-for="i in 6"
              :key="i"
              icon="photo-o"
              :text="t('option')"
              @click="show.customContent = false"
            />
          </press-grid> -->
          <PressGrid
            :column-num="3"
            custom-style="width: 240px;"
          >
            <PressGridItem
              v-for="(item,index) of 6"
              :key="index"
              icon="photo-o"
              :text="t('option')"
            />
          </PressGrid>
        </template>
        <template #reference>
          <PressButton
            type="primary"
            @click="show.customContent = !show.customContent"
          >
            {{ t('customContent') }}
          </PressButton>
        </template>
      </PressPopover>
    </demo-block>

    <div
      v-if="show.lightTheme
        || show.darkTheme
        || show.showIcon
        || show.customContent
        || show.disableAction
      "
      class="demo-overlay"
      @click.stop="closeAllPopover"
    />
  </div>
</template>
<script>
import PressButton from 'press-ui/press-button/press-button.vue';
import PressCell from 'press-ui/press-cell/press-cell.vue';

import PressGridItem from 'press-ui/press-grid-item/press-grid-item.vue';
import PressGrid from 'press-ui/press-grid/press-grid.vue';

import PressPicker from 'press-ui/press-picker/press-picker.vue';
import PressPopover from 'press-ui/press-popover/press-popover.vue';
import PressPopup from 'press-ui/press-popup/press-popup.vue';
import PressSwitch from 'press-ui/press-switch/press-switch.vue';


export default {
  i18n: {
    'zh-CN': {
      actions: [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }],
      shortActions: [{ text: '选项一' }, { text: '选项二' }],
      actionsWithIcon: [
        { text: '选项一', icon: 'add-o' },
        { text: '选项二', icon: 'music-o' },
        { text: '选项三', icon: 'more-o' },
      ],
      actionsDisabled: [
        { text: '选项一', disabled: true },
        { text: '选项二', disabled: true },
        { text: '选项三' },
      ],
      showIcon: '展示图标',
      placement: '弹出位置',
      darkTheme: '深色风格',
      lightTheme: '浅色风格',
      showPopover: '点击弹出气泡',
      actionOptions: '选项配置',
      customContent: '自定义内容',
      disableAction: '禁用选项',
      choosePlacement: '选择弹出位置',
      useGetContainer: '是否使用 getContainer',
    },
    'en-US': {
      actions: [
        { text: 'Option 1' },
        { text: 'Option 2' },
        { text: 'Option 3' },
      ],
      shortActions: [{ text: 'Option 1' }, { text: 'Option 2' }],
      actionsWithIcon: [
        { text: 'Option 1', icon: 'add-o' },
        { text: 'Option 2', icon: 'music-o' },
        { text: 'Option 3', icon: 'more-o' },
      ],
      actionsDisabled: [
        { text: 'Option 1', disabled: true },
        { text: 'Option 2', disabled: true },
        { text: 'Option 3' },
      ],
      showIcon: 'Show Icon',
      placement: 'Placement',
      darkTheme: 'Dark Theme',
      lightTheme: 'Light Theme',
      showPopover: 'Show Popover',
      actionOptions: 'Action Options',
      customContent: 'Custom Content',
      disableAction: 'Disable Action',
      choosePlacement: 'Placement',
      useGetContainer: 'Use GetContainer',
    },
  },
  components: {
    PressPopover,
    PressButton,
    PressPicker,
    PressPopup,
    PressCell,
    PressGridItem,
    PressGrid,
    PressSwitch,
  },
  data() {
    return {
      show: {
        lightTheme: false,
        darkTheme: false,
        placement: false,
        showIcon: false,
        disableAction: false,
        customContent: false,
      },
      showPicker: false,
      currentPlacement: 'top',
      placements: [
        'top',
        'top-start',
        'top-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
      ],
      headerStyle: 'background: #f7f8fa;',
      sectionStyle: 'background: #f7f8fa;margin: 0 0 6px;padding: 0;',

      useGetContainer: false,
    };
  },
  computed: {
    getContainer() {
      return this.useGetContainer ? 'body' : '';
    },
  },
  methods: {
    onPickerChange({ value, index }) {
      console.log('[onPickerChange]', value, index);
      setTimeout(() => {
        this.show.placement = true;
        this.currentPlacement = value;
      });
    },
    onSelect(action) {
      console.log('[onSelect]', action);
      this.onGTip(action.text);
    },
    onOpen() {
      console.log('onOpen');
    },
    onClose() {
      console.log('onClose');
    },
    onOpened() {
      console.log('onOpened');
    },
    onClosed() {
      console.log('onClosed');
    },
    closeAllPopover() {
      Object.keys(this.show).forEach((key) => {
        this.show[key] = false;
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import "press-ui/common/style/press/var.scss";

.demo-popover {
  &-refer {
    width: 60px;
    height: 60px;
    background-color: $blue;
    border-radius: 8px;
  }

  &-box {
    display: flex;
    justify-content: center;
    margin: 110px 0;
  }
}

.demo-overlay {
  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
}
</style>
