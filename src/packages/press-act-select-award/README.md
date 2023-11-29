---
url : pages/act-detail/act-select-award/act-select-award
---

## ActSelectAward 选择奖励弹窗


## 引入

```ts
import PressActSelectAward from 'press-ui/press-act-select-award/press-act-select-award';

export default {
  components: {
    PressActSelectAward,
  }
}
```

## 代码演示

### 基础用法

```html
<PressActSelectAward
  :show.sync="show"
  :list="MOCK_AWARD_LIST"
/>
```

```ts
const MOCK_AWARD_LIST = [{
  giftpic: 'https://image-1251917893.file.myqcloud.com/TIP_XCX/igame/pvp/qb.png',
  giftname: 'Q币1',
  leftGiftTips: 'leftGiftTips',
  leftGiftCount: 5,
},
{
  giftpic: 'https://image-1251917893.file.myqcloud.com/TIP_XCX/igame/pvp/qb.png',
  giftname: 'Q币2',
  leftGiftTips: 'leftGiftTips',
},
{
  giftpic: 'https://image-1251917893.file.myqcloud.com/TIP_XCX/igame/pvp/qb.png',
  giftname: 'Q币3',
  leftGiftTips: 'leftGiftTips',
}];

export default {
  data() {
    return {
      show: true,
      MOCK_AWARD_LIST,
    };
  },
  methods: {
    clickCloseButton() {
      this.onGTip('[clickCloseButton]');
      this.show = false;
    },
    clickButton(item) {
      console.log('[clickButton]', item);
      this.onGTip('[clickButton]');
    },
  },
};
```

## API

### Props

| 参数           | 说明                                            | 类型      | 默认值  |
| -------------- | ----------------------------------------------- | --------- | ------- |
| show           | 是否显示弹窗                                    | _boolean_ | `false` |
| list           | 奖励列表                                        | _array_   | -       |
| use-tip-class  | 是否使用 `tip-comp` 为前缀的类名                | _boolean_ | `false` |
| hide-tip-style | 是否隐藏 `@TIP_STYLE_NAME` 关键词编译时加的样式 | _boolean_ | `false` |


### Events

| 事件名           | 说明         | 参数        |
| ---------------- | ------------ | ----------- |
| update:show      | 更新是否展示 | `show`      |
| clickButton      | 点击确认     | `awardItem` |
| clickCloseButton | 点击关闭     | -           |

### Types

```ts
type IList = Array<{
  giftpic: string; // 图片
  giftname: string; // 名称
  leftGiftTips: string; // 提示
  leftGiftCount: string; // 剩余数量
}>
```
