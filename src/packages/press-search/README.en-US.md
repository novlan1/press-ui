---
url : pages/press/search/search
---

## Search

An input box component for searching scenarios.

## Code Demo

### Basic usage

In `press-search`, value is used to control the text in the search box. background You can customize the external background color of the search box.

```html
<press-search :value="value" placeholder="Please enter search keywords" />
```

### Event Listener

`press-search` provides search and cancel events. The search event fires when the user taps the search button on the keyboard. The cancel event fires when the user clicks the cancel button to the right of the search box.

```html
<press-search
   :value="value"
   placeholder="Please enter search keywords"
   show-action
   @search="onSearch"
   @cancel="onCancel"
/>
```

### Search box content alignment

The alignment of the search box content can be set through the `input-align` property.

```html
<press-search
   :value="value"
   input-align="center"
   placeholder="Please enter search keywords"
/>
```

### Disable the search box

Components can be set to a disabled state via the `disabled` property.

```html
<press-search disabled :value="value" placeholder="Please enter search keywords" />
```

### Custom background color

The background color outside the search box can be set through the `background` attribute, and the shape of the search box can be set through the `shape` attribute, and the optional value is `round`.

```html
<press-search
   :value="value"
   shape="round"
   background="#4fc08d"
   placeholder="Please enter search keywords"
/>
```

### Custom button

`press-search` supports customizing the cancel button on the right, use a slot named action, and set use-action-slot to true.

```html
<press-search
   :value="value"
   label="address"
   placeholder="Please enter search keywords"
   use-action-slot
   @change="onChange"
   @search="onSearch"
>
   <div slot="action" @click="onClick">Search</div>
</press-search>
```


## API

### Props

| Parameter | Description | Type | Default |
| --------- | ----------- | ---- | ------- ||
| name                 | Identifier when submitted within the form                                                                                                                             | _string_           | -         |
| label                | left text of search box                                                                                                                                               | _string_           | -         |
| shape                | shape, optional value is `round`                                                                                                                                      | _string_           | `square`  |
| value                | current input value                                                                                                                                                   | _string \| number_ | -         |
| background           | Search box background color                                                                                                                                           | _string_           | `#f2f2f2` |
| show-action          | Whether to show a cancel button on the right side of the search box                                                                                                   | _boolean_          | `false`   |
| action-text `v1.0.0` | cancel button text                                                                                                                                                    | _string_           | `cancel`  |
| focus                | get focus                                                                                                                                                             | _boolean_          | `false`   |
| error                | Whether to mark the input content in red                                                                                                                              | _boolean_          | `false`   |
| disabled             | Whether to disable the input box                                                                                                                                      | _boolean_          | `false`   |
| readonly             | read only                                                                                                                                                             | _boolean_          | `false`   |
| clearable            | Whether to enable the clear control                                                                                                                                   | _boolean_          | `true`    |
| clear-trigger        | When to display the clear icon, `always` means display when the input box is not empty, <br>`focus` means display when the input box is focused and not empty         | _string_           | `focus`   |
| clear-icon           | Clear [icon name](./press-icon-plus) or image link                                                                                                                               | _string_           | `clear`   |
| maxlength            | The maximum input length, when set to -1, there is no limit to the maximum length                                                                                     | _number_           | `-1`      |
| use-action-slot      | whether to use action slot                                                                                                                                            | _boolean_          | `false`   |
| placeholder          | placeholder when the input box is empty                                                                                                                               | _string_           | -         |
| placeholder-style    | Specifies the style of the placeholder                                                                                                                                | _string_           | -         |
| input-align          | Alignment of input box content, optional values are `center` `right`                                                                                                  | _string_           | `left`    |
| use-left-icon-slot   | Whether to use the left icon slot of the input box                                                                                                                    | _boolean_          | `false`   |
| use-right-icon-slot  | Whether to use the right icon slot of the input box                                                                                                                   | _boolean_          | `false`   |
| left-icon            | The icon name or image link on the left side of the input box, see the IconPlus component for optional values (if use-left-icon-slot is set, this attribute is invalid)   | _string_           | `search`  |
| right-icon           | The icon name or image link on the right side of the input box, see the IconPlus component for optional values (if use-right-icon-slot is set, this attribute is invalid) | _string_           | -         |

### Events

| Event Name   | Description                                    | Parameters                        |
| ------------ | ---------------------------------------------- | --------------------------------- |
| @search      | Triggered when the search is confirmed         | event.detail: current input value |
| @change      | Triggered when the input content changes       | event.detail: current input value |
| @cancel      | Triggered when a search is canceled            | -                                 |
| @focus       | Triggered when the input box is focused        | -                                 |
| @blur        | Triggered when the input box is out of focus   | -                                 |
| @clear       | Triggered when the control is clicked to clear | -                                 |
| @click-input | Triggered when the search field is clicked     | -                                 |

### Slot

| Name       | Description                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------- |
| action     | Customize the button on the right side of the search box, it will only be displayed when `use-action-slot` is true  |
| label      | Customize the left text of the search box                                                                           |
| left-icon  | Customize the left icon of the input box, it will only be displayed when `use-left-icon-slot` is true               |
| right-icon | Customize the icon on the right side of the input box, it will only be displayed when `use-right-icon-slot` is true |

### External style classes

| class name   | description               |
| ------------ | ------------------------- |
| custom-class | root node style class     |
| field-class  | Search box style class    |
| input-class  | input box style class     |
| cancel-class | cancel button style class |

## Theme customization

<theme-config />