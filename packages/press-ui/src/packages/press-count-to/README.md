---
url : pages/press/count-to/count-to
---

## CountTo 数字滚动


## 引入

```ts
import PressCountTo from 'press-ui/press-count-to/press-count-to';

export default {
  components: {
    PressCountTo,
  }
}
```

## 代码演示

### 基础用法

```html
<PressCountTo
  :start-value="30"
  :end-value="500"
  @end="onEnd"
/>
```

```ts
export default {
  methods: {
    onEnd() {
      this.onGTip('[end]');
    },
  }
}
```

### 自定义样式

可设置 `color`、`font-size`、`bold` 属性。

```html
<PressCountTo
  :end-value="3000"
  color="#909399"
  :font-size="30"
  :bold="true"
/>
```

### 自定义持续时间

可设置 `duration` 属性。

```html
<PressCountTo
  :start-value="30"
  :end-value="500"
  :duration="5000"
/>
```

### 禁用缓慢动画

默认情况下，在滚动快结尾时，会放慢滚动的速度，给用户更好的视觉效果。

可通过 `use-easing` 为 `false`，可禁用缓慢动画。


```html
 <PressCountTo
  :start-value="30"
  :end-value="500"
  :use-easing="false"
/>
```

### 倒计时

当 `start-value` 大于 `end-value` 时，即为倒计时效果。

```html
<PressCountTo
  :start-value="500"
  :end-value="0"
/>
```

### 小数位

可通过 `decimals` 设置小数位。

```html
<PressCountTo
  :start-value="30"
  :end-value="500"
  :decimals="2"
/>
```

### 千分位分隔符

可通过 `separator` 设置千分位分隔符。

```html
<PressCountTo
  :end-value="5000"
  separator=","
/>
```

### 使用插槽

设置 `use-slot` 属性后可以自定义样式，需要通过`@change`事件获取`value`并自行渲染。

```html
 <PressCountTo
  :end-value="5000"
  :use-slot="true"
  @change="onChange"
>
  <span style="color: red;">{{ slotValue }}</span>
</PressCountTo>
```

```ts
export default {
  data() {
    return {
      slotValue: '',
    }
  },
  methods: {
    onChange(value) {
      this.slotValue = value;
    },
  }
}
```

### 自定义控制

可通过调用组件内方法，进行自定义控制。

```html
<PressCountTo
  ref="pressCountToRef"
  :end-value="5000"
  :autoplay="false"
/>
```

```ts
export default {
  methods: {
    start() {
      this.$refs.pressCountToRef.start();
    },
    pause() {
      this.$refs.pressCountToRef.stop();
    },
    resume() {
      this.$refs.pressCountToRef.resume();
    },
  }
}
```


## API

### Props

| 参数        | 说明                         | 类型      | 默认值    |
| ----------- | ---------------------------- | --------- | --------- |
| start-value | 开始值                       | _number_  | `0`       |
| end-value   | 结束值                       | _number_  | `0`       |
| duration    | 滚动过程所需的时间，单位`ms` | _number_  | `2000`    |
| autoplay    | 是否自动开始滚动             | _boolean_ | `true`    |
| decimals    | 要显示的小数位数             | _number_  | `0`       |
| use-easing  | 滚动结束时，是否缓动结尾     | _boolean_ | `true`    |
| separator   | 千位分隔符                   | _string_  | -         |
| color       | 字体颜色                     | _string_  | `#606266` |
| font-size   | 字体大小，单位`px`           | _string_  | `22`      |
| bold        | 字体是否加粗                 | _string_  | `false`   |
| use-slot    | 是否使用插槽                 | _boolean_ | `false`   |


### Methods

| 事件名  | 说明                                           |
| ------- | ---------------------------------------------- |
| start   | `autoplay`为`false`时，通过此方法启动滚动      |
| stop    | 暂停                                           |
| resume  | 暂停的情况下，重新开始                         |
| reStart | 暂定状态，重新再开始滚动；或者滚动状态下，暂停 |



### Events

| 事件名 | 说明                   | 参数 |
| ------ | ---------------------- | ---- |
| end    | 数值滚动到目标值时触发 | -    |
| change | 数值改变               | -    |
