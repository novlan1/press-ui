---
url : pages/press/image-preview/image-preview
---

## ImagePreview 图片预览

图片放大预览，支持函数调用和组件调用两种方式。


## 引入

```ts
import PressImagePreview from 'press-ui/press-image-preview/press-image-preview';

export default {
  components: {
    PressImagePreview,
  }
}
```

## 代码演示

### 基础用法

先在页面中埋入组件，然后函数式调用`imagePreview`即可。


```html
<ImagePreview
  :id="FUNCTIONAL_ID_MAP.IMAGE_PREVIEW"
  mode="functional"
/>
```

```ts
import ImagePreview from 'press-ui/press-image-preview/press-image-preview.vue';
import { imagePreview } from 'press-ui/press-image-preview/index';


export default {
  components: {
    ImagePreview,
  },
  methods: {
    show() {
      imagePreview({
        selector: `#${FUNCTIONAL_ID_MAP.IMAGE_PREVIEW}`,
        images: this.images,
      }).then(() => {
      });
    }
  }
}
```

### 指定初始位置

支持传入配置对象，并通过 `startPosition` 选项指定图片的初始位置（索引值）。

```ts
imagePreview({
  selector: `#${FUNCTIONAL_ID_MAP.IMAGE_PREVIEW}`,
  images: this.images,
  startPosition: 1,
})
```

### 展示关闭按钮

设置 `closeable` 属性后，会在弹出层的右上角显示关闭图标，并且可以通过 `close-icon` 属性自定义图标，使用`close-icon-position` 属性可以自定义图标位置。


```ts
imagePreview({
  selector: `#${FUNCTIONAL_ID_MAP.IMAGE_PREVIEW}`,
  images: this.images,
  closeable: true,
})
```


### 监听关闭事件

`imagePreview`方法返回的是`promise`，关闭时状态会变成`resolved`，可以在`then`方法中监听。

```ts
imagePreview({
  selector: `#${FUNCTIONAL_ID_MAP.IMAGE_PREVIEW}`,
  images: this.images,
  closeable: true,
}).then(() => {
  this.onGTip(this.t('closeTip'));
})
```


### 异步关闭

通过 `asyncClose` 属性可以开启异步关闭，开启后异步关闭后，点击图片、蒙层、关闭按钮等，会将`promise`状态置为`rejected`，并传入实例对象参数，用户可以调用`context.closeDialog`方法关闭。


```ts
imagePreview({
  selector: `#${FUNCTIONAL_ID_MAP.IMAGE_PREVIEW}`,
  images: this.images,
  asyncClose: true,
}).catch(({ context }) => {
  context.closeDialog();
})
```

### 组件调用

支持组件调用，父组件需在`close`时设置`show`为`false`。

```html
<ImagePreview
  :show="show"
  closeable
  :start-position="1"
  :images="images"
  :custom-style="customStyle"
  @close="show = false"
/>
```



## API

### Props


| 参数                | 说明                             | 类型             | 默认值      |
| ------------------- | -------------------------------- | ---------------- | ----------- |
| show                | 是否显示，函数调用时固定为`true` | _boolean_        | `false`     |
| images              | 图片列表                         | _array<string\>_ | -           |
| start-position      | 初始位置                         | _number_         | `0`         |
| show-index          | 是否展示索引                     | _boolean_        | `false`     |
| async-close         | 是否异步关闭                     | _boolean_        | `false`     |
| closeable           | 是否显示关闭图标                 | _boolean_        | `false`     |
| close-icon          | 关闭图标名称                     | _string_         | `clear`     |
| close-icon-position | 关闭图标位置                     | _string_         | `top-right` |
| custom-style        | 自定义样式                       | _string_         | -           |
| custom-class        | 自定义类名                       | _string_         | -           |
| z-index             | 层级                             | _number_         | `10`        |

### Events

| 事件名 | 说明           | 参数             |
| ------ | -------------- | ---------------- |
| close  | 关闭时触发     | -                |
| change | 切换图片时触发 | active(当前索引) |

## 在线调试

<debug-online />
