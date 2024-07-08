---
url : pages/press/dialog/dialog
---

## Dialog 弹窗


弹窗组件，支持函数式调用

## 引入

```ts
import PressDialog from 'press-ui/press-dialog/press-dialog';

export default {
  components: {
    PressDialog,
  }
}
```

### 基本用法

**示例**

```html
<press-dialog id="tip-match-comm-tips-dialog" />
```

```ts
import PressDialog from 'press-ui/press-dialog';

export default {
  methods: {
    showDialog() {
      PressDialog.show({
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

### 嵌入图片


```ts
export default {
  methods: {
    showDialog() {
      PressDialog.show({
        title: '提示',
        content: '仅限队长报名，发给队长来报名吧！',
        confirmText: '确认',
        cancelText: '取消',
        src: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/qrcode/qrcode-wx-mp.png',
        onLongPressImage: () => {
          console.log('长按图片')
        }
      }).then(() => {})
        .catch(() => {});
    }
  }
}
```

### 嵌入HTML内容

```ts
export default {
  methods: {
    showDialog() {
      PressDialog.show({
        title: '提示',
        htmlContent = '<div>自定义<span style="color: red;">内容</span></div>',
        confirmText: '确认',
        cancelText: '取消',
      }).then(() => {})
        .catch(() => {});
    }
  }
}
```


### 嵌入输入框并异步关闭

设置 `showField` 为 `true`，可展示输入框。

可通过 `onConfirmClick` 进行输入内容的校验，返回`false`、`Promise<false>`则不会关闭。

```ts
export default {
  methods: {
    showDialog() {
      PressDialog.show({
        title: '提示',
        content: '',
        confirmText: '确认',
        cancelText: '取消',
        showField: true,
        fieldPlaceHolder:'随便输点什么吧',
        fieldValue: 'Press UI',
        canTouchRemove: false,
        onConfirmClick = (context) => {
          if (!context.inputValue) {
            this.onGTip('请输入内容');
            return false;
          }
          this.onGTip(`内容: ${context.inputValue}`);
          return true;
        };
      }).then(() => {})
        .catch(() => {});
    }
  }
}
```

### 组件调用

press-dialog支持组件调用，可以嵌入额外内容。

多例模式可以用组件调用方式，以及动态改变按钮文案，比如实现倒计时，也可以用组件模式。

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

| 参数                | 说明                                        | 类型       | 默认值     |
| ------------------- | ------------------------------------------- | ---------- | ---------- |
| show                | 是否显示                                    | _boolean_  | `false`    |
| title               | 标题                                        | _string_   | `温馨提示` |
| content             | 内容                                        | _string_   | -          |
| html-content        | html内容                                    | _string_   | -          |
| src                 | 图片地址                                    | _string_   | -          |
| confirm-text        | 确认按钮文案                                | _string_   | `确定`     |
| cancel-text         | 取消按钮文案                                | _string_   | -          |
| z-index             | 层级                                        | _number_   | `99`       |
| can-touch-remove    | 是否可以点击蒙层关闭                        | _boolean_  | `true`     |
| dialog-type         | 弹窗类型，`1`为普通弹窗，`2`为`loading`弹窗 | _number_   | `1`        |
| use-scroll-view     | 是否使用`scroll-view`包裹                   | _boolean_  | `false`    |
| on-click-cancel     | 点击取消的事件                              | _function_ | `null`     |
| on-confirm-click    | 点击确认的事件                              | _function_ | `null`     |
| on-click-image      | 点击图片的事件                              | _function_ | `null`     |
| on-long-press-image | 长按图片的事件                              | _function_ | `null`     |
| show-field          | 是否显示输入框                              | _boolean_  | `false`    |
| field-value         | 输入框内容                                  | _string_   | -          |
| field-placeHolder   | 输入框占位文字                              | _string_   | -          |

## 在线调试

<debug-online />
