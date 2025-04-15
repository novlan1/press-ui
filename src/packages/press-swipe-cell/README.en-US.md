---
url : pages/press/swipe-cell/swipe-cell
---

## SwipeCell 


A cell component that can slide left and right to display action buttons.

### Basic usage

Just wrap the content inside the `Sticky` component.

```html
<press-swipe-cell
   :right-width="65"
   :left-width="65"
   @click="onClick"
   @close="onClose"
   @open="onOpen"
>
   <div slot="left">
     choose
   </div>
   <div class="content">
     some content
   </div>
   <div slot="right">
     delete
   </div>
</press-swipe-cell>
```


```js
export default {
   methods: {
     onClick(...args) {
       console.log('onClick.args', args);
     },
     onClose(...args) {
       console.log('onClose.args', args);
     },
     onOpen(...args) {
       console.log('onOpen.args', args);
     },
   },
};
```

## API
### Props

| Parameter         | Description                                                              | Type               | Default |
| ----------------- | ------------------------------------------------------------------------ | ------------------ | ------- |
| name              | Identifier, which can be obtained from the parameters of the close event | _string \| number_ | -       |
| left-width        | left sliding area width                                                  | _number_           | `0`     |
| right-width       | The width of the right sliding area                                      | _number_           | `0`     |
| async-close       | Whether to close asynchronously                                          | _boolean_          | `false` |
| disabled `v1.3.4` | Whether to disable sliding                                               | _boolean_          | `false` |

### Slot

| Name  | Description                |
| ----- | -------------------------- |
| -     | Customize display content  |
| left  | Left sliding content       |
| right | Swipe content to the right |

### Events

| Event Name | Description        | Parameters                                                |
| ---------- | ------------------ | --------------------------------------------------------- |
| click      | Triggered on click | Click position on close (`left` `right` `cell` `outside`) |
| close      | trigger when close | { position: 'left' \| 'right' , instance , name: string } |
| open       | fires when open    | { position: 'left' \| 'right' , name: string }            |

### close parameter

| parameter | type       | description                                                   |
| --------- | ---------- | ------------------------------------------------------------- |
| position  | _string_   | Click position when closing (`left` `right` `cell` `outside`) |
| instance  | _object_   | SwipeCell instance                                            |
| name      | identifier | _string_                                                      |

### method

You can get the SwipeCell instance and call the instance method through selectComponent

| method name | parameters                | return value | description           |
| ----------- | ------------------------- | ------------ | --------------------- |
| open        | position: `left \| right` | -            | open cell sidebar     |
| close       | -                         | -            | Collapse cell sidebar |