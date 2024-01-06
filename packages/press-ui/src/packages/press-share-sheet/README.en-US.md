---
url : pages/press/share-sheet/share-sheet
---

## ShareSheet 

The sharing panel that pops up at the bottom is used to display the operation buttons corresponding to each sharing channel, without specific sharing logic.

## Code Demo

### Basic usage

The sharing panel defines the sharing options through the `options` attribute. Each item in the array is an object. The object format is shown in the table below the document.

```html
<press-cell title="Show share panel" @click="onClick" />
<press-share-sheet
   :show="showShare"
   title="Share with friends now"
   :options="options"
   @select="onSelect"
   @close="onClose"
/>
```

```js
export default {
   data() {
     return {
       showShare: false,
       options: [
         { name: 'WeChat', icon: 'wechat', openType: 'share' },
         { name: 'Weibo', icon: 'weibo' },
         { name: 'Copy link', icon: 'link' },
         { name: 'Share Poster', icon: 'poster' },
         { name: 'QR code', icon: 'qrcode' },
       ],
     }
   },
   methods: {
     onClick(event) {
       this.setData({ showShare: true });
     },

     onClose() {
       this.setData({ showShare: false });
     },

     onSelect(event) {
       Toast(event.detail.name);
       this. onClose();
     },
   },
};
```

### Show multi-line options

When the number of sharing options is large, `options` can be defined as an array nested format, and each sub-array will be displayed as a row of options.

```html
<press-share-sheet
   :show="showShare"
   title="Share with friends now"
   :options="options"
/>
```

```js
export default {
   data() {
     return {
       showShare: false,
       options: [
         [
           { name: 'WeChat', icon: 'wechat' },
           { name: 'Weibo', icon: 'weibo' },
           { name: 'QQ', icon: 'qq' },
         ],
         [
           { name: 'Copy link', icon: 'link' },
           { name: 'Share Poster', icon: 'poster' },
           { name: 'QR code', icon: 'qrcode' },
         ],
       ],
     }
   },
});
```

### Custom icon

In addition to using several built-in icons, you can directly pass in the image URL in `icon` to use a custom icon.

```html
<press-share-sheet :show="showShare" :options="options" />
```

```js
export default {
   data() {
     return {
       showShare: false,
       options: [
         {
           name: 'name',
           icon: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fcustom-icon-fire.png',
         },
         {
           name: 'name',
           icon: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fcustom-icon-light.png',
         },
         {
           name: 'name',
           icon: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fcustom-icon-water.png',
         },
       ],
     }
   },
};
```

### Display description information

The description text below the title can be set through the `description` attribute, and the description of the sharing option can be added by setting the `description` attribute in `options`.

```html
<press-share-sheet
   :show="showShare"
   :options="options"
   title="Share with friends now"
   description="Description information"
/>
```

```js
export default {
   data() {
     return {
       showShare: false,
       options: [
         { name: 'WeChat', icon: 'wechat' },
         { name: 'Weibo', icon: 'weibo' },
         {
           name: 'Copy link',
           icon: 'link',
           description: 'Description information',
         },
         { name: 'Share Poster', icon: 'poster' },
         { name: 'QR code', icon: 'qrcode' },
       ],
     }
   },
};
```

## API

### Props

| Parameter              | Description                                   | Type               | Default    |
| ---------------------- | --------------------------------------------- | ------------------ | ---------- |
| show                   | Whether to show the share panel               | _boolean_          | `false`    |
| options                | Share options                                 | _Option[]_         | `[]`       |
| title                  | top title                                     | _string_           | -          |
| cancel-text            | cancel button text                            | _string_           | `'cancel'` |
| description            | Auxiliary description text below the title    | _string_           | -          |
| duration               | Animation duration, in milliseconds           | _number \| string_ | `300`      |
| overlay                | Whether to show the overlay                   | _boolean_          | `true`     |
| close-on-click-overlay | Whether to close the overlay on click         | _boolean_          | `true`     |
| safe-area-inset-bottom | Whether to enable bottom safe area adaptation | _boolean_          | `true`     |

### Option Data Structure

The `options` attribute is an array of objects, each object in the array configures a column, and the object can contain the following values:

| key name    | description                                                                                                                          | type     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| name        | sharing channel name                                                                                                                 | _string_ |
| description | Description of sharing options                                                                                                       | _string_ |
| icon        | Icon, optional values are `qq` `link` `weibo` `wechat` `poster` `qrcode` `weapp-qrcode` `wechat-moments`, support incoming image URL | _string_ |
| openType    | The button `open-type`, can be used to implement the sharing function, the optional value is `share`                                 | _string_ |

### Events

| Event Name    | Description                              | Callback Parameters             |
| ------------- | ---------------------------------------- | ------------------------------- |
| select        | Triggered when a share option is clicked | _option: Option, index: number_ |
| close         | fires when close                         | -                               |
| cancel        | Fired when the cancel button is clicked  | -                               |
| click-overlay | Triggered when the overlay is clicked    | -                               |

### Slots

| Name        | Description             |
| ----------- | ----------------------- |
| title       | custom top title        |
| description | custom description text |

## Theme customization

<theme-config />