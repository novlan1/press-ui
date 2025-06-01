---
url : pages/press/cell/cell
---

## Cell 


A cell is a single display item in a list.

## Code Demo

### Basic usage

`Cell` can be used alone or with `CellGroup`. `CellGroup` can provide top and bottom borders for `Cell`.

```html
<press-cell-group>
   <press-cell title="cell" value="content" />
   <press-cell title="cell" value="content" label="description" :border="false" />
</press-cell-group>
```

### Card Style

Through the `inset` attribute of `CellGroup`, the cell can be converted to a rounded card style (supported since version 1.7.2).

```html
<press-cell-group inset>
   <press-cell title="cell" value="content" />
   <press-cell title="cell" value="content" label="description information" />
</press-cell-group>
```

### cell size

The size of the cell can be controlled by the `size` attribute.

```html
<press-cell title="cell" value="content" size="large" />
<press-cell title="cell" value="content" size="large" label="description information" />
```

### Show icon

Use the `icon` property to display an icon to the left of the title.

```html
<press-cell title="cell" icon="location-o" />
```

### Show Arrows

After setting the `is-link` attribute, an arrow will be displayed on the right side of the cell, and the direction of the arrow can be controlled by the `arrow-direction` attribute.

```html
<press-cell title="Cell" is-link />
<press-cell title="cell" is-link value="content" />
<press-cell title="cell" is-link value="content" arrow-direction="down" />
```

### page jump

The page jump can be performed through the `url` attribute, and the jump type can be controlled by the `link-type` attribute.

```html
<press-cell
   is-link
   title="cell"
   link-type="navigateTo"
   url="/pages/dashboard/index"
/>
```

### Group title

The title of the group can be specified by the `title` property of `CellGroup`.

```html
<press-cell-group title="Group 1">
   <press-cell title="cell" value="content" />
</press-cell-group>
<press-cell-group title="Group 2">
   <press-cell title="cell" value="content" />
</press-cell-group>
```

### Using slots

If the above usage does not meet your needs, you can use slots to customize the content.

```html
<press-cell
   value="content"
   icon="shop-o"
   is-link
   :use-title-slot="true"
>
   <div slot="title">
     <div class="press-cell-text">cell</div>
     <press-tag type="danger">label</press-tag>
   </div>
</press-cell>
<press-cell title="Cell">
   <press-icon-plus slot="right-icon" name="search" class="custom-icon" />
</press-cell>
```

### Vertical centering

The left and right content of the `Cell` can be vertically centered through the `center` property.

```html
<press-cell center title="cell" value="content" label="description information" />
```

## API

### CellGroup Props

| Parameter | Description                                  | Type      | Default |
| --------- | -------------------------------------------- | --------- | ------- |
| title     | group title                                  | _string_  | `-`     |
| inset     | Whether to display rounded corner card style | _boolean_ | `false` |
| border    | Whether to show the outer border             | _boolean_ | `true`  |

### CellGroup external style class

| class name   | description           |
| ------------ | --------------------- |
| custom-class | root node style class |

### Cell Props

| Parameter       | Description                                                             | Type               | Default      |
| --------------- | ----------------------------------------------------------------------- | ------------------ | ------------ |
| icon            | Left icon name or image link, see IconPlus component for optional values    | _string_           | -            |
| title           | left title                                                              | _string \| number_ | -            |
| title-width     | Title width, must include units                                         | _string_           | -            |
| value           | right side content                                                      | _string \| number_ | -            |
| label           | descriptive information below the title                                 | _string_           | -            |
| size            | cell size, optional value is `large`                                    | _string_           | -            |
| border          | Whether to show the bottom border                                       | _boolean_          | `true`       |
| center          | Whether to vertically center the content                                | _boolean_          | `false`      |
| url             | Link address to jump after clicking                                     | _string_           | -            |
| link-type       | link jump type, optional values are `redirectTo` `switchTab` `reLaunch` | _string_           | `navigateTo` |
| clickable       | Whether to enable click feedback                                        | _boolean_          | `false`      |
| is-link         | Whether to show the right arrow and enable click feedback               | _boolean_          | `false`      |
| required        | Whether to show form required asterisks                                 | _boolean_          | `false`      |
| arrow-direction | Arrow direction, optional values are `left` `up` `down`                 | _string_           | -            |
| use-label-slot  | whether to use label slot                                               | _boolean_          | `false`      |
| title-style     | title style                                                             | _string_           | -            |

### Cell Events

| Event Name | Description                      | Parameters |
| ---------- | -------------------------------- | ---------- |
| click      | Triggered when a cell is clicked | -          |

### Cell Slot

| Name       | Description                                                                                                    |
| ---------- | -------------------------------------------------------------------------------------------------------------- |
| ---        | Custom `value` display content, if the `value` attribute is set, it will not take effect                       |
| title      | Custom `title` display content, if the `title` attribute is set, it will not take effect                       |
| label      | To customize `label` display content, you need to set the `use-label-slot` property                            |
| icon       | Custom `icon` display content, if the `icon` attribute is set, it will not take effect                         |
| right-icon | Customize the right button, the default is `arrow`, if the `is-link` attribute is set, it will not take effect |

### Cell external style class

| class name   | description                         |
| ------------ | ----------------------------------- |
| custom-class | root node style class               |
| title-class  | title style class                   |
| label-class  | description information style class |
| value-class  | Right content style class           |


## Theme customization

<theme-config />