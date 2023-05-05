---
url : pages/press/sidebar/sidebar
---

## Sidebar

A vertical navigation bar for switching between different content areas.


## Code Demo

### Basic usage

Selected items are controlled by setting the `activeKey` property on `press-sidebar`.

```html
<press-sidebar:active-key="activeKey">
   <press-sidebar-item title="label name" />
   <press-sidebar-item title="label name" />
   <press-sidebar-item title="label name" />
</press-sidebar>
```

```javascript
export default {
   data() {
     return {
       activeKey: 0,
     }
   },
};
```

### Logo Hints

After setting the `dot` attribute, a small red dot will be displayed in the upper right corner. After setting the `badge` property, the corresponding logo will be displayed in the upper right corner.

```html
<press-sidebar :active-key="activeKe">
   <press-sidebar-item title="label name" dot />
   <press-sidebar-item title="label name" badge="5" />
   <press-sidebar-item title="label name" badge="99+" />
</press-sidebar>
```

### disable option

Options are disabled via the `disabled` attribute.

```html
<press-sidebar :active-key="activeKe">
   <press-sidebar-item title="label name" />
   <press-sidebar-item title="label name" disabled />
   <press-sidebar-item title="label name" />
</press-sidebar>
```

### Listen to switch event

Set the `change` method to listen for events when switching navigation items.

```html
<press-sidebar :active-key="activeKe" @change="onChange">
   <press-sidebar-item title="label name 1" />
   <press-sidebar-item title="label name 2" />
   <press-sidebar-item title="label name 3" />
</press-sidebar>
```

```js
export default {
   data() {
     return {
       activeKey: 0,
     }
   },
   methods: {
     onChange(value) {
       console.log('value', value);
     },
   }
};
```

## API

### Sidebar Props

| Parameter | Description            | Type               | Default |
| --------- | ---------------------- | ------------------ | ------- |
| activeKey | index of selected item | _string \| number_ | `0`     |

### Sidebar Events

| Event Name | Description                 | Parameters                        |
| ---------- | --------------------------- | --------------------------------- |
| change     | Fired when switching badges | Index of currently selected badge |

### Sidebar external style class

| class name   | description           |
| ------------ | --------------------- |
| custom-class | root node style class |

### SidebarItem Props

| Parameter | Description                                                                                                | Type               | Default |
| --------- | ---------------------------------------------------------------------------------------------------------- | ------------------ | ------- |
| title     | content                                                                                                    | _string_           | `''`    |
| dot       | Whether to display the small red dot in the upper right corner                                             | _boolean_          | `false` |
| info      | The content of the logo on the upper right corner of the icon (deprecated, please use the badge attribute) | _string \| number_ | `''`    |
| badge     | The content of the logo in the upper right corner of the icon                                              | _string \| number_ | `''`    |
| disabled  | Whether to disable this item                                                                               | _boolean_          | `false` |

### SidebarItem Slot

| Name  | Description                                                                       |
| ----- | --------------------------------------------------------------------------------- |
| title | Customize the title bar, if the `title` attribute is set, it will not take effect |

### SidebarItem Event

| Event Name | Description                       | Parameters                                       |
| ---------- | --------------------------------- | ------------------------------------------------ |
| click      | Triggered when a badge is clicked | `event.detail` is the index of the current badge |

### SidebarItem external style class

| class name   | description           |
| ------------ | --------------------- |
| custom-class | root node style class |


## Theme customization

<theme-config />