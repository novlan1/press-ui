---
url : pages/press/icon/icon
---

## Icon 

### Basic usage

The `name` property of `Icon` supports passing in icon names or image links.

```html
<press-icon name="close" />
<press-icon name="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_ce77489af93cb34c4b.png" />
```

### Prompt information

After setting the `dot` attribute, a small red dot will be displayed in the upper right corner of the icon. After setting the `info` attribute, the corresponding logo will be displayed in the upper right corner of the icon.

```html
<press-icon name="chat" dot />
<press-icon name="chat" info="9" />
<press-icon name="chat" info="99+" />
```

### Custom color

Set the `color` property to control the icon color.

```html
<press-icon name="chat" color="red" />
```

### Custom size

Set the `size` property to control the icon size.

```html
<press-icon name="chat" size="50px" />
```

### Custom icon

If you need to use more icons based on the existing Icon, you can import the font file and CSS file corresponding to the third-party iconfont, and then use it directly in the `Icon` component. For example, it can be included in the `app.wxss` file.

```css
/* Introduce third-party or custom font icon styles */
@font-face {
   font-family: 'my-icon';
   src: url('./my-icon.ttf') format('truetype');
}

.my-icon {
   font-family: 'my-icon';
}

.my-icon-extra::before {
   content: '\e626';
}
```

```html
<!-- Specify the class name as my-icon via class-prefix -->
<press-icon class-prefix="my-icon" name="extra" />
```

## API

### Props

| Parameter | Description | Type | Default |
| --------- | ----------- | ---- | ------- ||
| name         | icon name or image link                                                    | _string_           | -                 |
| dot          | Whether to display the small red dot in the upper right corner of the icon | _boolean_          | `false`           |
| info         | text prompt in the upper right corner of the icon                          | _string \| number_ | -                 |
| color        | icon color                                                                 | _string_           | `inherit`         |
| size         | icon size, such as `20px`, `2em`, the default unit is `px`                 | _string \| number_ | `inherit`         |
| custom-style | custom style                                                               | _string_           | -                 |
| class-prefix | class name prefix                                                          | _string_           | `press-icon` |

### Events

| Event Name | Description                        | Parameters |
| ---------- | ---------------------------------- | ---------- |
| click      | Triggered when the icon is clicked | -          |

### External style classes

| class name   | description           |
| ------------ | --------------------- |
| custom-class | root node style class |

## common problem

### What happens when the developer tool prompts Failed to load font?

This is a problem with the developer tool itself, which can be ignored. For details, please refer to [WeChat Mini Program Documentation](https://developers.weixin.qq.com/miniprogram/dev/api/ui/font/wx.loadFontFace.html) - Notice No. 4.
