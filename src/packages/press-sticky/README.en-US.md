---
url : pages/press/sticky/sticky
---

## Sticky 


Sticky components are consistent with the effect achieved by the position: sticky property in CSS. When the components are within the screen range, they will be arranged according to the normal layout. When the components scroll out of the screen range, they will always be fixed at the top of the screen.


### Basic usage

Just wrap the content inside the `Sticky` component.

```html
<press-sticky>
   <view class="btn1">
     Basic usage
   </view>
</press-sticky>
```

### Ceiling distance

The distance between the component and the top can be set by the `offset-top` property.

```html
<press-sticky
   :offset-top="50"
>
   <view
     class="btn2"
   >
     Ceiling distance
   </view>
</press-sticky>
```

### specify the container

The container of the component can be specified through the `container` attribute. When the page is scrolled, the component will always remain within the scope of the container. When the component is about to exceed the bottom of the container, it will return to its original position.

```html
<div
   id="container"
   ref="container"
   style="height: 150px;background: #eee;"
>
   <press-sticky :container="container">
     <view class="btn3">
       designated container
     </view>
   </press-sticky>
</div>
```

```js
export default {
   data() {
     const that = this;
     return {
       container() {
         let res;

         // #ifdef H5
         res = that. $refs. container;
         // #endif

         // #ifndef H5
         res = uni.createSelectorQuery().select('#container');
         // #endif

         return res;
       },
     };
   },
};
```

## API

### Props

| Parameter  | Description                                                                                                              | Type       | Default |
| ---------- | ------------------------------------------------------------------------------------------------------------------------ | ---------- | ------- |
| offset-top | The distance from the top when the ceiling is installed, the unit is `px`                                                | _number_   | `0`     |
| z-index    | z-index when ceiling mounted                                                                                             | _number_   | `99`    |
| container  | A function that returns the NodesRef node corresponding to the container                                                 | _function_ | -       |
| scroll-top | The scroll position of the current scroll area, if it is not `null`, it will disable the listening of page scroll events | _number_   | -       |

### Events

| Event Name | Description            | Callback Parameters                                                                        |
| ---------- | ---------------------- | ------------------------------------------------------------------------------------------ |
| scroll     | trigger when scrolling | { scrollTop: the distance from the top position, isFixed: whether it is fixed to the top } |