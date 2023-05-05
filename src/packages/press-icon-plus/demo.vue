<template>
  <demo-section>
    <!-- #ifndef H5 -->
    <PressNotify
      id="press-notify"
    />
    <!-- #endif -->

    <press-tabs
      v-model="tab"
      :offset-top="offsetTop"
      sticky
    >
      <press-tab :title="t('demo')">
        <demo-block-plus :title="t('basicUsage')">
          <press-col
            :span="6"
          >
            <press-icon-plus
              :name="demoIcon"
              @click="copy(demoIcon)"
            />
          </press-col>
          <press-col
            :span="6"
          >
            <press-icon-plus
              :name="demoImage"
              @click="copy(demoImage)"
            />
          </press-col>
        </demo-block-plus>

        <demo-block-plus :title="t('badge')">
          <press-col
            :span="6"
          >
            <press-icon-plus
              :name="demoIcon"
              dot
              @click="copy(demoIcon, { dot: true })"
            />
          </press-col>
          <press-col
            :span="6"
          >
            <press-icon-plus
              :name="demoIcon"
              info="9"
              @click="copy(demoIcon, { badge: '9' })"
            />
          </press-col>
          <press-col
            :span="6"
          >
            <press-icon-plus
              :name="demoIcon"
              info="99+"
              @click="copy(demoIcon, { badge: '99+' })"
            />
          </press-col>
        </demo-block-plus>

        <demo-block-plus :title="t('color')">
          <press-col
            :span="6"
          >
            <press-icon-plus
              name="cart-o"
              color="#1989fa"
              @click="copy(demoIcon, { color: '#1989fa' })"
            />
          </press-col>
          <press-col
            :span="6"
          >
            <press-icon-plus
              name="fire-o"
              :color="RED"
              @click="copy(demoIcon, { color: RED })"
            />
          </press-col>
        </demo-block-plus>

        <demo-block-plus :title="t('size')">
          <press-col
            :span="6"
          >
            <press-icon-plus
              :name="demoIcon"
              size="40"
              @click="copy(demoIcon, { size: '40' })"
            />
          </press-col>
          <press-col
            :span="6"
          >
            <press-icon-plus
              :name="demoIcon"
              size="1rem"
              @click="copy(demoIcon, { size: '3rem' })"
            />
          </press-col>
        </demo-block-plus>
      </press-tab>

      <press-tab :title="t('basic')">
        <press-col
          v-for="(icon) in icons.basic"
          :key="icon"
          :span="6"
        >
          <press-icon-plus
            :name="icon"
            @click="copy(icon)"
          />
          <span>{{ icon }}</span>
        </press-col>
      </press-tab>

      <press-tab :title="t('outline')">
        <press-col
          v-for="icon in icons.outline"
          :key="icon"
          :span="6"
        >
          <press-icon-plus
            :name="icon"
            @click="copy(icon)"
          />
          <span>{{ icon }}</span>
        </press-col>
      </press-tab>

      <press-tab :title="t('filled')">
        <press-col
          v-for="icon in icons.filled"
          :key="icon"
          :span="6"
        >
          <press-icon-plus
            :name="icon"
            @click="copy(icon)"
          />
          <span>{{ icon }}</span>
        </press-col>
      </press-tab>
    </press-tabs>
  </demo-section>
</template>

<script>
import PressNotify from 'src/packages/press-notify/press-notify.vue';
import PressNotifyHandler from 'src/packages/press-notify/';

import PressTabs from 'src/packages/press-tabs/press-tabs.vue';
import PressTab from 'src/packages/press-tab/press-tab.vue';
import PressCol from 'src/packages/press-col/press-col.vue';
import PressIconPlus from 'src/packages/press-icon-plus/press-icon-plus.vue';

import icons from 'src/packages/press-icon-plus/config';
import { RED } from 'src/packages/common/constant/color';

// from https://30secondsofcode.org
function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);

  const selected = document.getSelection().rangeCount > 0
    ? document.getSelection().getRangeAt(0)
    : false;

  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}

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
      title: 'Icon List',
      badge: 'Show Badge',
      basic: 'Basic',
      copied: 'Copied',
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
  },
  data() {
    this.RED = RED;
    let offsetTop = 0;

    // #ifdef H5
    offsetTop = 44;
    // #endif
    return {
      tab: 0,
      demoIcon: 'chat-o',
      demoImage: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_ce77489af93cb34c4b.png',

      offsetTop,
      icons,
    };
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

      // #ifdef H5
      copyToClipboard(tag);
      // #endif

      // #ifndef H5
      uni.setClipboardData({
        data: tag,
      });
      // #endif
      console.log('tag', tag);

      PressNotifyHandler({
        type: 'success',
        duration: 1500,
        // className: 'demo-icon-notify',
        message: `${this.t('copied')}：${tag}`,
        top: this.offsetTop,
      });
    },
  },
};
</script>

<style lang="scss">
@import "src/packages/common/style/var.scss";

.press-doc-demo-section {
  font-size: 0;
  background-color: #f7f8fa;

  & ::v-deep .press-tab__pane {
    width: auto;
    margin: 20px;
    background-color: #fff;
    border-radius: 12px;
  }
  & ::v-deep .press-tabs__content {
    background-color: #f7f8fa;
  }

  &-notify {
    font-size: 13px;
  }

  .press-col {
    display: inline-block;
    float: none;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;

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

  .press-icon-plus {
    margin: 16px 0 16px;
    color: $text-color;
    font-size: 32px;
  }

  .press-tab__pane {
    width: auto;
    margin: 20px;
    background-color: #fff;
    border-radius: 12px;
  }
}
</style>
