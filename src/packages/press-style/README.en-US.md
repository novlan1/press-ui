---
url : pages/press/style/style
---

## Style

Press UI includes some common styles by default, which can be used directly through `className`.

## Import

Introduce built-in styles in pages or components.

```ts
@import 'press-ui/common/style/press/index.scss';
```

## Code demonstration

### Text ellipsis

When the length of the text content exceeds the maximum width of the container, the redundant text is automatically omitted.

```xml
<div class="press-ellipsis">
This is a text with a width limit of 250px, and the following content will be omitted.
</div>

<!-- Display up to two lines -->
<div class="press-multi-ellipsis--l2">
This is a text that displays up to two lines, and the following content will be omitted.
</div>

<!-- Display up to three lines -->
<div class="press-multi-ellipsis--l3">
This is a text that displays up to three lines, and the following content will be omitted.
</div>
```

### 1px border

Add a `1px` border (i.e. `hairline`) to the element under the `Retina` screen, based on the pseudo-class `transform`.

```xml
<!-- Top border -->
<div class="press-hairline--top"></div>

<!-- Bottom border -->
<div class="press-hairline--bottom"></div>

<!-- Left border -->
<div class="press-hairline--left"></div>

<!-- Right border -->
<div class="press-hairline--right"></div>

<!-- Top and bottom borders -->
<div class="press-hairline--top-bottom"></div>

<!-- Full border -->
<div class="press-hairline--surround"></div>
```
