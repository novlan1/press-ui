---
url : pages/press/tab/tab
---

## Tab 标签页


选项卡组件，用于在不同的内容区域之间进行切换。


## 引入

```ts
import PressTab from 'press-ui/press-tab/press-tab.vue';
import PressTabs from 'press-ui/press-tabs/press-tabs.vue';

export default {
  components: {
    PressTab,
    PressTabs,
  }
}
```

## 代码演示

### 基础用法

通过`active`设定当前激活标签对应的索引值，默认情况下启用第一个标签。

```html
<press-tabs
  :active="active"
  @change="onChange"
>
  <press-tab title="标签 1">
    内容 1
  </press-tab>
  <press-tab title="标签 2">
    内容 2
  </press-tab>
  <press-tab title="标签 3">
    内容 3
  </press-tab>
  <press-tab title="标签 4">
    内容 4
  </press-tab>
</press-tabs>
```

```js
export default {
  data() {
    return {
      active: 1,
    }
  },
  methods: {
    onChange(value) {
      console.log('value', value);
    },
  }
};
```

### 通过名称匹配

在标签指定`name`属性的情况下，`active`的值为当前标签的`name`（此时无法通过索引值来匹配标签）。

```html
<press-tabs active="a">
  <press-tab title="标签 1" name="a">内容 1</press-tab>
  <press-tab title="标签 2" name="b">内容 2</press-tab>
  <press-tab title="标签 3" name="c">内容 3</press-tab>
</press-tabs>
```

### 横向滚动

多于 5 个标签时，Tab 可以横向滚动。

```html
<press-tabs active="{{ active }}">
  <press-tab title="标签 1">内容 1</press-tab>
  <press-tab title="标签 2">内容 2</press-tab>
  <press-tab title="标签 3">内容 3</press-tab>
  <press-tab title="标签 4">内容 4</press-tab>
  <press-tab title="标签 5">内容 5</press-tab>
  <press-tab title="标签 6">内容 6</press-tab>
</press-tabs>
```

### 禁用标签

设置`disabled`属性即可禁用标签。如果需要监听禁用标签的点击事件，可以在`press-tabs`上监听`disabled`事件。

```html
<press-tabs @disabled="onClickDisabled">
  <press-tab title="标签 1">内容 1</press-tab>
  <press-tab title="标签 2" disabled>内容 2</press-tab>
  <press-tab title="标签 3">内容 3</press-tab>
</press-tabs>
```


### 样式风格

`Tab`支持两种样式风格：`line`和`card`，默认为`line`样式，可以通过`type`属性修改样式风格。

```html
<press-tabs type="card">
  <press-tab title="标签 1">内容 1</press-tab>
  <press-tab title="标签 2">内容 2</press-tab>
  <press-tab title="标签 3">内容 3</press-tab>
</press-tabs>
```

### 点击事件

可以在`press-tabs`上绑定`click`事件，在回调参数的`event.detail`中可以取得被点击标签的标题和标识符。

```html
<press-tabs @click="onClick">
  <press-tab title="标签 1">内容 1</press-tab>
  <press-tab title="标签 2">内容 2</press-tab>
</press-tabs>
```



### 粘性布局

通过`sticky`属性可以开启粘性布局，粘性布局下，当 Tab 滚动到顶部时会自动吸顶。

```html
<press-tabs sticky>
  <press-tab title="标签 1">内容 1</press-tab>
  <press-tab title="标签 2">内容 2</press-tab>
  <press-tab title="标签 3">内容 3</press-tab>
  <press-tab title="标签 4">内容 4</press-tab>
</press-tabs>
```

### 切换动画

可以通过`animated`来设置是否启用切换 tab 时的动画。

```html
<press-tabs animated>
  <press-tab title="标签 1">内容 1</press-tab>
  <press-tab title="标签 2">内容 2</press-tab>
  <press-tab title="标签 3">内容 3</press-tab>
  <press-tab title="标签 4">内容 4</press-tab>
</press-tabs>
```

### 滑动切换

通过`swipeable`属性可以开启滑动切换标签页。

```html
<press-tabs swipeable>
  <press-tab title="标签 1">内容 1</press-tab>
  <press-tab title="标签 2">内容 2</press-tab>
  <press-tab title="标签 3">内容 3</press-tab>
  <press-tab title="标签 4">内容 4</press-tab>
</press-tabs>
```

### 嵌套 popup

如果将 `press-tabs` 嵌套在 `press-popup` 等会隐藏内容的组件或节点内，当 `press-tabs` 显示时下划线将不会正常显示。

此时可以通过使用 `v-if` 手动控制 press-tabs 的渲染来规避这种场景。

```html
<press-popup-plus v-if="show">
  <press-tabs  v-if="show">
    <press-tab title="标签 1">内容 1</press-tab>
    <press-tab title="标签 2">内容 2</press-tab>
    <press-tab title="标签 3">内容 3</press-tab>
    <press-tab title="标签 4">内容 4</press-tab>
  </press-tabs>
</press-popup-plus>
```

### 自定义标题

通过 `use-title-slot` 属性以及 `title-{index}` 的插槽，实现自定义标题。

```html
<press-tabs use-title-slot>
  <template #title-0>
    <span class="title">Title</span>
    <press-icon name="like-o" />
  </template>
  <template #title-1>
    <span class="title">Title 1</span>
    <press-icon name="friends-o" />
  </template>
  <template #title-2>
    <span class="title">Title 2</span>
  </template>

  <press-tab title="标签 1">内容 1</press-tab>
  <press-tab title="标签 2">内容 2</press-tab>
  <press-tab title="标签 3">内容 3</press-tab>
  <press-tab title="标签 4">内容 4</press-tab>
</press-tabs>
```

也可以使用 `v-for`。


```html
<press-tabs use-title-slot>
  <div
    v-for="(item, index) of Array(4)"
    :key="index"
    :slot="`title-${index}`"
  >
    <span class="title">Title {{ index }}</span>
    <press-icon name="like-o" />
  </div>

  <press-tab title="标签 1">内容 1</press-tab>
  <press-tab title="标签 2">内容 2</press-tab>
  <press-tab title="标签 3">内容 3</press-tab>
  <press-tab title="标签 4">内容 4</press-tab>
</press-tabs>
```

### 其他模式

支持 `hor/e-sport` 模式。

```html
<press-tabs mode="hor">
  <press-tab title="标签 1">内容 1</press-tab>
  <press-tab title="标签 2">内容 2</press-tab>
  <press-tab title="标签 3">内容 3</press-tab>
  <press-tab title="标签 4">内容 4</press-tab>
</press-tabs>
```

## API

### Tabs Props

| 参数                 | 说明                                                                  | 类型               | 默认值                                       |
| -------------------- | --------------------------------------------------------------------- | ------------------ | -------------------------------------------- |
| type                 | 样式风格，可选值为`card`                                              | _string_           | `line`                                       |
| color                | 标签主题色                                                            | _string_           | `#ee0a24`                                    |
| active               | 当前选中标签的标识符                                                  | _string \| number_ | `0`                                          |
| duration             | 动画时间，单位秒                                                      | _number_           | `0.3`                                        |
| line-width           | 底部条宽度，默认单位`px`                                              | _string \| number_ | `40px`                                       |
| line-height          | 底部条高度，默认单位`px`                                              | _string \| number_ | `3px`                                        |
| animated             | 是否开启切换标签内容时的转场动画                                      | _boolean_          | `false`                                      |
| border               | 是否展示外边框，仅在 `line` 风格下生效                                | _boolean_          | `false`                                      |
| ellipsis             | 是否省略过长的标题文字                                                | _boolean_          | `true`                                       |
| sticky               | 是否使用粘性定位布局                                                  | _boolean_          | `false`                                      |
| swipeable            | 是否开启手势滑动切换                                                  | _boolean_          | `false`                                      |
| lazy-render          | 是否开启标签页内容延迟渲染                                            | _boolean_          | `true`                                       |
| offset-top           | 粘性定位布局下与顶部的最小距离，单位`px`                              | _number_           | -                                            |
| swipe-threshold      | 滚动阈值，标签数量超过阈值且总宽度超过标签栏宽度时开始横向滚动        | _number_           | `5`                                          |
| title-active-color   | 标题选中态颜色                                                        | _string_           | -                                            |
| title-inactive-color | 标题默认态颜色                                                        | _string_           | -                                            |
| z-index              | z-index 层级                                                          | _number_           | `1`                                          |
| extra-class-prefix   | 兼容旧的`class`，可传入`van-`，不推荐使用                             | _string_           | -                                            |
| mode                 | 模式，可传入 `hor`, `e-sport`                                         | _string_           | -                                            |
| use-title-slot       | 是否使用自定义标题插槽                                                | _boolean_          | `false`                                      |
| scroll-view-props    | `scroll-view`元素的属性，目前使用到 `upper-threshold/lower-threshold` | _object_           | `{ upperThreshold: 50, lowerThreshold: 50 }` |

### Tab Props

| 参数               | 说明                                      | 类型               | 默认值       |
| ------------------ | ----------------------------------------- | ------------------ | ------------ |
| name               | 标签名称，作为匹配的标识符                | _string \| number_ | 标签的索引值 |
| title              | 标题                                      | _string_           | -            |
| disabled           | 是否禁用标签                              | _boolean_          | `false`      |
| dot                | 是否显示小红点                            | _boolean_          | -            |
| info               | 图标右上角提示信息                        | _string \| number_ | -            |
| title-style        | 自定义标题样式                            | _string_           | -            |
| extra-class-prefix | 兼容旧的`class`，可传入`van-`，不推荐使用 | _string_           | -            |

### Tabs Slot

| 名称      | 说明         |
| --------- | ------------ |
| nav-left  | 标题左侧内容 |
| nav-right | 标题右侧内容 |

### Tab Slot

| 名称 | 说明       |
| ---- | ---------- |
| -    | 标签页内容 |

### Tabs Event

| 事件名           | 说明                     | 参数                                               |
| ---------------- | ------------------------ | -------------------------------------------------- |
| click            | 点击标签时触发           | `index`: 索引，`name`：标签标识符，`title`：标题   |
| change           | 当前激活的标签改变时触发 | `index`: 索引，`name`：标签标识符，`title`：标题   |
| disabled         | 点击被禁用的标签时触发   | `index`: 索引，`name`：标签标识符，`title`：标题   |
| scroll           | 滚动时触发               | { `scrollTop`: 距离顶部位置, `isFixed`: 是否吸顶 } |
| scrolltoupper    | 滚动到顶部/左边          | `EventHandle`，透传 `scroll-view` 同名事件参数     |
| scrolltolower    | 滚动到底部/右边          | `EventHandle`，透传 `scroll-view` 同名事件参数     |
| scrollViewScroll | `scroll-view` 元素滚动   | `EventHandle`，透传 `scroll-view` 同名事件参数     |

### 方法

通过 selectComponent 可以获取到 Tabs 实例并调用实例方法。

| 方法名 | 参数 | 返回值 | 介绍                                                       |
| ------ | ---- | ------ | ---------------------------------------------------------- |
| resize | -    | -      | 外层元素大小或组件显示状态变化时，可以调用此方法来触发重绘 |

## 常见问题

### 组件从隐藏状态切换到显示状态时，底部条位置错误？

Tabs 组件在挂载时，会获取自身的宽度，并计算出底部条的位置。如果组件一开始处于隐藏状态，则获取到的宽度永远为 0，因此无法展示底部条位置。

#### 解决方法

方法一，使用 `v-if` 来控制组件展示，使组件重新初始化。

```html
<press-tabs v-if="show" />
```

方法二，调用组件的 `resize` 方法来主动触发重绘。

```html
<press-tabs id="tabs" />
```

```js
this.selectComponent('#tabs').resize();
```


### 从vant组件迁移

- 修改组件名，`van-tabs => press-tabs`，`van-tab => press-tab`
- `line-width`属性改为 `number` 类型
- 可选，为`press-tabs` 和 `press-tab` 传入 `extra-class-prefix="van-"`
- 可选，`v-model="tab"` 改为 `:active="tab"`
- 可选，`press-tabs` 的 `change` 事件参数取值修改，比如：

```ts
onTabChange(tab) {
  if (this.isMpWeixin) {
    tab = tab.detail.name;
  }
  this.tab = tab;
  this.$emit('onTabChange', tab);
},

// 需要改为
onTabChange(tab) {
  this.tab = tab.name;
  this.$emit('onTabChange', this.tab);
},
```


`line-width`如果传`string`类型，可能会报错：

```
TypeError: Right-hand side of ‘instanceof‘ is not an object
```

### 延迟加载的 tab 排序问题

对于小程序平台，可以传入 `sortIndex` 来指定每个 `tab` 的位置，如：

```html
<press-tabs
  swipeable
>
  <press-tab
    v-if="showLazyTab"
    title="Tab A"
    :sort-index="0"
  >
    <div class="content">
      Tab A
    </div>
  </press-tab>

   <press-tab
    title="Tab B"
    :sort-index="1"
  >
    <div class="content">
      Tab B
    </div>
  </press-tab>
</press-tabs>
```


## 在线调试

<debug-online />
