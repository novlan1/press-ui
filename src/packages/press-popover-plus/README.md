---
url : pages/press/popover-plus/popover-plus
---

## PopoverPlus 弹出框

弹出层的一种，与 PopupPlus 相比是局部的，可用于承载一些选项卡。

## 引入

```ts
import PressPopoverPlus from 'press-ui/press-popover-plus/press-popover-plus';

export default {
  components: {
    PressPopoverPlus,
  }
}
```

## 代码演示

### 基础用法

支持 `show` 和 `placement` 属性。

```html
<div class="popover-wrap">
  <PressPopoverPlus
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
  </PressPopoverPlus>
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

### 点击外部元素后关闭

监听 `close` 事件，将 `show` 设置为 `false` 即可。

```html
<PressPopoverPlus
  :show="show"
  :placement="direction"
  @close="onClose"
>
  <div
    v-for="(item,index) of dataList"
    :key="index"
    @click.stop="noop"
  >
    {{ t('options', item) }}
  </div>
</PressPopoverPlus>
```

```js
export default {
  data() {
    return {
      show: true,
    }
  },
  methods: {
    onClose() {
      this.show = false;
    },
  }
}
```

## API

### Props

| 参数                   | 说明                         | 类型      | 默认值 |
| ---------------------- | ---------------------------- | --------- | ------ |
| show                   | 是否显示                     | _boolean_ | true   |
| placement              | 弹出框位置                   | _string_  | right  |
| custom-class           | 自定义类名                   | _string_  | -      |
| custom-style           | 自定义样式                   | _string_  | -      |
| close-on-click-outside | 是否在点击外部元素后关闭菜单 | _boolean_ | `true` |

### Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| close  | 关闭菜单时触发 | -        |


## 在线调试

<debug-online />
