---
url : pages/press/area-index-bar/area-index-bar
---

## AreaIndexBar 地区索引栏


## 引入

```ts
import PressAreaIndexBar from 'press-ui/press-area-index-bar/press-area-index-bar';

export default {
  components: {
    PressAreaIndexBar,
  }
}
```

## 代码演示

### 基础用法

```html
<PressAreaIndexBar
  v-if="showAreaIndexBar"
  :index-list="indexList"
  :area-data="areaJson"
  :s-province="province"
  :s-city="city"
  :window-top="44"
  :show-index-list="showIndexList"
  @onUnLimit="handleReSelect"
  @onCancel="closeMatchArea"
  @onConfirm="handleSelectArea"
/>
```

```ts
const AREA_DATA_URL_2 = 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/data/area.json';

export default {
  data() {
    return {
      areaJson: [],
      province: '',
      city: '',

      showAreaIndexBar: false,
      showIndexList: true,
    }
  },
  mounted() {
    this.getAreaData();
  },
  methods: {
    onShowAreaIndexBar() {
      this.showAreaIndexBar = true;
    },
    handleReSelect(type) {
      if (type === 'city') {
        this.city = '';
      } else {
        this.province = '';
        this.city = '';
      }
      this.$forceUpdate();
    },
    handleSelectArea(province, city) {
      if (!province) {
        this.city = '';
        this.province = '';
      } else {
        this.province = province;
        this.city = city;
      }
      this.showAreaIndexBar = false;
    },
    closeMatchArea() {
      this.showAreaIndexBar = false;
    },
    getAreaData() {
      new Promise((resolve, reject) => {
        uni.request({
          url: AREA_DATA_URL_2,
          data: {},
          method: 'GET',
          sslVerify: true,
          success: ({ data }) => {
            resolve(data);
            this.areaJson = data;
          },
          fail: (error) => {
            reject(error);
          },
        });
      });
    },
  },
}
```
## API

### Props

| 参数            | 说明                | 类型      | 默认值  |
| --------------- | ------------------- | --------- | ------- |
| title           | 标题                | _boolean_ | `false` |
| area-data       | 地区数据            | _array_   | -       |
| s-province      | 省                  | _string_  | -       |
| s-city          | 市                  | _string_  | -       |
| window-top      | 顶部高度            | _number_  | `0`     |
| show-index-list | 是否展示`indexList` | _boolean_ | `true`  |



### Events

| 事件名    | 说明              | 参数                         |
| --------- | ----------------- | ---------------------------- |
| onCancel  | 点击取消          |                              |
| onConfirm | 点击确认          | `province`, `city`           |
| onUnLimit | 点击不限省份/城市 | `type`(`province` 或 `city`) |
