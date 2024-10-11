---
url : pages/press/notice-bar/notice-bar
---

## NoticeBar 通知栏

用于循环播放展示一组消息通知。

## 引入

```ts
import PressNoticeBar from 'press-ui/press-notice-bar/press-notice-bar';

export default {
  components: {
    PressNoticeBar,
  }
}
```

## 代码演示

### 基础用法

```html
<press-notice-bar
  left-icon="volume-o"
  text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
/>
```

### 滚动播放

通知栏的内容长度溢出时会自动开启滚动播放，通过 `scrollable` 属性可以控制该行为。

```html
<!-- 文字较短时，通过设置 scrollable 属性开启滚动播放 -->
<press-notice-bar scrollable text="技术是开发它的人的共同灵魂。" />

<!-- 文字较长时，通过禁用 scrollable 属性关闭滚动播放 -->
<press-notice-bar
  :scrollable="false"
  text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
/>
```

### 多行展示

文字较长时，可以通过设置 `wrapable` 属性来开启多行展示。

```html
<press-notice-bar
  wrapable
  :scrollable="false"
  text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
/>
```

### 通知栏模式

通知栏支持 `closeable` 和 `link` 两种模式。

```html
<!-- closeable 模式，在右侧显示关闭按钮 -->
<press-notice-bar mode="closeable" text="技术是开发它的人的共同灵魂。" />

<!-- link 模式，在右侧显示链接箭头 -->
<press-notice-bar mode="link" text="技术是开发它的人的共同灵魂。" />
```

### 自定义样式

通过 `color` 属性设置文本颜色，通过 `background` 属性设置背景色。

```html
<press-notice-bar
  color="#1989fa"
  background="#ecf9ff"
  left-icon="info-o"
  text="技术是开发它的人的共同灵魂。"
/>
```

### 自定义滚动速率

使用`speed`属性控制滚动速率。

```html
<press-notice-bar
  text="技术是开发它的人的共同灵魂。"
  :scrollable
  :speed="120"
  left-icon="//img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
/>
```

## API

### Props

| 参数       | 说明                                     | 类型      | 默认值     |
| ---------- | ---------------------------------------- | --------- | ---------- |
| mode       | 通知栏模式，可选值为 `closeable` `link`  | _string_  | `''`       |
| text       | 通知文本内容                             | _string_  | `''`       |
| color      | 通知文本颜色                             | _string_  | `#ed6a0c`  |
| background | 滚动条背景                               | _string_  | `#fffbe8`  |
| left-icon  | 左侧图标名称或图片链接                   | _string_  | -          |
| delay      | 动画延迟时间 (ms)                        | _number_  | `1`        |
| speed      | 滚动速率 (px/s)                          | _number_  | `60`       |
| scrollable | 是否开启滚动播放，内容长度溢出时默认开启 | _boolean_ | -          |
| wrapable   | 是否开启文本换行，只在禁用滚动时生效     | _boolean_ | `false`    |
| open-type  | 微信开放能力                             | _string_  | `navigate` |

### Events

| 事件名 | 说明             | 参数           |
| ------ | ---------------- | -------------- |
| click  | 点击通知栏时触发 | _event: Event_ |
| close  | 关闭通知栏时触发 | _event: Event_ |

### Slot

| 名称       | 说明                                     |
| ---------- | ---------------------------------------- |
| -          | 通知文本内容，仅在 `text` 属性为空时有效 |
| left-icon  | 自定义左侧图标                           |
| right-icon | 自定义右侧图标                           |

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                          | 默认值                                            | 描述 |
| ----------------------------- | ------------------------------------------------- | ---- |
| --notice-bar-height           | _40px_                                            | -    |
| --notice-bar-padding          | _0 var(--press-padding-md)_                       | -    |
| --notice-bar-wrapable-padding | _var(--press-padding-xs) var(--press-padding-md)_ | -    |
| --notice-bar-text-color       | _var(--press-orange-dark)_                        | -    |
| --notice-bar-font-size        | _var(--press-font-size-md)_                       | -    |
| --notice-bar-line-height      | _24px_                                            | -    |
| --notice-bar-background-color | _var(--press-orange-light)_                       | -    |
| --notice-bar-icon-size        | _16px_                                            | -    |
| --notice-bar-icon-min-width   | _24px_                                            | -    |


## 在线调试

<debug-online />