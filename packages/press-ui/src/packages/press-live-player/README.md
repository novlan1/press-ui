---
url : pages/press/live-player/live-player
---

## LivePlayer 直播播放器


## 引入

```ts
import PressLivePlayer from 'press-ui/press-live-player/press-live-player';

export default {
  components: {
    PressLivePlayer,
  }
}
```

## 代码演示

### 基础用法

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

| 参数                | 说明                                 | 类型      | 默认值  |
| ------------------- | ------------------------------------ | --------- | ------- |
| video-src           | 直播流地址                           | _string_  | -       |
| progress-control    | 是否显示进度条                       | _boolean_ | `true`  |
| poster              | 封面图片地址                         | _string_  | -       |
| retry-timeout       | 重试加载时间, 单位 `s`               | _number_  | `300`   |
| reload-interval     | 重新触发`reload`的间隔时间，单位 `s` | _number_  | `5`     |
| show-feed-back-icon | 加载失败时，是否显示反馈图标         | _boolean_ | `false` |



### Events

| 事件名            | 说明             | 参数                                     |
| ----------------- | ---------------- | ---------------------------------------- |
| clickFeedbackIcon | 点击反馈         | -                                        |
| goOtherMatch      | 点击前往其他比赛 | -                                        |
| playStatusChange  | 播放状态改变     | `status` (`playing`, `pause`, `waiting`) |
| fullScreenChange  | 全屏状态改变     | `isFullScreen`                           |
| playError         | 播放出错         | -                                        |
