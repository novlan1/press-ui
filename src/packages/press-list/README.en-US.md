---
url : pages/press/list/list
---

## PressList 

Waterfall scrolling loading is used to display long lists. When the list is about to scroll to the bottom, an event will be triggered and more list items will be loaded.

### Basic Usage

The `List` component controls the loading status through two variables `loading` and `finished`. When the component scrolls to the bottom, the `load` event will be triggered and `loading` will be set to `true`. At this point, you can initiate an asynchronous operation and update the data. After the data is updated, set `loading` to `false`. If all the data has been loaded, just set `finished` to `true` directly.

```html
<press-list
   v-model="loading"
   :finished="finished"
   :immediate-check="immediateCheck"
   finished-text="No more"
   @load="load"
>
   <div
     v-for="item of list"
     :key="item.value"
   >
     {{ item. label }}
   </div>
</press-list>
```

```ts
function fetchData({ length, beforeLength }) {
   return new Promise((resolve) => {
     setTimeout(() => {
       resolve({
         data: Array.from({ length }).map((_, i) => {
           let value = i + beforeLength;
           if (value < 10) {
             value = `0${value}`;
           }
           return {
             label: value,
             value,
           };
         }),
       });
     }, 200);
   });
}


export default {
   data() {
     return {
       list: [],
       loading: false,
       finished: false,
       immediateCheck: false,
     };
   },
   methods: {
     load() {
       this.onFetchData();
     },
     onFetchData() {
       fetchData({
         length: 7,
         beforeLength: this.list.length,
       }).then(({ data }) => {
         this.list = [
           ...this.list,
           ...data,
         ];
         this.loading = false;
         this.finished = this.list.length > 50;
       })
         .catch(() => {});
     },
   },
};
```

## API

### Props


| Parameter       | Description                                                                                                 | Type      | Default      |
| --------------- | ----------------------------------------------------------------------------------------------------------- | --------- | ------------ |
| v-model         | Whether it is in the loading state, the `load` event will not be triggered during the loading process       | _boolean_ | `false`      |
| finished        | Whether it has been loaded, and the `load` event will not be triggered after the loading is completed       | _boolean_ | `false`      |
| offset          | The `load` event is triggered when the distance between the scroll bar and the bottom is less than `offset` | _number_  | `300`        |
| loading-text    | Prompt text during loading                                                                                  | _string_  | `Loading...` |
| finished-text   | prompt text after loading is complete                                                                       | _string_  | -            |
| immediate-check | Whether to perform scroll position check immediately on initialization                                      | _boolean_ | `true`       |

### Event


| Event Name | Description                                                                           | Callback Parameters |
| ---------- | ------------------------------------------------------------------------------------- | ------------------- |
| load       | Triggered when the distance between the scroll bar and the bottom is less than offset | -                   |
| scroll     | Triggered when the page is scrolled                                                   | -                   |


## common problem


### What is the operating mechanism of `List`?

`List` will listen to the scrolling event of the browser and calculate the position of the list. When the distance between the bottom of the list and the visible area is less than `offset`, `List` will trigger a `load` event.

### Why does the `load` event fire immediately after `List` is initialized?

After `List` is initialized, a `load` event will be triggered to load the data of the first screen. This feature can be turned off by the `immediate-check` property.


### Requests not triggered by the `load` event should set `loading` to `true`

If you want to load data as soon as the page is entered, you need to manually set `loading` to `true`, otherwise, if the requested data is not enough for one screen, the component cannot monitor the data changes and will not automatically load the next page.

In addition, in this way of use, `immediate-check` needs to be set to `false`.

```ts
export default {
   data() {
     return {
       immediateCheck: false,
     }
   },
   mounted() {
     this.loading = true;
     this.onFetchData(true);
   },
}
```


### Why does the `load` event fire continuously?

If the number of data items to be loaded in one request is too small, resulting in the list content not being able to fill the current screen, `List` will continue to trigger the `load` event until the content fills the screen or all data is loaded. Therefore, you need to adjust the number of data items obtained each time. Ideally, the number of data items obtained by each request should be able to fill the height of one screen.

### What do `loading` and `finished` mean?

`List` has the following three states, and understanding these states will help you use the `List` component correctly:

- Non-loading, `loading` is `false`, at this time, it will judge whether to trigger the `load` event according to the scroll position of the list (when the list content is less than one screen, it will be triggered directly)
- Loading, `loading` is `true`, which means that an asynchronous request is being sent, and the `load` event will not be triggered at this time
- The loading is complete, `finished` is `true`, and the `load` event will not be triggered at this time

After each request is completed, you need to manually set `loading` to `false`, indicating that the loading is complete.