---
url : pages/act/act-prompt-dialog/act-prompt-dialog
---

## ActPromptDialog 活动提示弹窗


## 引入

```ts
import PressActPromptDialog from 'press-ui/press-act-prompt-dialog/press-act-prompt-dialog';

export default {
  components: {
    PressActPromptDialog,
  }
}
```

## 代码演示

### 基础用法

```html
<PressActPromptDialog
  :show="show"
  :props-data="PROPS_DATA"
  :use-tip-class="true"
  @onClickCloseButton="onClickCloseButton"
  @onClickCancelButton="onClickCancelButton"
  @clickButton="clickButton"
/>
```

```ts
const PROPS_DATA = {
  storePic: 'https://igame-10037599.cos.ap-shanghai.myqcloud.com/87df22ce-af9a-9a40-a36e-462999144c68.png',
  storeName: '商户名称',
  content: '是否开启该商户的福利领取提醒？',
  subContent: '若你的战绩达到领取标准，会收到站内信通知哦',
  btnText: '立即开启',
  cancelBtnText: '以后再说',
  btnClass: 'tip-comp-dialog-sure',
  cancelBtnClass: '',
  hasHook: false,
  dialogClass: false,
};


export default {
  data() {
    return {
      show: true,
      PROPS_DATA,
    }
  },
  methods: {
    onClickCloseButton() {
      this.onGTip('[onClickCloseButton]');
      this.show = false;
    },
    onClickCancelButton() {
      this.onGTip('[onClickCancelButton]');
      this.show = false;
    },
    clickButton() {
      this.onGTip('[clickButton]');
      this.show = false;
    },
  },
}
```

## API

### Props

| 参数           | 说明                                            | 类型      | 默认值  |
| -------------- | ----------------------------------------------- | --------- | ------- |
| show           | 是否显示                                        | _boolean_ | `false` |
| show-pic       | 是否显示图片                                    | _boolean_ | `false` |
| props-data     | 弹窗数据                                        | _Object_  | -       |
| show-close-btn | 是否显示关闭图标                                | _boolean_ | `true`  |
| use-tip-class  | 是否使用 `tip-comp` 为前缀的类名                | _boolean_ | `false` |
| hide-tip-style | 是否隐藏 `@TIP_STYLE_NAME` 关键词编译时加的样式 | _boolean_ | `false` |


### Events

| 事件名              | 说明         | 回调参数 |
| ------------------- | ------------ | -------- |
| onClickCancelButton | 点击取消按钮 | -        |
| clickButton         | 点击确认按钮 | -        |
| onClickCloseButton  | 点击关闭图标 | -        |

### propsData

```ts
type IPropsData = {
  dialogClass?: string; // 弹窗额外类名
  storePic?: string; // 商户图片
  storeName?: string; // 商户名称

  title?: string;
  content: string;
  subContent?: string // 额外说明文案
  isGold?: boolean; // subContent 是否添加 -gold 类名

  btnText?: string; // 确认按钮文案
  cancelBtnText?: string; // 取消按钮文案
  btnClass?: string; // 确认按钮额外类名
  cancelBtnClass?: string; // 取消按钮额外类名
  
  hasHook?: boolean; // 是否有对勾Dom
}
```

## 自定义样式

<custom-style />
