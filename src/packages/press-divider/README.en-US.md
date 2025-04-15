---
url : pages/press/divider/divider
---

## Divider 

Used to separate content into sections.

## Code Demo

### Basic usage

```html
<press-divider />
```

### Using hairlines

```html
<press-divider hairline />
```

### dotted line

```html
<press-divider dashed />
```

### text position

```html
<press-divider contentPosition="center">text</press-divider>
<press-divider contentPosition="left">text</press-divider>
<press-divider contentPosition="right">text</press-divider>
```

### Custom attributes

```html
<press-divider contentPosition="center" textColor="#1989fa">text color</press-divider>
<press-divider contentPosition="center" borderColor="#1989fa">
   border color
</press-divider>
<press-divider contentPosition="center" fontSize="18">font size</press-divider>
```

### Custom styles

```html
<press-divider
   contentPosition="center"
   customStyle="color: #1989fa; border-color: #1989fa; font-size: 18px;"
>
   text
</press-divider>
```

## API

### Props

| Parameter        | Description                            | Type      | Default |
| ---------------- | -------------------------------------- | --------- | ------- |
| dashed           | dashed line                            | _boolean_ | false   |
| hairline         | hairline                               | _boolean_ | false   |
| content-position | text position, `left` `center` `right` | _string_  | -       |
| custom-style     | custom style                           | _string_  | -       |

### Slot

| Name    | Description         |
| ------- | ------------------- |
| default | custom text content |

## Theme customization

<theme-config type="divider"/>