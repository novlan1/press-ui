---
url : pages/press/checkbox/checkbox
---

## Checkbox 


Make multiple selections within a set of alternatives.

### Basic usage

Bind the checked state of the checkbox by `value`.

```html
<press-checkbox
   :value="checked"
   @change="onChange"
>
   check box
</press-checkbox>
```

```js
export default {
   data() {
     return {
       checked: true,
     };
   },
   methods: {
     onChange(val) {
       this. checked = val;
     },
   },
};
```

### Disabled state

A checkbox can be disabled by setting the `disabled` property.

```html
<press-checkbox
   :value="checked"
   disabled
   @change="onChange"
>
   check box
</press-checkbox>
```

### Custom shape

Set the `shape` property to `square`, the shape of the check box will become a square.

```html
<press-checkbox
   shape="square"
   :value="checked"
   @change="onChange"
>
   check box
</press-checkbox>
```

### Custom Colors

The color of the icon in the checked state can be customized through the `checked-color` property.

```html
  <press-checkbox
   :value="checked"
   checked-color="#07c160"
   @change="onChange"
>
   check box
</press-checkbox>
```

### Custom size

The size of the icon can be customized through the `icon-size` property.

```html
<press-checkbox
   :value="checked"
   :icon-size="25"
   @change="onChange"
>
   check box
</press-checkbox>
```


### Disable text clicks

Checkbox text clicks can be disabled by setting the `label-disabled` property.

```html
  <press-checkbox
   :value="checked"
   label-disabled
   @change="onChange"
>
   check box
</press-checkbox>
```

## API

### Checkbox Props

| Parameter | Description | Type | Default |
| --------- | ----------- | ---- | ------- ||
| name           | Identifier Checkbox name                   | _string_           | -         |
| shape          | shape, optional value is `round` `square`  | _string_           | `round`   |
| value          | Whether it is selected or not              | _boolean_          | `false`   |
| disabled       | Whether to disable the radio button        | _boolean_          | `false`   |
| label-disabled | Whether to disable radio box content click | _boolean_          | `false`   |
| label-position | text position, optional value is `left`    | _string_           | `right`   |
| use-icon-slot  | whether to use icon slot                   | _boolean_          | `false`   |
| checked-color  | checked state color                        | _string_           | `#1989fa` |
| icon-size      | icon size                                  | _string \| number_ | `20px`    |

### CheckboxGroup Props

| Parameter          | Description                                           | Type      | Default         |
| ------------------ | ----------------------------------------------------- | --------- | --------------- |
| name               | Identifier when submitted within the form             | _string_  | -               |
| value              | name of all selected items                            | _Array_   | -               |
| disabled           | Whether to disable all radio buttons                  | _boolean_ | `false`         |
| max                | Set the maximum number of options                     | _number_  | `0` (unlimited) |
| direction `v1.7.0` | Arrangement direction, optional value is `horizontal` | _string_  | `vertical`      |

### Checkbox Event

| Event Name | Description                              | Callback Parameters           |
| ---------- | ---------------------------------------- | ----------------------------- |
| change     | event fired when the bound value changes | the current component's value |

### Checkbox external style class

| class name   | description                         |
| ------------ | ----------------------------------- |
| custom-class | root node style class               |
| icon-class   | icon style class                    |
| label-class  | description information style class |

### CheckboxGroup Event

| Event Name | Description                              | Callback Parameters           |
| ---------- | ---------------------------------------- | ----------------------------- |
| change     | event fired when the bound value changes | the current component's value |

### Checkbox Slot

| Name | Description |
| ---- | ----------- |
| -    | Custom Text |
| icon | custom icon |

### Checkbox method

You can get the checkbox instance and call the instance method through selectComponent.

| method name | parameters | return value | description           |
| ----------- | ---------- | ------------ | --------------------- |
| toggle      | -          | -            | Toggle selected state |

## Theme customization

<theme-config />