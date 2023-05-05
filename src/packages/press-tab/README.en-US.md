---
url : pages/press/tab/tab
---

## Tab 


Tab component for switching between different content areas.

### Basic usage

Use `active` to set the index value corresponding to the currently active label, and the first label is enabled by default.

```html
<press-tabs
   :active="active"
   @change="onChange"
>
   <press-tab title="Tab 1">
     content 1
   </press-tab>
   <press-tab title="Tab 2">
     content 2
   </press-tab>
   <press-tab title="Tab 3">
     content 3
   </press-tab>
   <press-tab title="Tab 4">
     content 4
   </press-tab>
</press-tabs>
```

```js
export default {
   data() {
     return {
       active: 1,
     }
   },
   methods: {
     onChange(value) {
       console.log('value', value);
     },
   }
};
```

### Match by name

When the tag specifies the `name` attribute, the value of `active` is the `name` of the current tag (at this time, the index value cannot be used to match the tag).

```html
<press-tabs active="a">
   <press-tab title="Label 1" name="a">Content 1</press-tab>
   <press-tab title="Label 2" name="b">Content 2</press-tab>
   <press-tab title="Label 3" name="c">Content 3</press-tab>
</press-tabs>
```

### Horizontal scrolling

When there are more than 5 tabs, Tab can scroll horizontally.

```html
<press-tabs active="{{ active }}">
   <press-tab title="Label 1">Content 1</press-tab>
   <press-tab title="Label 2">Content 2</press-tab>
   <press-tab title="Label 3">Content 3</press-tab>
   <press-tab title="Label 4">Content 4</press-tab>
   <press-tab title="Label 5">Content 5</press-tab>
   <press-tab title="Label 6">Content 6</press-tab>
</press-tabs>
```

### Disable tabs

Labels can be disabled by setting the `disabled` property. If you need to listen to the click event of the disabled tab, you can listen to the `disabled` event on `press-tabs`.

```html
<press-tabs bind:disabled="onClickDisabled">
   <press-tab title="Label 1">Content 1</press-tab>
   <press-tab title="Label 2" disabled>Content 2</press-tab>
   <press-tab title="Label 3">Content 3</press-tab>
</press-tabs>
```


### Style Style

`Tab` supports two styles: `line` and `card`, the default is `line` style, you can modify the style through the `type` attribute.

```html
<press-tabs type="card">
   <press-tab title="Label 1">Content 1</press-tab>
   <press-tab title="Label 2">Content 2</press-tab>
   <press-tab title="Label 3">Content 3</press-tab>
</press-tabs>
```

### click event

The `click` event can be bound to `press-tabs`, and the title and identifier of the clicked tab can be obtained in `event.detail` of the callback parameter.

```html
<press-tabs bind:click="onClick">
   <press-tab title="Label 1">Content 1</press-tab>
   <press-tab title="Label 2">Content 2</press-tab>
</press-tabs>
```



### Sticky Layout

The sticky layout can be turned on through the `sticky` attribute. Under the sticky layout, when the Tab scrolls to the top, it will automatically suck the top.

```html
<press-tabs sticky>
   <press-tab title="Label 1">Content 1</press-tab>
   <press-tab title="Label 2">Content 2</press-tab>
   <press-tab title="Label 3">Content 3</press-tab>
   <press-tab title="Label 4">Content 4</press-tab>
</press-tabs>
```

### Toggle animation

You can use `animated` to set whether to enable animation when switching tabs.

```html
<press-tabs animated>
   <press-tab title="Label 1">Content 1</press-tab>
   <press-tab title="Label 2">Content 2</press-tab>
   <press-tab title="Label 3">Content 3</press-tab>
   <press-tab title="Label 4">Content 4</press-tab>
</press-tabs>
```

### Swipe to switch

Swipe to switch tabs can be enabled through the `swipeable` property.

```html
<press-tabs swipeable>
   <press-tab title="Label 1">Content 1</press-tab>
   <press-tab title="Label 2">Content 2</press-tab>
   <press-tab title="Label 3">Content 3</press-tab>
   <press-tab title="Label 4">Content 4</press-tab>
</press-tabs>
```

### Nested popups

If you nest press-tabs inside a component or node that hides content like press-popup, the underline will not appear properly when the press-tabs are displayed.

This scenario can be circumvented by using `wx:if` to manually control the rendering of press-tabs.

```html
<press-popup show="{{ show }}">
   <press-tabs wx:if="{{ show }}">
     <press-tab title="Label 1">Content 1</press-tab>
     <press-tab title="Label 2">Content 2</press-tab>
     <press-tab title="Label 3">Content 3</press-tab>
     <press-tab title="Label 4">Content 4</press-tab>
   </press-tabs>
</press-popup>
```

## API

### Tabs Props

| Parameter            | Description                                                                                                                                       | Type               | Default   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | --------- |
| type                 | style, optional value is `card`                                                                                                                   | _string_           | `line`    |
| color                | label theme color                                                                                                                                 | _string_           | `#ee0a24` |
| active               | Identifier of the currently selected tab                                                                                                          | _string \| number_ | `0`       |
| duration             | animation time, in seconds                                                                                                                        | _number_           | `0.3`     |
| line-width           | bottom bar width, default unit `px`                                                                                                               | _string \| number_ | `40px`    |
| line-height          | bottom bar height, default unit `px`                                                                                                              | _string \| number_ | `3px`     |
| animated             | Whether to enable transition animation when switching tab content                                                                                 | _boolean_          | `false`   |
| border               | Whether to display the outer border, only valid in the `line` style                                                                               | _boolean_          | `false`   |
| ellipsis             | Whether to omit too long header text                                                                                                              | _boolean_          | `true`    |
| sticky               | Whether to use sticky positioning layout                                                                                                          | _boolean_          | `false`   |
| swipeable            | Whether to enable gesture swipe switching                                                                                                         | _boolean_          | `false`   |
| lazy-render          | Whether to enable lazy rendering of tab content                                                                                                   | _boolean_          | `true`    |
| offset-top           | The minimum distance from the top of the sticky positioning layout, in `px`                                                                       | _number_           | -         |
| swipe-threshold      | Scroll threshold, when the number of tabs exceeds the threshold and the total width exceeds the width of the tab bar, horizontal scrolling starts | _number_           | `5`       |
| title-active-color   | title active color                                                                                                                                | _string_           | -         |
| title-inactive-color | title inactive color                                                                                                                              | _string_           | -         |
| z-index              | z-index level                                                                                                                                     | _number_           | `1`       |

### Tab Props

| Parameter   | Description                                           | Type               | Default            |
| ----------- | ----------------------------------------------------- | ------------------ | ------------------ |
| name        | tag name, as an identifier for matching               | _string \| number_ | index value of tag |
| title       | title                                                 | _string_           | -                  |
| disabled    | Whether to disable the label                          | _boolean_          | `false`            |
| dot         | Whether to display a small red dot                    | _boolean_          | -                  |
| info        | Tip information in the upper right corner of the icon | _string \| number_ | -                  |
| title-style | custom title style                                    | _string_           | -                  |

### Tabs Slot

| Name      | Description                            |
| --------- | -------------------------------------- |
| nav-left  | content on the left side of the title  |
| nav-right | content on the right side of the title |

### Tab Slot

| Name | Description |
| ---- | ----------- |
| -    | Tab content |

### Tabs Event

| Event Name    | Description                                     | Parameters                                                                                 |
| ------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| bind:click    | Triggered when a label is clicked               | name: label identifier, title: title                                                       |
| bind:change   | Triggered when the currently active tab changes | name: tab identifier, title: title                                                         |
| bind:disabled | Triggered when a disabled label is clicked      | name: label identifier, title: title                                                       |
| bind:scroll   | Triggered when scrolling                        | { scrollTop: the distance from the top position, isFixed: whether it is fixed to the top } |

### External style classes

| class name       | description                  |
| ---------------- | ---------------------------- |
| custom-class     | root node style class        |
| nav-class        | Tab bar style class          |
| tab-class        | Tab style class              |
| tab-active-class | tab active state style class |

### method

You can get the Tabs instance and call the instance method through selectComponent.

| method name | parameters | return value | description                                                                                                                      |
| ----------- | ---------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| resize      | -          | -            | When the size of the outer element or the display state of the component changes, this method can be called to trigger redrawing |

## common problem

### The position of the bottom bar is wrong when the component is switched from hidden state to displayed state?

When the Tabs component is mounted, it will get its own width and calculate the position of the bottom bar. If the component is initially hidden, the obtained width will always be 0, so the bottom bar position cannot be displayed.

#### Solution

Method 1, use `wx:if` to control the display of the component and make the component reinitialize.

```html
<press-tabs wx:if="show" />
```

Method 2, call the resize method of the component to actively trigger redrawing.

```html
<press-tabs id="tabs" />
```

```js
this.selectComponent('#tabs').resize();
```

## Theme customization

<theme-config />