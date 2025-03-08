---
url : pages/press/barrage/barrage
---

## Barrage

To realize the critical subtitle function when watching the video. 

## Usage

### Basic Usage

```html
<press-barrage v-model="list">
  <div class="video" style="width: 100%; height: 150px"></div>
</press-barrage>
<press-space style="margin-top: 10px">
  <press-button @click="add" type="primary" size="small"> barrage </press-button>
</press-space>
```

```ts
export default {
  setup() {
    const defaultList = [
      { id: 100, text: 'Lightweight' },
      { id: 101, text: 'Customizable' },
      { id: 102, text: 'Mobile' },
      { id: 103, text: 'Vue' },
      { id: 104, text: 'Library' },
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

### Imitate video barrage

```html
<press-barrage v-model="list" ref="barrage" :auto-play="false">
  <div class="video" style="width: 100%; height: 150px"></div>
</press-barrage>
<press-space style="margin-top: 10px">
  <press-button @click="add" type="primary" size="small" :disabled="!isPlay">
    barrage
  </press-button>
  <press-button @click="toggle()" size="small">
    {{ isPlay ? 'pause' : 'play' }}
  </press-button>
</press-space>
```

```ts
export default {
  setup() {
    const defaultList = [
      { id: 100, text: 'Lightweight' },
      { id: 101, text: 'Customizable' },
      { id: 102, text: 'Mobile' },
      { id: 103, text: 'Vue' },
      { id: 104, text: 'Library' },
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

| Attribute   | Description                                            | Type               | Default |
| ----------- | ------------------------------------------------------ | ------------------ | ------- |
| v-model     | Barrage data                                           | _BarrageItem[]_    | -       |
| auto-play   | Whether to play the bullet screen automatically        | _boolean_          | `true`  |
| rows        | The number of lines of text                            | _number \| string_ | `4`     |
| top         | Spacing between the top of the barrage area, unit `px` | _number \| string_ | `10`    |
| duration    | Text animation duration, unit `ms`                     | _number \| string_ | `4000`  |
| delay       | Barrage animation delay, unit `ms`                     | _number_           | `300`   |
| item-height | Barrage height, unit `px`                              | _number_           | `26`    |

### Methods

Use [ref](https://vuejs.org/guide/essentials/template-refs.html) to get Barrage instance and call instance methods.

| Name  | Description   | Attribute | Return value |
| ----- | ------------- | --------- | ------------ |
| play  | Play barrage  | -         | -            |
| pause | Pause barrage | -         | -            |

### Slots

| Name    | Description  |
| ------- | ------------ |
| default | Default slot |

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles.

| Name                      | Default Value        | Description |
| ------------------------- | -------------------- | ----------- |
| --press-barrage-font-size | _16px_               | -           |
| --press-barrage-space     | _10px_               | -           |
| --press-barrage-color     | _var(--press-white)_ | -           |
| --press-barrage-font      | _inherit_            | -           |
