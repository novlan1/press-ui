---
url : pages/press/radio/radio
---

## Radio 

Make a single choice among a set of alternatives.


## Code Demo

### Basic usage

Bind value to the name of the currently selected item via `value`.

```html
<press-radio-group :value="radio" @change="onChange">
   <press-radio name="1">Radio box 1</press-radio>
   <press-radio name="2">Radio box 2</press-radio>
</press-radio-group>
```

```js
export default {
   data() {
     return {
       radio: '1',
     }
   },
   methods: {
     onChange(value) {
       this.radio = value;
     },
   }
};
```

### Horizontal alignment

After setting the `direction` property to `horizontal`, the radio group will be arranged horizontally.

```html
<press-radio-group
   :value="radio"
   @change="onChange"
   direction="horizontal"
>
   <press-radio name="1">Radio box 1</press-radio>
   <press-radio name="2">Radio box 2</press-radio>
</press-radio-group>
```

### Disabled state

Toggling of options is disabled via the `disabled` attribute, setting `disabled` on `Radio` can disable individual options.

```html
<press-radio-group :value="radio" disabled @change="onChange">
   <press-radio name="1">Radio box 1</press-radio>
   <press-radio name="2">Radio box 2</press-radio>
</press-radio-group>
```

### Custom shape

Set the `shape` property to `square`, the shape of the radio box will become a square.

```html
<press-radio-group :value="radio" @change="onChange">
   <press-radio name="1" shape="square">Radio box 1</press-radio>
   <press-radio name="2" shape="square">Radio box 2</press-radio>
</press-radio-group>
```

### Custom Colors

Set the icon color of the checked state through the `checked-color` property.

```html
<press-radio-group :value="radio" @change="onChange">
   <press-radio name="1" checked-color="#07c160">Radio box 1</press-radio>
   <press-radio name="2" checked-color="#07c160">Radio box 2</press-radio>
</press-radio-group>
```

### Custom size

The size of the icon can be customized through the `icon-size` property.

```html
<press-radio-group :value="radio" @change="onChange">
   <press-radio name="1" icon-size="24px">Radio box 1</press-radio>
   <press-radio name="2" icon-size="24px">Radio box 2</press-radio>
</press-radio-group>
```

### Custom icon

To customize the icon through the `icon` slot, you need to set the `use-icon-slot` property.

```html
<press-radio-group :value="radio" @change="onChange">
   <press-radio use-icon-slot :value="radio" name="1">
     custom icon
     <img slot="icon" :src="radio === '1' ? icon. active : icon. normal" />
   </press-radio>
   <press-radio use-icon-slot :value="radio" name="2">
     custom icon
     <img slot="icon" :src="radio === '2' ? icon. active : icon. normal" />
   </press-radio>
</press-radio-group>
```

```js
export default {
   data() {
     return {
       radio: true,
       icon: {
         normal: '//img.yzcdn.cn/icon-normal.png',
         active: '//img.yzcdn.cn/icon-active.png',
       },
     }
   },
   methods: {
     onChanges(value) {
       this.radio = value;
     },
   }
};
```

### Disable text clicks

Clicking on the radio box text can be disabled by setting the `label-disabled` property.

```html
<press-radio-group :value="radio" @change="onChange">
   <press-radio name="1" label-disabled>Radio box 1</press-radio>
   <press-radio name="2" label-disabled>Radio box 2</press-radio>
</press-radio-group>
```

### Used with the Cell component

At this point you need to introduce `Cell` and `CellGroup` components.

```html
<press-radio-group :value="radio" @change="onChange">
   <press-cell-group>
     <press-cell title="Radio Box 1" clickable data-name="1" @click="onClick">
       <press-radio slot="right-icon" name="1" />
     </press-cell>
     <press-cell title="Radio Box 2" clickable data-name="2" @click="onClick">
       <press-radio slot="right-icon" name="2" />
     </press-cell>
   </press-cell-group>
</press-radio-group>
```

```js
export default {
   data() {
     return {
       radio: '1',
     }
   },
   methods: {
     onChange(value) {
       this.radio = value;
     },
     onClick(value) {
       this.radio = value;
     },
   }
};
```

## API

### RadioGroup Props

| Parameter | Description                                           | Type      | Default    |
| --------- | ----------------------------------------------------- | --------- | ---------- |
| name      | Identifier when submitted within the form             | _string_  | -          |
| value     | identifier of the currently selected item             | _any_     | -          |
| disabled  | Whether to disable all radio buttons                  | _boolean_ | `false`    |
| direction | Arrangement direction, optional value is `horizontal` | _string_  | `vertical` |

### Radio Props

| Parameter      | Description                             | Type               | Default   |
| -------------- | --------------------------------------- | ------------------ | --------- |
| name           | identifier                              | _string_           | -         |
| shape          | shape, optional value is `square`       | _string_           | `round`   |
| disabled       | Whether it is disabled                  | _boolean_          | `false`   |
| label-disabled | Whether to disable text content clicks  | _boolean_          | `false`   |
| label-position | text position, optional value is `left` | _string_           | `right`   |
| icon-size      | icon size, the default unit is `px`     | _string \| number_ | `20px`    |
| checked-color  | checked state color                     | _string_           | `#1989fa` |
| use-icon-slot  | Whether to use icon slot                | _boolean_          | `false`   |

### Radio Event

| Event Name | Description                              | Callback Parameters                     |
| ---------- | ---------------------------------------- | --------------------------------------- |
| @change    | Event fired when the bound value changes | the name of the currently selected item |

### Radio external style class

| class name   | description                         |
| ------------ | ----------------------------------- |
| custom-class | root node style class               |
| icon-class   | icon style class                    |
| label-class  | description information style class |

### RadioGroup Event

| Event Name | Description                              | Callback Parameters                     |
| ---------- | ---------------------------------------- | --------------------------------------- |
| @change    | Event fired when the bound value changes | the name of the currently selected item |

## Theme customization

<theme-config />