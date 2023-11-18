---
url : pages/press/hor-match-index/hor-match-index
type: horizontal
---

## HorMatchIndex 横版赛事首页

可用于游戏内页面首页。

## 引入

```ts
import PressHorMatchIndex from 'press-ui/press-hor-match-index/press-hor-match-index';

export default {
  components: {
    PressHorMatchIndex,
  }
}
```

## 代码演示

### 基础用法

```html
<PressHorMatchIndex
  :sidebar-list="sidebarList"
  :banner-list="BANNER_LIST"
  :brand-list="BRAND_LIST"
  :show-person-dot="true"
  :show-message-dot="true"
  @back="onBack"
  @clickSidebar="onClickSidebar"
  @loadMore="loadMore"
  @clickMessage="clickMessage"
  @clickPerson="clickPerson"
>
  <template #empty>
    <press-empty
      description="暂无数据"
    />
  </template>
</PressHorMatchIndex>
```

```ts
import PressHorMatchIndex from 'press-ui/press-hor-match-index/press-hor-match-index.vue';

export default {
  components: {
    PressHorMatchIndex,
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
      uni.navigateBack();
    },
    clickMessage() {
    },
    clickPerson() {
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
        matchInfo.loading = false;
        matchInfo.finished =  matchInfo.list.length > 30;
      }, 2000);
    },
  },
};
```

## API

### Props


| 参数             | 说明                               | 类型      | 默认值       |
| ---------------- | ---------------------------------- | --------- | ------------ |
| title            | 页面标题                           | _string_  | `商户赛`     |
| show-message-dot | 是否显示消息红点                   | _boolean_ | `false`      |
| show-feedback    | 是否显示反馈                       | _boolean_ | `false`      |
| show-person-dot  | 是否显示个人中心红点               | _boolean_ | `false`      |
| banner-list      | `banner` 列表, 尺寸为`584 * 146`   | _array_   | -            |
| brand-list       | 品牌列表，尺寸为`80 * 80`          | _array_   | -            |
| sidebar-list     | 侧边栏数据列表                     | _array_   | -            |
| immediate-check  | 是否在初始化时立即执行滚动位置检查 | _boolean_ | `false`      |
| finished-text    | 加载完成后的提示文案               | _string_  | `没有更多了` |
| finished-style   | 已完成自定义样式                   | _string_  | -            |
| loading-style    | 加载中自定义样式                   | _string_  | -            |
| loading-size     | 加载中图标尺寸                     | _string_  | `20px`       |


###  Events

| 事件名           | 说明                       | 回调参数                                     |
| ---------------- | -------------------------- | -------------------------------------------- |
| back             | 点击左上角返回图标         | -                                            |
| clickMessage     | 点击右上角消息图标         | -                                            |
| clickFeedback    | 点击右上角反馈             | -                                            |
| clickPerson      | 点击右上角个人中心         | -                                            |
| clickBanner      | 点击 banner                | `bannerItem`, `bannerIndex`                  |
| clickBrand       | 点击品牌                   | `brandItem`, `brandIndex`                    |
| clickMatchButton | 点击比赛按钮，比如“去报名” | `matchItem`, `matchIndex`                    |
| clickMatch       | 点击比赛                   | `matchItem`, `sidebarIndex`                  |
| clickPrize       | 点击奖品                   | `matchItem`, `sidebarIndex`                  |
| clickSidebar     | 切换侧边栏                 | `sidebarItem`, `sidebarIndex`, `curTabIndex` |
| changeTab        | 切换横向Tab                | `tab`                                        |
| loadMore         | 加载更多                   | `sidebarIndex`, `curTabIndex`                |


### Slot

| 名称  | 说明   |
| ----- | ------ |
| empty | 空状态 |


### 类型说明

```ts
// bannerList
type IBannerList = Array<string>


// brandList
type IBrandList = Array<{
  name: string;
  img: string
}>


// sidebarList 
type ISidebarList = Array<{
  label: string;
  mode: 'recommend' | 'online' | 'offline' | 'link';
  tabs: Array<{
    label: string;
  }>;
  matchMap: Record<number, {
    list: IMatchList,
    finished: boolean;
    loading: boolean;
  }>;
  link: string;
}>


type IMatchList = Array<{
  banner: string;
  matchName: string;
  awardList: Array<{
    type: string; // 如 冠军奖、季军奖
    img: string;
    name: string;
    popover: { // 弹出层，展示奖励详情
      title: string;
      content: string;
    };
  }>;
  defaultAwardImg: string; // 默认奖励图片，默认为 https://image-1251917893.file.myqcloud.com/Esports/hor/home/default-reward.png

  brandImg: string;
  matchDesc: string; // 如 09.01 15:00 / 线下赛
  
  // 按钮默认无背景图，指定 isNotStart/isEnd/isIng 才有
  isNotStart: boolean; // 金黄色按钮
  isEnd: boolean; // 蓝色按钮
  isIng: boolean; // 金黄色按钮，同 isNotStart
  btnTxt: string;

  matchLoc: string; // 距离
  tag: string; // 标签名称
  isSigned; boolean; // 是否已报名
}>
```
