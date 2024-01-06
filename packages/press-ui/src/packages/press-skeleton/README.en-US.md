---
url : pages/press/skeleton/skeleton
---

## Skeleton

Used to display a set of placeholder graphics during content loading.


## Code Demo

### Basic usage

Use the `title` attribute to display the title placeholder image, and use the `row` attribute to configure the number of rows in the placeholder paragraph.

```html
<press-skeleton title :row="3" />
```

### Show Avatar

Use the `avatar` property to display an avatar placeholder.

```html
<press-skeleton title avatar :row="3" />
```

### Display child components

Set the `loading` property to `false` to indicate that the content is loaded. At this time, the placeholder image will be hidden and the subcomponents of `Skeleton` will be displayed.

```html
<press-skeleton title avatar :row="3" :loading="loading">
   <div>actual content</div>
</press-skeleton>
```

```js
export default {
   data() {
     return {
       loading: true,
     }
   },
   methods: {
     onChange(val) {
       this.loading = val;
     }
   }
};
```

## API

### Props

| Parameter    | Description                                                                                                     | Type                 | Default |
| ------------ | --------------------------------------------------------------------------------------------------------------- | -------------------- | ------- |
| row          | row number of paragraph placeholder image                                                                       | _number_             | `0`     |
| row-width    | The width of the paragraph placeholder image, an array can be passed to set the width of each row               | _string \| string[]_ | `100%`  |
| title        | whether to show title placeholder                                                                               | _boolean_            | `false` |
| title-width  | width of title image                                                                                            | _string \| number_   | `40%`   |
| avatar       | whether to display avatar placeholder                                                                           | _boolean_            | `false` |
| avatar-size  | Avatar placeholder image size                                                                                   | _string \| number_   | `32px`  |
| avatar-shape | Avatar placeholder image shape, optional value is `square`                                                      | _string_             | `round` |
| loading      | Whether to display a placeholder image, if `false` is passed, the content of the subcomponent will be displayed | _boolean_            | `true`  |
| animate      | Whether to enable animation                                                                                     | _boolean_            | `true`  |