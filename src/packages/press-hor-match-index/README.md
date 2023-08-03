---
url : pages/press/hor-match-index/hor-match-index
---

## HorMatchIndex 横版赛事首页

可用于游戏内页面首页。

## 代码演示

### 基础用法

```html
<PressHorMatchIndex @back="onBack" />
```

```ts
import PressHorMatchIndex from 'press-ui/press-hor-match-index/press-hor-match-index.vue';

export default {
  components: {
    PressHorMatchIndex,
  },
  data() {
    return {

    };
  },
  methods: {
    onBack() {
      uni.navigateBack();
    },

  },
};
```

## API

### Props


| 参数               | 说明                 | 类型      | 默认值  |
| ------------------ | -------------------- | --------- | ------- |
| showMessageDot     | 是否显示消息红点     | _boolean_ | `false` |
| showPersonDot      | 是否显示个人中心红点 | _boolean_ | `false` |
| bannerList         | banner 列表          | _array_   | -       |
| brandList          | 品牌列表             | _array_   | -       |
| recommendMatchList | 推荐赛事列表         | _array_   | -       |
| onlineTabList      | 线上Tab列表          | _array_   | -       |
| onlineMatchMap     | 线上赛事列表对象     | _array_   | -       |
| offlineMatchList   | 线下赛事列表         | _array_   | -       |



###  Events

| 事件名           | 说明                       | 回调参数                                                           |
| ---------------- | -------------------------- | ------------------------------------------------------------------ |
| back             | 点击左上角返回图标         | -                                                                  |
| clickMessage     | 点击右上角消息图标         | -                                                                  |
| clickPerson      | 点击右上角个人中心         | -                                                                  |
| clickBanner      | 点击 banner                | item, index                                                        |
| clickBrand       | 点击品牌                   | item, index                                                        |
| clickMatchButton | 点击比赛按钮，比如“去报名” | `item`, `index`, `type` (`type`可为`recommend`/`online`/`offline`) |
| clickMatch       | 点击比赛                   | `item`, `index`, `type` (`type`可为`recommend`/`online`/`offline`) |
| changeTab        | 切换Tab                    | tab                                                                |


### 类型说明

```ts
// bannerList
type IBannerList = Array<string>


// brandList
type IBrandList = Array<{
  name: string;
  img: string
}>

// recommendMatchList
type IRecommendMatchList = Array<{
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

  brandImg: string;
  matchDesc: string; // 如 09.01 15:00 / 线下赛

  isNotStart: boolean;
  isEnd: boolean;
  isIng: boolean;
  btnTxt: string;

  matchLoc: string; // 距离
  showApplyTag: boolean; // 报名有奖
  showJoinTag: boolean; // 参赛有奖
}>

// onlineTabList
type IOnlineTabList = Array<{
  name: string;
}>

// onlineMatchMap
type IOnlineMatchMap = IRecommendMatchList


// offlineMatchList
type IOfflineMatchList = Array<{
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
  
  matchDesc: string; // 如 09.01 15:00 / 线下赛

  isNotStart: boolean;
  isEnd: boolean;
  isIng: boolean;
  btnTxt: string;

  matchLoc: string; // 距离
  showApplyTag: boolean; // 报名有奖
  showJoinTag: boolean; // 参赛有奖
}>
```
