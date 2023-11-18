---
url : pages/press/q-r-code-popup/q-r-code-popup
---

## QRCodePopup 二维码弹出层


## 引入

```ts
import PressQRCodePopup from 'press-ui/press-q-r-code-popup/press-q-r-code-popup';

export default {
  components: {
    PressQRCodePopup,
  }
}
```

## 代码演示

### 基础用法

```html
<PressQRCodePopup
  v-if="show"
  :qr-code-url="currentUrl"
  :type="type"
  @onCancel="show = false"
/>
```

```ts
export default {
  components: {
    PressQRCodePopup,
  },
  data() {
    let currentUrl = 'https://baidu.com';
    // #ifdef H5
    currentUrl = document.location.href;
    // #endif

    return {
      currentUrl,
      show: false,
      type: 1,
    };
  },
  methods: {
    showDialog() {
      this.show = true;
    },
  },
};
```

## API

### Props

| 参数        | 说明                                  | 类型     | 默认值 |
| ----------- | ------------------------------------- | -------- | ------ |
| qr-code-url | 二维码 URL                            | _string_ | -      |
| type        | 扫码类型，可选值为 `1`(QQ), `2`(微信) | _number_ | `2`    |
| title       | 标题，为空时根据 `type` 自动生成      | _string_ | -      |



### Events

| 事件名   | 说明     | 参数 |
| -------- | -------- | ---- |
| onCancel | 点击取消 | -    |
