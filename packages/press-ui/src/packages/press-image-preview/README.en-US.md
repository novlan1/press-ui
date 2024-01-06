---
url : pages/press/image-preview/image-preview
---

## ImagePreview 

Image zoom preview supports two ways of function calling and component calling.


## Code Demo
### Basic Usage

First embed the component in the page, and then call `imagePreview` functionally.


```html
<Image Preview
   :id="FUNCTIONAL_ID_MAP.IMAGE_PREVIEW"
   mode="functional"
/>
```

```ts
import ImagePreview from 'press-ui/press-image-preview/press-image-preview.vue';
import { imagePreview } from 'press-ui/press-image-preview/index';


export default {
   components: {
     ImagePreview,
   },
   methods: {
     show() {
       imagePreview({
         selector: `#${FUNCTIONAL_ID_MAP.IMAGE_PREVIEW}`,
         images: this. images,
       }).then(() => {
       });
     }
   }
}
```

### Specify the initial position

Support passing in configuration objects, and specify the initial position (index value) of the image through the `startPosition` option.

```ts
imagePreview({
   selector: `#${FUNCTIONAL_ID_MAP.IMAGE_PREVIEW}`,
   images: this. images,
   startPosition: 1,
})
```

### Show close button

After setting the `closeable` attribute, a close icon will be displayed in the upper right corner of the popup layer, and the icon can be customized through the `close-icon` attribute, and the icon position can be customized by using the `close-icon-position` attribute.


```ts
imagePreview({
   selector: `#${FUNCTIONAL_ID_MAP.IMAGE_PREVIEW}`,
   images: this. images,
   closeable: true,
})
```


### Listen to close event

The `imagePreview` method returns a `promise`, and when it is closed, the state will become `resolved`, which can be monitored in the `then` method.

```ts
imagePreview({
   selector: `#${FUNCTIONAL_ID_MAP.IMAGE_PREVIEW}`,
   images: this. images,
   closeable: true,
}).then(() => {
   this.onGTip(this.t('closeTip'));
})
```


### Asynchronous shutdown

The asynchronous close can be enabled through the `asyncClose` attribute. After the asynchronous close is enabled, click the picture, mask layer, close button, etc., and the `promise` state will be set to `rejected`, and the instance object parameter will be passed in. The user can call `context The .closeDialog` method closes.


```ts
imagePreview({
   selector: `#${FUNCTIONAL_ID_MAP.IMAGE_PREVIEW}`,
   images: this. images,
   asyncClose: true,
}).catch(({ context }) => {
   context. closeDialog();
})
```

### Component call

Support component calls, the parent component needs to set `show` to `false` when `close`.

```html
<Image Preview
   :show="show"
   closeable
   :start-position="1"
   :images="images"
   :custom-style="customStyle"
   @close="show = false"
/>
```



## API

### Props


| Parameter         | Description                                                           | Type             | Default     |
| ----------------- | --------------------------------------------------------------------- | ---------------- | ----------- |
| show              | Whether to display, it is fixed to `true` when the function is called | _boolean_        | `false`     |
| images            | list of images                                                        | _Array<string\>_ | -           |
| startPosition     | initial position                                                      | _number_         | `0`         |
| showIndex         | whether to show index                                                 | _boolean_        | `false`     |
| asyncClose        | Whether to close asynchronously                                       | _boolean_        | `false`     |
| closeable         | Whether to show the close icon                                        | _boolean_        | `false`     |
| closeIcon         | close icon name                                                       | _string_         | `clear`     |
| closeIconPosition | close icon position                                                   | _string_         | `top-right` |
| custom-style      | custom style                                                          | _string_         | -           |
| custom-class      | custom class name                                                     | _string_         | -           |

### Events

| Event Name | Description                     | Parameters            |
| ---------- | ------------------------------- | --------------------- |
| close      | fires when close                | -                     |
| change     | Triggered when switching images | active(current index) |