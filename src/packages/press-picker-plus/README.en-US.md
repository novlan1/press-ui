---
url : pages/press/picker-plus/picker-plus
---
## PickerPlus 

Provides multiple option sets for users to choose, supports single-column selection and multi-column cascading, and is usually used in conjunction with the popup layer component.


### Basic usage

```html
<press-picker-plus
   :columns="columns"
   @change="onChange"
/>
```

```javascript
export default {
   data() {
     return {
       columns: ['Hangzhou', 'Ningbo', 'Wenzhou', 'Jiaxing', 'Huzhou'],
     };
   },
   methods: {
     onChange(val) {
       console.log('onChange.val', val);
     },
   },
};
```

### default selected item

The single-column selector can directly set the index value of the initially selected item through the `default-index` property.

```html
<press-picker-plus
   :columns="columns"
   :default-index="2"
   @change="onChange"
/>
```

### Show top bar

```html
<press-picker-plus
   show-toolbar
   title="title"
   :columns="columns"
   @cancel="onCancel"
   @confirm="onConfirm"
/>
```

```javascript
export default {
   data() {
     return {
       columns: ['Hangzhou', 'Ningbo', 'Wenzhou', 'Jiaxing', 'Huzhou'],
     };
   },
   methods: {
     onCancel(val) {
       console.log('onCancel.val', val);
     },
     onConfirm(val) {
       console.log('onConfirm.val', val);
     },
   },
};
```

### Multi-column linkage

```html
<press-picker-plus
   ref="picker"
   :columns="columns"
   @change="onChangePicker"
/>
```

```javascript
const cities = {
   Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou', 'Jiaxing', 'Huzhou'],
   Fujian: ['Fuzhou', 'Xiamen', 'Putian', 'Sanming', 'Quanzhou'],
};

export default {
   data() {
     return {
       columns: [
         {
           values: Object.keys(citys),
           className: 'column1',
         },
         {
           values: cities['Zhejiang'],
           className: 'column2',
           defaultIndex: 2,
         },
       ],
     };
   },
   methods: {
     onChangePicker(val) {
       console.log('onChangePicker.val', val);
       const { value } = val;
       this.$refs.picker.setColumnValues(1, cities[value[0]]);
     },
   },
};
```

### disable option

Options can be an object structure, which can be disabled by setting disabled.

```html
<press-picker-plus
   :columns="columns"
   @change="onChange"
/>
```

```javascript
export default {
   data() {
     return {
       columns: [
         { text: 'Hangzhou', disabled: true },
         { text: 'Ningbo' },
         { text: 'Wenzhou' },
       ],
     };
   },
};
```

### Loading Status

When the Picker data is fetched asynchronously, the loading hint can be displayed through the `loading` property.

```html
  <press-picker-plus
   :columns="columns"
   loading
   @change="onChange"
/>
```

## API

### Props

| Parameter           | Description                                                                                                                                  | Type      | Default   |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------- |
| columns             | Object array, configure the data displayed in each column                                                                                    | _Array_   | `[]`      |
| show-toolbar        | Whether to show the top bar                                                                                                                  | _boolean_ | `false`   |
| toolbar-position    | position of the top bar, optional value is `bottom`                                                                                          | _string_  | `top`     |
| title               | top bar title                                                                                                                                | _string_  | `''`      |
| loading             | Whether to show loading status                                                                                                               | _boolean_ | `false`   |
| value-key           | in the option object, the key corresponding to the text                                                                                      | _string_  | `text`    |
| item-height         | item height                                                                                                                                  | _number_  | `44`      |
| confirm-button-text | confirm button text                                                                                                                          | _string_  | `confirm` |
| cancel-button-text  | cancel button text                                                                                                                           | _string_  | `cancel`  |
| visible-item-count  | number of visible items                                                                                                                      | _number_  | `6`       |
| default-index       | The default selected item index for single-column selectors, <br>For multi-column selectors, please refer to the Columns configuration below | _number_  | `0`       |

### Events

The event of the Picker component will return different parameters depending on whether the columns are single column or multiple columns.

| Event Name | Description                                 | Parameters                                                                                                                                                                                            |
| ---------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| confirm    | Triggered when the Done button is clicked   | Single column: selected value, index corresponding to the selected value<br>Multiple columns: selected value of all columns, index corresponding to the selected value of all columns                 |
| cancel     | Triggered when the cancel button is clicked | Single column: selected value, index corresponding to the selected value<br>Multiple columns: selected value of all columns, index corresponding to the selected value of all columns                 |
| change     | Triggered when the option is changed        | Single column: Picker instance, selected value, index corresponding to the selected value<br>Multi-column: Picker instance, selected values of all columns, index corresponding to the current column |

### Columns data structure

When multiple columns of data are passed in, `columns` is an object array, each object in the array configures each column, and each column has the following `key`.

| key          | description                                                |
| ------------ | ---------------------------------------------------------- |
| values       | the corresponding alternative values in the column         |
| defaultIndex | The index of the initially selected item, the default is 0 |

### External style classes

| class name    | description               |
| ------------- | ------------------------- |
| custom-class  | root node style class     |
| active-class  | selected item style class |
| toolbar-class | top bar style class       |
| column-class  | column style class        |

### method

You can get the picker instance and call the instance method through selectComponent.

| method name     | parameters               | return value | description                                                         |
| --------------- | ------------------------ | ------------ | ------------------------------------------------------------------- |
| getValues       | -                        | values       | Get the selected values of all columns                              |
| setValues       | values                   | -            | set all column selected values                                      |
| getIndexes      | -                        | indexes      | Get the indexes corresponding to the selected values of all columns |
| setIndexes      | indexes                  | -            | Set the index corresponding to the selected value of all columns    |
| getColumnValue  | columnIndex              | value        | Get the selected value of the corresponding column                  |
| setColumnValue  | columnIndex, value       | -            | set the selected value of the corresponding column                  |
| getColumnIndex  | columnIndex              | optionIndex  | Get the index of the selected item in the corresponding column      |
| setColumnIndex  | columnIndex, optionIndex | -            | Set the index of the selected item in the corresponding column      |
| getColumnValues | columnIndex              | values       | Get all options in the corresponding column                         |
| setColumnValues | columnIndex, values      | -            | set all options in the corresponding column                         |

## Theme customization

<theme-config />