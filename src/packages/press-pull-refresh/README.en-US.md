---
url : pages/press/pull-refresh/pull-refresh
---

## PullRefresh 下拉刷新


## Usage

### Basic Usage


The `refresh` event will be Emitted when pull refresh, you should set `v-model` to `false` to reset loading status after process refresh event.

```html
<press-pull-refresh v-model="isLoading" @refresh="onRefresh">
  <p>Refresh Count: {{ count }}</p>
</press-pull-refresh>
```

```js
export default {
  data() {
    return {
      count: 0,
      isLoading: false,
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        Toast('Refresh Success');
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
  },
};
```

### Success Tip

Use `success-text` to set the success prompt after the refresh is successful

```html
<press-pull-refresh
  v-model="isLoading"
  success-text="Refresh success"
  @refresh="onRefresh"
>
  <p>Refresh Count: {{ count }}</p>
</press-pull-refresh>
```

### Custom Tips

Use slots to custom tips.

```html
<press-pull-refresh v-model="isLoading" :head-height="80" @refresh="onRefresh">
  <template #pulling="props">
    <img
      class="doge"
      src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/7/own_mike_9ebf38f1fc4354df84.png"
      :style="{ transform: `scale(${props.distance / 80})` }"
    />
  </template>

  <template #loosing>
    <img class="doge" src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/7/own_mike_9ebf38f1fc4354df84.png" />
  </template>

  <template #loading>
    <img class="doge" src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/7/own_mike_aecbd81ffaca64b6f4.jpg" />
  </template>
  <p>Refresh Count: {{ count }}</p>
</press-pull-refresh>

<style>
  .doge {
    width: 140px;
    height: 72px;
    margin-top: 8px;
    border-radius: 4px;
  }
</style>
```

## API

### Props

| Attribute          | Description                              | Type               | Default               |
| ------------------ | ---------------------------------------- | ------------------ | --------------------- |
| v-model            | LoadingPlus status                           | _boolean_          | -                     |
| pulling-text       | Text to show when pulling                | _string_           | `Pull to refresh...`  |
| loosing-text       | Text to show when loosing                | _string_           | `Loose to refresh...` |
| loading-text       | Text to show when loading                | _string_           | `Loading...`          |
| success-text       | Text to show when loading success        | _string_           | -                     |
| success-duration   | Success text display duration(ms)        | _number \| string_ | `500`                 |
| animation-duration | Animation duration                       | _number \| string_ | `300`                 |
| head-height        | Height of head                           | _number \| string_ | `50`                  |
| pull-distance      | The distance to trigger the pull refresh | _number \| string_ | same as `head-height` |
| disabled           | Whether to disable pull refresh          | _boolean_          | `false`               |

### Events

| Event   | Description                   | Parameters |
| ------- | ----------------------------- | ---------- |
| refresh | Emitted after pulling refresh | -          |

### Slots

| Name    | Description                           | SlotProps    |
| ------- | ------------------------------------- | ------------ |
| default | Default slot                          | -            |
| normal  | Content of head when at normal status | -            |
| pulling | Content of head when at pulling       | { distance } |
| loosing | Content of head when at loosing       | { distance } |
| loading | Content of head when at loading       | { distance } |
| success | Content of head when succeed          | -            |



