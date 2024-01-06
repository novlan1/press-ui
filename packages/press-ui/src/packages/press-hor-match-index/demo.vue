<template>
  <div class="demo-wrap">
    <PressHorMatchIndex
      :sidebar-list="sidebarList"
      :banner-list="BANNER_LIST"
      :brand-list="BRAND_LIST"
      :report-list="REPORT_LIST"
      :show-person-dot="true"
      :show-message-dot="true"
      :show-feedback="showFeedback"
      :is-brand-swiper="isBrandSwiper"
      finished-style="font-size: 12px;"
      loading-size="16px"
      @back="onBack"
      @clickSidebar="onClickSidebar"
      @loadMore="loadMore"
      @clickMessage="clickMessage"
      @clickFeedback="clickFeedback"
      @clickPerson="clickPerson"
      @clickPrize="clickPrize"
      @clickMatch="clickMatch"
      @clickMatchButton="clickMatchButton"
      @clickReport="clickReport"
    >
      <template #empty>
        <press-empty
          description="暂无数据"
        />
      </template>
    </PressHorMatchIndex>
  </div>
</template>
<script>
import PressHorMatchIndex from 'src/packages/press-hor-match-index/press-hor-match-index.vue';
import PressEmpty from 'src/packages/press-empty/press-empty.vue';
import {
  BANNER_LIST,
  BRAND_LIST,
  REPORT_LIST,
  ONLINE_TAB_LIST,
  ONLINE_MATCH_MAP,
} from 'src/packages/press-hor-match-index/demo-helper/data';
import { routerBack } from 'src/utils/index';


export default {
  components: {
    PressHorMatchIndex,
    PressEmpty,
  },
  data() {
    return {
      BANNER_LIST,
      BRAND_LIST,
      showFeedback: true,
      REPORT_LIST,
      isBrandSwiper: false,
      sidebarList: [
        {
          label: '推荐',
          value: '',
          mode: 'recommend',
          matchMap: {
            0: {
              list: ONLINE_MATCH_MAP[0],
              finished: false,
              loading: false,
            },
          },
        },
        {
          label: '线上赛',
          value: '',
          mode: 'online',
          tabs: ONLINE_TAB_LIST,
          matchMap: {
            ...Object.keys(ONLINE_MATCH_MAP).map(key => ({
              list: ONLINE_MATCH_MAP[key],
              finished: false,
              loading: false,
            })),
            3: {
              list: [],
              finished: false,
              loading: false,
            },
          },
        },
        {
          label: '线下赛',
          value: '',
          mode: 'offline',
          matchMap: {
            0: {
              list: ONLINE_MATCH_MAP[0],
              finished: false,
              loading: false,
            },
          },
        },
        {
          label: '链接',
          value: '',
          mode: 'link',
          link: 'https://baidu.com',
        },
      ],
    };
  },
  methods: {
    onBack() {
      routerBack.call(this);
    },
    clickMessage() {
      this.onGTip('message');
    },
    clickFeedback() {
      this.onGTip('clickFeedback');
    },
    clickPerson() {
      this.onGTip('home');
    },
    onClickSidebar(item) {
      if (item.link) {
        window.location.href = item.link;
      }
    },
    clickReport(item, index) {
      this.onGTip(`[clickReport] ${index}`);
      console.log('[clickReport]', item, index);
    },
    loadMore(sidebarIndex, curTabIndex) {
      const matchInfo = this.sidebarList[sidebarIndex].matchMap[curTabIndex];
      setTimeout(() => {
        matchInfo.list = matchInfo.list.concat(ONLINE_MATCH_MAP[0]);
        // 不能用下面这种
        // matchInfo.list.push(ONLINE_MATCH_MAP[0]);

        matchInfo.loading = false;
        matchInfo.finished =  matchInfo.list.length > 30;
      }, 2000);
    },
    clickPrize(item, index) {
      console.log('[clickPrize]', item, index);
      this.onGTip(`[clickPrize] ${index}`);
    },
    clickMatchButton(item, index) {
      console.log('[clickMatchButton]', item, index);
      this.onGTip(`[clickMatchButton] ${index}`);
    },
    clickMatch(item, index) {
      console.log('[clickMatch]', item, index);
      this.onGTip(`[clickMatch] ${index}`);
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  --loading-text-font-size: 12px;

  ::v-deep {
    .press-index {
      background: url(https://image-1251917893.file.myqcloud.com/Esports/hor/bg.png)
        no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
