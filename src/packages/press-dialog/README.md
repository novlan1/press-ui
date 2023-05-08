---
url : pages/press/dialog/dialog
---

## Dialog 弹窗


弹窗组件，支持函数式调用

### 基本用法

**示例**

```html
<press-dialog id="tip-match-comm-tips-dialog" />
```

```ts
import PressDialogHandler from 'src/packages/press-dialog';

export default {
  methods: {
    onShowDialog() {
      PressDialogHandler.show({
        title: '提示',
        content: '仅限队长报名，发给队长来报名吧！',
        confirmText: '确认',
        cancelText: '取消',
      }).then(() => {})
        .catch(() => {});
    },
  },
};
```

### 组件调用

press-dialog支持组件调用，可以嵌入额外内容。

多例模式可以用组件调用方式。

```html
<PressDialogComp
  title="标题"
  :show="show"
  content="Some fake news"
  @confirm="onConfirm"
/>
```

```js
export default {
  data() {
    return {
      show: true,
    }
  },
  methods: {
    onConfirm() {
      this.show = false;
    },
  }
};
```



## API

### Props

|    属性名    |   类型    |  默认值  |     说明     |
| :----------: | :-------: | :------: | :----------: |
|     show     | _boolean_ |  false   |   是否显示   |
|     src      | _string_  |    -     |   图片地址   |
|    title     | _string_  | 温馨提示 |     标题     |
|   content    | _string_  |    -     |     内容     |
| html-content | _string_  |    -     |   html内容   |
| confirm-text | _string_  |   确定   | 确认按钮文案 |
| cancel-text  | _string_  |    -     | 取消按钮文案 |
|   z-index    | _number_  |    99    |     层级     |

