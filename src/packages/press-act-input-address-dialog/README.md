---
url : pages/act/act-input-address-dialog/act-input-address-dialog
horHeight: 450
---

## ActInputAddressDialog 填写地址弹窗


## 引入

```ts
import PressActInputAddressDialog from 'press-ui/press-act-input-address-dialog/press-act-input-address-dialog';

export default {
  components: {
    PressActInputAddressDialog,
  }
}
```

## 代码演示

### 基础用法

```html
<PressActInputAddressDialog
  :show.sync="show"
  :props-data.sync="propsData"
  @clickButton="clickButton"
/>
```

```ts
const PROPS_DATA = {
  name: '名字',
  mobile: '123456789',
  zipcode: '888888',
  district: '地区1',
  detail_addr: '详细地址:',
  province: '',
  city: '',
};

export default {
  data() {
    return {
      show: true,
      propsData: PROPS_DATA,
    };
  },
  methods: {
    clickButton() {
      console.log('[clickButton]', this.propsData);
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
| cancel-text    | 取消按钮                                        | _string_  | `取消`  |
| confirm-text   | 确认按钮                                        | _string_  | `确定`  |
| area-list      | 省市区数据，格式见 `area` 组件                  | _object_  | -       |
| props-data     | 弹窗数据                                        | _object_  | -       |
| game-name      | 游戏名称                                        | _string_  | -       |
| type           | 类型，可选值为 `e-sport`                        | _string_  | -       |
| use-tip-class  | 是否使用 `tip-comp` 为前缀的类名                | _boolean_ | `false` |
| hide-tip-style | 是否隐藏 `@TIP_STYLE_NAME` 关键词编译时加的样式 | _boolean_ | `false` |

### Events

| 事件名           | 说明         | 回调参数 |
| ---------------- | ------------ | -------- |
| clickButton      | 点击确认按钮 | -        |
| clickCloseButton | 点击取消按钮 | -        |


### propsData

```ts
type IPropsData = {
  name: string; // 姓名
  mobile: string; // 手机号
  zipcode: string; // 邮编

  province: string; // 省份
  city: string; // 城市
  district: string; // 区县
  detail_addr: string; // 详细地址
}
```

## 自定义样式

<custom-style />
