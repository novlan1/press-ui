---
url: pages/press/col/col
---

## Col 

Basic layout components.

## Code Demo

### Basic Usage

The Layout component provides a `24-column grid`, by adding the `span` attribute on `Col` to set the percentage of the width of the column. In addition, add the `offset` attribute to set the offset width of the column, which is calculated in the same way as span.

```html
<press-row>
   <press-col:span="8">span: 8</press-col>
   <press-col:span="8">span: 8</press-col>
   <press-col:span="8">span: 8</press-col>
</press-row>

<press-row>
   <press-col :span="4">span: 4</press-col>
   <press-col :span="10" :offset="4">offset: 4, span: 10</press-col>
</press-row>

<press-row>
   <press-col :offset="12" :span="12">offset: 12, span: 12</press-col>
</press-row>
```

### Set column element spacing

The spacing between column elements can be set through the `gutter` attribute, and the default spacing is 0.

```html
<press-row:gutter="20">
   <press-col:span="8">span: 8</press-col>
   <press-col:span="8">span: 8</press-col>
   <press-col:span="8">span: 8</press-col>
</press-row>
```

## API

### Row Props

| Parameter | Description                             | Type               | Default |
| --------- | --------------------------------------- | ------------------ | ------- |
| gutter    | spacing between column elements (in px) | _string \| number_ | -       |

### Col Props

| Parameter | Description                    | Type               | Default |
| --------- | ------------------------------ | ------------------ | ------- |
| span      | column element width           | _string \| number_ | -       |
| offset    | column element offset distance | _string \| number_ | -       |

### External style classes

| class name   | description           |
| ------------ | --------------------- |
| custom-class | root node style class |