---
url: pages/press/swiper/swiper
---

## Swiper 

This component API is consistent with [swiper](https://uniapp.dcloud.net.cn/component/swiper.html#swiper) provided by uni-app.

If your business component is only used in the uni-app environment, you can directly use the [officially provided component](https://uniapp.dcloud.net.cn/component/swiper.html#swiper).

## Introduction

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

## Code Demo

### Basic usage

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

| Parameters                     | Description                                                                                                                                                                                | Type      | Default value       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ------------------- |
| indicator-dots                 | Whether to display panel indicator dots                                                                                                                                                    | _boolean_ | `false`             |
| indicator-color                | indicator point color                                                                                                                                                                      | _string_  | `rgba(0, 0, 0, .3)` |
| indicator-active-color         | The color of the currently selected indicator point                                                                                                                                        | _string_  | `#000000`           |
| active-class                   | `class` when `swiper-item` is visible                                                                                                                                                      | _string_  | -                   |
| changing-class                 | `class` when `acceleration` is set to `true` and during the sliding process, several screens in the middle are visible                                                                     | _string_  | -                   |
| autoplay                       | Whether to switch automatically                                                                                                                                                            | _boolean_ | `false`             |
| current                        | `index` of the current slider                                                                                                                                                              | _number_  | `0`                 |
| current-item-id                | The `item-id` of the current slider, cannot be specified together with `current`                                                                                                           | _string_  | -                   |
| interval                       | Automatic switching interval                                                                                                                                                               | _number_  | `5000`              |
| duration                       | sliding animation duration                                                                                                                                                                 | _number_  | `500`               |
| circular                       | Whether to use connection sliding, that is, play to the end and then return to the beginning                                                                                               | _boolean_ | `false`             |
| vertical                       | Whether the sliding direction is vertical                                                                                                                                                  | _boolean_ | `false`             |
| previous-margin                | Previous margin, can be used to expose a small part of the previous item, accepts `px` and `rpx` values                                                                                    | _string_  | `0px`               |
| next-margin                    | Next-margin, can be used to expose a small part of the next item, accepts `px` and `rpx` values                                                                                            | _string_  | `0px`               |
| acceleration                   | When turned on, multiple screens will be slid continuously according to the sliding speed                                                                                                  | _boolean_ | `false`             |
| disable-programmatic-animation | Whether to disable code changes to trigger `swiper` animations when switching.                                                                                                             | _boolean_ | `false`             |
| display-multiple-items         | Number of sliders to display simultaneously                                                                                                                                                | _number_  | `1`                 |
| skip-hidden-item-layout        | Whether to skip the undisplayed slider layout, set to `true` to optimize the sliding performance in complex situations, but the layout information of the hidden state slider will be lost | _boolean_ | `false`             |
| disable-touch                  | Whether to disable user `touch` operations                                                                                                                                                 | _boolean_ | `false`             |
| touchable                      | Whether to monitor user touch events, is only valid during initialization and cannot be changed dynamically                                                                                | _boolean_ | `true`              |
| easing-function                | Switch animation type, valid values: `default`, `linear`, `easeInCubic`, `easeOutCubic`, `easeInOutCubic`                                                                                  | _string_  | `default`           |



### Events

| Event name      | Description                                                                                                                                                                 | Parameters    |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| change          | The `change` event will be triggered when `current` changes, `event.detail = {current: current, source: source}`                                                            | `EventHandle` |
| transition      | The `transition` event will be triggered when the position of `swiper-item` changes, `event.detail = {dx: dx, dy: dy}`, Alipay applet does not currently support `dx`, `dy` | `EventHandle` |
| animationfinish | The `animationfinish` event will be triggered when the animation ends, `event.detail = {current: current, source: source}`                                                  | `EventHandle` |


## common problem

### Wrong usage

`press-swiper` must be used in the following manner, incorrect use will cause it to be ineffective.

1. Use lowercase `swiper` and `swiper-item` in the component, for example

```html
<swiper>
   <swiper-item>
     <div/>
   </swiper-item>
</swiper>
```

Error example

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

2. This component cannot be registered under the mini program and must be compiled conditionally. The example is as follows

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

Because `swiper` requires that the child element must be `swiper-item`, it is impossible to create an intermediate layer of `swiper-item`.
