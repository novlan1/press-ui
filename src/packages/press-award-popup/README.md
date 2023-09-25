---
url : pages/press/award-popup/award-popup
---

## AwardPopup 奖励弹出层


## 引入

```ts
import Press奖励弹出层 from 'press-ui/press-award-popup/press-award-popup';

export default {
  components: {
    Press奖励弹出层,
  }
}
```

## 代码演示

### 基础用法

```html
 <PressAwardPopup
  v-if="show"
  :award-list="awardList"
  :tip-title="tipTitle"
  confirm-text="确认"
  @dimissDialog="onCloseAwardDialog"
  @onConfirm="onCloseAwardDialog"
/>
```

```ts
export default {
  data() {
    return {
      show: false,
      awardList: [],
      tipTitle: '没有获得奖励哦～',
    }
  },
  methods: {
    onCloseAwardDialog() {
      this.show = false;
    },
  }
}
```

## API

### Props

| 参数             | 说明                                   | 类型      | 默认值                                                                               |
| ---------------- | -------------------------------------- | --------- | ------------------------------------------------------------------------------------ |
| title            | 标题                                   | _string_  | -                                                                                    |
| award-list       | 奖励列表                               | _array_   | -                                                                                    |
| cur-role-name    | 角色名称                               | _string_  | -                                                                                    |
| is-game-prize    | 是否仅为游戏礼包                       | _boolean_ | `true`                                                                               |
| tip-title        | 奖励为空时，弹窗标题，为空时弹窗不显示 | _string_  | -                                                                                    |
| confirm-text     | 奖励为空时，弹窗确认按钮文案           | _string_  | -                                                                                    |
| cancel-text      | 奖励为空时，弹窗取消按钮文案           | _string_  | -                                                                                    |
| is-hor           | 是否为横版                             | _boolean_ | `false`                                                                              |
| hor-title        | 横版弹窗标题                           | _string_  | `恭喜获得`                                                                           |
| hor-sub-title    | 横版弹窗副标题                         | _string_  | ``                                                                                   |
| hor-confirm-text | 横版确认按钮文案                       | _string_  | `立即兑换`                                                                           |
| hor-cancel-text  | 横版取消按钮文案                       | _string_  | `关闭`                                                                               |
| hor-desc         | 横版弹窗描述                           | _string_  | `本次仅发放游戏礼包（其他奖励请联系办赛方），已发放到「我的奖品」，请在有效期内兑换` |



### Events

| 事件名                 | 说明                     | 参数 |
| ---------------------- | ------------------------ | ---- |
| dimissDialog           | 弹窗关闭                 | -    |
| onGoAward              | 点击“我的奖品”高亮文字   | -    |
| onShowSwitchRoleDialog | 点击切换角色             | -    |
| onExchange             | 点击确认领取             | -    |
| onConfirm              | 奖品为空时，点击确认按钮 | -    |
| onCancel               | 奖品为空时，点击取消按钮 | -    |


### awardList 类型

```ts
type IAwardList = Array<{
  goodscfg: {
    goodsicon: string; // 图片
  };
  displayName: string; // 名称
  propType: string; // 描述
  displayOverduetime: string; // 兑换有效期
  propsPrice: string; // 价格
  propsNum: string; // 数量
  isShowCheck: boolean; // 是否显示选择框
  isChecked: boolean; // 是否被选中
}>
```
