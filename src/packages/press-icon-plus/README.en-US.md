---
url : pages/press/icon-plus/icon-plus
---

## Icon

It is used to display `icons` icons, currently only `empty` is reserved, please use `press-icon-plus` for other icons.

## Code Demo

### Basic Usage

Using components in ``template``

```html
<press-icon-plus type="empty" size="30"></press-icon-plus>
```

### Music player icon

Basic usage:

```html
<press-icon-plus-music />
```

```ts
import PressIconPlusMusic from 'press-ui/press-icon-plus/press-icon-plus.vue';

export default {
  components: {
    PressIconPlusMusic,
  }
}
```

Specify the color:

```html
<press-icon-plus-music
   color="rgb(94, 109, 130)"
/>
```

Specify the number of `bar`:

```html
<press-icon-plus-music :number="5"/>
```


Specify icon width and height:

```html
<press-icon
   width="60px"
   height="60px"
/>
```



## API

### IconPlus Props

| property name | type   | default value | description                        |
| ------------- | ------ | ------------- | ---------------------------------- |
| size          | Number | 24            | IconPlus size                          |
| type          | String | -             | icon pattern, refer to the example |
| color         | String | -             | icon color                         |

### IconPlus Events

| event name | description                      | return value |
| ---------- | -------------------------------- | ------------ |
| @click     | Click the IconPlus to fire the event | -            |


### IconPlus Music Props


| property name | type   | default value | description                                   |
| ------------- | ------ | ------------- | --------------------------------------------- |
| number        | Number | 3             | The number of vertical bars, supporting `1-5` |
| color         | String | `#2979ff`     | icon color                                    |
| width         | String | `40px`        | the overall height of the icon                |
| height        | String | `50px`        | the overall width of the icon                 |
