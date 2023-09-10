---
url : pages/press/tree-select/tree-select
---

## TreeSelect 

Used to select from a set of related data collections.


## Code Demo

### Single selection mode

The press-tree-select tag can be used anywhere. Just pass in the corresponding data. This component supports single selection or multiple selection. The specific behavior is completely based on how the implementation logic of the event click-item assigns a value to the attribute active-id. When active-id is an array, it is in the multi-selection state.

```html
<press-tree-select
   :items="items"
   :main-active-index="mainActiveIndex"
   :active-id="activeId"
   @click-nav="onClickNav"
   @click-item="onClickItem"
/>
```

```javascript
export default {
   data() {
     return {
       mainActiveIndex: 0,
       activeId: null,
     }
   },
   methods: {
     onClickNav(index) {
       this.mainActiveIndex = index || 0;
     },

     onClickItem(detail) {
       const activeId = this.data.activeId === detail.id ? null : detail.id;
       this.activeId = activeId;
     }
   },
};
```

### Multiple selection mode

```html
<press-tree-select
   items="{{ items }}"
   main-active-index="{{ mainActiveIndex }}"
   active-id="{{ activeId }}"
   max="{{ max }}"
   @click-nav="onClickNav"
   @click-item="onClickItem"
/>
```

```javascript
export default {
   data() {
     return {
       mainActiveIndex: 0,
       activeId: [],
       max: 2,
     }
   },
   methods: {
     onClickNav(index) {
       this.mainActiveIndex = index || 0;
     },

     onClickItem(detail) {
       const { activeId } = this;

       const index = activeId. indexOf(detail. id);
       if (index > -1) {
         activeId.splice(index, 1);
       } else {
         activeId.push(detail.id);
       }


       this.activeId = activeId;
     }
   },
};
```

### Custom content

```html
<press-tree-select
   items="{{ items }}"
   height="55vw"
   main-active-index="{{ mainActiveIndex }}"
   active-id="{{ activeId }}"
   @click-nav="onClickNav"
   @click-item="onClickItem"
>
   <img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_9f901ce42e18990883.jpeg" slot="content" />
</press-tree-select>
```

## API

### Props

| Parameter         | Description                                                           | Type                        | Default    |
| ----------------- | --------------------------------------------------------------------- | --------------------------- | ---------- |
| items             | data required for category display                                    | _Array_                     | `[]`       |
| height            | height, the default unit is `px`                                      | _number \| string_          | `300`      |
| main-active-index | index of left selected item                                           | _number_                    | `0`        |
| active-id         | The id of the selected item on the right, support passing in an array | _string \| number \| Array_ | `0`        |
| max               | The maximum number of selected items on the right side                | _number_                    | _Infinity_ |
| selected-icon     | Customize the icon for the selected state on the right sidebar        | _string_                    | `success`  |

### Events

| Event Name  | Description                                                               | Callback Parameters                                     |
| ----------- | ------------------------------------------------------------------------- | ------------------------------------------------------- |
| @click-nav  | The event triggered when the left navigation is clicked                   | event.detail.index: the index of the clicked navigation |
| @click-item | The event that will be triggered when the right selection item is clicked | event.detail: the data of the clicked item              |

### Slots

| Name    | Description                                                                                 |
| ------- | ------------------------------------------------------------------------------------------- |
| content | Customize the content of the right area, if there are items, it will be inserted at the top |

### items data structure

`items` is an array as a whole, which contains a series of objects describing categories. In each category, text represents the name of the current category. children represent the optional items in the category, which is an array structure, and id is used to uniquely identify each option.

```javascript
[
   {
     // navigation name
     text: 'All cities',
     // The logo in the upper right corner of the navigation name, supported from version 1.5.0
     badge: 3,
     // Whether to display a small red dot in the upper right corner of the navigation name, version 1.5.0 supports
     dot: true,
     // disable option
     disabled: false,
     // All options under this navigation
     children: [
       {
         // name
         text: 'Wenzhou',
         // id, as an identifier for matching the selected state
         id: 1,
         // disable option
         disabled: true,
       },
       {
         text: 'Hangzhou',
         id: 2,
       },
     ],
   },
];
```

### External style classes

| class name             | description                               |
| ---------------------- | ----------------------------------------- |
| main-item-class        | left item style class                     |
| content-item-class     | right side option style class             |
| main-active-class      | The left option selects the style class   |
| content-active-class   | The right option selects the style class  |
| main-disabled-class    | left option disabled style class          |
| content-disabled-class | The right option disables the style class |

## Theme customization

<theme-config />