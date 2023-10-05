---
url: pages/press/schedule-card/schedule-card
---

## ScheduleCard


## Introduction

```ts
import Press schedule card from 'press-ui/press-schedule-card/press-schedule-card';

export default {
   components: {
     Press schedule card,
   }
}
```

## Code Demo

### Basic usage

```html
<PressScheduleCard
   :user-nick="scheInfo.userNick"
   :device-str="scheInfo.deviceStr"
   :role-id="scheInfo.roleId"
   :is-not-sign-up="scheInfo.isNotSignUp"
   :card-state="scheInfo.cardState"
   :countdown-time="scheInfo.countdown"
   :button-count-down="scheInfo.buttonCountDown"
   :step-list="scheInfo.stepList"
   :game-stage-list="scheInfo.gameStageList"
   :team-list="scheInfo.teamList"
   :score-list="scheInfo.scoreList"
   :result-list="scheInfo.resultList"
   :result-type="scheInfo.resultType"
   @clickStep="clickStep"
/>
```

```ts
export default {
   data() {
     scheInfo: {
       userNick: '杨',
       deviceStr: 'iOS WeChat',
       roleId: '123123123999',
       countdown: 1000000,
       buttonCountDown: 100000,
       isNotSignUp: false,
       cardState: SCHEDULE_CARD_STATE_MAP.BATTLE_STARTED,
       stepList: getStepList({
         length: 6,
         playingIndex: MOCK_PLAYING_INDEX,
       }),
       gameStageList: getStepList({
         length: 3,
         isStage: true,
         playingIndex: -1,
         curIndex: -1,
       }),
       teamList: getTeamList({
         length: 6,
         readyList: [1, 2, 3],
       }),
       scoreList: getScoreList({
         length: 6,
       }),
       resultList: getResultList(),
       resultType: RESULT_TYPE_MAP.PENDING,
     },
   }
}
```


## API

### Props

| Parameters             | Description                         | Type      | Default value                                                    |
| ---------------------- | ----------------------------------- | --------- | ---------------------------------------------------------------- |
| is-not-sign-up         | Whether it is signing up            | _boolean_ | `false`                                                          |
| card-state             | card state                          | _string_  | -                                                                |
| countdown-time         | Countdown, unit `ms`                | _number_  | 0                                                                |
| button-count-down      | Button countdown, unit `ms`         | _number_  | 0                                                                |
| step-list              | game list                           | _array_   | -                                                                |
| game-stage-list        | stage list                          | _boolean_ | -                                                                |
| team-list              | team list                           | _array_   | -                                                                |
| score-list             | score list                          | _array_   | -                                                                |
| result-list            | result list                         | _array_   | -                                                                |
| result-type            | result type                         | _string_  | -                                                                |
| fail-title             | Failure title                       | _string_  | `Promotion failed`                                               |
| fail-desc              | Failure description                 | _string_  | `This game failed to advance, please participate in other games` |
| pending-text           | Description of unavailable results  | _string_  | `Waiting for the referee to confirm the promotion ranking`       |
| user-nick              | User nickname                       | _string_  | -                                                                |
| device-str             | device description                  | _string_  | -                                                                |
| role-id                | User role ID                        | _string_  | -                                                                |
| button-text            | button copy                         | _string_  | -                                                                |
| button-type            | button type                         | _string_  | -                                                                |
| button-tip             | Button tip copy                     | _string_  | -                                                                |
| show-button-count-down | Whether to display button countdown | _string_  | -                                                                |
| button-tip-type        | Button tip type                     | _string_  | -                                                                |
| button-avatar-list     | List of avatars in button prompts   | _array_   | -                                                                |



### Events

| Event name            | Description           | Parameters                          |
| --------------------- | --------------------- | ----------------------------------- |
| clickButton           | Click button          | buttonType, cardState, cardStateMap |
| clickStep             | Switch games          | stepItem, stepIndex                 |
| checkDataDetail       | View detailed data    | cardState, cardStateMap             |
| countDownChange       | Countdown changes     | cardState, cardStateMap             |
| countDownFinish       | Countdown ends        | cardState, cardStateMap             |
| buttonCountDownFinish | Button countdown ends | cardState, cardStateMap             |
| exchange              | switch roles          | cardState, cardStateMap             |


### Field Type

`cardState` types are as follows:

```ts
export const SCHEDULE_CARD_STATE_MAP = {
   GAME_WILL_START: 'GAME_WILL_START', // The game is about to start, showing "Registration is about to start"
   BATTLE_STARTED: 'BATTLE_STARTED', // The nth game has started, and "Go to the game" is displayed
   BATTLE_PLAYING: 'BATTLE_PLAYING', // Game 1 is in progress, and "Game in progress" is displayed
   BATTLE_NEXT_WILL_START: 'BATTLE_NEXT_WILL_START', // The previous round is over, the 2nd, 2+ rounds are waiting to start, the points of the previous rounds are displayed, and the "To Be Started + Countdown" button
   GAME_END: 'GAME_END', // The game ends and the promotion results are displayed
};
```

`resultType` types are as follows:

```ts
export const RESULT_TYPE_MAP = {
   SUCCESS: 'SUCCESS',
   FAIL:'FAIL',
   PENDING: 'PENDING',
};
```


`buttonType` types include the following:

```ts
export const BUTTON_TYPE_MAP = {
   PRIMARY: 'green',
   DISABLE: 'gray',
};
```


`buttonTipType` types are as follows:

```ts
export const BUTTON_TIP_TYPE_AMP = {
   TEXT: 'TEXT',
   AVATAR: 'AVATAR',
};
```

`buttonAvatarList` type is:

```ts
Array<{
   head: string;
   isGreen?: boolean;
   isYellow?: boolean;
}>
```



## common problem

### Button copy

The component will generate the corresponding button copy and type based on `cardState`. If `props` is passed in, `props` will take precedence.

### Data driven

There are many status cards in the schedule, and the following considerations are made during the sorting process:

1. The style must be written near the component. If it is not nearby, it must be on the name or path to distinguish it from the styles of other components. Coupling the styles of all components together is difficult to maintain, and it is difficult to find people who will participate later.
2. It must be data driven, here it is status code driven
3. The card status code needs to be a `Map`, and its `key` is a string, that is, `Record<string, string | number>`. It cannot be `Record<number, any>` or `number`, because `number ` The type is difficult to name and has poor scalability.
4. When processing data, that is, when the card status code is generated, other data required by the card should be generated together. Otherwise, when other data is needed, it needs to be judged based on the status code again, which is too redundant and easy. omissions or other errors.
5. Within the component, the external status code should be converted again to the state required by the component.


Here is an overview of several states:
- To be played
   - Match list, title, countdown, button
- Go to the game
   - Game list, title, player list, buttons
- Match in progress (gray button)
   - Game list, title, player list, buttons
- Game 2+ to be started
   - Game list, title (points ranking), points status, buttons
- competition is over
   - Title + picture (congratulations on promotion), ranking + points status, button

