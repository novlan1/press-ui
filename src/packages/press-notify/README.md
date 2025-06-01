---
url : pages/press/notify/notify
---

## Notify 消息提示

在页面顶部展示消息提示，支持函数调用和组件调用两种方式。

## 引入

```ts
import PressNotify from 'press-ui/press-notify/press-notify.vue';

export default {
  components: {
    PressNotify,
  }
}
```

## 代码演示

### 基础用法

```js
import { showNotify } from 'press-ui/press-notify';

showNotify('通知内容');
```

```html
<!-- 在页面内添加对应的节点 -->
<press-notify id="press-notify" />
```

### 通知类型

支持`primary`、`success`、`warning`、`danger`四种通知类型，默认为`danger`。

```js
// 主要通知
showNotify({ type: 'primary', message: '通知内容' });

// 成功通知
showNotify({ type: 'success', message: '通知内容' });

// 危险通知
showNotify({ type: 'danger', message: '通知内容' });

// 警告通知
showNotify({ type: 'warning', message: '通知内容' });
```

### 自定义通知

自定义消息通知的颜色和展示时长。

```js
showNotify({
  message: '自定义颜色',
  color: '#ad0000',
  background: '#ffe1e1',
});

showNotify({
  message: '自定义时长',
  duration: 1000,
});
```

### 自定义选择器

```js
showNotify({
  message: '自定义节点选择器',
  duration: 1000,
  selector: '#custom-selector',
});
```

```html
<!-- 在页面内添加自定义节点 -->
<press-notify id="custom-selector" />
```

## API

### 方法

| 方法名                                                   | 说明      | 参数                 | 返回值                           |
| -------------------------------------------------------- | --------- | -------------------- | -------------------------------- |
| showNotify，同 Notify                                    | 展示提示  | `options \| message` | notify 实例                      |
| closeNotify，同 Notify.clear                             | 关闭提示  | `options`            | `void`                           |
| setNotifyDefaultOptions，同 Notify.setDefaultOptions     | `options` | `void`               | 修改默认配置，对所有 Notify 生效 |
| resetNotifyDefaultOptions，同 Notify.resetDefaultOptions | -         | `void`               | 重置默认配置，对所有 Notify 生效 |

### Options

| 参数             | 说明                                                   | 类型       | 默认值         |
| ---------------- | ------------------------------------------------------ | ---------- | -------------- |
| type             | 类型，可选值为 `primary` `success` `warning`           | _string_   | `danger`       |
| message          | 展示文案，支持通过`\n`换行                             | _string_   | `''`           |
| duration         | 展示时长(ms)，值为 0 时，notify 不会消失               | _number_   | `3000`         |
| selector         | 自定义节点选择器                                       | _string_   | `press-notify` |
| color            | 字体颜色                                               | _string_   | `#fff`         |
| top              | 顶部距离                                               | _number_   | `0`            |
| background       | 背景颜色                                               | _string_   | -              |
| context          | 选择器的选择范围，可以传入自定义组件的 this 作为上下文 | _object_   | 当前页面       |
| onClick          | 点击时的回调函数                                       | _function_ | -              |
| onOpened         | 完全展示后的回调函数                                   | _function_ | -              |
| onClose          | 关闭时的回调函数                                       | _function_ | -              |
| safeAreaInsetTop | 是否留出顶部安全距离（状态栏高度）                     | _boolean_  | `false`        |


## 在线调试

<debug-online />
