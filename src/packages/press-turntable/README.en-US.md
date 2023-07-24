---
url: pages/press/turntable/turntable
---

## Turntable 

Available for sweepstakes.

## Code Demo

### Basic usage

```html
<PressTurnTable
   :list="list"
   :prize-index="prizeIndex"
   :number="3"
   @start="onStart"
   @end="onEnd"
/>
```

```ts
import PressTurnTable from 'src/packages/press-turntable/press-turntable.vue';

export default {
   data() {
     return {
       list: [],
       prizeIndex: 3,
     }
   },
   methods: {
     onStart() {
     },
     onEnd() {
     },
   }
}

```


## API


### Props

| Parameter    | Description                                      | Type                 | Default |
| ------------ | ------------------------------------------------ | -------------------- | ------- |
| list         | prize list                                       | _Array\<img, name\>_ | `[]`    |
| number       | Number of draws remaining                        | _number_             | `1`     |
| disabled     | Whether to disable the lottery button            | _boolean_            | `false` |
| prize-index  | After clicking the lottery, the winning index    | _number_             | `0`     |
| start-angle  | start angle                                      | _number_             | `0`     |
| laps         | The number of laps the lottery animation rotates | _number_             | `3`     |
| duration     | Duration of lottery animation                    | _number_             | `3000`  |
| custom-style | custom style                                     | _string_             | ``      |
| custom-class | custom class name                                | _string_             | ``      |

### Events

| Event Name | Description    | Callback Parameters |
| ---------- | -------------- | ------------------- |
| start      | Click to draw  | -                   |
| end        | End of lottery | -                   |