---
url : pages/press/index-bar/index-bar
---

## IndexBar 

Index classification display and quick positioning for lists.


## Code Demo

### Basic usage

When the index bar is clicked, it will automatically jump to the corresponding `IndexAnchor` anchor position.

```html
<press-index-bar>
   <view>
     <press-index-anchor index="A" />
     <press-cell title="text" />
     <press-cell title="text" />
     <press-cell title="text" />
   </view>

   <view>
     <press-index-anchor index="B" />
     <press-cell title="text" />
     <press-cell title="text" />
     <press-cell title="text" />
   </view>

   ...
</press-index-bar>
```

### Custom index list

The list of index characters displayed can be customized through the `index-list` attribute.

```html
<press-index-bar :index-list="indexList">
   <view>
     <press-index-anchor index="1">Title 1</press-index-anchor>
     <press-cell title="text" />
     <press-cell title="text" />
     <press-cell title="text" />
   </view>

   <view>
     <press-index-anchor index="2">Header 2</press-index-anchor>
     <press-cell title="text" />
     <press-cell title="text" />
     <press-cell title="text" />
   </view>

   ...
</press-index-bar>
```

```javascript
export default {
   data() {
     return {
       indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
     }
   },
};
```

## API

### IndexBar Props

| Parameter | Description | Type | Default | Version |
| --------- | ----------- | ---- | ------- | ------- ||
| index-list        | index character list                                                            | _string[] \| number[]_ | `A-Z`     | -       |
| z-index           | z-index level                                                                   | _number_               | `1`       | -       |
| sticky            | Whether to enable the anchor point to automatically stick to the ceiling        | _boolean_              | `true`    | -       |
| sticky-offset-top | The distance from the top when the anchor point automatically sticks to the top | _number_               | `0`       | -       |
| highlight-color   | index character highlight color                                                 | _string_               | `#07c160` | -       |

### IndexAnchor Props

| Parameter | Description                            | Type               | Default | Version |
| --------- | -------------------------------------- | ------------------ | ------- | ------- |
| use-slot  | whether to use slot for custom content | _boolean_          | `false` | -       |
| index     | index character                        | _string \| number_ | -       | -       |

### IndexBar Events

| Event Name | Description                          | Callback Parameters    |
| ---------- | ------------------------------------ | ---------------------- |
| select     | trigger when a character is selected | index: index character |

### IndexAnchor Slots

| Name | Description                                                             |
| ---- | ----------------------------------------------------------------------- |
| -    | Display content at the anchor point, the default is the index character |

## Theme customization

<theme-config />