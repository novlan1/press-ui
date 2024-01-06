---
url : pages/act/act-explain-dialog/act-explain-dialog
horHeight: 425
---

## ActExplainDialog 活动规则弹窗


## 引入

```ts
import PressActExplainDialog from 'press-ui/press-act-explain-dialog/press-act-explain-dialog';

export default {
  components: {
    PressActExplainDialog,
  }
}
```

## 代码演示

### 基础用法

```html
<PressActExplainDialog
  :show.sync="show"
  :show-button="true"
  :props-data="propsData"
/>
```

```ts
const PROPS_DATA = {
  title: '标题',
  content: Array.from({ length: 10 }).map((_, index) => `${index + 1}. Press UI 是一套支持 uni-app、普通 Vue 项目，同时兼容 Vue2 和 Vue3 的组件库`)
    .join('<br/>'),
};

export default {
  data() {
    return {
      show: true,
      propsData: PROPS_DATA,
    }
  }
}
```


## API

### Props



| 参数            | 说明                                            | 类型      | 默认值  |
| --------------- | ----------------------------------------------- | --------- | ------- |
| show            | 是否展示                                        | _boolean_ | `false` |
| show-button     | 是否显示按钮                                    | _boolean_ | `false` |
| hide-base-style | 是否隐藏基础样式                                | _boolean_ | `false` |
| props-data      | 弹窗文案，包括标题和内容                        | _Object_  | -       |
| use-tip-class   | 是否使用 `tip-comp` 为前缀的类名                | _boolean_ | `false` |
| hide-tip-style  | 是否隐藏 `@TIP_STYLE_NAME` 关键词编译时加的样式 | _boolean_ | `false` |


### propsData

```ts
type IPropsData = {
  title: string;
  content: string;
}
```

## 自定义样式

<custom-style />
