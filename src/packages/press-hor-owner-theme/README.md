---
url : pages/press/hor-owner-theme/hor-owner-theme
type: horizontal
---

## HorOwnerTheme 横版赛事列表


## 引入

```ts
import PressHorOwnerTheme from 'press-ui/press-hor-owner-theme/press-hor-owner-theme';

export default {
  components: {
    PressHorOwnerTheme,
  }
}
```

## 代码演示

### 基础用法

```html
<PressHorOwnerTheme
  title="奥巴马举办的比赛"
  :recommend-map="recommendMap"
  finished-text="没有更多了"
  @back="back"
  @clickMatch="clickMatch"
  @clickMatchButton="clickMatchButton"
  @update:loading="updateLoading"
  @loadMore="loadMore"
/>
```

```ts

export default {
  data() {
    return {
      recommendMap: {
        list: RECOMMEND_LIST,
        finished: false,
        loading: false,
        total: 999,
      },
    };
  },
  methods: {
    loadMoreRecommend() {
      const { recommendMap } = this;
      setTimeout(() => {
        recommendMap.list = recommendMap.list.concat(RECOMMEND_LIST);
        recommendMap.loading = false;
        recommendMap.finished =  recommendMap.list.length >= 30;
      }, 1000);
    },
    loadMore(sidebarIndex, tabIndex) {
      console.log('[loadMore]', sidebarIndex, tabIndex);
      this.loadMoreRecommend();
    },
    updateLoading(key, value) {
      this[key].loading = value;
    },
    back() {
      routerBack.call(this);
    },
    clickMatchButton(...args) {
      this.onGTip('[clickMatchButton]');
      console.log('[clickMatchButton]', args);
    },
    clickMatch(...args) {
      this.onGTip('[clickMatch]');
      console.log('[clickMatch]', args);
      this.recommendMap.list = [];
    },
  },
};
```

## API

### Props


| 参数            | 说明                               | 类型      | 默认值       |
| --------------- | ---------------------------------- | --------- | ------------ |
| title           | 页面标题                           | _string_  | ``           |
| recommend-map   | 推荐赛事信息                       | _object_  | -            |
| immediate-check | 是否在初始化时立即执行滚动位置检查 | _boolean_ | `false`      |
| finished-text   | 加载完成后的提示文案               | _string_  | `没有更多了` |
| finished-style  | 已完成自定义样式                   | _string_  | -            |
| loading-style   | 加载中自定义样式                   | _string_  | -            |
| loading-size    | 加载中图标尺寸                     | _string_  | `20px`       |


###  Events

| 事件名           | 说明                     | 回调参数                                               |
| ---------------- | ------------------------ | ------------------------------------------------------ |
| back             | 点击左上角返回图标       | -                                                      |
| clickMatch       | 点击比赛                 | `matchItem`, `matchIndex`,  `sidebarIndex`, `tabIndex` |
| clickMatchButton | 点击比赛按钮，比如“详情” | `matchItem`, `matchIndex`,  `sidebarIndex`, `tabIndex` |
| update:loading   | 更新 `loading`           | `key`, `value`                                         |
| loadMore         | 加载更多                 | `sidebarIndex`, `tabIndex`                             |


### Slot

| 名称  | 说明   |
| ----- | ------ |
| empty | 空状态 |


### 类型说明

```ts
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
```
