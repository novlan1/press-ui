---
url : pages/press/hor-dialog/hor-dialog
---

## HorPopup 横版弹窗


## 引入

```ts
import PressHorPopup from 'press-ui/press-hor-dialog/press-hor-dialog';

export default {
  components: {
    PressHorPopup,
  }
}
```

## 代码演示

### 基础用法

```html
<PressHorPopup
  v-if="show"
  title="标题"
  @close="close"
>
  <div style="color: #fff; margin: 10px 20px;font-size: 12px;">
    不要过来堆X山
  </div>
</PressHorPopup>
```

```ts
export default {
  methods: {
    close() {
      this.show = false;
    },
  },
};
```


## API

### Props

| 参数          | 说明                 | 类型      | 默认值 |
| ------------- | -------------------- | --------- | ------ |
| popup-with    | 弹窗宽度，单位 `rem` | _string_  | `5.6`  |
| title         | 标题                 | _string_  | -      |
| is-show-close | 是否展示关闭按钮     | _boolean_ | `true` |


### Events

| 事件名 | 说明     | 参数 |
| ------ | -------- | ---- |
| close  | 点击关闭 | -    |


### Slot


| 名称 | 说明     |
| ---- | -------- |
| -    | 弹窗内容 |
