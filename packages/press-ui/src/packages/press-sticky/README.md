---
url : pages/press/sticky/sticky
---

## Sticky 粘性布局


Sticky 组件与 CSS 中position: sticky属性实现的效果一致，当组件在屏幕范围内时，会按照正常的布局排列，当组件滚出屏幕范围时，始终会固定在屏幕顶部。

> 内部使用了 onPageScroll，暂不支持 iOS、Android 平台。

## 引入

```ts
import PressSticky from 'press-ui/press-sticky/press-sticky';

export default {
  components: {
    PressSticky,
  }
}
```

## 代码演示

### 基础用法

将内容包裹在`Sticky`组件内即可。

```html
<press-sticky>
  <div class="btn1">
    基础用法
  </div>
</press-sticky>
```

### 吸顶距离

通过`offset-top`属性可以设置组件在吸顶时与顶部的距离。

```html
<press-sticky
  :offset-top="50"
>
  <div
    class="btn2"
  >
    吸顶距离
  </div>
</press-sticky>
```

### 指定容器

通过`container`属性可以指定组件的容器，页面滚动时，组件会始终保持在容器范围内，当组件即将超出容器底部时，会返回原位置。

```html
<div
  id="container"
  ref="container"
  style="height: 150px;background: #eee;"
>
  <press-sticky :container="container">
    <div class="btn3">
      指定容器
    </div>
  </press-sticky>
</div>
```

```js
export default {
  data() {
    const that = this;
    return {
      container() {
        const res = that.$refs.container;
        return res;
      },
    };
  },
};
```

## API

### Props

| 参数       | 说明                                                         | 类型       | 默认值 |
| ---------- | ------------------------------------------------------------ | ---------- | ------ |
| offset-top | 吸顶时与顶部的距离，单位`px`                                 | _number_   | `0`    |
| z-index    | 吸顶时的 z-index                                             | _number_   | `99`   |
| container  | 一个函数，返回容器对应的 NodesRef 节点                       | _function_ | -      |
| scroll-top | 当前滚动区域的滚动位置，非 `null` 时会禁用页面滚动事件的监听 | _number_   | -      |

### Events

| 事件名 | 说明       | 回调参数                                       |
| ------ | ---------- | ---------------------------------------------- |
| scroll | 滚动时触发 | { scrollTop: 距离顶部位置, isFixed: 是否吸顶 } |


## 常见问题

### 滚动元素

小程序下滚动元素需为`page`，因为`press-sticky`监听的是`onPageScroll`事件。

H5不限制滚动元素，`press-sticky`组件内部会自动寻找。
