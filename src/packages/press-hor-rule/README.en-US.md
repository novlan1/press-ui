---
url: pages/press/hor-rule/hor-rule
---

## HorRule 


## Introduction

```ts
import PressHorRule from 'press-ui/press-hor-rule/press-hor-rule';

export default {
   components: {
     PressHorRule,
   }
}
```

## Code Demo

### Basic usage

```html
<PressHorRule
   v-if="show"
   @close="close"
/>
```

```ts
export default {
   methods: {
     close() {
       this.show = false;
     },
   },
};
```


## API

### Props

| Parameters | Description       | Type     | Default value |
| ---------- | ----------------- | -------- | ------------- |
| rule       | Competition rules | _string_ | -             |

### Events

| Event name | Description    | Parameters |
| ---------- | -------------- | ---------- |
| close      | Click to close | -          |