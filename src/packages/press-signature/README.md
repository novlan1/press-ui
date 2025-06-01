---
url : pages/press/signature/signature
---

## Signature 签名

用于签名场景的组件。

## 引入

```ts
import PressSignature from 'press-ui/press-signature/press-signature.vue';

export default {
  components: {
    PressSignature,
  }
}
```

## 代码演示

### 基础用法

当点击确认按钮时，组件会触发 `submit` 事件，事件的第一个参数为 `data`，包含以下字段：

- `image`：签名对应的图片，为 base64 字符串格式。若签名为空，则返回空字符串。
- `canvas`：Canvas 元素。

```html
<press-signature @submit="onSubmit" @clear="onClear" />
<press-image v-if="image" :src="image" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const image = ref('');
    const onSubmit = (data) => {
      image.value = data.image;
    };
    const onClear = () => {};

    return {
      image,
      onSubmit,
      onClear,
    };
  },
};
```

### 自定义颜色

通过 `pen-color` 来自定义笔触颜色。

```html
<press-signature pen-color="#ff0000" @submit="onSubmit" @clear="onClear" />
```

### 自定义线宽

通过 `line-width` 来自定义线条宽度。

```html
<press-signature :line-width="6" @submit="onSubmit" @clear="onClear" />
```

### 自定义背景颜色

通过 `background-color` 来自定义背景颜色。

```html
<press-signature background-color="#eee" @submit="onSubmit" @clear="onClear" />
```

## API

### Props

| 参数                | 说明                                 | 类型     | 默认值 |
| ------------------- | ------------------------------------ | -------- | ------ |
| type                | 导出图片类型                         | _string_ | `png`  |
| pen-color           | 笔触颜色，默认黑色                   | _string_ | `#000` |
| line-width          | 线条宽度                             | _number_ | `3`    |
| background-color    | 背景颜色                             | _string_ | -      |
| tips                | 当不支持 Canvas 的时候出现的提示文案 | _string_ | -      |
| clear-button-text   | 清除按钮文案                         | _string_ | `清空` |
| confirm-button-text | 确认按钮文案                         | _string_ | `确认` |
| file-type           | 导出图片格式，可选值为 `png`         | _string_ | `jpg`  |

### Events

| 事件名  | 说明               | 回调参数                                             |
| ------- | ------------------ | ---------------------------------------------------- |
| start   | 开始签名时触发     | -                                                    |
| end     | 结束签名时触发     | -                                                    |
| signing | 签名过程中触发     | _event: TouchEvent_                                  |
| submit  | 点击确定按钮时触发 | _data: { image: string; canvas: HTMLCanvasElement }_ |
| clear   | 点击取消按钮时触发 | -                                                    |

### 方法

通过 ref 可以获取到 Signature 实例并调用实例方法。

| 方法名 | 说明                                                       | 参数 | 返回值 |
| ------ | ---------------------------------------------------------- | ---- | ------ |
| resize | 外层元素大小或组件显示状态变化时，可以调用此方法来触发重绘 | -    | -      |
| clear  | 可调用此方法来清除签名                                     | -    | -      |
| submit | 触发 `submit` 事件，与点击确认按钮的效果等价               | -    | -      |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                 | 默认值                      | 描述         |
| ------------------------------------ | --------------------------- | ------------ |
| --press-signature-padding            | _var(--press-padding-xs)_   | -            |
| --press-signature-content-height     | _200px_                     | 画布高度     |
| --press-signature-content-background | _var(--press-background-2)_ | 画布背景色   |
| --press-signature-content-border     | _1px dotted #dadada_        | 画布边框样式 |
