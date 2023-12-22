---
url : pages/press/notice-bar/notice-bar
---

## NoticeBar 

It is used to display a group of message notifications in a loop.
## Code Demo

### Basic usage

```html
<press-notice-bar
   left-icon="volume-o"
   text="The frequency of people swearing during code reading is the only measure of code quality."
/>
```

### Scroll Play

When the content length of the notification bar overflows, scrolling will be started automatically, and this behavior can be controlled through the `scrollable` attribute.

```html
<!-- When the text is short, enable scrolling playback by setting the scrollable attribute -->
<press-notice-bar scrollable text="Technology is the common soul of those who develop it." />

<!-- When the text is long, turn off scrolling by disabling the scrollable attribute -->
<press-notice-bar
   :scrollable="false"
   text="The frequency of people swearing during code reading is the only measure of code quality."
/>
```

### Multi-line display

When the text is long, you can enable multi-line display by setting the `wrapable` attribute.

```html
<press-notice-bar
   wrapable
   :scrollable="false"
   text="The frequency of people swearing during code reading is the only measure of code quality."
/>
```

### Notification bar mode

The notification bar supports `closeable` and `link` two modes.

```html
<!-- closeable mode, display the close button on the right side -->
<press-notice-bar mode="closeable" text="Technology is the common soul of those who develop it." />

<!-- link mode, display link arrows on the right side -->
<press-notice-bar mode="link" text="Technology is the common soul of those who develop it." />
```

### Custom styles

Set the text color with the `color` property and the background color with the `background` property.

```html
<press-notice-bar
   color="#1989fa"
   background="#ecf9ff"
   left-icon="info-o"
   text="Technology is the common soul of those who develop it."
/>
```

### Custom scroll rate

Use the `speed` property to control the scrolling rate.

```html
<press-notice-bar
   text="Technology is the common soul of those who develop it."
   :scrollable
   :speed="120"
   left-icon="//img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
/>
```

## API

### Props

| Parameter  | Description                                                                                      | Type      | Default    |
| ---------- | ------------------------------------------------------------------------------------------------ | --------- | ---------- |
| mode       | notification bar mode, optional value is `closeable` `link`                                      | _string_  | `''`       |
| text       | Notification text content                                                                        | _string_  | `''`       |
| color      | notification text color                                                                          | _string_  | `#ed6a0c`  |
| background | scrollbar background                                                                             | _string_  | `#fffbe8`  |
| left-icon  | left icon name or image link                                                                     | _string_  | -          |
| delay      | animation delay time (ms)                                                                        | _number_  | `1`        |
| speed      | scroll rate (px/s)                                                                               | _number_  | `60`       |
| scrollable | Whether to enable scrolling playback, it is enabled by default when the content length overflows | _boolean_ | -          |
| wrapable   | Whether to enable text wrapping, it only takes effect when scrolling is disabled                 | _boolean_ | `false`    |
| open-type  | WeChat open capability                                                                           | _string_  | `navigate` |

### Events

| Event Name | Description                                    | Parameters     |
| ---------- | ---------------------------------------------- | -------------- |
| bind:click | triggered when the notification bar is clicked | _event: Event_ |
| bind:close | Triggered when the notification bar is closed  | _event: Event_ |

### Slot

| Name       | Description                                                          |
| ---------- | -------------------------------------------------------------------- |
| ---        | Notification text content, only valid when `text` attribute is empty |
| left-icon  | Customize left icon                                                  |
| right-icon | Customize the right icon                                             |

### External style classes

| class name   | description           |
| ------------ | --------------------- |
| custom-class | root node style class |

### Style variables

The component provides the following CSS variables, which can be used to customize the style.

| Name                          | Default                                           | Description |
| ----------------------------- | ------------------------------------------------- | ----------- |
| --notice-bar-height           | _40px_                                            | -           |
| --notice-bar-padding          | _0 var(--press-padding-md)_                       | -           |
| --notice-bar-wrapable-padding | _var(--press-padding-xs) var(--press-padding-md)_ | -           |
| --notice-bar-text-color       | _var(--press-orange-dark)_                        | -           |
| --notice-bar-font-size        | _var(--press-font-size-md)_                       | -           |
| --notice-bar-line-height      | _24px_                                            | -           |
| --notice-bar-background-color | _var(--press-orange-light)_                       | -           |
| --notice-bar-icon-size        | _16px_                                            | -           |
| --notice-bar-icon-min-width   | _24px_                                            | -           |

## Theme customization

<theme-config />