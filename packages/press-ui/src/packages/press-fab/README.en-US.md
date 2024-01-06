---
url : pages/press/fab/fab
---

## Fab 

The floating button can be dragged.

## Code Demo

### Basic usage

```html
  <press-fab
   :pattern="pattern"
   :content="content"
   @fabClick="fabClick"
/>
```

```js
export default {
   data() {
     return {
       pattern: {
         color: '#7A7E83',
         backgroundColor: '#fff',
         selectedColor: '#007AFF',
         buttonColor: '#007AFF',
         iconColor: '#fff',
       },
       content: [{
         iconPath: '/static/image.png',
         selectedIconPath: '/static/image-active.png',
         text: 'Album',
         active: false,
       },
       {
         iconPath: '/static/home.png',
         selectedIconPath: '/static/home-active.png',
         text: 'Homepage',
         active: false,
       },
       {
         iconPath: '/static/star.png',
         selectedIconPath: '/static/star-active.png',
         text: 'Favorites',
         active: false,
       },
       ],
     }
   },
   methods: {
     fabClick() {
       uni.showToast({
         title: 'Clicked the floating button',
         icon: 'none',
       });
     },
   }
}
```

## API

### Props


| Parameter | Description                                                                                        | Type     | Default    |
| --------- | -------------------------------------------------------------------------------------------------- | -------- | ---------- |
| pattern   | optional style configuration item                                                                  | _object_ | -          |
| direction | The way the expanded menu is displayed. horizontal: horizontal display, vertical: vertical display | _string_ | horizontal |
| content   | Expand menu content configuration items                                                            | _Array_  | -          |