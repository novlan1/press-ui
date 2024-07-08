---
url : pages/press/popover/popover
---

## Popover 弹出框

弹出层的一种，与 Popup 相比是局部的，可用于承载一些选项卡。

## 引入

```ts
import PressPopover from 'press-ui/press-popover/press-popover';

export default {
  components: {
    PressPopover,
  }
}
```

## 代码演示

### 基础用法

```html
<div class="popover-wrap">
  <PressPopover
    :show="true"
    placement="bottom"
    custom-class="demo-nav-popover demo-nav-popover--bottom"
  >
    <div
      v-for="(item,index) of list"
      :key="index"
      class="demo-nav-item"
    >
      选项{{ item }}
    </div>
  </PressPopover>
</div>
```

```js
export default {
  data() {
    return {
      list: [1, 2, 3],
    }
  }
}
```

```scss
.popover-wrap {
  position: relative;
  width: 100%;
  height: 10px;

  .demo-nav-popover {
    top: 30px;
    bottom: auto;
    padding: 0;
    background: #09134e;
    &--top {
      left: 56px;
      right: auto;
    }
  }
  .demo-nav-item {
    display: flex;
    align-items: center;
    padding: 0 22px;
    height: 40px;
    color: #fff;
  }
}
```

## API

### Props

| 参数         | 说明       | 类型      | 默认值 |
| ------------ | ---------- | --------- | ------ |
| show         | 是否显示   | _boolean_ | true   |
| placement    | 弹出框位置 | _string_  | right  |
| custom-class | 自定义类名 | _string_  | -      |
| custom-style | 自定义样式 | _string_  | -      |

## 在线调试

<debug-online />
