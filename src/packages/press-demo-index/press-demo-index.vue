<template>
  <div class="index-page">
    <scroll-view
      scroll-y
      class="scroll-view"
      :scroll-top="scrollTop"
      @scroll="onScroll"
    >
      <div class="index-page__header">
        <div class="index-page__header-brand">
          <img
            class="index-page__header-logo"
            :src="logoPic"
            mode="aspectFit"
          >
          <div class="index-page__header-title">
            {{ slogan }}
          </div>
          <div class="index-page__header-subtitle">
            {{ sloganDetail }}
          </div>
        </div>
        <div class="index-page__header-stats">
          <div class="index-page__stat">
            <div class="index-page__stat-num">
              {{ componentCount || iComponentCount }}
            </div>
            <div class="index-page__stat-label">
              {{ t('statComponent') }}
            </div>
          </div>
          <div class="index-page__stat-divider" />
          <div class="index-page__stat">
            <div class="index-page__stat-num">
              {{ totalCategoryCount }}
            </div>
            <div class="index-page__stat-label">
              {{ t('statCategory') }}
            </div>
          </div>
          <div class="index-page__stat-divider" />
          <div class="index-page__stat">
            <div class="index-page__stat-num">
              8+
            </div>
            <div class="index-page__stat-label">
              {{ t('statPlatform') }}
            </div>
          </div>
        </div>
      </div>

      <div class="index-page__main">
        <div class="index-page__card">
          <PressCollapse
            :value="activeNames"
            :default-expand-all="defaultExpandAll"
            @change="onChange"
          >
            <PressCollapseItem
              v-for="(item, index) of computedPages"
              :key="item.key"
              :title-style="collapseItemTitleStyle"
              :content-style="collapseItemContentStyle"
              :name="`${index}`"
              :is-link="false"
            >
              <template #title>
                <PressSection
                  :title="item.title"
                  :sub-title="getCategorySubTitle(item)"
                  :clickable="true"
                  :header-style="sectionHeaderStyle"
                  :active="activeNames.indexOf(`${index}`) > -1"
                >
                  <template #decoration>
                    <PressIcon
                      :name="getCategoryIcon(item)"
                      color="#465CFF"
                      size="22"
                      custom-style="margin-right: 10px;"
                    />
                  </template>
                  <template
                    v-if="showCollapseArrow"
                    #right
                  >
                    <span
                      :class="[
                        'section-collapse-arrow',
                        activeNames.indexOf(`${index}`) > -1
                          ? 'section-collapse-arrow--expanded'
                          : '',
                      ]"
                    >
                      <PressIcon name="arrow-down" />
                    </span>
                  </template>
                </PressSection>
              </template>

              <PressCell
                v-for="(nav, idx) in item.list"
                :key="getUniqueKey('nav', idx)"
                is-link
                :title="nav.title"
                custom-class="component-cell"
                :custom-style="contentCellCustomStyle"
                @click="() => clickComponent(nav, item)"
              />
            </PressCollapseItem>
          </PressCollapse>
        </div>
      </div>
    </scroll-view>
  </div>
</template>
<script>
import { toggleVConsole } from 't-comm/es/v-console/toggle';

import { setClipboardData } from '../common/clipboard/clipboard';
import { fetchData } from '../common/utils/fetch-data';
import { routerPush } from '../common/utils/router';
import { toggleI18n } from '../locale/demo-toggle';

import PressCell from '../press-cell/press-cell.vue';
import PressCollapseItem from '../press-collapse-item/press-collapse-item.vue';
import PressCollapse from '../press-collapse/press-collapse.vue';
import PressIcon from '../press-icon/press-icon.vue';
import PressSection from '../press-section/press-section.vue';

import {
  SCROLL_TOP_KEY,
} from './config';


const DEFAULT_DETAIL = 'Press UI 是一套易用、灵活、基于 uni-app 的组件库';


export default {
  name: 'PressDemoIndex',
  // 首页的统计数字与分类副标题原先是硬编码中文，切换语言时不会变。
  // 这里补上词条，配合全局 mixin 注入的 t()（见 locale/demo-lang.js）实现多语言。
  i18n: {
    'zh-CN': {
      statComponent: '组件',
      statCategory: '分类',
      statPlatform: '端覆盖',
      countComponent: count => `${count} 个组件`,
      countAbility: count => `${count} 项功能`,
      countProject: count => `${count} 个项目`,
    },
    'en-US': {
      statComponent: 'Components',
      statCategory: 'Categories',
      statPlatform: 'Platforms',
      countComponent: count => `${count} components`,
      countAbility: count => `${count} features`,
      countProject: count => `${count} projects`,
    },
  },
  options: {
    styleIsolation: 'shared',
  },
  components: {
    PressSection,
    PressCell,
    PressCollapse,
    PressCollapseItem,
    PressIcon,
  },
  props: {
    // ========== 品牌定制 ==========
    /** Logo 图片地址 */
    logoPic: {
      type: String,
      default: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/press-ui-full-logo.png',
    },
    /** 主标题 */
    slogan: {
      type: String,
      default: '全端兼容 高性能',
    },
    /** 副标题 */
    sloganDetail: {
      type: String,
      default: DEFAULT_DETAIL,
    },

    // ========== 页面数据 ==========
    /**
     * 已处理的页面列表（优先级高于 rawPageConfig）
     * 格式：[{ key, title, list: [{ title, url, event?, ... }] }]
     */
    pages: {
      type: Array,
      default: () => ([]),
    },
    /**
     * 原始页面配置（当 pages 为空时使用）
     * 格式：page-config.json 的 pages 字段
     * [{ name, list: [{ url, ... }] }]
     */
    rawPageConfig: {
      type: Array,
      default: () => ([]),
    },

    // ========== 平台过滤 ==========
    /** 小程序中隐藏的组件路径（path 末尾名） */
    disableInMp: {
      type: Array,
      default: () => ([]),
    },
    /** 纯项目（非 uni-app）中隐藏的组件路径 */
    disableInPure: {
      type: Array,
      default: () => ([]),
    },
    /** 是否为非 uni-app 项目 */
    isNotUni: {
      type: Boolean,
      default: false,
    },

    // ========== 快捷链接 ==========
    /** 帮助配置 CDN 地址 */
    helpDataUrl: {
      type: String,
      default: '',
    },
    /** 要隐藏的 demo 名称列表 */
    hideDemoList: {
      type: Array,
      default: () => ([]),
    },

    // ========== 额外区块 ==========
    /**
     * 额外的自定义区块（追加在组件分类之后、「其他功能」之前）
     * 格式：[{ key, title, icon?, subTitle?, list: [{ title, url? , event? }] }]
     *   - icon / subTitle 可选，不传则按 key 关键字自动推断
     *   - list[].url 走 routerPush(`/pages${url}`)，list[].event 走事件路由
     */
    extraSections: {
      type: Array,
      default: () => ([]),
    },
    /** 「其他功能」区块的标签文案 */
    otherAbilityLabel: {
      type: String,
      default: '其他功能',
    },
    /** 「相关项目」区块的标签文案 */
    otherProjectLabel: {
      type: String,
      default: '相关项目',
    },
    /** 快捷链接列表（当 helpDataUrl 为空时作为替代） */
    quickLinkList: {
      type: Array,
      default: () => ([]),
    },

    // ========== 标题映射 ==========
    /**
     * 标题映射表，key 为组件/分类名，value 为显示文案
     * 用于 resolveNavName / resolveCategoryTitle
     */
    titleMap: {
      type: Object,
      default: () => ({}),
    },

    // ========== 功能开关 ==========
    /** 是否显示折叠箭头 */
    showCollapseArrow: {
      type: Boolean,
      default: true,
    },
    /** 是否默认全部展开 */
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    /** 是否显示 vConsole 切换 */
    showVConsole: {
      type: Boolean,
      default: false,
    },
    /** 是否显示语言切换 */
    showLanguageToggle: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否记住滚动位置（下次进入时恢复）
     *
     * 关闭时（默认）：mount 时 scrollTop 始终为 0，刷新后回到顶部
     * 开启时：mount 时从 localStorage 读取，destroy 时写回
     *
     * 默认关闭的原因：开启后刷新页面会"跳到上次浏览位置"，
     * 多数场景下用户期望刷新后从顶部开始浏览
     */
    rememberScrollTop: {
      type: Boolean,
      default: false,
    },

    // ========== 样式覆盖 ==========
    collapseItemTitleStyle: {
      type: [Object, String],
      default: 'background: #fff;padding: 0 16px 0 0;',
    },
    collapseItemContentStyle: {
      type: [Object, String],
      default: 'padding: 0',
    },
    contentCellCustomStyle: {
      type: [Object, String],
      default: () => ({
        marginBottom: '12px',
        borderRadius: '99px',
        paddingLeft: '35px',
      }),
    },
    /** Section 组件标题样式 */
    sectionHeaderStyle: {
      type: [Object, String],
      default: 'font-weight: 500;margin-bottom: 0px;padding-top: 18px;padding-bottom: 18px;',
    },
    /** Section 颜色 */
    sectionColor: {
      type: String,
      default: '#007aff',
    },

    componentCount: {
      type: Number,
      default: 0,
    },
  },
  emits: [
    'click-component',
    'toggle-language',
    'toggle-vconsole',
    'jump-other-demo',
    'tip',
  ],
  data() {
    return {
      scrollTop: 0,

      helpConfig: {},
      activeNames: this.defaultExpandAll
        ? Array.from({ length: 50 }).map((_, i) => `${i}`)
        : [],
    };
  },
  computed: {
    /**
     * 初始页面数据：优先使用外部传入的 pages，其次用 rawPageConfig 自行处理
     */
    basePages() {
      if (this.pages && this.pages.length) {
        return this.pages;
      }
      return this.processRawPageConfig();
    },

    /**
     * 最终合并后的页面列表（含额外区块 + 快捷链接）
     */
    computedPages() {
      const result = [...this.basePages];

      // 注入额外区块
      if (this.extraSections.length) {
        result.push(...this.extraSections);
      }

      // 「其他功能」区块
      if (this.showLanguageToggle || this.showVConsole) {
        const otherAbilityList = [];
        if (this.showLanguageToggle) {
          otherAbilityList.push({
            title: this.otherAbilityLabel.includes('切换') ? this.otherAbilityLabel : '切换语言',
            event: 'onToggleLanguage',
          });
        }
        if (this.showVConsole) {
          otherAbilityList.push({
            title: '切换VConsole',
            event: 'onOpenVConsole',
          });
        }
        if (otherAbilityList.length) {
          result.push({
            key: 'section-otherAbility',
            title: this.otherAbilityLabel,
            list: otherAbilityList,
          });
        }
      }

      // 「相关项目」区块
      const resolvedQuickLinks = this.resolvedQuickLinkList;
      if (resolvedQuickLinks.length) {
        result.push({
          key: 'section-quickList',
          title: this.otherProjectLabel,
          list: resolvedQuickLinks.map(item => ({
            ...item,
            title: item.label || item.title,
            // 带 url 的项是「本项目的内部页面」，走 clickComponent 里的 routerPush；
            // 其余项是外部项目，走 onJumpToOtherDemo 跳 link。
            ...(item.url ? {} : { event: 'onJumpToOtherDemo' }),
          })),
        });
      }

      return result;
    },

    /**
     * 解析后的快捷链接列表（从 helpConfig 或 props 获取）
     */
    resolvedQuickLinkList() {
      const { hideDemoList, helpConfig = {}, quickLinkList } = this;
      // 合并：CDN 配置的「相关项目」+ 本地 props 注入的快捷链接（如内部页面入口）
      let list = [
        ...(helpConfig.quickLinkList || []),
        ...(quickLinkList || []),
      ];

      list = list.filter(item => !hideDemoList.includes(item.name));

      // #ifdef MP-QQ
      // 外部项目需带 mpQQ；内部页面项（带 url）不受此限制
      list = list.filter(item => !!item.mpQQ || !!item.url);
      // #endif
      return list;
    },

    /**
     * 组件总数（用于 Hero 区数据展示）
     */
    iComponentCount() {
      return this.computedPages.reduce(
        (sum, item) => sum + (item.list ? item.list.length : 0),
        0,
      );
    },

    /**
     * 分类总数（只统计基础分类，不含「其他功能」「相关项目」）
     */
    totalCategoryCount() {
      return this.basePages.length;
    },
  },

  mounted() {
    this.init();
    this.initHelpData();
  },
  beforeDestroy() {
    this.onBeforeDestroy();
  },
  beforeUnmount() {
    this.onBeforeDestroy();
  },
  methods: {
    // ============================================================
    // 生命周期
    // ============================================================

    init() {
      if (!this.rememberScrollTop) return;
      // #ifdef H5
      this.scrollTop = +localStorage.getItem(SCROLL_TOP_KEY) || 0;
      // #endif
    },
    onBeforeDestroy() {
      if (!this.rememberScrollTop) return;
      // #ifdef H5
      localStorage.setItem(SCROLL_TOP_KEY, this.scrollTop);
      // #endif
    },

    // ============================================================
    // 滚动
    // ============================================================

    onScroll(e) {
      // #ifdef H5
      this.scrollTop = e.target.scrollTop;
      // #endif
    },

    // ============================================================
    // 数据处理
    // ============================================================

    /**
     * 处理原始页面配置：过滤 + 标题映射
     */
    processRawPageConfig() {
      let pages = (this.rawPageConfig || []).filter(item => item.list && item.list.length);

      let disableList = [];
      // #ifndef H5
      disableList = this.disableInMp.length ? this.disableInMp : [];
      // #endif
      // #ifdef H5
      if (this.isNotUni) {
        disableList = this.disableInPure.length ? this.disableInPure : [];
      }
      // #endif

      pages = pages.map(item => ({
        ...item,
        key: this.getUniqueKey('section', item.name),
        title: this.resolveCategoryTitle(item),
        list: item.list
          .filter((nav) => {
            const list = nav.url.split('/');
            const name = list[list.length - 1];
            return disableList.indexOf(name) < 0;
          })
          .map(nav => ({
            ...nav,
            title: this.resolveNavName(nav),
          })),
      }));

      return pages;
    },

    /**
     * 解析分类标题
     */
    resolveCategoryTitle(item) {
      const { titleMap } = this;
      const key = item.name;
      return (titleMap && titleMap[key]) || item.name || key;
    },

    /**
     * 解析组件导航名称
     */
    resolveNavName(nav) {
      const { titleMap } = this;
      const list = nav.url.split('/');
      const key = list[list.length - 1];
      return (titleMap && titleMap[key]) || key;
    },

    // ============================================================
    // 帮助配置
    // ============================================================

    initHelpData() {
      if (!this.helpDataUrl) return;
      fetchData(this.helpDataUrl).then((data) => {
        this.helpConfig = data;
      });
    },

    // ============================================================
    // 事件处理
    // ============================================================

    onChange(e) {
      this.activeNames = e;
    },

    getUniqueKey(a, b) {
      return `${a}-${b}`;
    },

    /**
     * 分类图标：优先用区块自带的 icon（extraSections 可自定义），
     * 否则根据 section key 关键字匹配
     */
    getCategoryIcon(item) {
      if (item.icon) return item.icon;
      const key = item.key || '';
      const map = [
        ['otherAbility', 'setting-o'],
        ['quickList', 'share-o'],
        ['Basic', 'apps-o'],
        ['Form', 'edit'],
        ['Action', 'bell'],
        ['Display', 'photo-o'],
        ['Navigation', 'location-o'],
        ['Business', 'bag-o'],
      ];
      const hit = map.find(([kw]) => key.includes(kw));
      return hit ? hit[1] : 'apps-o';
    },

    /**
     * 分类副标题：优先用区块自带的 subTitle（extraSections 可自定义），
     * 否则按区块类型显示数量
     */
    getCategorySubTitle(item) {
      if (item.subTitle) return item.subTitle;
      const count = item.list ? item.list.length : 0;
      const key = item.key || '';
      if (key.includes('otherAbility')) return this.t('countAbility', count);
      if (key.includes('quickList')) return this.t('countProject', count);
      return this.t('countComponent', count);
    },

    clickComponent(nav, item) {
      // 事件路由：nav.event 指定的事件通过 emit 或内部方法处理
      if (typeof nav.event === 'string') {
        if (typeof this[nav.event] === 'function') {
          this[nav.event](nav, item);
          return;
        }
        // 如果组件有内部处理函数，走内部；否则 emit
        this.$emit('click-component', nav, item);
        return;
      }

      // 页面跳转
      routerPush.call(
        this,
        `/pages${nav.url}`,
      );
      this.$emit('click-component', nav, item);
    },

    // ========== 内置事件处理（可被 nav.event 字符串路由） ==========

    /**
     * 切换语言（对外暴露）
     */
    onToggleLanguage() {
      console.info('[onToggleLanguage]');
      toggleI18n((msg) => {
        this.$emit('tip', msg);
      });
      this.$emit('toggle-language');
    },

    /**
     * 切换 VConsole（对外暴露）
     */
    onOpenVConsole() {
      toggleVConsole();
      this.$emit('toggle-vconsole');
    },

    /**
     * 跳转到其他 Demo 项目（对外暴露）
     */
    onJumpToOtherDemo(item) {
      this.$emit('jump-other-demo', item);
      this.handleJumpToOtherDemo(item);
    },

    /**
     * 处理跳转其他项目的默认行为
     */
    handleJumpToOtherDemo(item) {
      const { link, mpWeixin, mpQQ } = item;
      if (!link) return;

      // #ifdef H5
      if (this.$toast) {
        this.$toast.loading({
          message: '正在跳转...',
          forbidClick: true,
          duration: 300,
          loadingType: 'spinner',
        });
      }

      this.onBeforeDestroy();
      setTimeout(() => {
        window.location.href = link;
      }, 300);
      // #endif

      // #ifndef H5
      // #ifdef MP-WEIXIN
      if (mpWeixin && mpWeixin.appId) {
        uni.navigateToMiniProgram({
          appId: mpWeixin.appId,
          path: mpWeixin.path || undefined,
          envVersion: 'release',
        });
        return;
      }
      // #endif

      // #ifdef MP-QQ
      if (mpQQ && mpQQ.appId) {
        uni.navigateToMiniProgram({
          appId: mpQQ.appId,
          path: mpQQ.path || undefined,
          envVersion: 'release',
        });
        return;
      }
      // #endif

      setClipboardData(link)
        .then(() => {
          this.$emit('tip', '🎉 复制成功，请到浏览器中查看');
        })
        .catch((err) => {
          this.$emit('tip', err?.errMsg || '复制失败，请重试');
        });
      // #endif
    },
  },

};
</script>

<style lang="scss" scoped src="./css/index.scss"></style>
