---
url : pages/press/text/text
---

## Text

## Import

```ts
import PressText from 'press-ui/press-text/press-text.vue';

export default {
  components: {
    PressText,
  }
}
```

## Code demonstration

### Basic usage

Set the text content through the `text` parameter.

```html
<PressText text="朝花夕拾" />
```

### Set the theme

The `type` parameter can be used to set the text theme.

```html
<PressText type="primary" text="Primary color"/>
<PressText type="error" text="Error"/>
<PressText type="success" text="Success"/>
<PressText type="warning" text="Warning"/>
<PressText type="info" text="Information"/>
```

### Make a call

Call by setting the `mode` attribute to `phone` and providing the encryption value `encrypt`.

```html
<PressText mode="phone" text="19012345678" call/>
<PressText mode="phone" text="19012345678" format="encrypt"/>
```

### Date format

By setting the `mode` attribute to `date`, you can use the date format,

```html
<PressText mode="date" text="1720633407953"/>
```

### Name

By setting the `mode` attribute to `name`, you can use the name format.

```html
<PressText mode="name" text="花木兰" format="encrypt"/>
```

### Hyperlink

Add `href` to specify the link address.

```html
<PressText
  mode="link"
  text="Go to Press UI docs"
  href="https://novlan1.github.io/press-ui/"
/>
```

### Displaying the Amount

The amount can be displayed by setting the `mode` attribute to `name`.

```html
<PressText mode="price" text="728732.32"/>
```

### Prefix and Postfix Icons

Add `prefixIcon`, `suffixIcon` to specify the icon and position, and `iconStyle` to set the icon style.

```html
<PressText
  prefix-icon="like-o"
  icon-style="font-size: 19px"
  :text="t('snow')"
/>
<PressText
  suffix-icon="arrow"
  icon-style="font-size: 18px"
  :text="t('checkMore')"
/>
```

### Beyond hidden

The text beyond hidden style is built-in. Set the `lines` property to indicate how many lines to hide.

```html
<PressText
  :lines="2"
  :text="t('longText')"
/>
```

### Mini Program Open Capabilities

The Mini Program open capabilities can be used through `open-type`.

```html
<PressText
  text="Share to Mini Program"
  open-type="share"
  type="success"
  @click="onClick"
/>
```

```ts
export default {
  methods: {
    onClick() {},
  }
}
```

## API

### Props

| Parameter   | Description                                                                                                    | Type                         | Default value |
| ----------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------- |
| type        | Theme color                                                                                                    | _string_                     | -             |
| show        | Whether to display                                                                                             | _boolean_                    | `true`        |
| text        | Value                                                                                                          | _string_                     | -             |
| prefix-icon | Prefix icon                                                                                                    | _string_                     | -             |
| suffix-icon | Postfix icon                                                                                                   | _string_                     | -             |
| mode        | Mode <br>`text` Normal text, `price` Price, `phone` Phone number<br>`name` name, `date` date, `link` hyperlink | _string_                     | -             |
| href        | When `mode` is `link`, the configured link                                                                     | _string_                     | -             |
| format      | Formatting rules                                                                                               | _string \| function_         | -             |
| call        | When `mode` is `phone`, whether to make a call by clicking on the text                                         | _boolean_                    | `false`       |
| open-type   | How to open the applet                                                                                         | _string_                     | -             |
| bold        | Whether bold                                                                                                   | _boolean_                    | `false`       |
| block       | Whether block                                                                                                  | _boolean_                    | `false`       |
| lines       | The number of lines displayed for text. If set, ellipsis will be displayed if the number of lines exceeds this | _string \| number_           | -             |
| color       | Text color                                                                                                     | _string_                     | `#303133`     |
| size        | Font size                                                                                                      | _string \| number_           | -             |
| icon-style  | IconPlus style                                                                                                     | _string_                     | -             |
| decoration  | Text decoration, underline, strikethrough, etc., optional values ​​are `none                                   | underline                    | line-through` | _string_ | `none`   |
| margin      | Margin                                                                                                         | _string \| number \| object_ | -             |
| line-height | Text line height                                                                                               | _string_                     | -             |
| align       | Text alignment, optional values ​​are `left                                                                    | center                       | right`        | _string_ | `left`   |
| word-wrap   | Text wrap, optional values ​​are `break-word                                                                   | normal                       | anywhere`     | _string_ | `normal` |

### Events

| Event name | Description | Parameters |
| ---------- | ----------- | ---------- |
| click      | Click       | -          |
