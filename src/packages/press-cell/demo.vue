<template>
  <div class="demo-wrap demo-wrap--gap demo-wrap--gray">
    <demo-block
      :title="t('basicUsage')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <press-cell-group>
        <press-cell
          :title="t('cell')"
          :value="t('content')"
        />
        <press-cell
          :title="t('cell')"
          :value="t('content')"
          :label="t('desc')"
          :border="false"
        />
      </press-cell-group>
    </demo-block>

    <demo-block
      :title="t('insetGrouped')"
      :section-style="sectionStyle"
      :header-style="headerStyle"
    >
      <press-cell-group inset>
        <press-cell
          :title="t('cell')"
          :value="t('content')"
        />
        <press-cell
          :title="t('cell')"
          :value="t('content')"
          :label="t('desc')"
        />
      </press-cell-group>
    </demo-block>

    <demo-block
      :title="t('largeSize')"
      :section-style="sectionStyle"
      :header-style="headerStyle"
    >
      <press-cell
        :title="t('cell')"
        :value="t('content')"
        size="large"
      />
      <press-cell
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
      <press-cell
        :title="t('cell')"
        icon="location-o"
      />
    </demo-block>

    <demo-block
      :title="t('showArrow')"
      :section-style="sectionStyle"
      :header-style="headerStyle"
    >
      <press-cell
        :title="t('cell')"
        is-link
      />
      <press-cell
        :title="t('cell')"
        :value="t('content')"
        is-link
      />
      <press-cell
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
      <press-cell
        is-link
        :title="t('cell')"
        link-type="navigateTo"
        url="/pages/index/index"
      />
    </demo-block>

    <demo-block
      :title="t('groupTitle')"
      :section-style="sectionStyle"
      :header-style="headerStyle"
    >
      <press-cell-group :title="`${t('group')}1`">
        <press-cell
          :title="t('cell')"
          :value="t('content')"
        />
      </press-cell-group>
      <press-cell-group :title="`${t('group')}2`">
        <press-cell
          :title="t('cell')"
          :value="t('content')"
        />
      </press-cell-group>
    </demo-block>

    <demo-block
      :title="t('useSlots')"
      :section-style="sectionStyle"
      :header-style="headerStyle"
    >
      <press-cell
        :value="t('content')"
        is-link
        :use-title-slot="true"
      >
        <template slot="title">
          <span class="press-cell-text">
            {{ t('cell') }}
          </span>
          <press-tag type="danger">
            {{ t('tag') }}
          </press-tag>
        </template>
      </press-cell>
      <press-cell
        :title="t('cell')"
        icon="shop-o"
      >
        <press-icon-plus
          slot="right-icon"
          name="search"
          class="custom-icon"
        />
      </press-cell>
    </demo-block>

    <demo-block
      :title="t('verticalCenter')"
      :section-style="sectionStyle"
      :header-style="headerStyle"
    >
      <press-cell
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
        <press-cell
          :title="t('matchMode')"
          :value="t('knockout')"
          is-link
          :border="false"
        />
        <press-cell
          :title="t('wayToWin')"
          :value="t('defaultBo1')"
          is-link
          :border="false"
        />
        <press-cell
          :title="t('allowModifyAvatar')"
          :border="false"
        >
          <press-switch
            slot="right-icon"
            custom-class="press-switch--e-sport"
            :checked="switchChecked[1]"
            @change="val=>onChangeSwitch(val, 1)"
          />
        </press-cell>

        <press-cell
          :title="t('getPhoneNumber')"
          :label="t('getPhoneNumberDesc')"
          center
          :border="false"
        >
          <press-switch
            slot="right-icon"
            custom-class="press-switch--e-sport"
            :checked="switchChecked[2]"
            @change="val=>onChangeSwitch(val, 2)"
          />
        </press-cell>
      </div>
    </demo-block>
  </div>
</template>
<script>
import PressSwitch from 'src/packages/press-switch/press-switch.vue';

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
<style lang="scss">
.demo--e-sport-wrap {
  --cell-background-color: rgba(255, 255, 255, 0.85);
  --cell-active-color: #f5f6fa;
  --cell-height: 1.12rem;
  --cell-line-height: unset;

  --cell-vertical-padding: 0.32rem;
  --cell-horizontal-padding: 0.32rem;

  --cell-text-color: #09134e;
  --cell-font-size: 0.32rem;

  --cell-value-font-size: 0.28rem;
  --cell-value-color: #9299c6;

  --cell-label-font-size: 0.2rem;
  --cell-label-color: #9299c6;
  --cell-label-margin-top: 0;

  --cell-icon-size: 0.24rem;
  --cell-right-icon-color: #9299c6;
}
</style>
