<template>
  <div class="demo-wrap">
    <PressHorMatchIndex
      :sidebar-list="sidebarList"
      :banner-list="BANNER_LIST"
      :brand-list="BRAND_LIST"
      :show-person-dot="true"
      :show-message-dot="true"
      finished-style="font-size: 12px;"
      loading-size="16px"
      @back="onBack"
      @clickSidebar="onClickSidebar"
      @loadMore="loadMore"
      @clickMessage="clickMessage"
      @clickPerson="clickPerson"
    >
      <press-empty
        slot="empty"
        description="暂无数据"
      />
    </PressHorMatchIndex>
  </div>
</template>
<script>
import PressHorMatchIndex from 'src/packages/press-hor-match-index/press-hor-match-index.vue';
import PressEmpty from 'src/packages/press-empty/press-empty.vue';
import { isNotInUni } from 'src/packages/common/utils/utils';
import {
  BANNER_LIST,
  BRAND_LIST,
  ONLINE_TAB_LIST,
  ONLINE_MATCH_MAP,
} from 'src/packages/press-hor-match-index/demo-helper/data';

export default {
  components: {
    PressHorMatchIndex,
    PressEmpty,
  },
  data() {
    return {
      BANNER_LIST,
      BRAND_LIST,
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
      if (isNotInUni()) {
        this.$router.back();
        return;
      }
      uni.navigateBack();
    },
    clickMessage() {
      this.onGTip('message');
    },
    clickPerson() {
      this.onGTip('home');
    },
    onClickSidebar(item) {
      if (item.link) {
        window.location.href = item.link;
      }
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
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  --loading-text-font-size: 12px;

  ::v-deep {
    .press-index {
      background: url(https://image-1251917893.file.myqcloud.com/Esports/hor/bg.png) no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
