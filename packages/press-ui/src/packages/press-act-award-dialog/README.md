---
url : pages/act/act-award-dialog/act-award-dialog
horHeight: 475
---

## ActAwardDialog 奖励弹窗


## 引入

```ts
import PressActAwardDialog from 'press-ui/press-act-award-dialog/press-act-award-dialog';

export default {
  components: {
    PressActAwardDialog,
  }
}
```

另外，该组件依赖 `vue-qrcode` 和 `vue-barcode`，使用者需先行安装。

## 代码演示

### 基础用法

```html
<PressActAwardDialog
  sub-btn-text="订阅"
  :show.sync="show"
  :issubscribe="isSubscribe"
  @clickSub="isSubscribe = !isSubscribe"
  @clickButton="show = false"
/>
```

```ts
export default {
  data() {
    return {
      show: true,
      isSubscribe: true,
    }
  }
}
```

## API

### Props

| 参数              | 说明                                            | 类型      | 默认值  |
| ----------------- | ----------------------------------------------- | --------- | ------- |
| show              | 是否展示                                        | _boolean_ | `false` |
| issubscribe       | 是否已订阅                                      | _boolean_ | `false` |
| sub-btn-text      | 订阅按钮文案                                    | _String_  | ``      |
| is-show-mp-button | 是否显示小程序按钮                              | _boolean_ | `true`  |
| props-data        | 弹窗数据，说明见下方                            | _Object_  | -       |
| water             | 物品详情，说明见下方                            | _Object_  | -       |
| water-list        | 物品列表，说明见下方                            | _Array_   | -       |
| use-tip-class     | 是否使用 `tip-comp` 为前缀的类名                | _boolean_ | `false` |
| hide-tip-style    | 是否隐藏 `@TIP_STYLE_NAME` 关键词编译时加的样式 | _boolean_ | `false` |


### Events

| 事件名              | 说明                      | 回调参数         |
| ------------------- | ------------------------- | ---------------- |
| clickButton         | 点击主按钮                | event            |
| update:show         | 更新是否展示              | false            |
| clickCloseButton    | 点击关闭按钮              | -                |
| clickEnter          | 点击更多福利              | -                |
| clickSub            | 点击订阅                  | -                |
| clickModfy          | 点击修改绑定的微信/手机号 | -                |
| clickUsedShop       | 点击商店                  | -                |
| clickExtraAct       | 点击查看活动              | url              |
| clickGoodItem       | 点击物品列表项            | waterItem, index |
| gotoGoodsDetailDesc | 查看物品详情              | waterItem, index |


### propsData

1. 对于每日任务类型，用活动数据，即 propsData
2. 其他的弹窗，则用 water


这里是不好的设计，数据应该提前处理好，然后给组件，组件应该不需要关心业务，后面需重构。

```ts
type IPropsData = {
  // 奖励类型：恭喜获得，你已获得，奖励说明
  type: 'get' | 'received' | 'detail'; 
  extraGiftDesc: string; // 核销文案
  limitDate: string; // 使用期限
  extraGiftName: string; // 宝箱
  btnText: string; // 按钮文案

  shopIcon: string; // 店铺图标
  shopName: string; // 店铺名称
  brandacttitle: string; // 品牌提示

  actList?: Array<{
    acquireStatus?: number; // 领取类型
    useWay?: number; // 1 线上，2 线下
    pic: string; // 图片
    benefittag: string; // 福利标签
    name: string;

    giftBoxData: {
      expireTime: string; // 过期时间
    }

    des: string; // 任务描述
    processDesc: string; // 任务进度
  }>;

  giftList?: Array<{
    giftid: number | string;
    giftname: string; 
    giftpic: string; 
  }>;

  extraAct?: IExtraAct;
}

// 核销相关
type IExtraAct = {
  img: string; // 图片
  title: string; // 标题
  desc: string; // 描述
  link: string; // 活动链接
}
```


### water

```ts
type IWater = {
  goodscfg: {
    goodsicon: string; // 物品图片地址
    goodsname: string; // 物品名称
    goodsdetail: string; //其他说明
  };
  benefitTag: string; // 标签
  displayOverduetime: string; // 兑换有限期
  winningtime: string; // 领取时间戳，用作 id

  // 兑换状态，2 已兑换, 4 立即兑换, 6 已过期
  // 7 待发货, 8 已发货
  status: number; 

  displayCdKey: string; // 兑换码
  recvWay: string; // 使用方式
  displayType: number; // 展示方式
  wechatCard: string; 
  isBindWechat: boolean;  // 是否绑定微信
  bindNick: string; // 绑定昵称
  wxNick: string; // 微信昵称

  bindWechatExchange: boolean; // 是否显示“将”
  needBindWechat: boolean; // 是否显示修改绑定的微信号

  showVipNumber: string | number; // 奖励发放号码
  showMonifyMobile: string | number; // 奖励发放号码
  extraAct?: IExtraAct;
  useLimit: string; // 使用限制
  specialStatement: string; // 特别说明
}
```

### waterList


```ts
type IWaterList = Array<IWater>
```

## 自定义样式

<custom-style />
