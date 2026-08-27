<template>
  <div class="demo-wrap demo-wrap--gray">
    <demo-block
      :title="t('basicUsage')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <PressCellGroup>
        <PressCell
          :title="t('cell')"
          :value="t('content')"
        />
        <PressCell
          :title="t('cell')"
          :value="t('content')"
          :label="t('desc')"
          :border="false"
        />
      </PressCellGroup>
    </demo-block>

    <demo-block
      :title="t('insetGrouped')"
      :section-style="sectionStyle"
      :header-style="headerStyle"
    >
      <PressCellGroup inset>
        <PressCell
          :title="t('cell')"
          :value="t('content')"
        />
        <PressCell
          :title="t('cell')"
          :value="t('content')"
          :label="t('desc')"
        />
      </PressCellGroup>
    </demo-block>

    <demo-block
      :title="t('largeSize')"
      :section-style="sectionStyle"
      :header-style="headerStyle"
    >
      <PressCell
        :title="t('cell')"
        :value="t('content')"
        size="large"
      />
      <PressCell
        :title="t('cell')"
        :value="t('content')"
        size="large"
        :label="t('desc')"
      />
    </demo-block>

    <demo-block
      :title="t('showIcon')"
      :section-style="sectionStyle"
      :header-style="headerStyle"
    >
      <PressCell
        :title="t('cell')"
        icon="location-o"
      />
    </demo-block>

    <demo-block
      :title="t('showArrow')"
      :section-style="sectionStyle"
      :header-style="headerStyle"
    >
      <PressCell
        :title="t('cell')"
        is-link
      />
      <PressCell
        :title="t('cell')"
        :value="t('content')"
        is-link
      />
      <PressCell
        :title="t('cell')"
        :value="t('content')"
        is-link
        arrow-direction="down"
      />
    </demo-block>

    <demo-block
      :title="t('router')"
      :section-style="sectionStyle"
      :header-style="headerStyle"
    >
      <PressCell
        is-link
        :title="t('cell')"
        link-type="navigateTo"
        url="/pages/press/col/col"
      />
    </demo-block>

    <demo-block
      :title="t('groupTitle')"
      :section-style="sectionStyle"
      :header-style="headerStyle"
    >
      <PressCellGroup :title="`${t('group')}1`">
        <PressCell
          :title="t('cell')"
          :value="t('content')"
        />
      </PressCellGroup>
      <PressCellGroup :title="`${t('group')}2`">
        <PressCell
          :title="t('cell')"
          :value="t('content')"
        />
      </PressCellGroup>
    </demo-block>

    <demo-block
      :title="t('useSlots')"
      :section-style="sectionStyle"
      :header-style="headerStyle"
    >
      <PressCell
        :value="t('content')"
        is-link
        :use-title-slot="true"
      >
        <template #title>
          <span class="press-cell-text">
            {{ t('cell') }}
          </span>
          <PressTag type="danger">
            {{ t('tag') }}
          </PressTag>
        </template>
      </PressCell>
      <PressCell
        :title="t('cell')"
        icon="shop-o"
      >
        <template #right-icon>
          <PressIcon
            name="search"
            class="custom-icon"
          />
        </template>
      </PressCell>
    </demo-block>

    <demo-block
      :title="t('verticalCenter')"
      :section-style="sectionStyle"
      :header-style="headerStyle"
    >
      <PressCell
        center
        :title="t('cell')"
        :value="t('content')"
        :label="t('desc')"
      />
    </demo-block>

    <demo-block
      title="E-SPORT"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <div class="demo--e-sport-wrap">
        <PressCell
          :title="t('matchMode')"
          :value="t('knockout')"
          type="e-sport"
          is-link
          :border="false"
        />
        <PressCell
          :title="t('wayToWin')"
          :value="t('defaultBo1')"
          type="e-sport"
          is-link
          :border="false"
        />
        <PressCell
          :title="t('allowModifyAvatar')"
          :border="false"
          type="e-sport"
        >
          <template #right-icon>
            <PressSwitch
              custom-class="press-switch--e-sport"
              :checked="switchChecked[1]"
              @change="val=>onChangeSwitch(val, 1)"
            />
          </template>
        </PressCell>

        <PressCell
          :title="t('getPhoneNumber')"
          :label="t('getPhoneNumberDesc')"
          type="e-sport"
          center
          :border="false"
        >
          <template #right-icon>
            <PressSwitch
              custom-class="press-switch--e-sport"
              :checked="switchChecked[2]"
              @change="val=>onChangeSwitch(val, 2)"
            />
          </template>
        </PressCell>
      </div>
    </demo-block>
  </div>
</template>
<script>
import PressCellGroup from 'press-ui/press-cell-group/press-cell-group.vue';
import PressCell from 'press-ui/press-cell/press-cell.vue';
import PressIcon from 'press-ui/press-icon/press-icon.vue';

import PressSwitch from 'press-ui/press-switch/press-switch.vue';
import PressTag from 'press-ui/press-tag/press-tag.vue';


export default {
  i18n: {
    'zh-CN': {
      cell: '单元格',
      valueOnly: '只设置 value',
      showIcon: '展示图标',
      showArrow: '展示箭头',
      largeSize: '单元格大小',
      group: '分组',
      groupTitle: '分组标题',
      router: '页面跳转',
      urlRoute: 'URL 跳转',
      vueRoute: '路由跳转',
      useSlots: '使用插槽',
      insetGrouped: '卡片风格',
      verticalCenter: '垂直居中',

      matchMode: '比赛模式',
      knockout: '淘汰赛',
      defaultBo1: '默认一局胜负',
      allowModifyAvatar: '允许比赛中修改队名队徽',
      getPhoneNumber: '获取参赛者手机号码',
      getPhoneNumberDesc: '便于发放奖励和联系参赛者，可在队员信息中查看',
    },
    'en-US': {
      cell: 'Cell title',
      valueOnly: 'Value only',
      showIcon: 'Left Icon',
      showArrow: 'Link',
      largeSize: 'Size',
      group: 'Group',
      groupTitle: 'Group Title',
      router: 'Router',
      urlRoute: 'URL',
      vueRoute: 'Vue Router',
      useSlots: 'Use Slots',
      insetGrouped: 'Inset Grouped',
      verticalCenter: 'Vertical center',

      matchMode: 'Match Mode',
      knockout: 'Knockout',
      defaultBo1: 'Default Bo1',
      allowModifyAvatar: 'Allow modification of team info',
      getPhoneNumber: 'Obtain player\'s phone number',
      getPhoneNumberDesc: 'Distribute rewards and contact participants',
    },
  },
  components: {
    PressSwitch,
    PressCell,
    PressCellGroup,
    PressTag,
    PressIcon,
  },
  data() {
    return {
      sectionStyle: 'margin: 0;background: #f7f8fa;',
      headerStyle: 'background: #f7f8fa;',
      switchChecked: {
        1: false,
        2: false,
      },
    };
  },
  methods: {
    onChangeSwitch(value, number) {
      this.switchChecked[number] = value;
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  .press-cell-text {
    margin-right: 4px;
    vertical-align: middle;
  }
}
</style>
