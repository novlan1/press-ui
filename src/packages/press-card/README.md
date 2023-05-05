---
url : pages/press/card/card
---

## Card 卡片

用来展示一些信息。

## 代码演示
### 基础用法


```html
<press-card>
  <span class="press-body">
    代码是写出来给人看的，附带能在机器上运行
  </span>
</press-card>
```


### 标题

```html
<press-card
  title="标题"
  extra="描述"
>
  <span class="press-body">
    代码是写出来给人看的，附带能在机器上运行
  </span>
</press-card>
```


### 标题

```html
<press-card
  title="标题"
  extra="描述"
>
  <span class="press-body">
    代码是写出来给人看的，附带能在机器上运行
  </span>
</press-card>
```


### 副标题

```html
 <press-card
  title="标题"
  sub-title="副标题"
  extra="描述"
  :thumbnail="avatar"
>
  <span class="press-body">
    代码是写出来给人看的，附带能在机器上运行
  </span>
</press-card>
```

```ts
export default {
  data() {
    return {
      avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-ui-avatar.png',
    }
  }
}
```

### 没有外边距

```html
<press-card
  title="标题"
  sub-title="副标题"
  extra="描述"
  :is-full="true"
  :thumbnail="avatar"
>
  <span class="press-body">
    代码是写出来给人看的，附带能在机器上运行
  </span>
</press-card>
```

### 封面图

```html
<press-card
  :cover="cover"
  @click="onClick"
>
  <span class="press-body">
    代码是写出来给人看的，附带能在机器上运行
  </span>
</press-card>
```

```ts
export default {
  data() {
    return {
      cover: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg',
    }
  }
}
```

### 操作栏

```html
<press-card>
  <span class="press-body">
    代码是写出来给人看的，附带能在机器上运行
  </span>
  <div
    slot="actions"
    class="card-actions"
  >
    <div
      class="card-actions-item"
      @click="actionsClick('分享')"
    >
      <uni-icons
        type="redo"
        size="18"
        color="#999"
      />
      <span class="card-actions-item-text">
        分享
      </span>
    </div>
    <div
      class="card-actions-item"
      @click="actionsClick('点赞')"
    >
      <uni-icons
        type="heart"
        size="18"
        color="#999"
      />
      <span class="card-actions-item-text">
        点赞
      </span>
    </div>
    <div
      class="card-actions-item"
      @click="actionsClick('评论')"
    >
      <uni-icons
        type="chatbubble"
        size="18"
        color="#999"
      />
      <span class="card-actions-item-text">
        评论
      </span>
    </div>
  </div>
</press-card>
```

```ts
export default {
  methods: {
    actionsClick(text) {
      uni.showToast({
        title: text,
        icon: 'none',
      });
    },    
  }
}
```

### 自定义标题

```html
<press-card
  padding="10px 0"
>
  <template #title>
    <press-cell
      title="标题"
      clickable
      @click="checked = !checked"
    >
      <press-switch
        slot="right-icon"
        size="22px"
        :checked="checked"
      />
    </press-cell>
  </template>
  <span class="press-body uni-mt-5">
    代码是写出来给人看的，附带能在机器上运行
  </span>
</press-card>
```

```ts
export default {
  data() {
    return {
      checked: true,
    }
  }
}
```
## API

### Props


| 参数      | 说明                              | 类型      | 默认值                                |
| --------- | --------------------------------- | --------- | ------------------------------------- |
| title     | 标题                              | _string_  | -                                     |
| subTitle  | 副标题                            | _string_  | -                                     |
| extra     | 右侧描述信息                      | _string_  | -                                     |
| thumbnail | 标题左侧缩略图                    | _string_  | -                                     |
| cover     | 封面图                            | _string_  | -                                     |
| isFull    | 是否通栏，为true时将去除padding值 | _boolean_ | `false`                               |
| isShadow  | 是否开启阴影                      | _boolean_ | `true`                                |
| shadow    | 卡片阴影,需符合 css 值            | _string_  | `0px 0px 3px 1px rgba(0, 0, 0, 0.08)` |
| border    | 是否显示边框                      | _boolean_ | `true`                                |
| margin    | 卡片外边距                        | _string_  | `15px`                                |
| spacing   | 卡片内边距                        | _string_  | `0 10px`                              |
| padding   | 卡片内容内边距                    | _string_  | `10px`                                |


### Events

| 事件  | 说明               | 回调参数                                                |
| ----- | ------------------ | ------------------------------------------------------- |
| click | 点击 Card 触发事件 | `cover` \| `title` \| `extra` \| `content` \| `actions` |


### Slot

| 名称  | 说明     |
| ----- | -------- |
| -     | 封面图   |
| cover | 卡片头部 |
| title | 操作栏   |


