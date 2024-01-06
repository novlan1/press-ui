---
url : pages/press/hor-swiper-light/hor-swiper-light
type: horizontal
horHeight: 445
---

## HorSwiperLight 精彩集锦弹窗


## 引入

注意，该组件依赖 `@zebra-ui/swiper`，请自行安装。

```ts
import PressHorSwiperLight from 'press-ui/press-hor-swiper-light/press-hor-swiper-light';

export default {
  components: {
    PressHorSwiperLight,
  }
}
```



## 代码演示

### 基础用法

```html
<PressHorSwiperLight
  v-if="showDialog"
  :list="list"
  @close="close"
  @share="share"
/>
```

```ts
const MOCK_LIST = [
  {
    video: '',
    avatar: 'https://dummyimage.com/40x40',
    name: '厉害！五连绝世',
    time: '2022-11-12  23:20',
    source: '微信战报',
  }, {
    video: '',
    avatar: 'https://dummyimage.com/40x40',
    name: '厉害！五连绝世',
    time: '2022-11-12  23:20',
    source: '微信战报',
  }, {
    video: '',
    avatar: 'https://dummyimage.com/40x40',
    name: '厉害！五连绝世',
    time: '2022-11-12  23:20',
    source: '微信战报',
  },
];

export default {
  data() {
    return {
      list: MOCK_LIST,
      showDialog: true,
    }
  },
  methods: {
    close() {
      this.showDialog = false;
    },
    share() {
      this.onGTip('[share]');
    },
  }
}
```


## API

### Props

| 参数 | 说明     | 类型    | 默认值 |
| ---- | -------- | ------- | ------ |
| list | 数据列表 | _array_ | -      |



### Events

| 事件名 | 说明     | 参数 |
| ------ | -------- | ---- |
| share  | 点击分享 | -    |
| close  | 点击关闭 | -    |


### list 类型

```ts
type IList = Array<{
  video: string;
  avatar: string;
  name: string;
  time: string;
  source?: string;
}>
```
