---
url : pages/press/area/area
---

## Area 省市区选择

省市区选择组件通常与 弹出层 组件配合使用。

## 引入

```ts
import PressArea from 'press-ui/press-area/press-area';

export default {
  components: {
    PressArea,
  }
}
```

## 代码演示

### 基础用法

初始化省市区组件时，需要通过 `area-list` 属性传入省市区数据。

```html
<press-area :area-list="areaList" />
```

### areaList 格式

areaList 为对象结构，包含 `province_list`、`city_list`、`county_list` 三个 key。

每项以地区码作为 key，省市区名字作为 value。地区码为 6 位数字，前两位代表省份，中间两位代表城市，后两位代表区县，以 0 补足 6 位。比如北京的地区码为 `11`，以 0 补足 6 位，为 `110000`。

示例数据如下：

```js
const areaList = {
  province_list: {
    110000: '北京市',
    120000: '天津市',
  },
  city_list: {
    110100: '北京市',
    120100: '天津市',
  },
  county_list: {
    110101: '东城区',
    110102: '西城区',
    // ....
  },
};
```

### 数据来源

Press UI 提供了一份默认的省市区数据，[地址在这里](https://tip-components-1251917893.cos.ap-guangzhou.myqcloud.com/rb/front-open-config__match__default__area_data.json)。



```ts
const AREA_DATA_URL = 'https://tip-components-1251917893.cos.ap-guangzhou.myqcloud.com/rb/front-open-config__match__default__area_data.json';


function getAreaData() {
  return new Promise((resolve, reject) => {
    uni.request({
      url: AREA_DATA_URL,
      data: {},
      method: 'GET',
      sslVerify: true,
      success: ({ data }) => {
        resolve(data);
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
}


export default {
  data() {
    return {
      areaList: []
    }
  },
  mounted() {
    getAreaData().then(res => this.areaList = res)
  },
}
```

### 选中省市区

如果想选中某个省市区，需要传入一个`value`属性，绑定对应的省市区`code`。

```html
<press-area :area-list="areaList" value="110101" />
```

### 配置显示列

可以通过`columns-num`属性配置省市区显示的列数，默认情况下会显示省市区，当你设置为`2`，则只会显示省市选择。

```html
<press-area :area-list="areaList" :columns-num="2" title="标题" />
```

### 配置列占位提示文字

可以通过`columns-placeholder`属性配置每一列的占位提示文字。

```html
<press-area
  :area-list="areaList"
  :columns-placeholder="['请选择', '请选择', '请选择']"
  title="标题"
/>
```

### 特殊处理数据

可以通过解析处理，展示一些特殊逻辑。

```html
<press-area
  :area-list="parseData(areaList)"
  value="070000"
/>
```

```ts
import { parseData } from 'press-ui/press-area/helper/parse';

export default {
  data() {
    return {
      areaList: [],
    }
  },
  methods: {
    parseData,
  }
}
```

上面的 `parseData` 是 `Press UI` 为业务逻辑提供的，可以参考实现自己所需的。


```ts
export function parseData(data) {
  const { province_list: provObj = {}, city_list: cityObj = {} } = data || {};

  const res: Record<string, any> = {};
  const SPECIAL_NUMBER_MAP = {
    ALL: {
      value: '07',
      label: '全部',
    },
    OFFLINE: {
      value: '08',
      label: '线下',
    },
    ONLINE: {
      value: '09',
      label: '线上',
    },
  };
  const offlineNumber = SPECIAL_NUMBER_MAP.OFFLINE.value;

  res.city_list = Object.keys(provObj)
    .reduce((acc, item) => {
      const key = offlineNumber + item.slice(0, 4);
      acc[key] = provObj[item];
      return acc;
    }, {});

  res.province_list = Object.keys(SPECIAL_NUMBER_MAP)
    .reduce((acc, item) => {
      const value = SPECIAL_NUMBER_MAP[item];
      acc[`${value.value}0000`] = value.label;
      return acc;
    }, {});

  res.county_list = Object.keys(cityObj).reduce((acc, item) => {
    const key = offlineNumber + item.slice(0, 4);
    acc[key] = cityObj[item];
    return acc;
  }, {});

  return  res;
}
```


### 结合popup

要在弹出层中使用，可以引入 `press-area-popup`。

`type` 为 `e-sport` 时，会使用 `press-popup-plus`，默认使用 `press-popup`。

```html
<PressAreaPopup
  :show.sync="showPopup"
  :area-list="areaList"
  :value="selectArea"
  :type="areaType"
  @confirm="onConfirmArea"
/>
```


```ts
import PressAreaPopup from 'press-ui/press-area/press-area-popup';


export default {
  components: {
    PressAreaPopup,
  },
  data() {
    return {
      showPopup: false,
      selectArea: '',
      areaType: '',
    }
  },
  methods: {
    onConfirmArea(values, index) {
      console.log('[onConfirmArea] values index', values, index);
      this.selectArea = values[values.length - 1]?.code;
    },
  }
}
```

## API

### Area Props

| 参数                | 说明                                   | 类型               | 默认值  |
| ------------------- | -------------------------------------- | ------------------ | ------- |
| value               | 当前选中的省市区`code`                 | _string_           | -       |
| title               | 顶部栏标题                             | _string_           | -       |
| area-list           | 省市区数据，格式见下方                 | _object_           | -       |
| columns-num         | 省市区显示列数，3-省市区，2-省市，1-省 | _string \| number_ | `3`     |
| columns-placeholder | 列占位提示文字                         | _string[]_         | `[]`    |
| loading             | 是否显示加载状态                       | _boolean_          | `false` |
| item-height         | 选项高度                               | _number_           | `44`    |
| visible-item-count  | 可见的选项个数                         | _number_           | `6`     |
| confirm-button-text | 确认按钮文字                           | _string_           | `确认`  |
| cancel-button-text  | 取消按钮文字                           | _string_           | `取消`  |
| show-toolbar        | 是否显示顶部栏                         | _boolean_          | `true`  |
| custom-class        | 根节点样式类                           | _string_           | -       |
| active-class        | 选中项样式类                           | _string_           | -       |
| toolbar-class       | 顶部栏样式类                           | _string_           | -       |
| column-class        | 列样式类                               | _string_           | -       |
| use-momentum        | 是否使用惯性滚动                       | _boolean_          | `false` |
| swipe-duration      | 快速滑动时惯性滚动的时长，单位 `ms`    | _number \| string_ | `1000`  |

### Area Events

| 事件    | 说明               | 回调参数                                    |
| ------- | ------------------ | ------------------------------------------- |
| confirm | 点击右上方完成按钮 | 一个数组参数，具体格式看下方数据格式章节    |
| cancel  | 点击取消按钮时     | -                                           |
| change  | 选项改变时触发     | PickerPlus 实例，所有列选中值，当前列对应的索引 |

### Area 方法

通过 selectComponent 可以获取到 Area 实例并调用实例方法。

| 方法名 | 参数         | 返回值 | 介绍                                                |
| ------ | ------------ | ------ | --------------------------------------------------- |
| reset  | code: string | -      | 根据 code 重置所有选项，若不传 code，则重置到第一项 |


### AreaPopup Props

| 参数      | 说明                     | 类型      | 默认值  |
| --------- | ------------------------ | --------- | ------- |
| show      | 是否显示                 | _boolean_ | `false` |
| value     | 当前选中的省市区`code`   | _string_  | -       |
| area-list | 省市区数据，格式见下方   | _object_  | -       |
| type      | 类型，可选值为 `e-sport` | _string_  | -       |

### AreaPopup Event

| 事件    | 说明               | 回调参数        |
| ------- | ------------------ | --------------- |
| confirm | 点击右上方完成按钮 | values, indexes |


### 点击完成时返回的数据格式

返回的数据整体为一个 Object，包含 `values`, `index` 两个 key。

`values` 整体为一个数组，数组内包含 `columnsNum` 个数据， 每个数据对应一列选项中被选中的数据。

`code` 代表被选中的地区编码， `name` 代表被选中的地区名称。

```javascript
[
  {
    code: '110000',
    name: '北京市',
  },
  {
    code: '110100',
    name: '北京市',
  },
  {
    code: '110101',
    name: '东城区',
  },
];
```

`index` 为一个数组，数组内包含 `columnsNum` 个数据， 每个数据对应一列选项中被选中项的序号。


