---
url : pages/press/popover-plus/popover-plus
---

## PopoverPlus 

A type of popup layer, which is partial compared to PopupPlus and can be used to host some tabs.

## Code Demo

### Basic usage

```html
<div class="popover-wrap">
   <Press Popover
     :show="true"
     placement="bottom"
     custom-class="demo-nav-popover demo-nav-popover--bottom"
   >
     <div
       v-for="(item, index) of list"
       :key="index"
       class="demo-nav-item"
     >
       options {{ item }}
     </div>
   </PressPopoverPlus>
</div>
```

```js
export default {
   data() {
     return {
       list: [1, 2, 3],
     }
   }
}
```

```scss
.popover-wrap {
   position: relative;
   width: 100%;
   height: 10px;

   .demo-nav-popover {
     top: 30px;
     bottom: auto;
     padding: 0;
     background: #09134e;
     &--top {
       left: 56px;
       right: auto;
     }
   }
   .demo-nav-item {
     display: flex;
     align-items: center;
     padding: 0 22px;
     height: 40px;
     color: #fff;
   }
}
```

## API

### Props

| property name | type    | default value | description        |
| ------------- | ------- | ------------- | ------------------ |
| show          | Boolean | true          | whether to display |
| placement     | String  | right         | popup box position |
| custom-class  | String  | -             | custom class name  |
| custom-style  | String  | -             | custom style       |
