---
url : pages/press/loading/loading
---

## LoadingPlus


Loading, divided into two types: circular and spinner


### load type

```html
<press-loading />

<press-loading type="spinner" />
```

### Custom Colors

```html
<press-loading color="#1989fa" />

<press-loading type="spinner" color="#1989fa" />
```

### Custom size

```html
<press-loading size="15" />

<press-loading type="spinner" size="38" />
```

### Load copy

```html
<press-loading size="24px">Loading...</press-loading>
```

### vertical alignment

```html
<press-loading size="24px" vertical>Loading...</press-loading>
```

## API

### Props

| Parameter | Description                                          | Type               | Default    |
| --------- | ---------------------------------------------------- | ------------------ | ---------- |
| color     | color                                                | _string_           | `#c9c9c9`  |
| type      | type, optional value is `spinner`                    | _string_           | `circular` |
| size      | Load icon size, the default unit is `px`             | _string \| number_ | `30px`     |
| text-size | text size, the default unit is `px`                  | _string \| number_ | `14px`     |
| vertical  | Whether to arrange icons and text content vertically | _boolean_          | `false`    |

### Slots

| Name | Description |
| ---- | ----------- |
| -    | Load copy   |