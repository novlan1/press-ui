---
url : pages/press/overlay/overlay
---
## Overlay 遮罩层

创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。

## 引入

```ts
import PressOverlay from 'press-ui/press-overlay/press-overlay.vue';

export default {
  components: {
    PressOverlay,
  }
}
```

## 代码演示


### 基础用法

```html
<button
  type="primary"
  @click="onClickShow('normal')"
>
  显示遮罩层
</button>

<press-overlay
  :show="options.normal"
  @click="onClickHide('normal')"
/>
```

```js
export default {
  data() {
    return {
      options: {
        normal: false,
        content: false,
      },
    };
  },
  methods: {
    onClickShow(type) {
      this.options[type] = true;
    },
    onClickHide(type) {
      this.options[type] = false;
    },
  },
};
```

### 嵌入内容

通过默认插槽可以在遮罩层上嵌入任意内容。

```html
<button
  type="primary"
  @click="onClickShow('content')"
>
  嵌入内容
</button>

<press-overlay
  :show="options.content"
  @click="onClickHide('content')"
>
  <div class="wrapper">
    <div
      class="block"
      catch:tap="noop"
    />
  </div>
</press-overlay>
```

```js
export default {
  data() {
    return {
      options: {
        normal: false,
        content: false,
      },
    };
  },
  methods: {
    onClickShow(type) {
      this.options[type] = true;
    },
    onClickHide(type) {
      this.options[type] = false;
    },
    noop() {},
  },
};
```

```css
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
```

### Props

| 参数                 | 说明                                             | 类型               | 默认值  |
| -------------------- | ------------------------------------------------ | ------------------ | ------- |
| show                 | 是否展示遮罩层                                   | _boolean_          | `false` |
| z-index              | z-index 层级                                     | _string \| number_ | `1`     |
| duration             | 动画时长，单位秒                                 | _string \| number_ | `0.3`   |
| class-name           | 自定义类名                                       | _string_           | -       |
| custom-style         | 自定义样式                                       | _string_           | -       |
| lock-scroll `v1.7.3` | 是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动 | _boolean_          | true    |

### Events

| 事件名 | 说明       | 回调参数 |
| ------ | ---------- | -------- |
| click  | 点击时触发 | -        |

### Slots

| 名称 | 说明                               |
| ---- | ---------------------------------- |
| -    | 默认插槽，用于在遮罩层上方嵌入内容 |


## 在线调试

<debug-online />
