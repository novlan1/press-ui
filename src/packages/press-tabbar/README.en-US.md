---
url : pages/press/tabbar/tabbar
---

## Tabbar 

The bottom navigation bar is used to switch between different pages.



## Code Demo

### Basic usage

```html
<press-tabbar :active="active" @change="onChange">
   <press-tabbar-item icon="home-o">label</press-tabbar-item>
   <press-tabbar-item icon="search">Label</press-tabbar-item>
   <press-tabbar-item icon="friends-o">label</press-tabbar-item>
   <press-tabbar-item icon="setting-o">label</press-tabbar-item>
</press-tabbar>
```

```javascript
export default {
   data() {
     return {
       active: 0,
     }
   },
   methods: {
     onChange(value) {
       this.active = value;
     },
   }
};
```

### Match by name

In the case of a tag specifying a `name` attribute, the value of `v-model` is the `name` of the current tag.

```html
<press-tabbar :active="active" @change="onChange">
   <press-tabbar-item name="home" icon="home-o">label</press-tabbar-item>
   <press-tabbar-item name="search" icon="search">label</press-tabbar-item>
   <press-tabbar-item name="friends" icon="friends-o">label</press-tabbar-item>
   <press-tabbar-item name="setting" icon="setting-o">label</press-tabbar-item>
</press-tabbar>
```

```javascript
export default {
   data() {
     return {
       active: 'home',
     }
   },
   methods: {
     onChange(value) {
       this.active = value;
     },
   }
};
```

### Show logo

```html
<press-tabbar :active="active" @change="onChange">
   <press-tabbar-item icon="home-o">label</press-tabbar-item>
   <press-tabbar-item icon="search" dot>label</press-tabbar-item>
   <press-tabbar-item icon="friends-o" info="5">Label</press-tabbar-item>
   <press-tabbar-item icon="setting-o" info="20">Label</press-tabbar-item>
</press-tabbar>
```

### Custom icon

Icons can be customized through slots, where icon slot represents the icon in the unselected state, and icon-active slot represents the icon in the selected state.

```html
<press-tabbar :active="active" @change="onChange">
   <press-tabbar-item info="3">
     <img
       slot="icon"
       src="{{ icon. normal }}"
       mode="aspectFit"
       style="width: 30px; height: 18px;"
     />
     <img
       slot="icon-active"
       src="{{ icon.active }}"
       mode="aspectFit"
       style="width: 30px; height: 18px;"
     />
     customize
   </press-tabbar-item>
   <press-tabbar-item icon="search">Label</press-tabbar-item>
   <press-tabbar-item icon="setting-o">label</press-tabbar-item>
</press-tabbar>
```

```javascript
export default {
   data() {
     return {
       active: 0,
       icon: {
         normal: '//mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fuser-inactive.png',
         active: '//mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fuser-active.png',
       },
     }
   },
    methods: {
     onChange(value) {
       this.active = value;
     },
   }
};
```

### Custom Colors

```html
<press-tabbar
   :active="active"
   active-color="#07c160"
   inactive-color="#000"
   @change="onChange"
>
   <press-tabbar-item icon="home-o">label</press-tabbar-item>
   <press-tabbar-item icon="search">Label</press-tabbar-item>
   <press-tabbar-item icon="friends-o">label</press-tabbar-item>
   <press-tabbar-item icon="setting-o">label</press-tabbar-item>
</press-tabbar>
```


### Switch tab event

```html
<press-tabbar :active="active" @change="onChange">
   <press-tabbar-item icon="home-o">Label 1</press-tabbar-item>
   <press-tabbar-item icon="search">Label 2</press-tabbar-item>
   <press-tabbar-item icon="friends-o">Label 3</press-tabbar-item>
   <press-tabbar-item icon="setting-o">Label 4</press-tabbar-item>
</press-tabbar>
```

```javascript
export default {
   data() {
     return {
       active: 'home',
     }
   },
   methods: {
     onClick(value) {
       console.log('value:', value);
     },
   }
};
```


## API

### Tabbar Props

| Parameter              | Description                                                                                               | Type      | Default   |
| ---------------------- | --------------------------------------------------------------------------------------------------------- | --------- | --------- |
| active                 | index of currently selected tab                                                                           | _number_  | -         |
| fixed                  | Whether to fix at the bottom                                                                              | _boolean_ | `true`    |
| placeholder            | When fixed at the bottom, whether to generate a placeholder element of equal height at the label position | _boolean_ | `false`   |
| border                 | Whether to show the outer border                                                                          | _boolean_ | `true`    |
| z-index                | element z-index                                                                                           | _number_  | `1`       |
| active-color           | The color of the selected tab                                                                             | _string_  | `#1989fa` |
| inactive-color         | Color of inactive tabs                                                                                    | _string_  | `#7d7e80` |
| safe-area-inset-bottom | Whether to set a bottom safety distance for iPhoneX                                                       | _boolean_ | `true`    |

### Tabbar Event

| Event Name | Description                   | Parameters                                                    |
| ---------- | ----------------------------- | ------------------------------------------------------------- |
| @change    | Triggered when switching tabs | event.detail: the name or index of the currently selected tab |

### TabbarItem Props

| Parameter   | Description                                                                                         | Type               | Default                    |
| ----------- | --------------------------------------------------------------------------------------------------- | ------------------ | -------------------------- |
| name        | tag name, as an identifier for matching                                                             | _string \| number_ | index value of current tag |
| icon        | icon name or image link, see [Ic for optional values]on component](./press-icon-plus)               | _string_           | -                          |
| icon-prefix | Icon class name prefix, same as [class-prefix attribute](./press-icon-plus#props) of Icon component | _string_           | `press-icon`               |
| dot         | Whether to display a small red dot                                                                  | _boolean_          | -                          |
| info        | Tip information in the upper right corner of the icon                                               | _string \| number_ | -                          |

### TabbarItem Slot

| Name        | Description            |
| ----------- | ---------------------- |
| icon        | Icon when not selected |
| icon-active | icon when selected     |

## Theme customization

<theme-config />