---
url : pages/press/card/card
---

## Card

Used to display some information.

## Code Demo
### Basic usage


```html
<press-card>
   <span class="press-body">
     Code is written to be read by humans, with the added bonus of being able to run on a machine
   </span>
</press-card>
```


### Title

```html
<press-card
   title="title"
   extra="description"
>
   <span class="press-body">
     Code is written to be read by humans, with the added bonus of being able to run on a machine
   </span>
</press-card>
```


### Title

```html
<press-card
   title="title"
   extra="description"
>
   <span class="press-body">
     Code is written to be read by humans, with the added bonus of being able to run on a machine
   </span>
</press-card>
```


### Subtitle

```html
  <press-card
   title="title"
   sub-title="subtitle"
   extra="description"
   :thumbnail="avatar"
>
   <span class="press-body">
     Code is written to be read by humans, with the added bonus of being able to run on a machine
   </span>
</press-card>
```

```ts
export default {
   data() {
     return {
       avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-ui-avatar.png',
     }
   }
}
```

### no margins

```html
<press-card
   title="title"
   sub-title="subtitle"
   extra="description"
   :is-full="true"
   :thumbnail="avatar"
>
   <span class="press-body">
     Code is written to be read by humans, with the added bonus of being able to run on a machine
   </span>
</press-card>
```

### cover picture

```html
<press-card
   :cover="cover"
   @click="onClick"
>
   <span class="press-body">
     Code is written to be read by humans, with the added bonus of being able to run on a machine
   </span>
</press-card>
```

```ts
export default {
   data() {
     return {
       cover: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg',
     }
   }
}
```

### Action Bar

```html
<press-card>
   <span class="press-body">
     Code is written to be read by humans, with the added bonus of being able to run on a machine
   </span>
   <div
     slot="actions"
     class="card-actions"
   >
     <div
       class="card-actions-item"
       @click="actionsClick('Share')"
     >
       <uni-icons
         type="redo"
         size="18"
         color="#999"
       />
       <span class="card-actions-item-text">
         share
       </span>
     </div>
     <div
       class="card-actions-item"
       @click="actionsClick('Like')"
     >
       <uni-icons
         type="heart"
         size="18"
         color="#999"
       />
       <span class="card-actions-item-text">
         like
       </span>
     </div>
     <div
       class="card-actions-item"
       @click="actionsClick('Comment')"
     >
       <uni-icons
         type="chatbubble"
         size="18"
         color="#999"
       />
       <span class="card-actions-item-text">
         Comment
       </span>
     </div>
   </div>
</press-card>
```

```ts
export default {
   methods: {
     actionsClick(text) {
       uni.showToast({
         title: text,
         icon: 'none',
       });
     },
   }
}
```

### Custom title

```html
<press-card
   padding="10px 0"
>
   <template #title>
     <press-cell
       title="title"
       clickable
       @click="checked = !checked"
     >
       <press-switch
         slot="right-icon"
         size="22px"
         :checked="checked"
       />
     </press-cell>
   </template>
   <span class="press-body uni-mt-5">
     Code is written to be read by humans, with the added bonus of being able to run on a machine
   </span>
</press-card>
```

```ts
export default {
   data() {
     return {
       checked: true,
     }
   }
}
```
## API

### Props


| Parameter | Description | Type | Default |
| --------- | ----------- | ---- |---- | ----------------------------------------|
| title | title | _string_ | - |
| subTitle | subtitle | _string_ | - |
| extra | Description on the right side | _string_ | - |
| thumbnail | Thumbnail to the left of the title | _string_ | - |
| cover | cover image | _string_ | - |
| isFull | Whether to clear the column, when it is true, the padding value will be removed | _boolean_ | `false` |
| isShadow | Whether to enable shadow | _boolean_ | `true` |
| shadow | card shadow, must conform to css value | _string_ | `0px 0px 3px 1px rgba(0, 0, 0, 0.08)` |
| border | Whether to show a border | _boolean_ | `true` |
| margin | card margin | _string_ | `15px` |
| spacing | card padding | _string_ | `0 10px` |
| padding | card content padding | _string_ | `10px` |


### Events

| Event | Description | Callback Parameters |
| ----- | ----------- | ------------------- |---------------------------------- |
| click | Click Card to trigger event | `cover` \| `title` \| `extra` \| `content` \| `actions` |


### Slot

| Name  | Description |
| ----- | ----------- |
| -     | Cover Image |
| cover | card head   |
| title | action bar  |