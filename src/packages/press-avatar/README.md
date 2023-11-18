---
url : pages/press/avatar/avatar
---

## Avatar 头像


## 引入

```ts
import PressAvatar from 'press-ui/press-avatar/press-avatar';

export default {
  components: {
    PressAvatar,
  }
}
```

## 代码演示

### 基础用法

```html
<PressAvatar src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.…/article/2023/10/own_mike_0ab8e66284a3617ed9.jpeg" />
```


### 头像形状

可通过 `round` 为 `false` 设定为方形。

```html
<PressAvatar
  :src="src"
  :round="false"
/>
```

### 头像尺寸

通过 `size` 设定尺寸。

```html
<PressAvatar
  size="30"
  :src="src"
/>
```

### 图标头像

通过 `icon` 设定图标头像。

```html
<PressAvatar
  icon="star-o"
/>

<PressAvatar
  icon="like-o"
/>
```

### 文字头像

通过 `text` 设定文字头像。

```html
<PressAvatar
  text="Y"
/>

<PressAvatar
  text="G"
/>

<PressAvatar
  text="杨"
  random-bg-color
/>
```

### 加载失败

加载失败后会展示默认头像。

```html
<PressAvatar />
```

### 头像组

使用 `PressAvatarGroup` 组件，可展示头像组。

```html
<PressAvatarGroup
  :urls="urls"
/>

<PressAvatarGroup
  :urls="urls"
  gap="0.6"
/>

<PressAvatarGroup
  :urls="urls"
  size="50"
/>
```

```ts
export default {
  data() {
    return {
      urls: [
        'a.jpg',
        'b.jpg',
        'c.jpg',
        'd.jpg',
        'e.jpg',
        'f.jpg',
        'g.jpg',
      ]
    }
  }
}
```


## API

### Avatar Props

| 参数                    | 说明                                             | 类型               | 默认值        |
| ----------------------- | ------------------------------------------------ | ------------------ | ------------- |
| src                     | 头像图片路径                                     | _string_           | -             |
| round                   | 是否为圆形                                       | _boolean_          | `false`       |
| size                    | 尺寸                                             | _string \| number_ | `40`          |
| mode                    | 裁剪、缩放模式                                   | _string_           | `scaleToFill` |
| text                    | 显示的文字                                       | _string_           | -             |
| background-color        | 背景色                                           | _string_           | `#c0c4cc`     |
| color                   | 文字颜色                                         | _string_           | `#fff`        |
| font-size               | 文字大小                                         | _string \| number_ | `18`          |
| mp-avatar               | 是否显示小程序头像，只对百度，微信，QQ小程序有效 | _boolean_          | `false`       |
| random-background-color | 是否使用随机背景色                               | _boolean_          | `false`       |
| default-url             | 自定义加载失败头像                               | _string_           | -             |
| color-index             | 指定背景色的索引                                 | _number_           | `-1`          |
| name                    | 组件标识符                                       | _string_           | -             |
| custom-style            | 自定义样式                                       | _string_           | -             |



### Avatar Events

| 事件名 | 说明     | 参数   |
| ------ | -------- | ------ |
| click  | 点击头像 | `name` |


### AvatarGroup props

| 参数        | 说明                                          | 类型               | 默认值        |
| ----------- | --------------------------------------------- | ------------------ | ------------- |
| urls        | 头像图片组                                    | _array_            | -             |
| max-count   | 最多展示的头像数量                            | _number_           | `5`           |
| round       | 是否为圆形                                    | _boolean_          | `false`       |
| mode        | 裁剪、缩放模式                                | _string_           | `scaleToFill` |
| size        | 尺寸                                          | _string \| number_ | `40`          |
| show-more   | 超出 `max-count` 时，是否显示查看更多的提示   | _boolean_          | `true`        |
| key-name    | `urls` 元素为对象时，读取哪个属性作为图片地址 | _string_           | `url`         |
| gap         | 头像之间的遮挡比例（`0.4`代表遮挡`40%`）      | _number_           | `0.5`         |
| extra-value | 需额外显示的值                                | _string_           | -             |

### AvatarGroup Events

| 事件名   | 说明         | 参数 |
| -------- | ------------ | ---- |
| showMore | 点击展示更多 | -    |
