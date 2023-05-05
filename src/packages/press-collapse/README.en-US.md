---
url : pages/press/collapse/collapse
---

## Collapse


Place a group of content in multiple accordion panels, and click the title of a panel to expand or contract its content.

## Code Demo

### Basic usage

Control the expanded panel list through `value`, and `activeNames` is an array format.

```html
<press-collapse :value="activeNames" @change="onChange">
   <press-collapse-item title="Title 1" name="1">
     Code is written to be read by humans, with the added bonus of being able to run on a machine
   </press-collapse-item>
   <press-collapse-item title="Title 2" name="2">
     Code is written to be read by humans, with the added bonus of being able to run on a machine
   </press-collapse-item>
   <press-collapse-item title="Title 3" name="3" disabled>
     Code is written to be read by humans, with the added bonus of being able to run on a machine
   </press-collapse-item>
</press-collapse>
```

```javascript
export default {
   data() {
     return {
       activeNames: ['1'],
     }
   },
   methods: {
     onChange(event) {
       this.setData({
         activeNames: event.detail,
       });
     },
   }
};
```

### accordion

Through `accordion`, it can be set to accordion mode, and at most one panel can be expanded. At this time, `activeName` is in string format.

```html
<press-collapse accordion :value="activeName" @change="onChange">
   <press-collapse-item title="Title 1" name="1">
     Code is written to be read by humans, with the added bonus of being able to run on a machine
   </press-collapse-item>
   <press-collapse-item title="Title 2" name="2">
     Code is written to be read by humans, with the added bonus of being able to run on a machine
   </press-collapse-item>
   <press-collapse-item title="Title 3" name="3">
     Code is written to be read by humans, with the added bonus of being able to run on a machine
   </press-collapse-item>
</press-collapse>
```

```javascript
export default {
   data() {
     return {
       activeName: '1',
     }
   },
   methods: {
     onChange(event) {
       this.setData({
         activeName: event.detail,
       });
     },
   }
};
```

### Event Listener

`press-collapse` provides `change`, `open` and `close` events. The `change` event is fired when the panel is switched, the `open` event is fired when the panel is expanded, and the `close` event is fired when the panel is closed.

```html
<press-collapse
   :value="activeNames"
   @change="onChange"
   @open="onOpen"
   @close="onClose"
>
   <press-collapse-item title="Title 1" name="1">
     Code is written to be read by humans, with the added bonus of being able to run on a machine
   </press-collapse-item>
   <press-collapse-item title="Title 2" name="2">
     Code is written to be read by humans, with the added bonus of being able to run on a machine
   </press-collapse-item>
   <press-collapse-item title="Title 3" name="3">
     Code is written to be read by humans, with the added bonus of being able to run on a machine
   </press-collapse-item>
</press-collapse>
```

```javascript
export default {
   data() {
     return {
       activeNames: ['1'],
     }
   },
   methods: {
     onChange(event) {
       this.setData({
         activeNames: event.detail,
       });
     },
     onOpen(event) {
       Toast(`Expand: ${event.detail}`);
     },
     onClose(event) {
       Toast(`Close: ${event.detail}`);
     },
   }
};
```

### Customize header content

```html
<press-collapse :value="activeNames" @change="onChange">
   <press-collapse-item name="1">
     <view slot="title">Title 1<press-icon name="question-o" /></view>
     Code is written to be read by humans, with the added bonus of being able to run on a machine
   </press-collapse-item>
   <press-collapse-item title="Title 2" name="2" icon="shop-o">
     Code is written to be read by humans, with the added bonus of being able to run on a machine
   </press-collapse-item>
</press-collapse>
```

```javascript
export default {
   data() {
     return {
       activeNames: ['1'],
     }
   },
   methods: {
     onChange(event) {
       this.setData({
         activeNames: event.detail,
       });
     },
   }
};
```

## API

### Collapse Props

| Parameter | Description                          | Type                                                                             | Default |
| --------- | ------------------------------------ | -------------------------------------------------------------------------------- | ------- |
| value     | name of the currently expanded panel | non-accordion mode: _(string \| number)[]_<br>accordion mode: _string \| number_ | -       |
| accordion | Whether to enable accordion mode     | _boolean_                                                                        | `false` |
| border    | Whether to show the outer border     | _boolean_                                                                        | `true`  |

### Collapse Event

| Event Name | Description | Parameters |
| ---------- | ----------- | ---------- ||
| change     | Triggered when switching panels      | activeNames: _string \| Array_  |
| open       | Triggered when the panel is expanded | currentName: _string \| number_ |
| close      | Triggered when the panel is closed   | currentName: _string \| number_ |

### CollapseItem Props

| Parameter | Description | Type | Default |
| --------- | ----------- | ---- | ------- ||
| name      | unique identifier, default is index value                                                                       | _string \| number_ | `index` |
| title     | content on the left side of the title bar                                                                       | _string \| number_ | -       |
| size      | The size of the title bar, the optional value is `large`                                                        | _string_           | -       |
| icon      | The icon name or image link on the left side of the title bar, see [Icon Component](#/icon) for optional values | _string_           | -       |
| value     | content on the right side of the title bar                                                                      | _string \| number_ | -       |
| label     | title bar description                                                                                           | _string_           | -       |
| border    | Whether to show the inner border                                                                                | _boolean_          | `true`  |
| is-link   | Whether to display the arrow on the right side of the title bar and enable click feedback                       | _boolean_          | `true`  |
| clickable | Whether to enable click feedback                                                                                | _boolean_          | `false` |
| disabled  | Whether to disable the panel                                                                                    | _boolean_          | `false` |

###CollapseItem Slot

| Name       | Description                                        |
| ---------- | -------------------------------------------------- |
| -          | Panel Contents                                     |
| value      | custom display content                             |
| icon       | custom `icon`                                      |
| title      | custom `title`                                     |
| right-icon | Customize the right button, the default is `arrow` |

### Collapse external style class

| class name   | description           |
| ------------ | --------------------- |
| custom-class | root node style class |

### CollapseItem external style class

| class name    | description           |
| ------------- | --------------------- |
| custom-class  | root node style class |
| content-class | content style class   |


## Theme customization

<theme-config />