---
url : pages/press/link/link
---

## Link link

- Open the link in H5 through `window.open`
- In the APP platform, the built-in browser will be opened through the `plus` environment
- Copy the link to the clipboard in the applet, and prompt the information at the same time

## Import

```ts
import PressLink from 'press-ui/press-link/press-link';

export default {
  components: {
    PressLink,
  }
}
```

## Code demonstration

### Basic usage

Use `href` to set the link to be opened, and `text` to set the displayed content.

```html
<PressLink
  :text="t('openDocs')"
  href="https://novlan1.github.io/press-ui/"
  @click="click"
/>
```

```ts
export default {
  methods: {
    click() {}
  }
}
```

### Underline

Use `underline` to set whether to display the underline of the link.

```html
<PressLink
  underline
  :text="t('openDocs')"
  href="https://novlan1.github.io/press-ui/"
  @click="click"
/>
```

### Custom color

Use `color` to set the text color.

```html
<PressLink
  :text="t('openDocs')"
  color="#19be6b"
  href="https://novlan1.github.io/press-ui/"
  @click="click"
/>
```

## API

### Props

| Parameter | Description                                         | Type               | Default value                         |
| --------- | --------------------------------------------------- | ------------------ | ------------------------------------- |
| text      | text                                                | _string_           | -                                     |
| color     | text color                                          | _string_           | `#2979ff`                             |
| font-size | font size, unit `px`                                | _string \| number_ | `15`                                  |
| underline | whether to display underline                        | _boolean_          | `false`                               |
| href      | link to jump to                                     | _string_           | -                                     |
| mp-tips   | prompts copied to the clipboard in the mini program | _string_           | `Link copied, please open in browser` |

### Events

| Event name | Description | Parameters |
| ---------- | ----------- | ---------- |
| click      | Click       | -          |

## Online debugging

<debug-online />