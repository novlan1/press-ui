---
url : pages/press/teleport/teleport
---

## Teleport 传送门

Vue2 版本的 Teleport，目前仅支持 H5、微信小程序。

## 引入

```ts
import PressTeleport from 'press-ui/press-teleport/press-teleport';

export default {
  components: {
    PressTeleport,
  }
}
```

## 代码演示

### 基础用法

下面是一个示例， `demo-text` 如果使用了 `teleport`，会放到 `body` 下，所以会铺满页面下半部分。如果不使用 `teleport` 的话，则只会放到 `demo-inner` 下，而 `demo-inner` 高度只有 `300px`，所以不会铺满页面下半部分。

```html
<div class="demo-inner">
  <PressTeleport
    to="body"
    :disabled="disabled"
  >
    <div class="demo-text">
      test
    </div>
  </PressTeleport>
</div>
```


```ts
export default {
  data() {
    return {
      disabled: false,
    }
  }
}
```

```scss
.demo-inner {
  position: relative;
  height: 300px;
}
.demo-text {
  width: 100%;
  position: absolute;
  bottom: 0;
  top: 200px;
  z-index: 5000;
  padding: 10px;

  background: rgba(0, 0, 0, 0.1);
  color: #5baae7;
  font-size: 16px;
}
```

## API

### Props

| 参数     | 说明                                                               | 类型      | 默认值  |
| -------- | ------------------------------------------------------------------ | --------- | ------- |
| to       | 传送目标位置，作为 `querySelector` 参数，仅 H5 下生效              | _string_  | `body`  |
| where    | 插入在目标之前，还是之后，可选值为 `after`, `before`，仅 H5 下生效 | _string_  | `after` |
| disabled | 是否禁用                                                           | _boolean_ | `false` |

## 在线调试

<debug-online />

## 常见问题

### 兼容 v-if

`v-if` 包裹层应该在 `press-teleport` 的顶层，而不是内部，否则可能是渲染不出。

下面是正确代码：

```vue
<template v-if="mShowFaceShareQRDialog">
  <PressTeleport>
    <UIInviteFaceDialog
      :share-url="mShowShareFaceUrl"
      @close="mShowFaceShareQRDialog=false"
    />
  </PressTeleport>
</template>
```

而不是：

```html
<PressTeleport>
  <UIInviteFaceDialog
    v-if="mShowFaceShareQRDialog"
    :share-url="mShowShareFaceUrl"
    @close="mShowFaceShareQRDialog=false"
  />
</PressTeleport>
```
