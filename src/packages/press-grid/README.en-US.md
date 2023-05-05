---
url : pages/press/grid/grid
---

## Grid

The grid can divide the page into equal-width blocks in the horizontal direction, which is used for displaying content or page navigation.


## Code Demo

### Basic Usage

The icon in the grid is set through the `icon` attribute, and the text content is set by the `text` attribute.

```html
<press-grid>
   <press-grid-item icon="photo-o" text="text" />
   <press-grid-item icon="photo-o" text="text" />
   <press-grid-item icon="photo-o" text="text" />
   <press-grid-item icon="photo-o" text="text" />
</press-grid>
```

### Customize the number of columns

By default, four grids are displayed in one row, and the number of columns can be customized by `column-num`.

```html
<press-grid:column-num="3">
   <press-grid-item
     icon="photo-o"
     text="text"
     v-for="(item, index) of 6"
     :key="index"
   />
</press-grid>
```

### Custom content

The content displayed by the grid can be customized through slots.

```html
<press-grid :column-num="3" :border="false">
   <press-grid-item
     use-slot
     v-for="(item,index) of 3"
     :key="index"
   >
     <image
       style="width: 100%; height: 90px;"
       :src="imageList[index]"
     />
   </press-grid-item>
</press-grid>
```

### square grid

After setting the `square` property, the height of the grid will be consistent with the width.

```html
<press-grid square>
   <press-grid-item icon="photo-o" text="text" v-for="(item,index) of 8" :key="index" />
</press-grid>
```

### grid spacing

Set the distance between the grids through the `gutter` property.

```html
<press-grid:gutter="10">
   <press-grid-item icon="photo-o" text="text" v-for="(item,index) of 8" :key="index" />
</press-grid>
```

### content horizontal

Set the `direction` property to `horizontal`, so that the content of the grid can be arranged horizontally.

```html
<press-grid direction="horizontal" :column-num="2">
   <press-grid-item icon="photo-o" text="text" />
   <press-grid-item icon="photo-o" text="text" />
   <press-grid-item icon="photo-o" text="text" />
</press-grid>
```

### page jump

The page jump can be performed through the `url` attribute, and the jump type can be controlled by the `link-type` attribute.

```html
<press-grid clickable :column-num="2">
   <press-grid-item
     icon="home-o"
     link-type="navigateTo"
     url="/pages/index/index"
     text="Navigate Jump"
   />
   <press-grid-item
     icon="search"
     link-type="reLaunch"
     url="/pages/index/index"
     text="ReLaunch Jump"
   />
</press-grid>
```

### Prompt information

After setting the `dot` attribute, a small red dot will be displayed in the upper right corner of the icon. After setting the `badge` attribute, the corresponding logo will be displayed in the upper right corner of the icon.

```html
<press-grid:column-num="2">
   <press-grid-item icon="home-o" text="text" dot />
   <press-grid-item icon="search" text="text" badge="99+" />
</press-grid>
```

## API

### Grid Props

| Parameter        | Description                                                                   | Type               | Default    |
| ---------------- | ----------------------------------------------------------------------------- | ------------------ | ---------- |
| column-num       | number of columns                                                             | _number_           | `4`        |
| icon-size        | icon size, the default unit is `px`                                           | _string_           | `28px`     |
| gutter           | Gutter spacing, the default unit is `px`                                      | _string \| number_ | `0`        |
| border           | Whether to show a border                                                      | _boolean_          | `true`     |
| center           | Whether to center the grid content                                            | _boolean_          | `true`     |
| square           | Whether to fix grid to square                                                 | _boolean_          | `false`    |
| clickable        | Whether to enable grid click feedback                                         | _boolean_          | `false`    |
| direction        | The direction of grid content arrangement, the optional value is `horizontal` | _string_           | `vertical` |
| reverse `v1.7.0` | Whether to reverse icon and text positions                                    | _boolean_          | `false`    |
| use-slot         | Whether to use custom content slot                                            | _boolean_          | `false`    |

### Grid external style class

| class name   | description           |
| ------------ | --------------------- |
| custom-class | root node style class |

### GridItem Props

| Parameter   | Description                                                                | Type               | Default      |
| ----------- | -------------------------------------------------------------------------- | ------------------ | ------------ |
| text        | text                                                                       | _string_           | -            |
| icon        | icon name or image link, see [Icon Component](#/icon) for optional values  | _string_           | -            |
| icon-color  | icon color                                                                 | _string_           | -            |
| icon-prefix | Third-party icon prefix                                                    | _string_           | `press-icon` |
| dot         | Whether to display the small red dot in the upper right corner of the icon | _boolean_          | `false`      |
| badge       | The content of the logo in the upper right corner of the icon              | _string \| number_ | -            |
| url         | Link address to jump after clicking                                        | _string_           | -            |
| link-type   | link jump type, optional values are `redirectTo` `switchTab` `reLaunch`    | _string_           | `navigateTo` |

### GridItem Events

| Event Name | Description                        | Callback Parameters |
| ---------- | ---------------------------------- | ------------------- |
| bind:click | Triggered when the grid is clicked | -                   |

### GridItem Slots

| Name       | Description                                                                       |
| ---------- | --------------------------------------------------------------------------------- |
| ---------- | To customize all the content of the grid, you need to set the `use-slot` property |
| icon       | custom icon, if `use-slot` or `icon` attribute is set, it will not take effect    |
| text       | Custom text, if `use-slot` or `text` attribute is set, it will not take effect    |

### GridItem external style class

| class name    | description           |
| ------------- | --------------------- |
| custom-class  | root node style class |
| content-class | content style class   |
| icon-class    | icon style class      |
| text-class    | text style class      |