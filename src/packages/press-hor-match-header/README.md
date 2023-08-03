---
url : pages/press/hor-match-header/hor-match-header
---

## HorMatchHeader 横版赛事头部

可用于游戏内页面头部。

## 代码演示

### 基础用法

```html
<MatchHeader @back="back">
  <template #middle>
    <div class="press-index__header__middle">
      商户赛
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

###  Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| back   | 点击返回时触发 | -        |

###  Slots

| 名称   | 说明           |
| ------ | -------------- |
| middle | 自定义中间内容 |
| right  | 自定义右侧内容 |
