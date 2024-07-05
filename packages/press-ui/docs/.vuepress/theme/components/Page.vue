<template>
  <main
    class="page"
    :class="isHor ? 'page--hor' : ''"
  >
    <slot name="top" />
    <div class="wrap">
      <Content class="theme-default-content" />

      <div
        class="simulator-wrap"
      >
        <div
          ref="simulator"
          class="simulator-box"
          :style="simulatorBoxStyle"
        >
          <div class="simulator-content">
            <iframe
              class="simulator-iframe"
              :src="path"
            />
          </div>
        </div>

        <div class="button-wrap">
          <div
            class="press-button press-button--primary"
            @click.stop="onChangeHor"
          >
            {{ isHor ? '竖屏' :'横屏' }}
          </div>
        </div>
      </div>
    </div>
    <PageEdit />

    <PageNav
      class="page-nav"
      v-bind="{ sidebarItems }"
    />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue';
import PageNav from '@theme/components/PageNav.vue';
import { watchMessageFromIFrame, IFRAME_MESSAGE_TYPE_MAP, DEMO_PAGE_DIRECTION } from '../../utils/message';

const WEB_DEMO_BASE_LINK_PROD = 'https://novlan1.github.io/press-ui-demo-vue2/#/';
const WEB_DEMO_BASE_LINK_DEV = 'http://localhost:9999/#/';

const WEB_DEMO_BASE_LINK = process.env.NODE_ENV === 'production' ? WEB_DEMO_BASE_LINK_PROD : WEB_DEMO_BASE_LINK_DEV;
const DEFAULT_LANG = 'zh-CN';
const DEFAULT_URL = 'pages/index/index';


const LANG_MAP = {
  en: 'en-US',
};

export default {
  components: { PageEdit, PageNav },
  props: ['sidebarItems'],
  data() {
    return {
      url: '',
      lang: DEFAULT_LANG,
      isHor: false,
    };
  },
  computed: {
    path() {
      return `${WEB_DEMO_BASE_LINK + this.url}?v=${new Date().getTime()}&lang=${this.lang}`;
    },
    simulatorBoxStyle() {
      const { horWidth, horHeight, marginRight } = this.$page.frontmatter;
      if (!this.isHor) {
        return '';
      }
      const list = [];
      if (horWidth) {
        list.push(`width: ${horWidth}px;`);
      }
      if (horHeight) {
        list.push(`height: ${horHeight}px;`);
      }
      if (marginRight) {
        list.push(`margin-right: ${marginRight}px;`);
      }
      return list.join(' ');
    },
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
        this.url = frontmatter.url ? frontmatter.url : DEFAULT_URL;
        this.isHor = frontmatter.type === 'horizontal';
      },
      immediate: true,
    },
  },
  created() {
    this.getLang();
  },
  mounted() {
    this.getLang();
    watchMessageFromIFrame((event) => {
      const { type, data } = event.data;
      // console.log('[iframe.event]', type, data);
      if (type === IFRAME_MESSAGE_TYPE_MAP.CHANGE_DEMO_PAGE_DIRECTION) {
        this.isHor = data === DEMO_PAGE_DIRECTION.HOR;
      }
    });
  },
  methods: {
    onChangeHor() {
      this.isHor = !this.isHor;
    },
    onload() {
    },
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
  },
};
</script>

<style lang="stylus" scoped>
@require '../styles/wrapper.styl';
@require '../styles/button.styl';

.page {
  padding-bottom: 2rem;
  display: block;
}

.page--hor {
  .theme-default-content {
    padding-right: 10px;
  }

  .wrap .simulator-box {
    width: 600px;
    height: 400px;
    margin-top: 60px;
    margin-right: -20px;
    padding-bottom: 3px;
    background: none;

    .simulator-content {
      border-radius: 10px;
      box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.15);
    }
  }

  .button-wrap {
    margin-top: 20px;
  }
}

.wrap {
  max-width: 1400px;
  display: flex;
  width: auto;
  margin: 0 auto;

  .simulator-wrap {
    position: sticky;
    top: 0;
    z-index: 9;
    // height: 800px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .simulator-box {
    // position: -webkit-sticky;
    // position: sticky;
    // top: 0px;
    // z-index: 9;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    flex-shrink: 0;
    width: 390.26px;
    height: 790px;
    border-radius: 20px;
    background-color: #fff;
    transform: scale(0.85);
    box-sizing: border-box;
    background-image: url('https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_255356ffde6cc5c8c1.png');
    background-repeat: no-repeat;
    background-size: 100%;
    border-radius: 30px;
    overflow: hidden;
    padding: 58px 14px 32px;

    .simulator-content {
      position: relative;
      flex: 1;
      border-radius: 5px;
      background-color: #FFFFFF;
      overflow: hidden;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;

      .simulator-iframe {
        margin: -2px 0;
        width: 100%;
        height: calc(100% + 4px);
        border: none;
      }
    }

    &.simulator-fixed {
      position: fixed;
    }

    @media (max-width: 1300px) {
      display: none;
    }
  }
}

.wrap .simulator-wrap {
  @media (max-width: 1300px) {
    display: none;
  }
}

.page-nav {
  max-width: 1400px;
  margin: 0 auto;

  .inner {
    display: flex;
    justify-content: space-between;
  }
}

.button-wrap {
  margin-top: -40px;
  display: flex;
  justify-content: center;
}
</style>
