---
url : pages/act/act-store-item/act-store-item
---

## ActStoreItem 商户列表项


## 引入

```ts
import PressActStoreItem from 'press-ui/press-act-store-item/press-act-store-item';

export default {
  components: {
    PressActStoreItem,
  }
}
```

## 代码演示

### 基础用法

```html
<PressActStoreItem 
  :props-data="PROPS_DATA"
/>
```

```ts
const PROPS_DATA = {
  logo: 'https://igame-10037599.cos.ap-shanghai.myqcloud.com/0958e81e-3738-35ab-deb8-b9870007c46e',
  name: '深圳市宝安区新湖路店',
  distance: '500m',
  address: '深圳市宝安区新湖路99号壹方城F1 3008号商铺',
  privgrade: 1,
  state: 'lately',
  status: '状态'
};


export default {
  data() {
    return {
      PROPS_DATA,
    };
  },
}
```

## API

### Props


| 参数           | 说明                                            | 类型      | 默认值  |
| -------------- | ----------------------------------------------- | --------- | ------- |
| props-data     | 组件数据                                        | _object_  | -       |
| use-tip-class  | 是否使用 `tip-comp` 为前缀的类名                | _boolean_ | `false` |
| hide-tip-style | 是否隐藏 `@TIP_STYLE_NAME` 关键词编译时加的样式 | _boolean_ | `false` |

### Events

| 事件名      | 说明       | 回调参数 |
| ----------- | ---------- | -------- |
| onClickItem | 点击时触发 | -        |

## 自定义样式

<custom-style />
