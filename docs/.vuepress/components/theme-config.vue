<template>
  <div class="config-wrap">
    <div
      v-for="(item, index) of list"
      :key="index"
      class="press-config-item"
    >
      <div class="press-config-name">
        {{ item.name }}：
      </div>
      <div class="press-config-input">
        <input
          v-model="item.value"
          placeholder="请输入"
          class="press-input-inner"
          :data-name="item.name"
          @change="e=>onChangeTheme(e, item)"
        >
      </div>
      <div style="width: 40px;">
        <ColorPicker
          v-if="item.isColor"
          v-model="item.value"
          @change="v=>onChangeColorPicker(v, item)"
        />
      </div>
    </div>

    <div class="press-config-item">
      <div style="position: relative;">
        <div
          v-if="copied"
          class="config-tooltip"
        >
          ✨ {{ t('copySuccess') }}
        </div>
        <button
          class="press-button press-button--primary"
          @click.stop="onCopy"
        >
          {{ t('oneClickCopy') }}
        </button>
      </div>
      <div style="margin-left: 26px;position: relative;">
        <div
          v-if="resumed"
          class="config-tooltip"
        >
          {{ t('restoreSuccess') }}
        </div>
        <button
          class="press-button press-button--default"
          @click.stop="onResume"
        >
          {{ t('restore') }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { sendMessageToIframe, IFRAME_MESSAGE_TYPE_MAP } from '../utils/message';

import ColorPicker from './color-picker/color-picker.vue';
import themeDefaultJson from './theme-default.json';


const DEFAULT_LANG = 'zh-CN';
const LANG_MAP = {
  en: 'en-US',
};


function copyText(text) {
  const textareaC = document.createElement('textarea');
  textareaC.setAttribute('readonly', 'readonly'); // 设置只读属性防止手机上弹出软键盘
  textareaC.value = text;
  document.body.appendChild(textareaC); // 将textarea添加为body子元素
  textareaC.select();
  const res = document.execCommand('copy');
  document.body.removeChild(textareaC);// 移除DOM元素
  return res;
}

function getComponentTheme(type) {
  if (!type) return [];

  const res = Object.keys(themeDefaultJson)
    .filter(key => key.startsWith(`$${type}`))
    .map(key => ({
      name: key.replace('$', '--'),
      value: themeDefaultJson[key],
      isColor: themeDefaultJson[key].startsWith('#'),
    }));
  return res;
}

export default {
  components: {
    ColorPicker,
  },
  props: {
  },
  data() {
    return {
      copied: false,
      resumed: false,
      list: [],
      url: '',
      type: '',

      lang: DEFAULT_LANG,
      i18n: {
        'zh-CN': {
          oneClickCopy: '一键复制',
          restore: '还原',
          copySuccess: '复制已变更条目成功',
          restoreSuccess: '还原成功',
        },
        'en-US': {
          oneClickCopy: 'One Click Copy',
          restore: 'Restore',
          copySuccess: 'Copy changed items successfully',
          restoreSuccess: 'Restored successfully',
        },
      },
    };
  },
  computed: {
  },
  watch: {
    $route: {
      handler() {
        this.getLang();
      },
    },
    $page: {
      handler(newName) {
        const { frontmatter } = newName;
        this.url = frontmatter.url ? frontmatter.url : '';
        if (this.url) {
          const list = this.url.split('/');
          const newType = list[list.length - 1];

          if (newType !== this.type) {
            this.type = newType;
            this.list = getComponentTheme(newType);
          }
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.list = getComponentTheme(this.type);
    this.getLang();
  },
  methods: {
    t(key) {
      return (this.i18n[this.lang] && this.i18n[this.lang][key]) || '';
    },
    // 与Page.vue有重复，可优化
    getLang() {
      const { fullPath } = this.$route;
      const keys = Object.keys(LANG_MAP);

      for (const key of keys) {
        if (fullPath.startsWith(`/${key}/`)) {
          this.lang = LANG_MAP[key];
          return;
        }
      }

      this.lang = DEFAULT_LANG;
    },
    onCopy() {
      this.copied = true;
      this.resumed = false;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
      const diff = this.getChangedStyle().map(item => `${item.name}: ${item.newValue};`);

      copyText(diff.join('\n'));
    },
    onChangeTheme(e, item) {
      this.changeIframe({
        name: item.name,
        value: e.target.value,
      });
    },
    onChangeColorPicker(value, item) {
      this.changeIframe({
        name: item.name,
        value,
      });
    },
    changeIframe(style) {
      sendMessageToIframe({
        type: IFRAME_MESSAGE_TYPE_MAP.CHANGE_IFRAME_STYLE_TYPE,
        data: style,
      });
    },
    getChangedStyle() {
      const copyList = getComponentTheme(this.type);
      const obj = this.list.reduce((acc, item) => {
        acc[item.name] = item.value;
        return acc;
      }, {});

      const diff = [];

      copyList.forEach((item) => {
        if (item.value !== obj[item.name]) {
          diff.push({
            name: item.name,
            oldValue: item.value,
            newValue: obj[item.name],
          });
        }
      });
      return diff;
    },
    onResume() {
      const diff = this.getChangedStyle();

      const list = getComponentTheme(this.type);
      this.list = JSON.parse(JSON.stringify(list));

      diff.map((item) => {
        this.changeIframe({
          name: item.name,
          value: item.oldValue,
        });
      });

      this.resumed = true;
      this.copied = false;
      setTimeout(() => {
        this.resumed = false;
      }, 2000);
    },
  },
};
</script>
<style scoped lang="stylus">
@require '../theme/styles/button.styl';

.config-wrap {
  min-height: 50px;
  padding: 20px 0;
}

.press-button {
  margin-top: 20px;
}

.config-tooltip {
  animation: code-copy-animation 0.2s ease-out;
  animation-fill-mode: forwards;
  position: absolute;
  left: 5px;
  top: 0;
  z-index: 9;
  white-space: nowrap;
}

@keyframes code-copy-animation {
  0% {
    opacity: 0;
    top: 0;
  }

  to {
    opacity: 1;
    top: -10px;
  }
}
</style>
