<template>
  <div class="demo-wrap demo-wrap--gray">
    <demo-block
      :title="t('basicUsage')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <press-dropdown-menu>
        <press-dropdown-item
          :value="value1"
          :options="option1"
        />
        <press-dropdown-item
          :value="value2"
          :options="option2"
        />
      </press-dropdown-menu>
    </demo-block>

    <demo-block
      :title="t('customContent')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <press-dropdown-menu>
        <press-dropdown-item
          :value="value1"
          :options="option1"
        />
        <press-dropdown-item
          id="item"
          :title="itemTitle"
        >
          <press-cell :title="switchTitle1">
            <press-switch
              slot="right-icon"
              size="24px"
              style="height: 26px"
              :checked="switch1"
              active-color="#ee0a24"
              @change="onSwitch1Change"
            />
          </press-cell>
          <press-cell :title="switchTitle2">
            <press-switch
              slot="right-icon"
              size="24px"
              style="height: 26px"
              :checked="switch2"
              active-color="#ee0a24"
              @change="onSwitch2Change"
            />
          </press-cell>
          <view style="padding: 5px 16px;">
            <press-button
              type="danger"
              block
              round
              @click="onConfirm"
            >
              {{ t('confirm') }}
            </press-button>
          </view>
        </press-dropdown-item>
      </press-dropdown-menu>
    </demo-block>

    <demo-block
      :title="t('customActiveColor')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <press-dropdown-menu active-color="#1989fa">
        <press-dropdown-item
          :value="value1"
          :options="option1"
        />
        <press-dropdown-item
          :value="value2"
          :options="option2"
        />
      </press-dropdown-menu>
    </demo-block>

    <demo-block
      :title="t('expandDirection')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <press-dropdown-menu direction="up">
        <press-dropdown-item
          :value="value1"
          :options="option1"
        />
        <press-dropdown-item
          :value="value2"
          :options="option2"
        />
      </press-dropdown-menu>
    </demo-block>

    <demo-block
      :title="t('disableMenu')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <press-dropdown-menu>
        <press-dropdown-item
          :value="value1"
          disabled
          :options="option1"
        />
        <press-dropdown-item
          :value="value2"
          disabled
          :options="option2"
        />
      </press-dropdown-menu>
    </demo-block>
  </div>
</template>
<script>
import PressDropdownMenu from 'src/packages/press-dropdown-menu/press-dropdown-menu.vue';
import PressDropdownItem from 'src/packages/press-dropdown-item/press-dropdown-item.vue';
import PressSwitch from 'src/packages/press-switch/press-switch.vue';

export default {
  i18n: {
    'zh-CN': {
      disableMenu: '禁用菜单',
      switchTitle1: '包邮',
      switchTitle2: '团购',
      itemTitle: '筛选',
      expandDirection: '向上展开',
      customContent: '自定义菜单内容',
      customActiveColor: '自定义选中态颜色',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ],
    },
    'en-US': {
      disableMenu: 'Disable Menu',
      switchTitle1: 'Title',
      switchTitle2: 'Title',
      itemTitle: 'Title',
      expandDirection: 'Expand Direction',
      customContent: 'Custom Content',
      customActiveColor: 'Custom Active Color',
      option1: [
        { text: 'Option1', value: 0 },
        { text: 'Option2', value: 1 },
        { text: 'Option3', value: 2 },
      ],
      option2: [
        { text: 'Option A', value: 'a' },
        { text: 'Option B', value: 'b' },
        { text: 'Option C', value: 'c' },
      ],
    },
  },

  components: {
    PressDropdownMenu,
    PressDropdownItem,
    PressSwitch,
  },
  data() {
    return {
      option1: this.t('option1'),
      option2: this.t('option2'),
      value1: 0,
      value2: 'a',

      switchTitle1: this.t('switchTitle1'),
      switchTitle2: this.t('switchTitle2'),
      itemTitle: this.t('itemTitle'),
      switch1: true,
      switch2: true,

      headerStyle: 'background: #f7f8fa;',
      sectionStyle: 'background: #f7f8fa;margin: 0 0 6px;padding: 0;',
    };
  },
  methods: {
    onConfirm() {
      // #ifdef H5
      this.selectComponent('#item').toggle();
      // #endif
      // #ifndef H5
      this.selectComponent('#item').$vm.toggle();
      // #endif
    },

    onSwitch1Change(detail) {
      console.log('onSwitch1Change.detail', detail);
      this.switch1 = detail;
    // this.setData({ switch1: detail });
    },

    onSwitch2Change(detail) {
      console.log('onSwitch2Change.detail', detail);
      this.switch2 = detail;
    // this.setData({ switch2: detail });
    },
  },
};
</script>
<style scoped lang="scss">
</style>
