---
url : pages/act-detail/act-benefit-item/act-benefit-item
---

## ActBenefitItem 福利列表项


## 引入

```ts
import PressActBenefitItem from 'press-ui/press-act-benefit-item/press-act-benefit-item';

export default {
  components: {
    PressActBenefitItem,
  }
}
```

## 代码演示

### 基础用法

```html
<PressActBenefitItem />
```

## API

### Props


| 参数          | 说明                             | 类型      | 默认值  |
| ------------- | -------------------------------- | --------- | ------- |
| actshowcolumn | 组件数据                         | _object_  | -       |
| index         | 当前索引                         | _number_  | `-1`    |
| show-distance | 是否显示距离                     | _boolean_ | `true`  |
| use-tip-class | 是否使用 `tip-comp` 为前缀的类名 | _boolean_ | `false` |

### Events

| 事件名             | 说明         | 回调参数 |
| ------------------ | ------------ | -------- |
| clickGiftDetail    | 点击按钮     | -        |
| clickGetTaskReward | 点击福利详情 | -        |
| clickMerc          | 点击商家     | -        |

### actshowcolumn

```ts
// actshowcolumn
IActshowcolumn = {
  custom_info: string; // 自定义信息
  brandinfo: { // 品牌信息
    brandid: string;
    brandName: string;
    brandicon: string;
    mercNum: number;
    brand_typeid: string;
  };

  actshowlist: Array<{ // 展示列表
    merchantid: string;
    act_id: string;
    batch_id: string;
    brand_id: string;
    act_cornermark: string;

    merc_task_info: {
      acquire_status: number;
      brandactid: string;

      task_info: {  // 任务信息
        merchantid: string;
        taskid: number;
        
        condition: Array<{
          gift: {     // 礼包详情
            name: string;
            picurl: string;
            giftid: number;
            expiretime: number;
            benefittag: string;

            goods_list: Array<{ // 物品列表
              goods_id: number | string;
              goods_type: number | string;
              overduetime: number;
              goodsname: string;
              goodsicon: string;
            }>;
          }
        }>
      };
    };
  }>;
  is_open_rmd: number;
}

```

## 自定义样式

<custom-style />
