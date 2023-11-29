---
url: pages/press/live-player/live-player
---

## LivePlayer 


## Introduction

```ts
import PressLivePlayer from 'press-ui/press-live-player/press-live-player';

export default {
   components: {
     PressLivePlayer,
   }
}
```

## Code Demo

### Basic usage

```html
<PressLivePlayer
   :video-src="videoSrc"
/>
```

```ts
const MOCK_VIDEO_SRC = 'https://1500005692.vod2.myqcloud.com/43843706vodtranscq1500005692/62656d94387702300542496289/v.f100240.m3u8';

export default {
   data() {
     return {
       videoSrc: MOCK_VIDEO_SRC,
     }
   },
   methods: {

   }
}
```


## API

### Props

| Parameters          | Description                                             | Type      | Default value |
| ------------------- | ------------------------------------------------------- | --------- | ------------- |
| video-src           | Live stream address                                     | _string_  | -             |
| progress-control    | Whether to display the progress bar                     | _boolean_ | `true`        |
| poster              | Cover image address                                     | _string_  | -             |
| retry-timeout       | Retry loading time, unit `s`                            | _number_  | `300`         |
| reload-interval     | The interval between retriggering `reload`, unit `s`    | _number_  | `5`           |
| show-feed-back-icon | Whether to display the feedback icon when loading fails | _boolean_ | `false`       |



### Events

| Event name        | Description                  | Parameters                               |
| ----------------- | ---------------------------- | ---------------------------------------- |
| clickFeedbackIcon | click feedback               | -                                        |
| goOtherMatch      | Click to go to other matches | -                                        |
| playStatusChange  | Play status change           | `status` (`playing`, `pause`, `waiting`) |
| fullScreenChange  | Full screen status change    | `isFullScreen`                           |
| playError         | Play error                   | -                                        |