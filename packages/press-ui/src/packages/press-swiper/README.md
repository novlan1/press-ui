---
url : pages/press/swiper/swiper
---

## Swiper 轮播

本组件 API 与 uni-app 提供的 [swiper](https://uniapp.dcloud.net.cn/component/swiper.html#swiper) 一致。

如果你的业务组件，只使用在 uni-app 环境下，可以直接使用[官方提供的组件](https://uniapp.dcloud.net.cn/component/swiper.html#swiper)。

## 引入

```ts
// #ifdef H5
import PressSwiper from 'press-ui/press-swiper/press-swiper.vue';
import PressSwiperItem from 'press-ui/press-swiper-item/press-swiper-item.vue';
// #endif

export default {
  components: {
    // #ifdef H5
    Swiper: PressSwiper,
    SwiperItem: PressSwiperItem,
    // #endif
  },
}
```

## 代码演示

### 基础用法

```html
<swiper
  class="swiper"
  circular
  :indicator-dots="indicatorDots"
  :autoplay="autoplay"
  :interval="interval"
  :duration="duration"
>
  <swiper-item>
    <div class="swiper-item uni-bg-red">
      A
    </div>
  </swiper-item>
  <swiper-item>
    <div class="swiper-item uni-bg-green">
      B
    </div>
  </swiper-item>
  <swiper-item>
    <div class="swiper-item uni-bg-blue">
      C
    </div>
  </swiper-item>
</swiper>
```

```ts
export default {
  data() {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
    }
  }
}
```

## API

### Props

| 参数                           | 说明                                                                                             | 类型      | 默认值              |
| :----------------------------- | :----------------------------------------------------------------------------------------------- | :-------- | :------------------ |
| indicator-dots                 | 是否显示面板指示点                                                                               | _boolean_ | `false`             |
| indicator-color                | 指示点颜色                                                                                       | _string_  | `rgba(0, 0, 0, .3)` |
| indicator-active-color         | 当前选中的指示点颜色                                                                             | _string_  | `#000000`           |
| active-class                   | `swiper-item` 可见时的 `class`                                                                   | _string_  | -                   |
| changing-class                 | `acceleration` 设置为 `true` 时且处于滑动过程中，中间若干屏处于可见时的`class`                   | _string_  | -                   |
| autoplay                       | 是否自动切换                                                                                     | _boolean_ | `false`             |
| current                        | 当前所在滑块的 `index`                                                                           | _number_  | `0`                 |
| current-item-id                | 当前所在滑块的 `item-id` ，不能与 `current` 被同时指定                                           | _string_  | -                   |
| interval                       | 自动切换时间间隔                                                                                 | _number_  | `5000`              |
| duration                       | 滑动动画时长                                                                                     | _number_  | `500`               |
| circular                       | 是否采用衔接滑动，即播放到末尾后重新回到开头                                                     | _boolean_ | `false`             |
| vertical                       | 滑动方向是否为纵向                                                                               | _boolean_ | `false`             |
| previous-margin                | 前边距，可用于露出前一项的一小部分，接受 `px` 和 `rpx` 值                                        | _string_  | `0px`               |
| next-margin                    | 后边距，可用于露出后一项的一小部分，接受 `px` 和 `rpx` 值                                        | _string_  | `0px`               |
| acceleration                   | 当开启时，会根据滑动速度，连续滑动多屏                                                           | _boolean_ | `false`             |
| disable-programmatic-animation | 是否禁用代码变动触发 `swiper` 切换时使用动画。                                                   | _boolean_ | `false`             |
| display-multiple-items         | 同时显示的滑块数量                                                                               | _number_  | `1`                 |
| skip-hidden-item-layout        | 是否跳过未显示的滑块布局，设为 `true` 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息 | _boolean_ | `false`             |
| disable-touch                  | 是否禁止用户 `touch` 操作                                                                        | _boolean_ | `false`             |
| touchable                      | 是否监听用户的触摸事件，只在初始化时有效，不能动态变更                                           | _boolean_ | `true`              |
| easing-function                | 切换动画类型，有效值：`default`、`linear`、`easeInCubic`、`easeOutCubic`、`easeInOutCubic`       | _string_  | `default`           |



### Events

| 事件名          | 说明                                                                                                                       | 参数          |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------- |
| change          | `current` 改变时会触发 `change` 事件，`event.detail = {current: current, source: source}`                                  | `EventHandle` |
| transition      | `swiper-item` 的位置发生改变时会触发 `transition` 事件，`event.detail = {dx: dx, dy: dy}`，支付宝小程序暂不支持 `dx`, `dy` | `EventHandle` |
| animationfinish | 动画结束时会触发 `animationfinish` 事件，`event.detail = {current: current, source: source}`                               | `EventHandle` |
## 在线调试

<debug-online />


## 常见问题

### 使用方式错误

`press-swiper` 必须按照下面方式使用，错误使用会导致不生效。

1. 组件内用小写的 `swiper` 和 `swiper-item`，比如

```html
<swiper>
  <swiper-item>
    <div/>
  </swiper-item>
</swiper>
```

错误示例

```html
<Swiper>
  <SwiperItem>
    <div/>
  </SwiperItem>
</Swiper>

<!-- or -->

<PressSwiper>
  <PressSwiperItem>
    <div/>
  </PressSwiperItem>
</PressSwiper>
```

2. 小程序下不可以注册本组件，必须加条件编译，示例如下

```ts
// #ifdef H5
import PressSwiper from 'press-ui/press-swiper/press-swiper.vue';
import PressSwiperItem from 'press-ui/press-swiper-item/press-swiper-item.vue';
// #endif

export default {
  components: {
    // #ifdef H5
    Swiper: PressSwiper,
    SwiperItem: PressSwiperItem,
    // #endif
  },
}
```

因为 `swiper` 要求子元素必须为 `swiper-item`，所以无法做 `swiper-item` 的中间层。

