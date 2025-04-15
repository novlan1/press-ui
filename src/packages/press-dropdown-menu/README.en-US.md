---
url : pages/press/dropdown-menu/dropdown-menu
---

## DropdownMenu

The menu list that pops up down.


## Code Demo

### Basic usage

```html
<press-dropdown-menu>
   <press-dropdown-item
     :value="value1"
     :options="option1"
   />
   <press-dropdown-item
     :value="value2"
     :options="option2"
   />
</press-dropdown-menu>
```

```js
export default {
   data() {
     return {
       option1: [
         { text: 'All Products', value: 0 },
         { text: 'New product', value: 1 },
         { text: 'Event Item', value: 2 },
       ],
       option2: [
         { text: 'Default sort', value: 'a' },
         { text: 'Praise order', value: 'b' },
         { text: 'Sales sort', value: 'c' },
       ],
       value1: 0,
       value2: 'a',
     }
   },
};
```

### Customize menu content

```html
<press-dropdown-menu>
   <press-dropdown-item
     :value="value1"
     :options="option1"
   />
   <press-dropdown-item
     id="item"
     :title="itemTitle"
   >
     <press-cell :title="switchTitle1">
       <press-switch
         slot="right-icon"
         size="24px"
         style="height: 26px"
         :checked="switch1"
         active-color="#ee0a24"
         @change="onSwitch1Change"
       />
     </press-cell>
     <press-cell :title="switchTitle2">
       <press-switch
         slot="right-icon"
         size="24px"
         style="height: 26px"
         :checked="switch2"
         active-color="#ee0a24"
         @change="onSwitch2Change"
       />
     </press-cell>
     <div style="padding: 5px 16px;">
       <press-button
         type="danger"
         block
         round
         @click="onConfirm"
       >
         confirm
       </press-button>
     </div>
   </press-dropdown-item>
</press-dropdown-menu>
```

```js
export default {
   data() {
     return {
       switchTitle1: 'free shipping',
       switchTitle2: 'Group purchase',
       itemTitle: 'filter',
       option1: [
         { text: 'All Products', value: 0 },
         { text: 'New product', value: 1 },
         { text: 'Event Item', value: 2 },
       ],
       value1: 0,
     }
   },
   methods: {
     onConfirm() {
       this.selectComponent('#item').toggle();
     },

     onSwitch1Change({ detail }) {
       this.setData({ switch1: detail });
     },

     onSwitch2Change({ detail }) {
       this.setData({ switch2: detail });
     },
   }
};
```

### Customize the selected state color

```html
<press-dropdown-menu active-color="#1989fa">
   <press-dropdown-item
     :value="value1"
     :options="option1"
   />
   <press-dropdown-item
     :value="value2"
     :options="option2"
   />
</press-dropdown-menu>
```

### expand up

```html
<press-dropdown-menu direction="up">
   <press-dropdown-item
     :value="value1"
     :options="option1"
   />
   <press-dropdown-item
     :value="value2"
     :options="option2"
   />
</press-dropdown-menu>
```

### Disable menu

```html
<press-dropdown-menu>
   <press-dropdown-item
     :value="value1"
     disabled
     :options="option1"
   />
   <press-dropdown-item
     :value="value2"
     disabled
     :options="option2"
   />
</press-dropdown-menu>
```

## API

### DropdownMenu Props

| Parameter              | Description                                           | Type      | Default   |
| ---------------------- | ----------------------------------------------------- | --------- | --------- |
| active-color           | Active color of menu title and options                | _string_  | `#ee0a24` |
| z-index                | menu bar z-index level                                | _number_  | `10`      |
| duration               | animation duration in milliseconds                    | _number_  | `200`     |
| direction              | menu expansion direction, optional value is up        | _string_  | `down`    |
| overlay                | Whether to show the overlay                           | _boolean_ | `true`    |
| close-on-click-overlay | Whether to close the menu after clicking the overlay  | _boolean_ | `true`    |
| close-on-click-outside | Whether to close the menu after clicking outside menu | _boolean_ | `true`    |

### DropdownItem Props

| Parameter   | Description                                            | Type               | Default                    |
| ----------- | ------------------------------------------------------ | ------------------ | -------------------------- |
| value       | The value corresponding to the currently selected item | _number \| string_ | -                          |
| title       | menu item title                                        | _string_           | current selected item text |
| options     | array of options                                       | _Option[]_         | `[]`                       |
| disabled    | Whether to disable the menu                            | _boolean_          | `false`                    |
| title-class | title extra class name                                 | _string_           | -                          |
| popup-style | custom popup layer style                               | _string_           | -                          |

### DropdownItem Events

| Event Name | Description                                                        | Callback Parameters |
| ---------- | ------------------------------------------------------------------ | ------------------- |
| change     | Triggered when an option is clicked resulting in a change in value | value               |
| open       | Triggered when the menu bar is opened                              | -                   |
| close      | Triggered when the menu bar is closed                              | -                   |
| opened     | Triggered when the menu bar is opened and the animation ends       | -                   |
| closed     | Triggered when the menu bar is closed and the animation ends       | -                   |

### DropdownItem method

Accessible via selectComponent(id).

| method name | description                                                                                 | parameters     | return value |
| ----------- | ------------------------------------------------------------------------------------------- | -------------- | ------------ |
| toggle      | Toggle menu display status, pass `true` to display, `false` to hide, no parameter to negate | show?: boolean | -            |

### Option Data Structure

| key name | description                                       | type               |
| -------- | ------------------------------------------------- | ------------------ |
| text     | text                                              | _string_           |
| value    | identifier                                        | _number \| string_ |
| icon     | Left [icon name](./press-icon-plus) or image link | _string_           |

### External style classes

| class name   | description           |
| ------------ | --------------------- |
| custom-class | root node style class |