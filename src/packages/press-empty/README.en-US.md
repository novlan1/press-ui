---
url : pages/press/empty/empty
---

## Empty

Placeholder hint in empty state.


## Code Demo

### Basic usage

```html
<press-empty description="Description text" />
```

### Image Type

The Empty component has a variety of built-in placeholder image types that can be used in different business scenarios.

```html
<!-- Generic error -->
<press-empty image="error" description="Description text" />
<!-- Network Error -->
<press-empty image="network" description="Description text" />
<!-- Search Tips -->
<press-empty image="search" description="Description text" />
```

### Custom Image

When a custom image is required, any image URL can be passed in the image attribute.

```html
<press-empty
   class="custom-image"
   image="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fcustom-empty-image.png"
   description="Description text"
/>
```

### Bottom content

Content can be inserted below the Empty component through the default slot.

```html
<press-empty description="Description text">
   <press-button round type="danger" class="bottom-button">button</press-button>
</press-empty>

<style>
   .bottom-button {
     width: 160px;
     height: 40px;
   }
</style>
```

### E-SPORT

Added `e-sport` type.

```html
<press-empty type="e-sport" />
```

## API

### Props

| Parameter   | Description                                                                                | Type     | Default   |
| ----------- | ------------------------------------------------------------------------------------------ | -------- | --------- |
| image       | Image type, optional values are `error` `network` `search`, support for incoming image URL | _string_ | `default` |
| description | The description text below the image                                                       | _string_ | -         |

### Slots

| Name        | Description              |
| ----------- | ------------------------ |
| -           | Customize Bottom Content |
| image       | custom icon              |
| description | custom description text  |

## Theme customization

<theme-config />