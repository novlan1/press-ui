---
url : pages/press/index-bar/index-bar
---

## IndexBar 索引栏

用于列表的索引分类显示和快速定位。


## 引入

```ts
import PressIndexBar from 'press-ui/press-index-bar/press-index-bar';
import PressIndexAnchor from 'press-ui/press-index-anchor/press-index-anchor';

export default {
  components: {
    PressIndexBar,
    PressIndexAnchor,
  }
}
```

## 代码演示

### 基础用法

点击索引栏时，会自动跳转到对应的`IndexAnchor`锚点位置。

```html
<press-index-bar>
  <div>
    <press-index-anchor index="A" />
    <press-cell title="文本" />
    <press-cell title="文本" />
    <press-cell title="文本" />
  </div>

  <div>
    <press-index-anchor index="B" />
    <press-cell title="文本" />
    <press-cell title="文本" />
    <press-cell title="文本" />
  </div>

  ...
</press-index-bar>
```

### 自定义索引列表

可以通过`index-list`属性自定义展示的索引字符列表。

```html
<press-index-bar :index-list="indexList">
  <div>
    <press-index-anchor index="1">标题1</press-index-anchor>
    <press-cell title="文本" />
    <press-cell title="文本" />
    <press-cell title="文本" />
  </div>

  <div>
    <press-index-anchor index="2">标题2</press-index-anchor>
    <press-cell title="文本" />
    <press-cell title="文本" />
    <press-cell title="文本" />
  </div>

  ...
</press-index-bar>
```

```javascript
export default {
  data() {
    return {
      indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    }
  },
};
```

## API

### IndexBar Props

| 参数              | 说明                       | 类型                   | 默认值    | 版本 |
| ----------------- | -------------------------- | ---------------------- | --------- | ---- |
| index-list        | 索引字符列表               | _string[] \| number[]_ | `A-Z`     | -    |
| z-index           | z-index 层级               | _number_               | `1`       | -    |
| sticky            | 是否开启锚点自动吸顶       | _boolean_              | `true`    | -    |
| sticky-offset-top | 锚点自动吸顶时与顶部的距离 | _number_               | `0`       | -    |
| highlight-color   | 索引字符高亮颜色           | _string_               | `#07c160` | -    |

### IndexAnchor Props

| 参数     | 说明                     | 类型               | 默认值  | 版本 |
| -------- | ------------------------ | ------------------ | ------- | ---- |
| use-slot | 是否使用自定义内容的插槽 | _boolean_          | `false` | -    |
| index    | 索引字符                 | _string \| number_ | -       | -    |

### IndexBar Events

| 事件名 | 说明           | 回调参数        |
| ------ | -------------- | --------------- |
| select | 选中字符时触发 | index: 索引字符 |

### IndexAnchor Slots

| 名称 | 说明                             |
| ---- | -------------------------------- |
| -    | 锚点位置显示内容，默认为索引字符 |


## 在线调试

<debug-online />

## 组件理解

### 结构分析

一看到 `bar`，就知道是边栏，`index-bar` 就是索引栏，所以这个组件的核心就是可点击的那一小列，并不是指的整个页面，默认放到右侧，就跟微信里的一样。

那么主体放哪里呢，组件需要监听主体的滚动，所以用 `scroll-view` 套住，并放在 `index-bar` 的 `slot` 内。这里的核心就是要把主体放到 `index-bar` 的 `slot` 内，因为用户可以自定义主体内容，组件只需要关心其滚动行为。

到这里基本的组件结构就呼之欲出了，伪代码如下。

```html
<div>
  <scroll-view>
   <slot/>
  </scroll-view>
  <div 
    v-for="(item, index) of indexList" 
    :key="item"
  >
  </div>
</div>
```

光有这个还不够，还需要提供一个 `index-anchor`，也就是锚点。主体滚动时，顶部会固定不同的内容，也就是 `fixed`，同时右侧 `index-bar` 的激活内容也跟着变。

使用时，用户可以将 `index-anchor` 穿插在主体内容中，并用 `index-bar` 包裹：

```html
<press-index-bar>
  <div>
    <press-index-anchor index="A" />
    <press-cell title="文本" />
    <press-cell title="文本" />
    <press-cell title="文本" />
  </div>

  <div>
    <press-index-anchor index="B" />
    <press-cell title="文本" />
    <press-cell title="文本" />
    <press-cell title="文本" />
  </div>

  ...
</press-index-bar>
```

### 两个动作

`index-bar` 有两个主要动作，`scroll-view` 的滚动（`onScroll`）和 `sidebar` 的滑动（`onTouchMove`）。

第一种情况，`scroll-view` 滚动时，会判断 `active` 索引。核心逻辑是，从后往前数，激活态就是第一个满足下面这个条件的，`scrollTop + preAnchorHeight >= child[i].top`，即第一个加`32px`(`index` 为0时不需要加)就可以"漏头"的。


第二种情况，会先计算当前激活的 `index`，计算方式为 `Math.floor((touch.clientY - this.sidebar.top) / itemHeight)`，然后让 `scroll-view` 滚动到指定位置，注意滚动的时候会被动触发上面的 `onScroll` 事件。


### anchor

`active` 的 `anchor` 要 `sticky` 的条件是:

```ts
const isActiveAnchorSticky = children[active].top <= scrollTop;
```

`active` 的 `anchor` 为 `sticky` 的原理是，给 `anchor-wrapper` 一个固定的高度（`32px`），然后将 `anchor` 设置为 

```ts
position: fixed; top: ${stickyOffsetTop}px
```

这样就固定住了，同时高度没塌陷。

滑动中，激活态的前一个，即 `index === active - 1`，它的样式是:

```ts
position: relative;transform: translate3d(0, ${translateY}px, 0);
```

就是让前一个激活过的标题，偏移到新的激活标题一起“排排坐”，滑动的时候用户体验好。`active` 不变的情况下，`translateY` 是固定的，为:

```ts
children[active].top - children[active - 1].top - children[active - 1].height
```
