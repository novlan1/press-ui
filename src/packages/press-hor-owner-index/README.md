---
url : pages/press/hor-owner-index/hor-owner-index
type: horizontal
---

## HorOwnerIndex 横版赛事首页


## 引入

```ts
import PressHorOwnerIndex from 'press-ui/press-hor-owner-index/press-hor-owner-index';

export default {
  components: {
    PressHorOwnerIndex,
  }
}
```

## 代码演示

### 基础用法

```html
<PressHorOwnerIndex
  title="Press UI"
  :is-owner="isOwner"
  :owner-info="ownerInfo"
  :recommend-map="recommendMap"
  :my-match-map="myMatchMap"
  :rank-map="rankMap"
  :my-rank-info="myRankInfo"
  finished-text="没有更多了"
  @back="back"
  @clickOwnerRegister="clickOwnerRegister"
  @clickMyOwnerInfo="clickMyOwnerInfo"
  @clickMatch="clickMatch"
  @clickMatchButton="clickMatchButton"
  @clickRankItem="clickRankItem"
  @focus="focus"
  @update:loading="updateLoading"
  @loadMore="loadMore"
  @clickSidebar="clickSidebar"
  @changeTab="changeTab"
/>
```

```ts
export default {
  data() {
    return {
      recommendMap: {
        list: [],
        finished: false,
        loading: false,
        total: 999,
      },
      myMatchMap: {
         0: {
          loading: false,
          finished: false,
          showDivider: false,
          list: [],
          endList: [],
        },
        1: {
          loading: false,
          finished: false,
          showDivider: false,
          list: [],
          endList: [],
        },
      },
      rankMap: {
        list: [],
        finished: false,
        loading: false,
      },
      myRankInfo: [],
      ownerInfo: {},
      isOwner: true,
    };
  },
  methods: {
    back() {
      uni.navigateBack();
    },
    loadMore(sidebarIndex, tabIndex) {
      if (sidebarIndex === 0) {
        this.loadMoreRecommend();
      }
      if (sidebarIndex === 1) {
        this.loadMoreMyMatch(tabIndex);
      }
      if (sidebarIndex === 2) {
        this.loadMoreRank();
      }
    },
    updateLoading(key, value) {
      this[key].loading = value;
    },
    clickOwnerRegister() {
      window.location.href = '';
    },
    loadMoreRank() {},
    loadMoreMyMatch() {},
    loadMoreRecommend() {},
    clickMyOwnerInfo() {},
    focus() {},
    clickMatchButton() {},
    clickMatch() {},
    clickSidebar() {},
    changeTab() {},
    clickRankItem() {},
  },
};
```

## API

### Props

| 参数            | 说明                               | 类型      | 默认值           |
| --------------- | ---------------------------------- | --------- | ---------------- |
| title           | 页面标题                           | _string_  | ``               |
| is-owner        | 是否为主理人                       | _boolean_ | `false`          |
| owner-info      | 我的主理人信息                     | _object_  | -                |
| recommend-map   | 推荐赛事信息                       | _object_  | -                |
| my-match-map    | 我的赛事信息                       | _object_  | -                |
| divider-text    | 我的赛事分割线文案                 | _string_  | `以下为历史赛事` |
| rank-map        | 榜单信息                           | _object_  | -                |
| my-rank-info    | 我的排名                           | _object_  | -                |
| rank-title      | 榜单标题                           | _string_  | `主理人周榜`     |
| rank-num-prefix | 榜单参赛人数前缀                   | _string_  | `本周参赛人数：` |
| rank-empty-tex  | 榜单空状态文案                     | _string_  | `暂无主理人榜单` |
| immediate-check | 是否在初始化时立即执行滚动位置检查 | _boolean_ | `false`          |
| finished-text   | 加载完成后的提示文案               | _string_  | `没有更多了`     |
| finished-style  | 已完成自定义样式                   | _string_  | -                |
| loading-style   | 加载中自定义样式                   | _string_  | -                |
| loading-size    | 加载中图标尺寸                     | _string_  | `20px`           |


###  Events

| 事件名             | 说明                     | 回调参数                                               |
| ------------------ | ------------------------ | ------------------------------------------------------ |
| back               | 点击左上角返回图标       | -                                                      |
| clickOwnerRegister | 点击注册主理人           | -                                                      |
| clickMyOwnerInfo   | 点击我的主理人信息       | -                                                      |
| clickSidebar       | 切换侧边栏               | `sidebarItem`, `sidebarIndex`, `tabIndex`              |
| changeTab          | 切换横向Tab              | `tab`                                                  |
| clickMatch         | 点击比赛                 | `matchItem`, `matchIndex`,  `sidebarIndex`, `tabIndex` |
| clickMatchButton   | 点击比赛按钮，比如“详情” | `matchItem`, `matchIndex`,  `sidebarIndex`, `tabIndex` |
| clickRankItem      | 点击排名项               | `rankItem`, `rankIndex`                                |
| focus              | 关注其他用户             | `rankItem`, `rankIndex`                                |
| update:loading     | 更新 `loading`           | `key`, `value`                                         |
| loadMore           | 加载更多                 | `sidebarIndex`, `tabIndex`                             |


### Slot

| 名称  | 说明   |
| ----- | ------ |
| empty | 空状态 |


### 类型说明

```ts
// ownerInfo
type IOwnerInfo = {
  pic: string;
  name: string;
  lv: string;
}

// recommendMap
type IRecommendMap = {
  finished: boolean;
  loading: boolean;
  total: number;
  list: Array<{
    pic: string;
    name: string;
    joinEnd: string; // 报名结束时间
    distance: string; // 可为距离或省市
    tagList: Array<string>;
    awardList: Array<{
      type: string;
      name: string;
      img: string;
    }>;

    customTitle: number; // xx位好友已加入
    friends: Array<string>;
  }>
}

// myMatchMap
type IMyMatchMap = {
  0: {
    list: IMyMatchList,
    endList: IMyMatchList,
    finished: boolean;
    loading: boolean;
    showDivider: boolean;
  },
  1: {
    list: IMyMatchList,
    endList: IMyMatchList,
    finished: boolean;
    loading: boolean;
    showDivider: boolean;
  }
}

type IMyMatchList = Array<{
  pic: string;
  name: string;
  matchTime: string; // 比赛时间
  distance: string;
  tagList: Array<string>;

  isEnd: boolean; // 按钮上方文字为灰色
  isPending: boolean; // 按钮上方文字为亮黄色
  isPlaying: boolean; // 按钮上方文字为浅灰色（普通）
  matchStatusDesc: string; // 按钮顶部状态文案
  buttonText: string;
}>

// rankMap
type IRankMap = {
  finished: boolean;
  loading: boolean;
  list: Array<IRankItem>
}

// myRankInfo
type IMyRankInfo = IRankItem

type IRankItem = {
  pic: string;
  name: string;
  fan: string | number;
  lv: string | number;

  rank: number; // 排名
  isMine: boolean; // 是否为当前用户的
  isFocused: boolean; // 是否已经关注
  showButton: boolean; //是否显示按钮

  num: string | number; // 本月参赛人数
  diffNumStr?: string; // 距上榜还差xx人；距前1名还差xx人
  myRankStr?: string; // 我的排名描述，1/2/3/未上榜等
}
```

## 常见问题

### 加载更多

如果设置 `immediate-check` 为 `false`，则需保证第1页高度大于页面高度，否则无法加载更多。


