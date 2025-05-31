<template>
  <div class="demo-wrap demo-wrap--gray">
    <!-- #ifndef H5 -->
    <PressNotify
      id="press-notify"
    />
    <!-- #endif -->

    <PressTabs
      :offset-top="offsetTop"
      sticky
      swipeable
    >
      <PressTab :title="t('demo')">
        <DemoBlockPlus :title="t('basicUsage')">
          <PressCol
            :span="6"
          >
            <PressIconPlus
              :name="demoIcon"
              @click="copy(demoIcon)"
            />
          </PressCol>
          <PressCol
            :span="6"
          >
            <PressIconPlus
              :name="demoImage"
              @click="copy(demoImage)"
            />
          </PressCol>
        </DemoBlockPlus>

        <DemoBlockPlus :title="t('badge')">
          <PressCol
            :span="6"
          >
            <PressIconPlus
              :name="demoIcon"
              dot
              @click="copy(demoIcon, { dot: true })"
            />
          </PressCol>
          <PressCol
            :span="6"
          >
            <PressIconPlus
              :name="demoIcon"
              info="9"
              @click="copy(demoIcon, { badge: '9' })"
            />
          </PressCol>
          <PressCol
            :span="6"
          >
            <PressIconPlus
              :name="demoIcon"
              info="99+"
              @click="copy(demoIcon, { badge: '99+' })"
            />
          </PressCol>
        </DemoBlockPlus>

        <DemoBlockPlus :title="t('color')">
          <PressCol
            :span="6"
          >
            <PressIconPlus
              name="cart-o"
              color="#1989fa"
              @click="copy('cart-o', { color: '#1989fa' })"
            />
          </PressCol>
          <PressCol
            :span="6"
          >
            <PressIconPlus
              name="fire-o"
              :color="RED"
              @click="copy('fire-o', { color: RED })"
            />
          </PressCol>
        </DemoBlockPlus>

        <DemoBlockPlus :title="t('size')">
          <PressCol
            :span="6"
          >
            <PressIconPlus
              :name="demoIcon"
              size="40"
              @click="copy(demoIcon, { size: '40' })"
            />
          </PressCol>
          <PressCol
            :span="6"
          >
            <PressIconPlus
              :name="demoIcon"
              size="1rem"
              @click="copy(demoIcon, { size: '3rem' })"
            />
          </PressCol>
        </DemoBlockPlus>
      </PressTab>

      <PressTab :title="t('basic')">
        <PressCol
          v-for="(icon) in icons.basic"
          :key="icon"
          :span="6"
        >
          <PressIconPlus
            :name="icon"
            @click="copy(icon)"
          />
          <span>{{ icon }}</span>
        </PressCol>
      </PressTab>

      <PressTab :title="t('outline')">
        <PressCol
          v-for="icon in icons.outline"
          :key="icon"
          :span="6"
        >
          <PressIconPlus
            :name="icon"
            @click="copy(icon)"
          />
          <span>{{ icon }}</span>
        </PressCol>
      </PressTab>

      <PressTab :title="t('filled')">
        <PressCol
          v-for="icon in icons.filled"
          :key="icon"
          :span="6"
        >
          <PressIconPlus
            :name="icon"
            @click="copy(icon)"
          />
          <span>{{ icon }}</span>
        </PressCol>
      </PressTab>
    </PressTabs>
  </div>
</template>

<script>
import { RED } from 'press-ui/common/constant/color';

import PressCol from 'press-ui/press-col/press-col.vue';
import DemoBlockPlus from 'press-ui/press-demo-block-plus/press-demo-block-plus.vue';

import icons from 'press-ui/press-icon-plus/config';
import PressIconPlus from 'press-ui/press-icon-plus/press-icon-plus.vue';

import PressNotify from 'press-ui/press-notify/press-notify.vue';
import PressTab from 'press-ui/press-tab/press-tab.vue';
import PressTabs from 'press-ui/press-tabs/press-tabs.vue';

import { CLIPBOARD_MIXIN } from 'press-ui/mixins/clipboard/clipboard-mixin';


export default {
  i18n: {
    'zh-CN': {
      copied: '复制成功',
      title: '图标列表',
      badge: '徽标提示',
      basic: '基础图标',
      outline: '线框风格',
      filled: '实底风格',
      demo: '用法示例',
      color: '图标颜色',
      size: '图标大小',
    },
    'en-US': {
      copied: 'Copied',
      title: 'Icon List',
      badge: 'Show Badge',
      basic: 'Basic',
      outline: 'Outline',
      filled: 'Filled',
      demo: 'Demo',
      color: 'Icon Color',
      size: 'Icon Size',
    },
  },
  components: {
    PressTabs,
    PressTab,
    PressCol,
    PressIconPlus,
    PressNotify,
    DemoBlockPlus,
  },
  mixins: [CLIPBOARD_MIXIN],
  options: {
    styleIsolation: 'shared',
  },
  data() {
    return {
      RED,
      demoIcon: 'chat-o',
      demoImage: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_ce77489af93cb34c4b.png',

      icons: {
        basic: [],
        outline: [],
        filled: [],
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.icons = {
        ...(this.icons),
        ...(icons || {}),
      };
    }, 1000);
  },
  methods: {
    copy(icon, option = {}) {
      let tag = `<press-icon-plus name="${icon}"`;
      if ('dot' in option) {
        tag = `${tag} ${option.dot ? 'dot' : ''}`;
      }
      if ('badge' in option) {
        tag = `${tag} badge="${option.badge}"`;
      }
      if ('color' in option) {
        tag = `${tag} color="${option.color}"`;
      }
      if ('size' in option) {
        tag = `${tag} size="${option.size}"`;
      }
      tag = `${tag} />`;

      console.log('[tag] ', tag);
      this.copyIconTag(tag);
    },
  },
};
</script>

<style scoped lang="scss">
@import "press-ui/common/style/press/var.scss";

.demo-wrap {
  ::v-deep .press-tab__pane {
    width: auto;
    margin: 20px;
    background-color: #fff;
    border-radius: 12px;
  }

  ::v-deep .press-tabs__content {
    background-color: #f7f8fa;
  }

  ::v-deep .press-col {
    float: none !important;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    span {
      display: block;
      height: 36px;
      margin: -4px 0 4px;
      padding: 0 5px;
      color: $gray-7;
      font-size: 12px;
      line-height: 18px;
    }

    &:active {
      background-color: $active-color;
    }
  }

  ::v-deep .press-icon-plus {
    margin: 16px 0 16px;
    color: $text-color;
    font-size: 32px;
  }
}
</style>
