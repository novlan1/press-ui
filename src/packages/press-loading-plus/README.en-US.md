---
url : pages/press/loading-plus/loading-plus
---

## LoadingPlus


Loading, divided into two types: circular and spinner


### load type

```html
<press-loading-plus />

<press-loading-plus type="spinner" />
```

### Custom Colors

```html
<press-loading-plus color="#1989fa" />

<press-loading-plus type="spinner" color="#1989fa" />
```

### Custom size

```html
<press-loading-plus size="15" />

<press-loading-plus type="spinner" size="38" />
```

### Load copy

```html
<press-loading-plus size="24px">Loading...</press-loading-plus>
```

### vertical alignment

```html
<press-loading-plus size="24px" vertical>Loading...</press-loading-plus>
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