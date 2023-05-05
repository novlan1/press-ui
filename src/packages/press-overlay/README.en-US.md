---
url : pages/press/overlay/overlay
---
## Overlay

Create an overlay that emphasizes specific page elements and prevents the user from doing anything else.



### Basic usage

```html
<button
   type="primary"
   @click="onClickShow('normal')"
>
   Show overlay
</button>

<press-overlay
   :show="options.normal"
   @click="onClickHide('normal')"
/>
```

```js
export default {
   data() {
     return {
       options: {
         normal: false,
         content: false,
       },
     };
   },
   methods: {
     onClickShow(type) {
       this. options[type] = true;
     },
     onClickHide(type) {
       this. options[type] = false;
     },
   },
};
```

### Embed content

Arbitrary content can be embedded on the mask layer through the default slot.

```html
<button
   type="primary"
   @click="onClickShow('content')"
>
   embedded content
</button>

<press-overlay
   :show="options.content"
   @click="onClickHide('content')"
>
   <view class="wrapper">
     <view
       class="block"
       catch:tap="noop"
     />
   </view>
</press-overlay>
```

```js
export default {
   data() {
     return {
       options: {
         normal: false,
         content: false,
       },
     };
   },
   methods: {
     onClickShow(type) {
       this. options[type] = true;
     },
     onClickHide(type) {
       this. options[type] = false;
     },
     noop() {},
   },
};
```

```css
.wrapper {
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100%;
}

.block {
   width: 120px;
   height: 120px;
   background-color: #fff;
}
```

### Props

| Parameter            | Description                                                                                          | Type               | Default |
| -------------------- | ---------------------------------------------------------------------------------------------------- | ------------------ | ------- |
| show                 | Whether to show the overlay                                                                          | _boolean_          | `false` |
| z-index              | z-index level                                                                                        | _string \| number_ | `1`     |
| duration             | Animation duration, in seconds                                                                       | _string \| number_ | `0.3`   |
| class-name           | custom class name                                                                                    | _string_           | -       |
| custom-style         | custom style                                                                                         | _string_           | -       |
| lock-scroll `v1.7.3` | Whether to lock background scrolling, the content in the mask will not be able to scroll when locked | _boolean_          | true    |

### Events

| Event Name | Description            | Callback Parameters |
| ---------- | ---------------------- | ------------------- |
| bind:click | Triggered when clicked | -                   |

### Slots

| Name | Description                                             |
| ---- | ------------------------------------------------------- |
| -    | Default slot for embedding content above the mask layer |

## Theme customization

<theme-config />