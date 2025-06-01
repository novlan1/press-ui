---
url : pages/press/count-down/count-down
---

## CountDown 倒计时

用于实时展示倒计时数值，支持毫秒精度。


## 引入

```ts
import PressCountDown from 'press-ui/press-count-down/press-count-down.vue';

export default {
  components: {
    PressCountDown,
  }
}
```

## 代码演示

### 基本用法

`time`属性表示倒计时总时长，单位为毫秒。

```html
<press-count-down :time="time" />
```

```js
Page({
  data: {
    time: 30 * 60 * 60 * 1000,
  },
});
```

### 自定义格式

通过`format`属性设置倒计时文本的内容。

```html
<press-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
```

### 毫秒级渲染

倒计时默认每秒渲染一次，设置`millisecond`属性可以开启毫秒级渲染。

```html
<press-count-down millisecond :time="time" format="HH:mm:ss:SSS" />
```

### 自定义样式

设置`use-slot`属性后可以自定义倒计时样式，需要通过`@change`事件获取`timeData`对象并自行渲染，格式见下方表格。

```html
<press-count-down use-slot :time="time" @change="onChange">
  <span class="item">{{ timeData.hours }}</span>
  <span class="item">{{ timeData.minutes }}</span>
  <span class="item">{{ timeData.seconds }}</span>
</press-count-down>
```

```js
export default {
  data() {
    return {
      time: 30 * 60 * 60 * 1000,
      timeData: {},
    }
  },
  methods: {
    onChange(val) {
      this.timeData = val;
    }
  },
};
```

```css
.item {
  display: inline-block;
  width: 22px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #1989fa;
  border-radius: 2px;
}
```

### 手动控制

通过 `selectComponent` 选择器获取到组件实例后，可以调用`start`、`pause`、`reset`方法。

```html
<press-count-down
  class="control-count-down"
  millisecond
  :time="3000"
  :auto-start="false"
  format="ss:SSS"
  @finish="finished"
/>

<press-grid clickable :column-num="3">
  <press-grid-item text="开始" icon="play-circle-o" @click="start" />
  <press-grid-item text="暂停" icon="pause-circle-o" @click="pause" />
  <press-grid-item text="重置" icon="replay" @click="reset" />
</press-grid>
```

```js
export default {
  methods: {
    start() {
      const countDown = this.selectComponent('.control-count-down');
      countDown.start();
    },

    pause() {
      const countDown = this.selectComponent('.control-count-down');
      countDown.pause();
    },

    reset() {
      const countDown = this.selectComponent('.control-count-down');
      countDown.reset();
    },

    finished() {
      Toast('倒计时结束');
    },
  }
}
```

## API

### Props

| 参数        | 说明                                           | 类型      | 默认值     |
| ----------- | ---------------------------------------------- | --------- | ---------- |
| time        | 倒计时时长，单位毫秒                           | _number_  | -          |
| format      | 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒 | _string_  | `HH:mm:ss` |
| auto-start  | 是否自动开始倒计时                             | _boolean_ | `true`     |
| millisecond | 是否开启毫秒级渲染                             | _boolean_ | `false`    |
| use-slot    | 是否使用自定义样式插槽                         | _boolean_ | `false`    |

### Events

| 事件名  | 说明                                         | 回调参数 |
| ------- | -------------------------------------------- | -------- |
| @finish | 倒计时结束时触发                             | -        |
| @change | 时间变化时触发，仅在开启`use-slot`后才会触发 | timeData |

### timeData 格式

| 名称         | 说明     | 类型     |
| ------------ | -------- | -------- |
| days         | 剩余天数 | _number_ |
| hours        | 剩余小时 | _number_ |
| minutes      | 剩余分钟 | _number_ |
| seconds      | 剩余秒数 | _number_ |
| milliseconds | 剩余毫秒 | _number_ |

### 方法

通过 selectComponent 可以获取到 CountDown 实例并调用实例方法。

| 方法名 | 参数 | 返回值 | 介绍                                                       |
| ------ | ---- | ------ | ---------------------------------------------------------- |
| start  | -    | -      | 开始倒计时                                                 |
| pause  | -    | -      | 暂停倒计时                                                 |
| reset  | -    | -      | 重设倒计时，若`auto-start`为`true`，重设后会自动开始倒计时 |

## 在线调试

<debug-online />

## 常见问题

### 多个 CountDown 组件互相影响

如果出现多个 `countDown` 组件的倒计时互相影响，可以指定 `change` 事件，然后给 `timeData` 赋值，而不是直接使用插槽赋值的变量。

正确用法：

```html
<press-count-down use-slot :time="time" @change="onChange">
  <span class="item">{{ timeData.hours }}</span>
  <span class="item">{{ timeData.minutes }}</span>
  <span class="item">{{ timeData.seconds }}</span>
</press-count-down>
```

错误用法：

```html
<press-count-down use-slot :time="time">
  <template #default="{ timeData }">
    <span class="item">{{ timeData.hours }}</span>
    <span class="item">{{ timeData.minutes }}</span>
    <span class="item">{{ timeData.seconds }}</span>
  </template>
</press-count-down>
```

推测是小程序的插槽渲染机制有问题。

