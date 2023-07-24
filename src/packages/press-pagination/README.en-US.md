---
url : pages/press/pagination/pagination
---

## Pagination


## Code Demo

### Basic usage


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


|     property name      |   type    | default value |                                description                                 |
| :--------------------: | :-------: | :-----------: | :------------------------------------------------------------------------: |
|         total          |  Number   |       -       |                           total number of pages                            |
|        current         |  Number   |       -       |                                current page                                |
|      tip-template      |  String   | `page {{0}}`  |                                tip template                                |
| safe-area-inset-bottom | _boolean_ |    `true`     |               Whether to leave a safe distance at the bottom               |
|      auto-scroll       | _number_  |      `1`      | The number of pages to automatically scroll when the border is encountered |

### Events

| event name |     description     | return value |
| :--------: | :-----------------: | :----------: |
|   change   | switch current page |      -       |
