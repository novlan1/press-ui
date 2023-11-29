---
url : pages/act-detail/act-input-q-q/act-input-q-q
---

## ActInputQQ 输入QQ弹窗


## 引入

```ts
import PressActInputQQ from 'press-ui/press-act-input-q-q/press-act-input-q-q';

export default {
  components: {
    PressActInputQQ,
  }
}
```

## 代码演示

### 基础用法

```html
<PressActInputQQ
  :show.sync="show"
  :qqnumber.sync="qqNumber"
  @clickButton="clickButton"
/>
```

```ts
export default {
   data() {
    return {
      show: true,
      qqNumber: '1',
    };
  },
  methods: {
    clickButton() {
      this.onGTip('[clickButton]');
    },
  },
}
```

## API

### Props

| 参数           | 说明                                            | 类型      | 默认值  |
| -------------- | ----------------------------------------------- | --------- | ------- |
| show           | 是否显示弹窗                                    | _boolean_ | `false` |
| qqnumber       | QQ号码                                          | _string_  | `true`  |
| use-tip-class  | 是否使用 `tip-comp` 为前缀的类名                | _boolean_ | `false` |
| hide-tip-style | 是否隐藏 `@TIP_STYLE_NAME` 关键词编译时加的样式 | _boolean_ | `false` |



### Events

| 事件名          | 说明         | 参数                |
| --------------- | ------------ | ------------------- |
| clickButton     | 点击确认     | -                   |
| update:show     | 更新展示状态 | `show`，是否展示    |
| update:qqnumber | 更新 QQ      | `qqNumber`，QQ 号码 |
