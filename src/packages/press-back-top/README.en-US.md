---
url : pages/press/back-top/back-top
---

## BackTop Back to top

When the page is too long and you slide down, a convenient operation to return to the top will appear, helping users to quickly return to the top of the page.

## Import

```ts
import PressBackTop from 'press-ui/press-back-top/press-back-top.vue';

export default {
  components: {
    PressBackTop,
  }
}
```

## Code demonstration

### Basic usage

The parent component monitors scrolling and passes it to the `back-top` component `scrollTop`. The `back-top` component determines whether to display it based on the size of `scrollTop` and `top`.

If the `scrollToTop` method is passed in, the method will be executed to return to the top, otherwise `uni.pageScrollTo({ scrollTop: 0 })` will be executed.

```html
<scroll-view
  scroll-y
  enhanced
  scroll-with-animation
  :scroll-top="newScrollTop"
  @scroll="onScroll"
>
</scroll-view>

<PressBackTop
  :scroll-top="scrollTop"
  :scroll-to-top="scrollToTop"
/>
```

```ts
export default {
  data() {
    return {
      scrollTop: 0,
      newScrollTop: 0,
    }
  },

  methods: {
    onScroll(e) {
      this.scrollTop = e.target.scrollTop;
    },
    scrollToTop() {
      that.newScrollTop = that.scrollTop;
      setTimeout(() => {
        that.newScrollTop = 0;
      });
    },
  }
}
```

### Custom shape

The shape of the button can be modified through `mode`, `circle` is a circle, `square` is a square.

```html
<PressBackTop mode="square" />
```

### Custom Icon

Use `icon` to modify the icon of the back to top button, which can be a built-in icon or an image path.

```html
<PressBackTop icon="arrow-up" />
```

### Custom Distance

You can use the `top` parameter to modify the page scroll distance for the back to top button to appear.

```html
<PressBackTop top="10" />
```

### Custom style

- Customize the icon style through the `icon-style` parameter, such as color, size, etc.
- Modify the background color, size, etc. of the return button through `custom-style`

```html
<PressBackTop icon-style="color: #fff" custom-style="background-color: #2979ff" />
```

### Custom text

Customize the text through the `text` parameter, which is empty by default.

```html
<PressBackTop text="Top" />
```

## API

### Props

| Parameters    | Description                                                     | Type               | Default value |
| ------------- | --------------------------------------------------------------- | ------------------ | ------------- |
| mode          | Whether to display a pop-up window                              | _string_           | `circle`      |
| icon          | Custom icon                                                     | _string_           | `back-top`    |
| text          | Prompt text                                                     | _string_           | -             |
| size          | Component size, unit `px`                                       | _string \| number_ | `40`          |
| duration      | Back to top scrolling time                                      | _string_           | `100`         |
| top           | Display component at a certain distance from the top, unit `px` | _string \| number_ | `400`         |
| scroll-top    | Scrolling distance                                              | _string \| number_ | `0`           |
| bottom        | Distance from the back to top button to the bottom, unit `px`   | _string \| number_ | `100`         |
| right         | The distance from the back to top button to the right, in `px`  | _string \| number_ | `20`          |
| z-index       | Level                                                           | _string \| number_ | `9`           |
| icon-style    | IconPlus style                                                      | _string_           | -             |
| scroll-to-top | Custom scrolling method                                         | _function_         | -             |

### Events

| Event name | Description | Parameters |
| ---------- | ----------- | ---------- |
| click      | Click       | -          |

## Online debugging

<debug-online />
