---
url : pages/press/area/area
---

## Area

The province/district selection component is usually used in conjunction with the popup layer component.

## Usage

### Basic usage

When initializing the province/district component, you need to pass in the province/district data through the `area-list` attribute.

```html
<press-area :area-list="areaList" />
```

### areaList format

areaList is an object structure, including `province_list`, `city_list`, `county_list` three keys.

Each item uses the region code as the key, and the name of the province or city as the value. The area code is 6 digits, the first two digits represent the province, the middle two digits represent the city, and the last two digits represent districts and counties, with 0 making up 6 digits. For example, the area code of Beijing is `11`, which is `110000` by adding 0 to 6 digits.

Sample data is as follows:

```js
const areaList = {
   province_list: {
     110000: 'Beijing',
     120000: 'Tianjin',
   },
   city_list: {
     110100: 'Beijing',
     120100: 'Tianjin',
   },
   county_list: {
     110101: 'Dongcheng District',
     110102: 'Xicheng District',
     // ....
   },
};
```

### Data Sources

Press provides a default province and city data, [address here](https://tip-components-1251917893.file.myqcloud.com/rb/front-open-config__match__default__area_data.json).



```ts
const AREA_DATA_URL = 'https://tip-components-1251917893.file.myqcloud.com/rb/front-open-config__match__default__area_data.json';


function getAreaData() {
   return new Promise((resolve, reject) => {
     uni.request({
       url: AREA_DATA_URL,
       data: {},
       method: 'GET',
       sslVerify: true,
       success: ({ data }) => {
         resolve(data);
       },
       fail: (error) => {
         reject(error);
       },
     });
   });
}


export default {
   data() {
     return {
       areaList: []
     }
   },
   mounted() {
     getAreaData().then(res => this.areaList = res)
   },
}
```

### Selected provinces and municipalities

If you want to select a province or city, you need to pass in a `value` attribute and bind the corresponding province or city `code`.

```html
<press-area :area-list="areaList" value="110101" />
```

### Configure display columns

You can configure the number of columns displayed by provinces and cities through the `columns-num` property. By default, provinces and cities will be displayed. When you set it to `2`, only provinces and cities will be displayed.

```html
<press-area :area-list="areaList" :columns-num="2" title="title" />
```

### Configure column placeholder prompt text

The placeholder prompt text for each column can be configured through the `columns-placeholder` property.

```html
<press-area
   :area-list="areaList"
   :columns-placeholder="['Please choose', 'Please choose', 'Please choose']"
   title="title"
/>
```


## API

### Props

| Parameter             | Description                                                                                            | Type               | Default   |
| --------------------- | ------------------------------------------------------------------------------------------------------ | ------------------ | --------- |
| value                 | `code` of the currently selected province or city                                                      | _string_           | -         |
| title                 | top bar title                                                                                          | _string_           | -         |
| area-list             | Provincial and urban data, see the format below                                                        | _object_           | -         |
| columns-num           | The number of columns displayed in provinces and cities, 3-provinces, cities, 2-provinces, 1-provinces | _string \| number_ | `3`       |
| columns-placeholder   | Column placeholder hint text                                                                           | _string[]_         | `[]`      |
| loading               | Whether to show loading status                                                                         | _boolean_          | `false`   |
| item-height           | item height                                                                                            | _number_           | `44`      |
| visible-item-count    | number of visible items                                                                                | _number_           | `6`       |
| confirm-button-text   | confirm button text                                                                                    | _string_           | `confirm` |
| cancel-button-text    | cancel button text                                                                                     | _string_           | `cancel`  |
| show-toolbar `1.10.3` | Whether to show the top bar                                                                            | _boolean_          | `true`    |

### Events

| Event   | Description                                     | Callback Parameters                                                                        |
| ------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| confirm | Click the button on the upper right to complete | An array parameter, see the data format section below for the specific format              |
| cancel  | When the cancel button is clicked               | -                                                                                          |
| change  | Triggered when the option is changed            | PickerPlus instance, selected values of all columns, index corresponding to the current column |

### method

You can get the Area instance and call the instance method through selectComponent.

| method name | parameters   | return value | description                                                                                       |
| ----------- | ------------ | ------------ | ------------------------------------------------------------------------------------------------- |
| reset       | code: string | -            | Reset all options according to the code, if no code is passed, it will be reset to the first item |

### The data format returned when the click is completed

The returned data is an Object as a whole, including `values`, `index` two keys.

`values` is an array as a whole, which contains `columnsNum` data, and each data corresponds to the selected data in a column of options.

`code` represents the selected region code, `name` represents the selected region name.

```javascript
[
   {
     code: '110000',
     name: 'Beijing',
   },
   {
     code: '110100',
     name: 'Beijing',
   },
   {
     code: '110101',
     name: 'Dongcheng District',
   },
];
```

`index` is an array, which contains `columnsNum` data, and each data corresponds to the serial number of the selected item in a column of options.
