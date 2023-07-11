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

|       属性名        |    类型    |  默认值  |                    说明                     |
| :-----------------: | :--------: | :------: | :-----------------------------------------: |
|        show         | _boolean_  | `false`  |                  是否显示                   |
|        title        |  _string_  | 温馨提示 |                    标题                     |
|       content       |  _string_  |    -     |                    内容                     |
|    html-content     |  _string_  |    -     |                  html内容                   |
|         src         |  _string_  |    -     |                  图片地址                   |
|    confirm-text     |  _string_  |   确定   |                确认按钮文案                 |
|     cancel-text     |  _string_  |    -     |                取消按钮文案                 |
|       z-index       |  _number_  |   `99`   |                    层级                     |
|  can-touch-remove   | _boolean_  |  `true`  |            是否可以点击蒙层关闭             |
|     dialog-type     |  _number_  |   `1`    | 弹窗类型，`1`为普通弹窗，`2`为`loading`弹窗 |
|   use-scroll-view   | _boolean_  | `false`  |          是否使用`scroll-view`包裹          |
|   on-click-cancel   | _function_ |  `null`  |               点击取消的事件                |
|  on-confirm-click   | _function_ |  `null`  |               点击确认的事件                |
|   on-click-image    | _function_ |  `null`  |               点击图片的事件                |
| on-long-press-image | _function_ |  `null`  |               长按图片的事件                |

