---
url: pages/press/hor-task/hor-task
---

## HorTask 


## Introduction

```ts
import PressHorTask from 'press-ui/press-hor-task/press-hor-task';

export default {
   components: {
     PressHorTask,
   }
}
```

## Code Demo

### Basic usage

```html
<PressHorTask
   :task-list="taskList"
   :match-list="matchList"
   @back="onBack"
   @clickRule="clickRule"
   @clickTaskAward="clickTaskAward"
   @clickTaskButton="clickTaskButton"
   @clickMatchAward="clickMatchAward"
   @clickMatch="clickMatch"
/>
```

```ts
const MOCK_AWARDS = Array.from({
   length: 10,
}).map(() => ({
   image: 'https://igame-10037599.cos.ap-shanghai.myqcloud.com/dd90f5ee-282c-bf96-f8de-c22de72ee7b1.jpg',
}));


const MOCK_TASK_LIST = [
   {
     name: 'Daily check-in',
     awards: MOCK_AWARDS,
     buttonText: 'Sign in',
     buttonPrimary: true,
   }, {
     name: 'Daily check-in',
     awards: MOCK_AWARDS,
     buttonText: 'Go to watch the game',
     buttonSecondary: true,
   },
   {
     name: 'Daily check-in',
     awards: MOCK_AWARDS,
     buttonText: 'Received',
     buttonPlain: true,
   },
];

const MOCK_MATCH_LIST = [
   {
     label: 'Registered',
     image: 'https://dummyimage.com/80x80',
     name: 'Event name event name',
     awards: MOCK_AWARDS.slice(0, 4),
   },
   {
     image: 'https://dummyimage.com/80x80',
     name: 'Event name event name',
     awards: MOCK_AWARDS.slice(0, 4),
   },
   {
     image: 'https://dummyimage.com/80x80',
     name: 'Event name event name',
     awards: MOCK_AWARDS.slice(0, 4),
   },
   {
     image: 'https://dummyimage.com/80x80',
     name: 'Event name event name',
     awards: MOCK_AWARDS.slice(0, 4),
   },
];

export default {
   data() {
     return {
       taskList: MOCK_TASK_LIST,
       matchList: MOCK_MATCH_LIST,
     };
   },
   methods: {
     onBack() {
       routerBack.call(this);
     },
     clickRule() {
       console.log('[clickRule]');
     },
     clickTaskAward(awardItem, awardIndex, taskItem) {
       console.log('[clickTaskAward]', awardItem, awardIndex, taskItem);
     },
     clickTaskButton(taskItem) {
       console.log('[clickTaskButton]', taskItem);
     },
     clickMatch(matchItem) {
       console.log('[clickMatch]', matchItem);
     },
     clickMatchAward(awardItem, awardIndex, matchItem) {
       console.log('[clickMatchAward]', awardItem, awardIndex, matchItem);
     },
   },
}

```

## API

### Props

| Parameters | Description | Type    | Default value |
| ---------- | ----------- | ------- | ------------- |
| task-ist   | task list   | _array_ | -             |
| match-ist  | match list  | _array_ | -             |



### Events

| Event name      | Description           | Parameters                             |
| --------------- | --------------------- | -------------------------------------- |
| back            | Click to return       | -                                      |
| clickRule       | click rule            | -                                      |
| clickTaskAward  | Click task award      | `awardItem`, `awardIndex`, `taskItem`  |
| clickTaskButton | Click the task button | `taskItem`                             |
| clickMatchAward | Click event prize     | `awardItem`, `awardIndex`, `matchItem` |
| clickMatch      | click match           | `matchItem`                            |