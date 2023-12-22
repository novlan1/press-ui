---
url : pages/press/rate/rate
---

## Rate

Used for rating operations on things.


## Code Demo

### Basic usage

```html
<press-rate :value="value" @change="onChange" />
```

```javascript
export default {
   data() {
     return {
       value: 3,
     }
   },
   methods: {
     onChange(value) {
       console.log('value', value);
     }
   },
};
```

### Custom icon

```html
<press-rate
   :value="value"
   icon="like"
   void-icon="like-o"
   @change="onChange"
/>
```

### Custom styles

```html
<press-rate
   :value="value"
   :size="25"
   color="#ffd21e"
   void-icon="star"
   void-color="#eee"
   @change="onChange"
/>
```

### half star

```html
<press-rate
   :value="value"
   allow-half
   void-icon="star"
   void-color="#eee"
   @change="onChange"
/>
```

```javascript
export default {
   data() {
     return {
       value: 2.5,
     }
   },
   methods: {
     onChange(value) {
       console.log('value', value);
     }
   },
};
```

### Custom Quantity

```html
<press-rate :value="value" :count="6" @change="onChange" />
```

### Disabled state

```html
<press-rate disabled :value="value" @change="onChange" />
```

### read-only status

```html
<press-rate readonly :value="value" @change="onChange" />
```



## API

### Props

| Parameter      | Description                                                                                            | Type               | Default   |
| -------------- | ------------------------------------------------------------------------------------------------------ | ------------------ | --------- |
| name           | Identifier when submitted within the form                                                              | _string_           | -         |
| value          | current score                                                                                          | _number_           | -         |
| count          | total number of icons                                                                                  | _number_           | `5`       |
| size           | icon size, the default unit is `px`                                                                    | _string \| number_ | `20px`    |
| gutter         | icon spacing, the default unit is `px`                                                                 | _string \| number_ | `4px`     |
| color          | color when selected                                                                                    | _string_           | `#ffd21e` |
| void-color     | unselected color                                                                                       | _string_           | `#c7c7c7` |
| icon           | The icon name or image link when selected, see [Icon Component](./press-icon-plus) for optional values | _string_           | `star`    |
| void-icon      | Icon name or image link when not selected, see [Icon Component](./press-icon-plus) for optional values | _string_           | `star-o`  |
| allow-half     | Whether to allow half selection                                                                        | _boolean_          | `false`   |
| readonly       | Whether it is read-only                                                                                | _boolean_          | `false`   |
| disabled       | whether to disable scoring                                                                             | _boolean_          | `false`   |
| disabled-color | disabled color                                                                                         | _string_           | `#bdbdbd` |
| touchable      | Whether rating can be selected by swiping gesture                                                      | _boolean_          | `true`    |

### Events

| Event Name | Description                                    | Callback Parameters         |
| ---------- | ---------------------------------------------- | --------------------------- |
| @change    | Event triggered when the current score changes | event.detail: current score |

### External style classes

| class name   | description           |
| ------------ | --------------------- |
| custom-class | root node style class |
| icon-class   | icon style class      |

## Theme customization

<theme-config />