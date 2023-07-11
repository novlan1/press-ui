---
url : pages/press/schedule-tree/schedule-tree
---

## ScheduleTree 赛程树


## 代码演示

### 基础用法

```html
<ScheduleTree
  :sche-list="scheList"
  :is-admin="isAdmin"
  :is-preview="isPreview"
/>

```

```javascript
import ScheduleTree from 'press-ui/press-schedule-tree/press-schedule-tree.vue';

export default {
  components: {
    ScheduleTree,
  },
  data() {
    return {
      scheList: [],
      isAdmin: false,
      isPreview: 0,
    }
  },
  methods: {
  },
};
```

## API

### Props

| 参数                     | 说明                                                              | 类型               | 默认值  |
| ------------------------ | ----------------------------------------------------------------- | ------------------ | ------- |
| sche-list                | 赛程列表                                                          | _Array_            | -       |
| is-admin                 | 是否为管理员                                                      | _Boolean_          | `false` |
| is-preview               | 是否为预览阶段，0 不是， 1 普通预览，2 预览，且自定义了赛程       | _Number_           | `0`     |
| my-team-id               | 我的队伍id                                                        | _String_           | -       |
| selected-sch-id          | 选中的赛程id                                                      | _String_           | -       |
| winner-name              | 冠军列的名称，可为冠军、季军等                                    | _String_           | -       |
| page                     | 当前赛程树所在页，分组淘汰赛时可用                                | _Number_           | `0`     |
| total-page               | 赛程树总页数，分组淘汰赛时可用                                    | _Number_           | `0`     |
| automatic-grouping       | 是否自动分组                                                      | _Boolean_          | `false` |
| show-champion            | 是否显示冠军列，循环赛时可设置为`false`                           | _Boolean_          | `true`  |
| shadow                   | 是否设置间隔阴影，循环赛时可设置为`true`                          | _Boolean_          | `false` |
| auto-back-to-top         | 左右滚动时是否自动回到顶部，循环赛时可设置为`false`               | _Boolean_          | `true`  |
| resume-position          | 赛程数据变少，右侧显示空白时候自动滚动位置，可为`left/right/数字` | _[String, Number]_ | `right` |
| show-round-tab `v0.8.32` | 是否显示轮次tab                                                   | _Boolean_          | `true`  |
| max-columns `v0.8.32`    | 同时显示的列数目，超出的部分会被隐藏，以提升性能                  | _Number_           | `3`     |





### Events

| 事件名称       | 说明             | 回调参数                                                      |
| -------------- | ---------------- | ------------------------------------------------------------- |
| clickRoundTab  | 点击轮次tab      | round.round_type, round                                       |
| clickSche      | 点击赛程组       | schId，scheGroup，schePair                                    |
| clickVideoIcon | 点击视频小图标   | schId，scheGroup，schePair                                    |
| clickFinalSche | 点击冠军队伍     | -                                                             |
| scroll         | 左右滚动时候触发 | scrollTime（当前滚动次数，最左侧为0）, roundTotal（轮次总数） |

### scheList

- `scheList`为二维数组，第一层数组的每一项对应每一列，第二层数组的每一项对应赛程组对`schePair`。

- `schePair`由1-2个赛程组`scheGroup`组成，1个`scheGroup`有两个队伍。

- 每个`schePair`为一个对象，包含`battleList`、`roundInfo`、`isChamp`等属性。

- `battleList`取名不恰当，这里指的是`scheGroupList`，`battleList`有2个代表有2个赛程组。

- `scheGroup`包含`teamList`、`nodeItem`、`schid`、`realStatus`、`bracketIdDesc`、`curBo`、`boType`等信息


示例数据可以[参考这里](https://github.com/novlan1/press-ui/blob/release/src/packages/press-schedule-tree/demo-helper/data.ts)。


### 命名规范

- props
  - 赛程组id，以`sch`开头，比如`schId`、`selectedSchId`
  - 赛程组、赛程组对、赛程列表，以`sche`开头，比如`scheGroup`、`schePair`、`scheList`
- events
  - 不能以`on`开头，比如不能命名为`onclickSche`，需改为`clickSche`
  - 不能与业务耦合，比如不能命名为`jumpToSetPage`，需改为与业务无关的`clickRoundTab`

## 常见问题


### 整个页面跟着滚动，包括上面的tab

原因是`page`高度大于`100%`，下面`scroll-view`高度太大，可设置合适的元素为`flex: 1`。


### 整页滚动正常，但赛程树下面滑动后有空白


原因是单位不统一，有的用`rpx`，有的用`rem`。



### 赛程树累计错位

要么是某些DOM元素高度没有指定，要么是`rpx`转`px`时候舍弃了小数点，`rpx`转`px`公式如下：

```ts
// rpx 转换为 px ，传参类型是数字（Number）
export function rpxToPx(rpx) {
  const deviceWidth = wx.getSystemInfoSync().windowWidth; //获取设备屏幕宽度
  const px = (deviceWidth / 750) * Number(rpx);
  return Math.floor(px);
}
```

`px`转`rpx`公式：

```ts
// px 转换为 rpx ，传参类型是数字（Number）
export function pxToRpx(px) {
  const deviceWidth = wx.getSystemInfoSync().windowWidth; //获取设备屏幕宽度
  const rpx = (750 / deviceWidth) * Number(px);
  return Math.floor(rpx);
}
```
