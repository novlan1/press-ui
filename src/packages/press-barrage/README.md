---
url : pages/press/barrage/barrage
---

## Barrage 弹幕

实现观看视频时弹出的评论性字幕功能。

## 引入

```ts
import PressBarrage from 'press-ui/press-barrage/press-barrage';

export default {
  components: {
    PressBarrage,
  }
}
```

## 代码演示

### 基础用法

可以通过 `v-model` 双向绑定弹幕数据，`Barrage` 会在组件区域内播放文字弹幕，使用数组数据 `push()` 可以发送弹幕文字。

```html
<press-barrage v-model="list">
  <div class="video" style="width: 100%; height: 150px"></div>
</press-barrage>
<press-space style="margin-top: 10px">
  <press-button @click="add" type="primary" size="small"> 弹幕 </press-button>
</press-space>
```

```ts
export default {
  setup() {
    const defaultList = [
      { id: 100, text: '轻量' },
      { id: 101, text: '可定制的' },
      { id: 102, text: '移动端' },
      { id: 103, text: 'Vue' },
      { id: 104, text: '组件库' },
      { id: 105, text: 'PressUI' },
      { id: 106, text: '666' },
    ];

    const list = ref([...defaultList]);
    const add = () => {
      list.value.push({ id: Math.random(), text: 'Barrage' });
    };

    return { list, add };
  },
};
```

### 模拟视频弹幕

设置 `auto-play` 为 `false` 属性后，需要使用 `play()` 进行弹幕播放，暂停可以使用 `pause()` 实现。

```html
<press-barrage v-model="list" ref="barrage" :auto-play="false">
  <div class="video" style="width: 100%; height: 150px"></div>
</press-barrage>
<press-space style="margin-top: 10px">
  <press-button @click="add" type="primary" size="small" :disabled="!isPlay">
    弹幕
  </press-button>
  <press-button @click="toggle()" size="small">
    {{ isPlay ? '暂停' : '开始' }}
  </press-button>
</press-space>
```

```ts
export default {
  setup() {
    const defaultList = [
      { id: 100, text: '轻量' },
      { id: 101, text: '可定制的' },
      { id: 102, text: '移动端' },
      { id: 103, text: 'Vue' },
      { id: 104, text: '组件库' },
      { id: 105, text: 'PressUI' },
      { id: 106, text: '666' },
    ];

    const list = ref([...defaultList]);
    const barrage = ref<BarrageInstance>();
    const add = () => {
      list.value.push({ id: Math.random(), text: 'Barrage' });
    };

    const [isPlay, toggle] = useToggle(false);

    watch(isPlay, () => {
      if (isPlay.value) barrage.value?.play();
      else barrage.value?.pause();
    });

    return { list, barrage, isPlay, toggle, add };
  },
};
```

## API

### Props

| 参数        | 说明                                                     | 类型               | 默认值 |
| ----------- | -------------------------------------------------------- | ------------------ | ------ |
| v-model     | 弹幕数据                                                 | _BarrageItem[]_    | -      |
| auto-play   | 是否自动播放弹幕                                         | _boolean_          | `true` |
| rows        | 弹幕文字行数                                             | _number \| string_ | `4`    |
| top         | 弹幕文字区域顶部间距，单位 `px`                          | _number \| string_ | `10`   |
| duration    | 弹幕文字滑过容器的时间，单位 `ms`                        | _number \| string_ | `4000` |
| delay       | 弹幕动画延时，单位 `ms`                                  | _number_           | `300`  |
| item-height | 弹幕高度，单位 `px`，只有非 H5 平台需要，H5 下会自动计算 | _number_           | `26`   |

### 方法

通过 ref 可以获取到 Barrage 实例并调用实例方法。

| 方法名 | 说明     | 参数 | 返回值 |
| ------ | -------- | ---- | ------ |
| play   | 播放弹幕 | -    | -      |
| pause  | 暂停弹幕 | -    | -      |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 弹幕组件子元素 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                      | 默认值               | 描述 |
| ------------------------- | -------------------- | ---- |
| --press-barrage-font-size | _16px_               | -    |
| --press-barrage-space     | _10px_               | -    |
| --press-barrage-color     | _var(--press-white)_ | -    |
| --press-barrage-font      | _inherit_            | -    |
