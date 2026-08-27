---
url : pages/press/pagination/pagination
---

## Pagination

When the amount of data is too much, use pagination to separate the data, and load only one page at a time.

## Code Demo

### Basic Usage

```html
<press-pagination 
  :current="currentPage" 
  :total-items="24" 
  :items-per-page="5" 
  @change="(value) => currentPage = value"
/>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const currentPage = ref(1);
    return { currentPage };
  },
};
```

### Simple mode

```html
<press-pagination 
  :current="currentPage" 
  :page-count="12" 
  mode="simple" 
  @change="(value) => currentPage = value"
/>
```

### Show ellipses

```html
<press-pagination
  :current="currentPage"
  :total-items="125"
  :show-page-size="3"
  force-ellipses
  @change="(value) => currentPage = value"
/>
```

### Custom Button

```html
<press-pagination 
  :current="currentPage" 
  :total-items="50" 
  :show-page-size="5" 
  @change="(value) => currentPage = value"
>
  <template #prev-text>
    <press-icon-plus name="arrow-left" />
  </template>
  <template #next-text>
    <press-icon-plus name="arrow" />
  </template>
  <template #page="{ text }">{{ text }}</template>
</press-pagination>
```

### E-Sport mode

```html
<PressPagination
   :total="total"
   :current="current"
   @change="change"
/>
```

```ts
export default {
   data() {
     return {
       total: 10,
       current: 2,
     }
   },
   methods: {
     change() {

     }
   }
}
```

## API

### Props


| property name          | type      | default value | description                                                                |
| ---------------------- | --------- | ------------- | -------------------------------------------------------------------------- |
| total                  | Number    | -             | total number of pages                                                      |
| current                | Number    | -             | current page                                                               |
| tip-template           | String    | `page {{0}}`  | tip template                                                               |
| safe-area-inset-bottom | _boolean_ | `true`        | Whether to leave a safe distance at the bottom                             |
| auto-scroll            | _number_  | `1`           | The number of pages to automatically scroll when the border is encountered |

### Events

| event name | description         | return value |
| ---------- | ------------------- | ------------ |
| change     | switch current page | -            |
