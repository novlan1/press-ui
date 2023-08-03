---
url : pages/press/hor-match-header/hor-match-header
---

## HorMatchHeader

Can be used in the header of in-game pages.

## Code Demo

### Basic usage

```html
<MatchHeader @back="back">
   <template #middle>
     <div class="press-index__header__middle">
       Merchant competition
     </div>
   </template>
   <template #right>
     <div class="press-index__header__right">
       <div
         :class="['press-index__header__message',
                   showMessageDot ? 'press-red-dot':'']"
         @click="clickMsg"
       />
       <div
         :class="['press-index__header__home',
                   showPersonDot ? 'press-red-dot':'']"
         @click="clickPerson"
       />
     </div>
   </template>
</MatchHeader>
```

```ts
import PressHorMatchHeader from 'press-ui/press-hor-match-header/press-hor-match-header.vue';

export default {
   components: {
     PressHorMatchHeader,
   },
   data() {
     return {
       showMessageDot: true,
       showPersonDot: true,
     };
   },
   methods: {
     clickMessage() {
       this.onGTip('message');
     },
     clickPerson() {
       this.onGTip('home');
     },
     onBack() {
       this.onGTip('back');
     },
   },
};
```

## API

### Events

| Event Name | Description                    | Callback Parameters |
| ---------- | ------------------------------ | ------------------- |
| back       | Triggered when back is clicked | -                   |

### Slots

| Name   | Description                        |
| ------ | ---------------------------------- |
| middle | custom middle content              |
| right  | Customize the content on the right |
